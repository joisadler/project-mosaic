# Project Mosaic

Mobile-first frontend microlearning with InfoCards, multiple-choice QuizCards and two-sided FlipCards. The MVP is accepted; tasks and priorities live in [Linear](https://linear.app/joisadler/project/project-mosaic-1db195c51ec6).

## Development

Next.js App Router, React, strict TypeScript, SCSS Modules and Swiper. Exact versions: [package.json](package.json), [package-lock.json](package-lock.json), [.nvmrc](.nvmrc).

```sh
nvm use
npm ci
npm run dev
```

Open http://localhost:3000. Guest browsing needs no external service. For Google/MongoDB or phone access use [authentication](docs/authentication.md). Keep credentials outside Git.

Commands/check selection and build fallback: [development guide](docs/development.md). Agent rules: [AGENTS.md](AGENTS.md). Read additional docs only for the task described in [the docs index](docs/README.md).

## Learning source and contents

Learning material adapts the Frontend Interview Preparation handbook. See the [runtime registry](src/content/learning-sections.ts) for available sections and the [content catalog](docs/content/catalog.md) for package/source links. Source handbook completion is separate from Mosaic integration/owner acceptance.

## Product and documentation

- [Product contract](docs/product-contract.md): current interaction/lifecycle boundaries.
- [Documentation index](docs/README.md): routes to affected subsystems and content phases.
- [Content integration](docs/content/section-integration-workflow.md): one authorized subsection through review/publication.
- [Roadmap boundaries](ROADMAP.md): current scope; Linear owns backlog status.

Use a fresh conversation per completed section with a compact phase handoff. Historical task narratives are reference evidence, not mandatory startup context.
