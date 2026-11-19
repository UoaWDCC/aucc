# AUCC Website — Handoff Work Plan

Written 17 Nov 2026 from the Handoff Audit (15 Nov, `main` @ `cb2928a`), checked against the repo today.

## What changed since the audit

- Current branch `feature/admin-theme` is 2 commits ahead of `main` (admin theme, self-hosted fonts). Not merged yet.
- Uncommitted on that branch:
  - `src/payload-types.ts` and `admin/importMap.js`: regenerated. Collections are reordered (from the admin-theme grouping). These belong in the branch.
  - `src/components/PayloadImage/index.test.tsx`: a stray one-space indent change. Revert it.
- Open PRs: **#314, #294, #313 now have merge conflicts** with `main`. #317 is mergeable.
- Confirmed in code: the "Payload Blank Template" title, the footer with only ©, `swims={[]}`, `merch-content` read by no page, rivers `limit: 10`, `push: false`, and the Jotform `fbclid` link in Navbar and event sign-up.
- Confirmed from the audit memory: **all Payload users are admins by design** (the public never logs in). The audit's "editor/admin roles" item is dropped.

### A correction to the audit's migration fix

The audit suggests `release_command = "pnpm payload migrate"` on Fly. That **won't work as written**. The Dockerfile ships Next's `standalone` output and runs `node server.js`. The image has no pnpm, no Payload CLI and no full `node_modules`. Two options:

1. **`prodMigrations` in `postgresAdapter`** (recommended). Payload runs pending migrations when the server starts. No image changes, and it works on any host.
2. A `pnpm payload migrate` step in the GitHub workflow before `flyctl deploy`, run against that environment's `DATABASE_URL`.

I'll use option 1, plus a step in the workflow that fails the deploy if a migration errors.

---

## How I'll work

- **You do all git and GitHub work by hand after review**: branches, commits, pushes, PRs, rebases, merges, issues and workflow runs. I only edit files in the working tree and run local checks. I don't run `git` write commands or `gh`.
- I work one numbered item at a time and stop at the end of each with a summary of changed files and a suggested commit message and PR description. You review, commit and open the PR, then tell me which branch to continue on.
- Before handing an item over, I run `tsc --noEmit`, `pnpm lint`, `pnpm test run` and `pnpm build`. For schema work, I also run `payload migrate` on a fresh local Postgres (`docker-compose.yml`) and a `migrate:create` drift check.
- UI changes get checked in the browser preview at phone and desktop widths.
- For other people's PRs (#294, #313, #314, #317), you check out the branch and start the rebase or merge. I resolve the conflicts and make the fixes in the working tree.

---

## Phase 0 — Groundwork (do first; protects everything after)

**Status (17 Nov):**

- 0.1–0.3 are done in the working tree and waiting for your review and commit.
- Results: `type-check` passes with 0 errors, lint has warnings only, 162/162 tests pass, and `build` succeeds.
- The drift check passes on the current branch. It also correctly failed when a test field was added.
- 0.4 is yours.

| #   | Task                                                                                                                                                        | Files                                                                                       | Done when                                          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 0.1 | Finish `feature/admin-theme`: revert the stray test whitespace and confirm the regenerated types and importMap are correct. **You commit and open the PR.** | `PayloadImage/index.test.tsx`, `payload-types.ts`, `importMap.js`                           | Local checks pass and it's ready for you to commit |
| 0.2 | Fix the 15 TS errors in tests, then add a `tsc --noEmit` CI step and a `type-check` script                                                                  | `get-plain-text.test.ts`, `revalidation.test.ts`, `.github/workflows/*.yml`, `package.json` | `tsc` clean; CI fails on type errors               |
| 0.3 | CI migration drift check: run `payload migrate:create` in CI and fail if it writes a file                                                                   | `build.yml`                                                                                 | A PR with schema changes and no migration fails CI |
| 0.4 | **You** check the GitHub Actions history for slow or timed-out builds (the seed hang) and for staging deploy failures, and paste anything odd to me         | —                                                                                           | Findings noted here                                |

## Phase 1 — Database, migrations and deploy

