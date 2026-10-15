import assert from "node:assert/strict";
import test from "node:test";
import { readAuthConfig, resolveAuthOrigin } from "../src/lib/auth/config.ts";

const development = {
  MOSAIC_AUTH_ENV: "development",
  BETTER_AUTH_URL: "http://localhost:3000",
  BETTER_AUTH_SECRET: "test-only-secret-with-at-least-32-characters",
  MONGODB_URI: "mongodb://localhost:27017",
  MONGODB_DB_NAME: "project_mosaic_dev",
  GOOGLE_CLIENT_ID: "test-client",
  GOOGLE_CLIENT_SECRET: "test-secret",
  AUTH_DEV_ORIGIN: "https://mosaic-test.ngrok-free.app",
};

test("guest mode needs no authentication secrets", () => {
  assert.equal(readAuthConfig({}), null);
  assert.equal(readAuthConfig({ ...development, GOOGLE_CLIENT_SECRET: "" }), null);
});

test("localhost and the fixed tunnel share config but select their own callback origins", () => {
  const config = readAuthConfig(development);
  assert.ok(config);
  assert.equal(resolveAuthOrigin(config, new Headers({ host: "localhost:3000" })), "http://localhost:3000");
  assert.equal(resolveAuthOrigin(config, new Headers({ host: "mosaic-test.ngrok-free.app" })), development.AUTH_DEV_ORIGIN);
});

test("unlisted hosts cannot use trusted forwarded headers to select a callback", () => {
  const config = readAuthConfig(development);
  assert.ok(config);
  assert.equal(resolveAuthOrigin(config, new Headers({ host: "attacker.example", "x-forwarded-host": "localhost:3000" })), null);
  assert.equal(resolveAuthOrigin(config, new Headers({ "x-forwarded-host": "localhost:3000" })), null);
  assert.equal(resolveAuthOrigin(config, new Headers({ host: "localhost:4000" })), null);
  assert.equal(resolveAuthOrigin(config, new Headers({ host: "localhost:3000", "x-forwarded-host": "attacker.example", "x-forwarded-proto": "https" })), "http://localhost:3000");
});

test("reject insecure, LAN, credential-bearing, and non-origin callback configuration", () => {
  for (const url of ["http://example.com", "https://192.168.1.2", "http://192.168.1.2:3000",
    "https://user:password@example.com", "https://example.com/path", "https://example.com?x=1", "https://example.com#fragment"]) {
    assert.throws(() => readAuthConfig({ ...development, BETTER_AUTH_URL: url }));
  }
  assert.throws(() => readAuthConfig({ ...development, AUTH_DEV_ORIGIN: "http://localhost:4000" }));
  assert.throws(() => readAuthConfig({ ...development, BETTER_AUTH_SECRET: "too-short" }));
});

test("production accepts exactly the configured HTTPS origin and rejects a development tunnel", () => {
  const production = { ...development, MOSAIC_AUTH_ENV: "production", BETTER_AUTH_URL: "https://project-mosaic-psi.vercel.app", AUTH_DEV_ORIGIN: "" };
  const config = readAuthConfig(production);
  assert.ok(config);
  assert.equal(resolveAuthOrigin(config, new Headers({ host: "localhost:3000" })), null);
  assert.equal(resolveAuthOrigin(config, new Headers({ host: "project-mosaic-psi.vercel.app" })), production.BETTER_AUTH_URL);
  assert.throws(() => readAuthConfig({ ...production, AUTH_DEV_ORIGIN: development.AUTH_DEV_ORIGIN }));
  assert.throws(() => readAuthConfig({ ...production, BETTER_AUTH_URL: "http://localhost:3000" }));
  assert.throws(() => readAuthConfig({ ...production, BETTER_AUTH_URL: "https://localhost:3000" }));
});
