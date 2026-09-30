import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "swims" ADD COLUMN "approved_to_share" boolean DEFAULT false;
  CREATE INDEX IF NOT EXISTS "swims_approved_to_share_idx" ON "swims" USING btree ("approved_to_share");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "swims_approved_to_share_idx";
  ALTER TABLE "swims" DROP COLUMN IF EXISTS "approved_to_share";`)
}