| #   | Task                                                                                                                                                                                   | Files                                                        | Done when                                                                         |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| 1.1 | Run migrations on deploy with `prodMigrations`                                                                                                                                         | `payload.config.ts`                                          | A fresh DB comes up migrated when the built image starts                          |
| 1.2 | Fix the `20260818_003440` `down()` (use `DROP CONSTRAINT IF EXISTS`, or drop the FK first). Stop the baseline `down()` dropping `payload_migrations`.                                  | `src/migrations/*.ts`                                        | `migrate:reset` then `migrate` both succeed locally                               |
| 1.3 | Make the seed script exit (`process.exit(0)`, and close the pool)                                                                                                                      | `src/scripts/seed-globals.ts`                                | Exits within a few seconds locally                                                |
| 1.4 | Production pipeline: `fly.prod.toml`, `deploy-production.yml` (manual trigger plus tag or `main`), Infisical `prod` env. Re-enable staging auto-deploy on `main`.                      | `fly.prod.toml`, `.github/workflows/`, `terraform/`          | Workflow is valid. **The first prod deploy is run by you or with your go-ahead.** |
| 1.5 | Friendly delete errors: `beforeDelete` hooks on rivers and media that block deletes when the record is still referenced (swims, merch, spotlight, merch-content), with a clear message | `collections/rivers.ts`, `collections/media.ts`, shared hook | Deleting a referenced river shows a readable error in the admin                   |
| 1.6 | Optional: a Neon branch per PR instead of the shared dev DB                                                                                                                            | `build.yml`                                                  | Only if you want it; see Decisions                                                |

## Phase 2 — Launch blockers (site-wide)

| #   | Task                                                                                                                                                                                                                                            | Files                                                                     | Done when                                                              |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 2.1 | **Site Settings global**: sign-up URL (clean, no `fbclid`), contact email, socials, footer links, default OG image. Includes a migration. _(Moved up from the audit's P2, because the footer, contact, sign-up link and metadata all need it.)_ | `src/globals/site-settings.ts`, migration                                 | Editable in the admin and read by the pages below                      |
| 2.2 | Metadata: real title template and description, `generateMetadata` for event, river and trip-report detail pages, OG image, favicon and app icons                                                                                                | `(frontend)/layout.tsx`, `[id]`/`[slug]` pages, `public/` or `app/icon.*` | Every route's HTML has the right `<title>`; `/favicon.ico` returns 200 |
| 2.3 | `sitemap.ts` and `robots.ts` (sitemap includes dynamic events, rivers and reports)                                                                                                                                                              | `src/app/`                                                                | Both routes return valid output                                        |
| 2.4 | Footer: contact email, socials, quick links, sign-up link, privacy link                                                                                                                                                                         | `Footer.tsx`                                                              | Shows on every page, stacks on phones                                  |
| 2.5 | Replace the 3 hardcoded sign-up links with the Site Settings value                                                                                                                                                                              | `Navbar.tsx`, `CTAButton.tsx`, `SignUpToJoin.tsx`                         | No `jotform` sign-up URL left in components                            |
| 2.6 | About page: the "Contact Us" section gets real details, social handles become links, and the page still renders when there are no execs (styled empty state)                                                                                    | `about/_components/*`                                                     | Works with zero execs                                                  |
| 2.7 | Email adapter so admin password resets work (`@payloadcms/email-nodemailer` over SMTP, or `@payloadcms/email-resend`)                                                                                                                           | `payload.config.ts`, `env.ts`, Infisical                                  | A reset email arrives (tested against a dev inbox)                     |
| 2.8 | Wix cutover: replace links to `aucc.org.nz/gearhire`, `/gearhirepolicy` and the `media.wix.com` PDFs. Move the PDFs into Payload media. Add `redirects()` for old Wix paths.                                                                    | `HiringProcedure.tsx`, `UsefulLinksCards.tsx`, `next.config.mjs`          | No `wix`/`aucc.org.nz/<page>` links left; old paths redirect           |
| 2.9 | Privacy page (`/privacy`) with placeholder wording **for the club to confirm**, linked from the footer and the swims and membership forms                                                                                                       | `(frontend)/privacy/`                                                     | Page exists and is linked                                              |

## Phase 3 — Swims

