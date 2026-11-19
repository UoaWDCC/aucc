# Payload upgrade plan

Plan for moving off Payload 3.30, written 19 Nov 2026. Version facts below are from the npm registry on that date; recheck them before starting.

## Where we are

| Package                    | Now               | Latest 3.x line                      |
| -------------------------- | ----------------- | ------------------------------------ |
| `payload`, `@payloadcms/*` | 3.30.0 (Mar 2025) | 3.94.0 (17 Nov 2026). 4.0 is in beta |
| `next`                     | 15.5.25           | 16.4.6                               |
| `react`, `react-dom`       | 19.0.0            | 19.0.9 is the latest 19.0 patch      |
| Node (`.nvmrc`, Volta, CI) | 22.14.0           |                                      |

What newer Payload needs:

| Payload     | `next` peer range                                    | `react` peer       | Node       |
| ----------- | ---------------------------------------------------- | ------------------ | ---------- |
| 3.30 – 3.69 | `^15.2.3`                                            | `^19.0.0`          | `>=20.9`   |
| 3.70 – 3.75 | `^15.4.10` (3.73+ also allows 16.2+)                 | `^19.0.1`          | `>=20.9`   |
| 3.76 – 3.92 | `>=15.4.11 <15.5`, or 16.x (minimum rises over time) | `^19.0.1`          | `>=20.9`   |
| 3.93        | as above                                             | `^19.0.1`          | `^22.23.4` |
| **3.94**    | `>=15.4.11 <15.5`, or `>=16.4.5`                     | `~19.0.9` or newer | `^22.23.5` |

So **3.75 is the last Payload that accepts Next 15.5**. Anything newer means Next 16 (or a downgrade to Next 15.4).

## Approach: four small PRs

Each step is its own PR, deployed to production and left for a few days before the next.

### 1. Prerequisites (no Payload change)

- React and React DOM `19.0.0` → `19.0.9`.
- Node `22.14.0` → the current 22 LTS (at least `22.23.5`): `.nvmrc`, `volta` and `engines` in `package.json`, `node-version` in the three workflows, and the Node version in Vercel project settings.
- Replace `next lint` (deprecated, and removed in Next 16) with the ESLint CLI. Next prints the codemod: `npx @next/codemod@canary next-lint-to-eslint-cli .`. Keep `pnpm lint` as the command.
- **Done when:** lint, type-check, tests and build pass; production deploy is healthy.

### 2. Payload 3.30 → 3.75

Bump `payload` and every `@payloadcms/*` package to the same exact version (they must match).

- Read the GitHub release notes for each minor from 3.31 to 3.75, looking for **Breaking changes** and **Migration** notes, especially for `db-postgres`, `richtext-lexical`, `storage-s3` and the admin UI.
- Run `pnpm generate:types` and `pnpm generate:importmap`.
- Run `pnpm payload migrate:create payload_3_75 --skip-empty` against an up-to-date local database. Newer adapters sometimes change generated schema (indexes, enums, defaults). Commit any migration, after reading the SQL.
- Test on a throwaway database: `migrate` from empty, then the admin (log in, edit each global, upload media, the referenced-delete guard, the custom admin theme in `(payload)/custom.scss`), then every public page.
- **Done when:** checks pass, the drift check is clean, and the admin and site work on a preview deploy.

### 3. Next 16 and Payload 3.94 together

These have to move together: Payload after 3.75 rejects Next 15.5, and 3.94 needs Next `>=16.4.5`.

- `npx @next/codemod@canary upgrade latest`, then set `next` to the newest 16.4.x and Payload to 3.94.x.
- Work through the Next 16 upgrade guide. Things this codebase is likely to hit:
  - `revalidateTag` now takes a second (cache profile) argument. Every call is in `src/lib/utils/revalidation.ts`.
  - Turbopack is the default for `next build` as well as `next dev`. Check the build and Payload's admin bundle.
  - `params` and `searchParams` must be awaited. They already are in pages; check any layout or metadata functions.
  - Changes to `next/image` defaults. Check `images.remotePatterns` for CloudFront and image quality.
- Repeat the migration, type and admin checks from step 2.
- **Done when:** the same as step 2, plus Lighthouse scores no worse than before.

### 4. Payload 4.0 (later)

4.0 is in beta (`4.0.0-beta.10`). Wait for a stable release and its migration guide, then plan it separately.

## Risks and how to limit them

- **Schema drift:** every bump can change generated SQL. Always run the drift check before merging, and never edit a migration that has already run in production.
- **Shared dev database:** CI runs `payload migrate` on the shared `dev` database (see [DEPLOYMENT.md](./DEPLOYMENT.md)). A migration added by an upgrade PR applies there when CI runs, before merge. Test the migration locally first.
- **Rollback:** Vercel Instant Rollback restores the old code but not the schema. Keep upgrade migrations additive where possible, and check `down()` works on a throwaway database before merging.
- **Mismatched Payload packages:** Payload breaks if `payload` and `@payloadcms/*` versions differ. Use exact versions and check `pnpm why payload` shows one version.
