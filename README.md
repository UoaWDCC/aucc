# AUCC Website

The website for the Auckland University Canoe Club (AUCC), built by the Web Development and Consulting Club (WDCC) in 2025–26. It's a Next.js site with Payload CMS built in, so club editors can update events, trip reports, rivers, the gallery and page content without a developer.

- **Public site:** home, events, rivers, trip reports, swims, gallery, merch, gear hire, resources and about.
- **Admin:** `/admin`. Only club admins log in; the public never does. Every Payload user is an admin, and there are no roles.

## Tech stack

| Part           | Technology                                 |
| -------------- | ------------------------------------------ |
| Framework      | Next.js 15 (App Router), React 19          |
| CMS            | Payload CMS 3.30 (in the same Next app)    |
| Database       | Postgres on Neon                           |
| Media          | AWS S3, served through CloudFront          |
| Hosting        | Vercel                                     |
| Infrastructure | Terraform (S3, CloudFront, IAM)            |
| Secrets        | Infisical (used by CI)                     |
| Styling        | Tailwind CSS 4                             |
| Tests          | Vitest and Testing Library, plus Storybook |
| Tooling        | pnpm 10.5.2, Node 22.14.0, TypeScript 5    |

Exact versions are in `package.json`. See [docs/PAYLOAD_UPGRADE.md](docs/PAYLOAD_UPGRADE.md) for the upgrade plan.

## Getting started

You need Node 22.14.0 (`.nvmrc`; Volta picks it up from `package.json`) and pnpm 10.5.2 (`corepack enable`).

```bash
git clone https://github.com/UoaWDCC/aucc.git
cd aucc
pnpm install
cp .env.example .env.local   # then fill it in (see below)
pnpm dev
```

The site runs at <http://localhost:3000> and the admin at <http://localhost:3000/admin>.

### Environment variables

Every variable is required. They are checked at startup in `src/lib/env.ts`. Get development values from the tech lead or from Infisical (project `aucc-website`, environment `dev`).

| Variable                                                             | What it is                                                         |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`                                                       | Postgres connection string                                         |
| `PAYLOAD_SECRET`                                                     | Secret Payload signs admin sessions with                           |
| `SERVER_URL`                                                         | The site's own URL, e.g. `http://localhost:3000`                   |
| `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Where uploaded media is stored                                     |
| `NEXT_PUBLIC_CF_URL`                                                 | CloudFront URL that serves the bucket (media and `static/` images) |
| `API_KEY`                                                            | Shared key for `/api/webhook/signup`                               |

> **Careful:** the shared `dev` database and staging bucket are used by everyone and by CI. Don't test destructive operations (deletes, `migrate:fresh`, `migrate:reset`) against them. Use a local Postgres instead: `docker compose up postgres` starts one on port 5432 (user `user`, password `password`), then run `pnpm payload migrate` against it.

## Commands

```bash
pnpm dev                 # dev server (Turbopack)
pnpm build               # production build
pnpm start               # serve the production build
pnpm lint                # ESLint
pnpm type-check          # TypeScript
pnpm format              # Prettier
pnpm test                # Vitest (watch); `pnpm vitest run` runs once
pnpm storybook           # component explorer on :6006

