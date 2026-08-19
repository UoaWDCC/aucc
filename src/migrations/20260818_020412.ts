import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_merch_global_items_variant" AS ENUM('image-left', 'image-right', 'image-with-caption');
  CREATE TABLE IF NOT EXISTS "swims" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"trip_name" varchar NOT NULL,
  	"river_id" integer NOT NULL,
  	"member_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "merch_global_items_callout_labels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "merch_global_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb,
  	"image_id" integer NOT NULL,
  	"variant" "enum_merch_global_items_variant" NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "event_spotlight" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"spotlight_image_id" integer NOT NULL,
  	"event_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "gallery_global" ALTER COLUMN "intro_text" SET DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Placeholder text","version":1}],"direction":"ltr","format":"","indent":0,"version":1}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb;
  ALTER TABLE "merch_global" ALTER COLUMN "intro_text" SET DEFAULT '{"root":{"type":"root","children":[{"type":"paragraph","children":[{"type":"text","text":"Placeholder text","version":1}],"direction":"ltr","format":"","indent":0,"version":1}],"direction":"ltr","format":"","indent":0,"version":1}}'::jsonb;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "swims_id" integer;
  DO $$ BEGIN
   ALTER TABLE "swims" ADD CONSTRAINT "swims_river_id_rivers_id_fk" FOREIGN KEY ("river_id") REFERENCES "public"."rivers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "swims" ADD CONSTRAINT "swims_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_global_items_callout_labels" ADD CONSTRAINT "merch_global_items_callout_labels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."merch_global_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_global_items" ADD CONSTRAINT "merch_global_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_global_items" ADD CONSTRAINT "merch_global_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."merch_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "event_spotlight" ADD CONSTRAINT "event_spotlight_spotlight_image_id_media_id_fk" FOREIGN KEY ("spotlight_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "swims_river_idx" ON "swims" USING btree ("river_id");
  CREATE INDEX IF NOT EXISTS "swims_image_idx" ON "swims" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "swims_updated_at_idx" ON "swims" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "swims_created_at_idx" ON "swims" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "merch_global_items_callout_labels_order_idx" ON "merch_global_items_callout_labels" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "merch_global_items_callout_labels_parent_id_idx" ON "merch_global_items_callout_labels" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "merch_global_items_order_idx" ON "merch_global_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "merch_global_items_parent_id_idx" ON "merch_global_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "merch_global_items_image_idx" ON "merch_global_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "event_spotlight_spotlight_image_idx" ON "event_spotlight" USING btree ("spotlight_image_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_swims_fk" FOREIGN KEY ("swims_id") REFERENCES "public"."swims"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_swims_id_idx" ON "payload_locked_documents_rels" USING btree ("swims_id");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "swims" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "merch_global_items_callout_labels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "merch_global_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_spotlight" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "swims" CASCADE;
  DROP TABLE "merch_global_items_callout_labels" CASCADE;
  DROP TABLE "merch_global_items" CASCADE;
  DROP TABLE "event_spotlight" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_swims_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_swims_id_idx";
  ALTER TABLE "gallery_global" ALTER COLUMN "intro_text" DROP DEFAULT;
  ALTER TABLE "merch_global" ALTER COLUMN "intro_text" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "swims_id";
  DROP TYPE "public"."enum_merch_global_items_variant";`)
}
