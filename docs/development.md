# Development and check selection

Read for commands, environment setup or final checks. Version sources: `package.json`, `package-lock.json`, `.nvmrc`. Source `$HOME/.nvm/nvm.sh` if needed, then `nvm use` before npm commands. Use `npm ci` for reproducible installation; discuss additional dependencies/major upgrades first.

## Commands

| Command | Use |
| --- | --- |
| `npm run dev` | Next.js dev on port 3000/all interfaces |
| `npm run lint` | ESLint, zero warnings |
| `npm run typecheck` | Next route types and TypeScript |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run validate:content` | Registry, IDs, coverage, four-option and content budgets |
| `npm run test:ordering` / `test:session` | Queue/selection/rounds and live/reload/review identity |
| `npm run test:progress` / `test:sync` | Awards/exposure/reset/aggregates and account reconciliation |
| `npm run test:auth` | Config, origin and ownership boundaries |
| `npm run test:feedback` | Local feedback preferences/player/navigation gates |
| `npm run generate:icons` | Regenerate platform icons after changing the canonical SVG |

## Choose checks by impact

- Application/style/content changes: lint, typecheck, build and applicable tests. Content also requires its [semantic](content/semantics.md), [rendered](content/rendered-checks.md) and integration checks. New registry entries require ordering/session tests.
- Auth/sync/progress changes: use the affected subsystem's verification guide and real integration evidence where required; mocks/builds do not establish provider/database success.
- Documentation-only changes: check local paths/anchors, command/source references, rule consistency and `git diff --check`. Do not rerun unchanged app/browser checks merely for approval or documentation updates.
- Rerun failures/affected checks after fixes; reuse valid evidence for unchanged stages. Inspect the whole diff for secrets, fixtures, caches and unrelated edits. Approval is required before commit/push.

Run typecheck and build sequentially: both write `.next`. If Turbopack's SCSS worker fails to bind a port (`EPERM`), report it and use `npx next build --webpack`; do not edit build config to bypass the environment. Record other build failures accurately. The fe-1.7 build reported a Next.js 16.4.3 security advisory; its successful retry did not fix that advisory. Dependency security requires a separate current review (`npm audit`, optionally `--omit=dev`), not an old clean-audit claim or an incompatible downgrade.

## Environment and structure

Dev server/listening port and ngrok may already belong to the owner: inspect before starting/stopping processes. Phone auth/config and LAN allowed-origin details: [auth setup](authentication/setup.md). Never print `.env` contents or credentials.

`src/app/(study)` keeps live feeds mounted across client routes. `src/content/learning-sections.ts` is the content registry; `src/components/learning-feed` renders it. State policies live in `src/lib/study-session`, `src/lib/learning-progress` and the shared study-shell providers. Auth/DB code lives in `src/lib/auth` and focused route handlers. Inspect only affected code. Read relevant installed Next.js guides before framework code, as required by AGENTS.md.
