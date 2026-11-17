import fs from "node:fs";
import assert from "node:assert/strict";

// Synthetic guest context only. Drive real learning controls and rendered slides.
export default async function checkIntegration(page, options) {
  const { section, output, allSections, base = "http://localhost:3000" } = options;
  assert.ok(allSections?.includes(section), "Supply all registered section IDs.");
  fs.mkdirSync(output, { recursive: true });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setViewportSize({ width: 375, height: 667 });
  const active = () => page.locator('main[aria-label="Учебная лента по frontend"] .swiper-slide-active[data-card-id]');
  const identity = () => active().evaluate(el => ({ id: el.dataset.cardId, presentation: el.dataset.presentationId }));
  async function feed() {
    await active().waitFor();
    await page.waitForFunction(() => document.querySelector('main[aria-label="Учебная лента по frontend"] .swiper')?.swiper?.initialized);
  }
  async function move(index) {
    await page.evaluate(i => document.querySelector('main[aria-label="Учебная лента по frontend"] .swiper').swiper.slideTo(i, 0), index);
    await page.waitForTimeout(50);
    return identity();
  }
  async function sequence(count) {
    const result = [];
    for (let i = 0; i < count; i++) result.push(await move(i));
    return result;
  }
  const sections = items => [...new Set(items.map(item => item.id.match(/^fe-\d+\.\d+/)[0]))].sort();
  async function account() {
    await page.locator('[data-account-entry]:visible').last().click();
    await page.waitForURL("**/account");
  }
  async function back() {
    await page.locator('a[href="/account"]:visible').last().click();
    await page.waitForURL("**/account");
    await page.getByRole("link", { name: "К карточкам", exact: true }).click();
    await feed();
  }
  async function configure(ids) {
    await page.goto(base + "/learning");
    await page.getByRole("button", { name: "Снять всё", exact: true }).click();
    const chapter = page.getByRole("button", { name: "1. JavaScript и асинхронное программирование", exact: true });
    if (await chapter.getAttribute("aria-expanded") === "false") await chapter.click();
    for (const id of ids) {
      const number = id.slice(3).replaceAll(".", "\\.");
      await page.getByRole("checkbox", { name: new RegExp("^" + number + " ") }).check();
    }
    await back();
  }
  async function clientRoundTrip() {
    const before = await identity();
    await account();
    await page.locator('a[href="/learning"]').last().click();
    await page.waitForURL("**/learning");
    await back();
    assert.deepEqual(await identity(), before);
  }
  const mixedIds = [allSections[0], allSections.at(-2), section];
  await configure(mixedIds);
  const mixed = await sequence(42);
  assert.deepEqual(sections(mixed), [...mixedIds].sort());
  await configure([section]);
  const only = await sequence(24);
  assert.deepEqual(sections(only), [section]);
  const screenshots = [];
  for (const type of ["info", "quiz", "flip"]) {
    const index = only.findIndex(item => item.id.includes("-" + type + "-"));
    assert.ok(index >= 0, "No representative " + type + " in the sample.");
    await move(index);
    if (type === "quiz") {
      const radios = active().getByRole("radio");
      await radios.first().focus();
      await page.keyboard.press("ArrowDown");
      assert.equal(await active().locator('[role="radio"][aria-checked="true"]').count(), 0);
      await page.keyboard.press("Space");
      assert.equal(await radios.nth(1).getAttribute("aria-checked"), "true");
      assert.match(await active().innerText(), /Прогресс: 0%/);
      await clientRoundTrip();
      assert.equal(await active().getByRole("radio").nth(1).getAttribute("aria-checked"), "true");
    } else {
      const group = active().locator('[aria-keyshortcuts="ArrowLeft ArrowRight"]').first();
      await group.focus();
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(100);
      assert.equal(await active().locator(".swiper").evaluate(el => el.swiper.activeIndex), 1);
      await clientRoundTrip();
      assert.equal(await active().locator(".swiper").evaluate(el => el.swiper.activeIndex), 1);
    }
    const file = output + "/ordinary-" + type + ".png";
    await page.screenshot({ path: file });
    screenshots.push({ type, file, ...await identity() });
  }
  await page.goto(base + "/learning");
  await page.getByRole("button", { name: "Выбрать всё", exact: true }).click();
  await back();
  const all = await sequence(56);
  assert.deepEqual(sections(all), [...allSections].sort());
  await page.reload();
  await feed();
  const reloaded = await sequence(12);
  assert.notDeepEqual(reloaded, all.slice(0, 12));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  const response = await page.request.get(base + "/api/auth/get-session");
  assert.equal(response.status(), 200);
  assert.equal(await response.json(), null);
  assert.deepEqual(errors, []);
  const contact = await page.context().newPage();
  try {
    await contact.setViewportSize({ width: 1125, height: 699 });
    await contact.setContent('<body style="margin:0;display:flex;background:#141115;color:#d8afbf;font:14px Arial">' + screenshots.map(item => '<div><div style="height:32px;padding-left:12px;display:flex;align-items:center">' + item.type.toUpperCase() + '</div><img width="375" height="667" src="data:image/png;base64,' + fs.readFileSync(item.file).toString("base64") + '"></div>').join(""));
    await contact.locator("img").evaluateAll(images => Promise.all(images.map(item => item.decode())));
    await contact.screenshot({ path: output + "/ordinary-contact.png" });
  } finally {
    await contact.close();
  }
  const report = { section, mixed: sections(mixed), only: { count: only.length, sections: sections(only) }, reenabled: sections(all), infoQuizFlipResume: true, quizKeyboardNoAutomaticCredit: true, reloadFresh: true, screenshots, pageErrors: errors };
  fs.writeFileSync(output + "/integration.json", JSON.stringify(report, null, 2) + "\n");
  return report;
}
