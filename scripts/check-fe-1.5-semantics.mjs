// Preserve the package command while sharing execution and expectation checks.
process.argv[2] = "fe-1.5";
await import("./check-content-semantics.mjs");
