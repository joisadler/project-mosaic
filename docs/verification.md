# Browser verification protocol

Read when starting browser work; content additionally uses [rendered checks](content/rendered-checks.md). Use isolated synthetic guest/account data. Never reset owner progress, import owner state, change persistent browser settings/extensions or close owner tabs.

## Tools and lifecycle

Use terminal CLI/direct-library Playwright by default; reuse installed hosts, scripts and browser sessions. MCP is a last resort only when available CLI routes cannot perform the needed work or cannot run. Record the concrete limitation; convenience or one recoverable error is insufficient. Prefer headed visibility. If headless is necessary, state why. Tool choice does not authorize public exposure/uploads or new dependencies.

On macOS start task-owned `caffeinate -d -t 1800` before verification, renew if needed, stop it when done. This is already authorized; do not change persistent sleep settings. Check the surface is available (caffeinate cannot unlock a locked desktop). The shared CLI host handles its own process.

Inspect existing server/ports and ngrok address/upstream before starting anything; preserve the owner's server/tunnel and use the existing environment when suitable. Redirect task server logs to temporary files, inspect bounded excerpts. Do not silence owner extensions or alter persistent logging to avoid noisy hydration messages.

Preflight browser executable, context lifecycle, guest initialization, state observation and capture. After two attempts recovering the same stale capture/control failure, use a permitted alternative or report the blocker; retain valid earlier evidence. Diagnose only the failing state before rerunning the complete small scenario. For tool output use counts/failures/paths, not raw snapshots/API queues. Persist progress before interruption.

## Evidence and handoff

Use production components/styles; a fixture must not alter the owner-facing inventory/backend/auth. Wait for actual initialization, fonts/transitions, and verify observed page/side/choice. Record failure identity and capture diagnostic evidence before asserting. An attempted action or changing accessibility snapshot does not prove a fresh screenshot.

Keep reusable checks in Git; screenshots/raw logs/measurements/temporary pages outside Git. Verify evidence writes and expected coverage before relying on them. Temporary paths are not permanent/cross-device attachments; use agreed attachments when supported. Remove task routes, backend/auth fixtures and restrictions before final build/review.

For owner review verify the ordinary current app at the established ngrok URL, with real full inventory filtered only by actual selection/progress. Leave its ordinary review tab open; do not leave a technical gallery as the app. Explain any separate hostname/port. Stop task-owned helpers/caffeinate, preserve owner dev/tunnel.

Emulation, agent checks and push do not establish physical iPhone/PWA, provider consent, real backgrounding or deployment acceptance. Record only device/browser/scenarios actually supplied by the owner; do not infer them from “works/approved.”
