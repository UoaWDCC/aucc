# Deployment

How the AUCC website is hosted, deployed and migrated. Written for Vercel; the old Fly.io setup has been removed.

## Overview

| Piece            | Where                                                             |
| ---------------- | ----------------------------------------------------------------- |
| App (site + CMS) | Vercel, a single Next.js project                                  |
| Database         | Neon Postgres: one production database, one shared `dev` database |
| Media            | AWS S3 bucket per environment, served through CloudFront          |
| Infrastructure   | Terraform in `terraform/` (S3, CloudFront, IAM)                   |
| CI secrets       | Infisical, project `aucc-website`, environment `dev`              |

```text
Browser ──► Vercel (Next.js + Payload) ──► Neon Postgres
   │                    │
   └──► CloudFront ◄──── S3 (uploads written by Payload)
```

## Environments

| Environment    | Triggered by                  | Database                 | Media bucket |
| -------------- | ----------------------------- | ------------------------ | ------------ |
| **Production** | push to `main`                | production               | production   |
| **Preview**    | push to any other branch / PR | shared `dev`             | staging      |
| **Local**      | `pnpm dev`                    | your choice (see README) | staging      |

Vercel's Git integration does the deploying; there are no deploy workflows in GitHub Actions. Each environment's variables (the list is in the README) are set in Vercel under **Project → Settings → Environment Variables**.

**Check these in the Vercel dashboard**, because the repo can't enforce them:

- **Build & Development → Build Command** is the default (so Vercel runs the `vercel-build` script) or set to `pnpm run vercel-build`.
- **Preview** `DATABASE_URL` is **not** the production database.
- **Production** `SERVER_URL` is the real domain, and that domain is also in `cors_allowed_origins` in `terraform/prod.tfvars` (still a TODO there).

## Database migrations on deploy

Payload's `push` is off, so the schema only changes through committed migrations in `src/migrations/`.

The `vercel-build` script in `package.json` runs:

```sh
if [ "$VERCEL_ENV" = "production" ]; then pnpm payload migrate; fi && pnpm build
```

- **Production:** pending migrations run first. If one fails, the build fails and the previous deployment stays live.
- **Preview:** no migrations run, so a branch's schema change never touches a shared database. A preview of a branch with a new migration can therefore error on the shared `dev` database until that migration is applied there. Apply it deliberately, or test against a local database.

Rolling back:

- `pnpm payload migrate:down` rolls back the latest batch. Every migration has a working `down()` except the baseline (`20260724_005630_…`), which refuses with an error; use `migrate:fresh` on a disposable database instead.
- To roll back a bad production deploy, use **Instant Rollback** in Vercel. It does **not** undo migrations, so a deploy that changed the schema needs a follow-up migration (or `migrate:down` run against production) as well.

## Continuous integration

`.github/workflows/pr.yml` runs on every PR to `main`, and all jobs must pass (the "PR Check Summary" check):

- **Lint** (`lint.yml`): ESLint, then `pnpm type-check`.
- **Build** (`build.yml`): migration drift check (fails if the schema has changed with no migration), then migrations and the globals seed against the `dev` database, then `next build`.
- **Unit tests** (`test.yml`): Vitest.

CI reads its secrets from Infisical using the `INFISICAL_CLIENT_ID` and `INFISICAL_CLIENT_SECRET` repository secrets.

> CI runs `payload migrate` against the shared `dev` database, so a PR with a new migration applies it there as soon as CI runs. Keep migrations safe to apply before merge, or switch CI to a per-PR Neon branch.

## Infrastructure (Terraform)

`terraform/main.tf` creates, per environment, in `ap-southeast-2`:

- S3 bucket `aucc-payload-bucket-<environment>`, with public access blocked and CORS for the allowed origins.
- A CloudFront distribution in front of it, using Origin Access Control. This is the `NEXT_PUBLIC_CF_URL`.
- An IAM user `aucc-payload-cms-s3-user-<environment>` whose keys Payload uses (`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`), limited to that bucket.

```bash
cd terraform
terraform init
terraform plan  -var-file=staging.tfvars   # or prod.tfvars
terraform apply -var-file=staging.tfvars
```

Outputs: `cloudfront_domain_name`, `payload_cms_access_key_id` and `payload_cms_secret_access_key` (sensitive).

> **Before running Terraform, find out where the state is.** No remote backend is configured, so state lives wherever it was last applied from. Staging and production also share one configuration, so they must use separate state (e.g. `terraform workspace select staging`). Applying `prod.tfvars` over staging's state would replace the staging resources. The Origin Access Control name (`aucc-payload-cms-oac`) is not per-environment, so the second environment in the same AWS account may also need a different name.

Static images that aren't managed in the CMS (e.g. the home page hero) live in the bucket under `static/` and are referenced as `${NEXT_PUBLIC_CF_URL}/static/…`.

## Troubleshooting

- **Build fails at "Invalid environment variables":** a variable from the README list is missing for that Vercel environment. `src/lib/env.ts` validates them at build and start.
- **Production build fails in `payload migrate`:** read the migration error in the build log. Nothing was deployed. Fix the migration in a new PR; don't edit a migration that has already run in production.
- **CI drift check fails:** you changed a collection, global or field without a migration. Run `pnpm payload migrate:create <name>` against an up-to-date database and commit the result.
- **Images missing or 403:** check `NEXT_PUBLIC_CF_URL` points at the right environment's distribution, and that the CloudFront host is allowed by `images.remotePatterns` in `next.config.mjs` (derived from that variable).
- **Admin edits don't show on the site:** the page's query is cached. Check the collection's `afterChange` hook revalidates its tag, and that `tagRelations` in `src/lib/utils/revalidation.ts` lists the dependency.
