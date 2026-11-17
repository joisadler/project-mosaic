import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";

// Real tab zoom in a disposable browser profile; no owner extension/profile changes.
export default async function checkZoom(chromium, options) {
  const { output, executablePath, zoomCards, base = "http://localhost:3000" } = options;
  assert.ok(executablePath && zoomCards?.length, "Zoom config requires an extension-capable browser executable and representative card states.");
  fs.mkdirSync(output, { recursive: true });
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "mosaic-zoom-"));
  const extension = path.join(temporary, "extension");
  fs.mkdirSync(extension);
  const origin = new URL(base);
  fs.writeFileSync(path.join(extension, "manifest.json"), JSON.stringify({ manifest_version: 3, name: "Local Mosaic zoom audit", version: "1.0", permissions: ["tabs"], host_permissions: [origin.protocol + "//" + origin.hostname + "/*"], background: { service_worker: "background.js" } }));
  fs.writeFileSync(path.join(extension, "background.js"), "chrome.runtime.onInstalled.addListener(() => {});\n");
  let context;
  try {
    context = await chromium.launchPersistentContext(path.join(temporary, "profile"), {
      headless: false, executablePath, viewport: null,
      args: ["--disable-extensions-except=" + extension, "--load-extension=" + extension, "--window-size=1280,1050"],
    });
    const worker = context.serviceWorkers()[0] ?? await context.waitForEvent("serviceworker");
    const page = await context.newPage();
    const url = card => base + "/content-audit-temp?" + new URLSearchParams({ card: card.id, ...card.state });
    await page.goto(url(zoomCards[0]));
    await page.waitForSelector("[data-audit-card]");
    const zoom = await worker.evaluate(async origin => {
      const [tab] = await globalThis.chrome.tabs.query({ url: origin + "/*" });
      await globalThis.chrome.tabs.setZoom(tab.id, 4);
      return globalThis.chrome.tabs.getZoom(tab.id);
    }, base);
    assert.ok(Math.abs(zoom - 4) < 1e-8);
    const results = [];
    const captures = [];
    async function observe(label) {
      const result = await page.evaluate(() => {
        const visible = el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.right > 1 && r.left < innerWidth - 1 && r.bottom > 1 && r.top < innerHeight - 1 && !el.closest('[aria-hidden="true"]');
        };
        const candidates = [...document.querySelectorAll('[class*="__markdown"],pre,[class*="__compactPanel"],[class*="__flipSideScroller"]')].filter(visible);
        const host = document.querySelector("[data-audit-card]");
        return { card: host.dataset.auditCard, width: innerWidth, height: innerHeight, dpr: devicePixelRatio,
          page: host.dataset.auditPage, side: host.dataset.auditSide, option: host.dataset.auditOption,
          overflows: candidates.filter(el => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1).map(el => ({ class: el.className, client: [el.clientWidth, el.clientHeight], scroll: [el.scrollWidth, el.scrollHeight] })),
          onePixelExcess: candidates.filter(el => (el.scrollWidth === el.clientWidth + 1 || el.scrollHeight === el.clientHeight + 1)).map(el => el.className) };
      });
      assert.equal(result.width, 320);
      assert.deepEqual(result.overflows, []);
      const session = await context.newCDPSession(page);
      try {
        const shot = await session.send("Page.captureScreenshot", { format: "png", fromSurface: false });
        const file = output + "/" + label + ".png";
        fs.writeFileSync(file, Buffer.from(shot.data, "base64"));
        captures.push({ label, file });
      } finally { await session.detach(); }
      results.push({ label, ...result });
      return result;
    }
    for (const card of zoomCards) {
      await page.goto(url(card));
      await page.waitForSelector("[data-audit-card]");
      if (!card.id.includes("-quiz-")) await page.waitForFunction(() => document.querySelector(".swiper")?.swiper?.initialized);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const result = await observe(card.id);
      assert.equal(result.card, card.id);
      for (const [key, value] of Object.entries(card.state ?? {})) assert.equal(result[key], String(value));
      if (card.id.includes("-quiz-")) {
        await page.getByRole("group", { name: /Вопрос, варианты и объяснение/ }).focus();
        for (let panel = 1; panel <= 2; panel++) {
          await page.keyboard.press("ArrowRight");
          await page.waitForTimeout(350);
          assert.equal(await page.locator('[class*="compactQuizSwiper"]').evaluate(el => el.swiper.activeIndex), panel);
          await observe(card.id + "-panel-" + panel);
        }
      }
    }
    const contact = await context.newPage();
    await contact.setViewportSize({ width: 1280, height: 1476 });
    await contact.setContent('<body style="margin:0;background:#141115;color:#d8afbf;font:12px Arial;display:grid;grid-template-columns:640px 640px">' + captures.map(item => '<div><div style="height:24px">400% · ' + item.label + '</div><img width="640" height="467" src="data:image/png;base64,' + fs.readFileSync(item.file).toString("base64") + '"></div>').join(""));
    await contact.locator("img").evaluateAll(images => Promise.all(images.map(item => item.decode())));
    await contact.screenshot({ path: output + "/zoom-contact.png", fullPage: true, scale: "css" });
    const report = { zoom, results, screenshots: captures, contact: output + "/zoom-contact.png" };
    fs.writeFileSync(output + "/zoom.json", JSON.stringify(report, null, 2) + "\n");
    return report;
  } finally {
    if (context) await context.close();
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}
