# Project Mosaic

Mobile-first frontend microlearning. Speak Russian to Йоси using «ты»; learning text is Russian, code/comments/docs/commits English.

- Check branch/diff and applicable instructions; preserve existing edits. Implement only the selected task. Ask before commit/push, new dependencies, major architecture or visual/control changes. Linear is the task/status authority.
- Use the existing Next.js/React/strict TypeScript and SCSS Modules stack. No Tailwind, CSS-in-JS or UI libraries. Run `nvm use` before npm; keep lockfile reproducible.
- Preserve guest access, owner isolation and existing behavior. Never use owner progress/accounts for tests. Do not infer physical-device or deployment acceptance from agent checks or push.
- Read only the route relevant to this task; linked references are not a startup reading list:

| Task | Read |
| --- | --- |
| Add/revise a content subsection | [Section workflow](docs/content/section-integration-workflow.md), including reasoning-switch waits |
| Change app behavior/scope | [Product contract](docs/product-contract.md), then the affected subsystem in [docs index](docs/README.md) |
| Browser checks | [Browser protocol](docs/verification.md): CLI first, MCP only when CLI cannot perform the work |
| Commands, tests, build, environment errors | [Development](docs/development.md) |
| Earlier acceptance/evidence | [History](docs/history/accepted-milestones.md) or affected package; verify current status in Linear |

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