| #   | Task                                                                                                                                                                      | Done when                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 3.1 | PR #314 (API and form wiring): once you've started the rebase on `main`, I resolve the conflicts, review the code and run its tests                                       | Conflicts resolved and checks pass locally; you push and merge |
| 3.2 | Pass real data to `SwimsList` (query plus pagination). Fix the nested `<main>`.                                                                                           | The list shows approved swims                                  |
| 3.3 | Public photo upload through a server route (media `create` needs a login), with size and type limits                                                                      | A photo can be submitted without logging in                    |
| 3.4 | PR #294 (consent checkbox), after #314 is merged: resolve conflicts and **add its migration** (`submitter_approved`)                                                      | Drift check passes                                             |
| 3.5 | Abuse protection on `/api/swims`: rate limiting (per IP, in memory or in the DB) on top of the honeypot. Lock down Payload REST `create` if the custom route replaces it. | Burst requests get 429                                         |
| 3.6 | `/api/webhook/signup` stub: implement it or delete it                                                                                                                     | No endpoint that fakes success                                 |
| 3.7 | Swims admin review tool (#297–#310, 14 tickets)                                                                                                                           | **Scope decision needed**; see Decisions                       |

## Phase 4 — Merch, Resources, Membership

| #   | Task                                                                                                                                                                                                                                                                    | Done when                                              |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 4.1 | **Merch**: either wire `merch-content` into `/merchandise` and retire `merch-global.items` (with a migration), or delete `merch-content` and add a drop migration. Also make the retailer list editable and add an enquiry route (mailto or link).                      | Whatever editors change in the admin shows on the page |
| 4.2 | **Resources PR #317**: work on the branch once you've checked it out (its author's account is gone). Fix the dead "trip guide" and "template" buttons, the wrong Mountain Safety Council link, `http://` links and fixed widths. Move the body into `resources-global`. | Mergeable PR; no dead links                            |
| 4.3 | **Membership PR #313**: resolve conflicts, add the `membership-global` migration, and check its Navbar, SideBar and home CTA edits against 2.5                                                                                                                          | Drift check passes; ready for review                   |

## Phase 5 — Quality pass (P1)

- **Mobile**: About (`ml-50`, `gap-52`, `h-163 w-163`, `w-90`) and Resources fixed widths. Check at 375px.
- **Accessibility**: the hamburger becomes a `<button>` with `aria-expanded`. Sidebar: a real close button, Escape to close, focus trap, focus returns to the trigger. Make media `alt` required, or at least warn.
- **Errors and 404s**: a styled `error.tsx` that doesn't show the raw error. Missing events return a real 404 status (move the `notFound()` check ahead of the streaming boundary, or drop `events/[id]/loading.tsx`).
- **Gallery**: `res.ok` check and catch, retry, loading spinner, end-of-feed message. Cap the API `limit` (for example, at most 50).
- **Rivers**: pagination, or remove the 10-item cap.
- **Cache invalidation**: editing a tag refreshes the gallery; editing an exec refreshes trip reports.
- **Placeholder copy**: clear the "Placeholder text" defaults in the gallery and merch globals.

## Phase 6 — Content editability and clean-up (P2)

- Home and About globals (hero, intro, images, "who we are"), and a Swims header field.
- Dead code: `collections/events-global.ts`, `GalleryData.tsx`, and `require-admin.ts` (if it's still unused after Phase 3).
- Delete the stray `t` file and the committed `custom.css` and `.map`. Add them to `.gitignore` if they're generated.
- Fix the 17 lint warnings (unused migration params: prefix them with `_`, or add an eslint override for `src/migrations`).
- **One README**: merge `README.md`, `README_HANDOVER.md` and `README_NEW.md` into one accurate doc (Fly.io, Node 22, Next 15.5, real scripts). Update `docs/DEPLOYMENT.md` with the migration and prod flow.
- Tickets already done (gallery, video highlights): I'll list them for you to close.
- Payload upgrade from 3.30: write it up as a post-handoff task with a re-test checklist. Don't do it before launch.
- Monitoring: suggest uptime checks and error tracking (Sentry has a free tier), plus analytics if the club wants them.

---

## Decisions and inputs I need from you

These block specific items. Everything else I can start now.

1. **Merch (4.1)**: wire in `merch-content` (matches the client design) or remove it?
2. **Email (2.7)**: which provider (club Gmail SMTP, Resend, other), and who adds the credentials to Infisical?
3. **Contact details (2.1, 2.4, 2.6)**: the club's public contact email, socials and any address.
4. **Production (1.4)**: does a prod Fly app and prod database exist yet? What's the final domain, and when is the Wix cutover?
5. **Wix PDFs (2.8)**: can you get the constitution and gear policy files (or their current text)?
6. **Swims admin tool (#297–#310)**: in scope for handoff, or a post-handoff backlog? It's 14 tickets. I'd suggest shipping public swims (3.1–3.5) first and doing the admin tool only if time allows.
7. **Per-PR databases (1.6)**: worth doing, or keep the shared dev DB?
8. **Privacy wording (2.9)**: who at the club signs it off?

## Suggested order

Phase 0 → 1.1–1.3 → 2.1–2.6 → 3.1–3.4 → 2.7–2.9 and 1.4 (once the inputs above arrive) → 4 → 3.5–3.6 → 5 → 6.
Your additional issues get slotted into this list as you raise them.
