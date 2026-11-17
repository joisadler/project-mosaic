// Usage: node scripts/run-content-browser-audit.mjs /absolute/audit-config.json
// Supply playwrightModule when Playwright is provided by the tool environment.
import fs from "node:fs";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import audit from "./audit-content-browser.mjs";

const configPath = process.argv[2];
if (!configPath) throw new Error("Pass an audit config JSON file.");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const { playwrightModule = "playwright", channel = "chrome", headless = false, mode = "audit", jobs, ...options } = config;
if (!/^fe-\d+\.\d+$/.test(options.section) || !options.output) throw new Error("Config requires a canonical section ID and an output directory.");
const { chromium } = await import(playwrightModule.startsWith("/") ? pathToFileURL(playwrightModule).href : playwrightModule);
const awake = process.platform === "darwin" ? spawn("caffeinate", ["-d", "-t", "1800"]) : undefined;
let browser;
try {
  if (mode === "zoom") {
    const result = await (await import("./check-content-browser-zoom.mjs")).default(chromium, options);
    console.log(JSON.stringify({ zoom: result.zoom, surfaces: result.results.length, report: options.output + "/zoom.json" }));
  } else {
    browser = await chromium.launch({ channel, headless });
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    for (const override of jobs ?? [{}]) {
      const job = { ...options, ...override };
      const kind = job.mode ?? mode;
      if (!["audit", "integration"].includes(kind)) throw new Error("Unknown browser check mode: " + kind);
      const check = kind === "integration" ? (await import("./check-content-browser-integration.mjs")).default : audit;
      const result = await check(page, { root: process.cwd(), ...job });
      fs.writeFileSync(job.output + "/summary.json", JSON.stringify(result, null, 2) + "\n");
      console.log(JSON.stringify({ ...result, failures: result.failures?.slice(0, 8), failureCount: result.failures?.length }));
      if (result.pending || result.failures?.length) process.exitCode = 1;
    }
  }
} finally {
  if (browser) await browser.close();
  awake?.kill();
}