pnpm payload migrate             # apply pending migrations
pnpm payload migrate:status      # list migrations and whether they've run
pnpm payload migrate:create name # generate a migration from schema changes
pnpm generate:types              # regenerate src/payload-types.ts
pnpm generate:importmap          # after adding admin components
```

A Husky pre-commit hook runs ESLint and Prettier on staged files.

## Project structure

```text
src/
├── app/
│   ├── (frontend)/        public site; one folder per page
│   │   ├── _components/   shared layout (navbar, footer, sidebar)
│   │   └── <page>/_components/   components used only by that page
│   ├── (payload)/         Payload admin and its REST/GraphQL routes
│   └── api/               custom API routes (gallery paging, webhook)
├── collections/           Payload collections (events, rivers, media, …)
├── globals/               Payload globals: one per page's editable content
├── components/            reusable UI (Button, PayloadImage, NotFound, …)
├── queries/               cached data fetching used by pages
├── lib/                   env, Payload client, utilities (cache tags, cn)
├── migrations/            database migrations (committed, run on deploy)
└── payload-types.ts       generated; don't edit by hand
terraform/                 S3, CloudFront and IAM for staging and production
docs/                      deeper guides (see below)
```

## How data flows

1. Editors change content in `/admin`. Payload writes it to Postgres, and uploads go to S3.
2. Pages read data through functions in `src/queries/`, wrapped in `unstable_cache` and tagged with cache tags.
3. Each collection and global has an `afterChange` hook that calls `cacheTags.<name>.revalidate()`. That clears every cached query that depends on it, so pages update without a redeploy. The dependencies are listed in `tagRelations` in `src/lib/utils/revalidation.ts`.

## Common tasks

### Change the database schema (collections, globals or fields)

`push` is off, so **every schema change needs a migration**:

1. Edit the collection or global in `src/collections/` or `src/globals/`.
2. Run `pnpm payload migrate:create describe_the_change` against a database that has every existing migration applied. Review the generated SQL.
3. Run `pnpm generate:types` (the dev server also does this).
4. Commit the migration (`.ts` and `.json`) and `src/migrations/index.ts` with the change.

CI fails if the schema and migrations disagree. Production runs pending migrations on deploy (see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)).

### Add a collection or global

Do the steps above, and also:

- Register it in `src/payload.config.ts`.
- Add a cache tag in `src/lib/utils/revalidation.ts`. List what it references (e.g. `media`) in `tagRelations`, and add its tag to anything that references it.
- Add `afterChange`/`afterDelete` hooks that call `cacheTags.<name>.revalidate()`.
- Add a query in `src/queries/` wrapped in `unstable_cache` with `tags: cacheTags.<name>.relatedTags`.

### Add a page

Create `src/app/(frontend)/<page>/page.tsx`, put its components in `<page>/_components/`, and add it to `PAGES` in `_components/layout/SideBar.tsx` (and the navbar if it belongs there).

## Deployment

Vercel deploys every push: `main` goes to production, and other branches get preview deployments. Production builds run pending database migrations first. Preview builds never touch the database. The details, environments and infrastructure are in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Documentation

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): hosting, environments, migrations on deploy, infrastructure
- [docs/ONBOARDING.md](docs/ONBOARDING.md): first-week guide for new developers
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): architecture in more depth
- [docs/COMPONENTS.md](docs/COMPONENTS.md): component conventions
- [docs/CONTENT_MANAGEMENT.md](docs/CONTENT_MANAGEMENT.md): guide for club editors
- [docs/PAYLOAD_UPGRADE.md](docs/PAYLOAD_UPGRADE.md): plan for upgrading Payload, Next and React

## Teams

### 2026

| Name           | Role            |
| -------------- | --------------- |
| Daniel Chen    | Project Manager |
| Jonathan Wu    | Tech Lead       |
| Ayush Kumar    | Developer       |
| Olivia Kusuma  | Developer       |
| Jacob Gray     | Developer       |
| Dylan Bhadresa | Developer       |
| Carl Misquitta | Developer       |
| Vanessa Dang   | Developer       |
| Ryan Supardi   | Developer       |

### 2025

| Name                    | Role            |
| ----------------------- | --------------- |
| David Zhu               | Project Manager |
| Phawat Saengsiripongpun | Tech Lead       |
| Franck Chen             | Developer       |
| Henri Chemla            | Developer       |
| Troy Abbott             | Developer       |
| Ava Lee                 | Developer       |
| Dom Pietersen           | Developer       |
| Lawrence Li             | Developer       |
| Mai Pham                | Developer       |
| Hanna Lin               | Designer        |
