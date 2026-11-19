import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery_global" ALTER COLUMN "intro_text" DROP DEFAULT;
  ALTER TABLE "merch_global" ALTER COLUMN "intro_text" DROP DEFAULT;`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery_global" ALTER COLUMN "intro_text" SET DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Placeholder text","version":1}],"direction":"ltr","format":"","indent":0,"version":1}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb;
  ALTER TABLE "merch_global" ALTER COLUMN "intro_text" SET DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Placeholder text","version":1}],"direction":"ltr","format":"","indent":0,"version":1}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb;`)
}
