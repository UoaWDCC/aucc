import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "merch_content_sections_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_name" varchar NOT NULL,
  	"price" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "merch_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  ALTER TABLE "merch_content_towel_poncho_annotations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "merch_content_towel_poncho_annotations" CASCADE;
  ALTER TABLE "merch_content" DROP CONSTRAINT "merch_content_tshirts_image_id_media_id_fk";
  
  ALTER TABLE "merch_content" DROP CONSTRAINT "merch_content_stickers_image_id_media_id_fk";
  
  ALTER TABLE "merch_content" DROP CONSTRAINT "merch_content_board_shorts_image_id_media_id_fk";
  
  ALTER TABLE "merch_content" DROP CONSTRAINT "merch_content_board_shorts_group_photo_id_media_id_fk";
  
  ALTER TABLE "merch_content" DROP CONSTRAINT "merch_content_towel_poncho_image_id_media_id_fk";
  
  ALTER TABLE "merch_content" DROP CONSTRAINT "merch_content_sweatshirt_image_id_media_id_fk";
  
  ALTER TABLE "merch_content" DROP CONSTRAINT "merch_content_sweatshirt_image_left_id_media_id_fk";
  
  ALTER TABLE "merch_content" DROP CONSTRAINT "merch_content_sweatshirt_image_right_id_media_id_fk";
  
  DROP INDEX IF EXISTS "merch_content_tshirts_tshirts_image_idx";
  DROP INDEX IF EXISTS "merch_content_stickers_stickers_image_idx";
  DROP INDEX IF EXISTS "merch_content_board_shorts_board_shorts_image_idx";
  DROP INDEX IF EXISTS "merch_content_board_shorts_board_shorts_group_photo_idx";
  DROP INDEX IF EXISTS "merch_content_towel_poncho_towel_poncho_image_idx";
  DROP INDEX IF EXISTS "merch_content_sweatshirt_sweatshirt_image_idx";
  DROP INDEX IF EXISTS "merch_content_sweatshirt_sweatshirt_image_left_idx";
  DROP INDEX IF EXISTS "merch_content_sweatshirt_sweatshirt_image_right_idx";
  DO $$ BEGIN
   ALTER TABLE "merch_content_sections_products" ADD CONSTRAINT "merch_content_sections_products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content_sections_products" ADD CONSTRAINT "merch_content_sections_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."merch_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content_sections" ADD CONSTRAINT "merch_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."merch_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "merch_content_sections_products_order_idx" ON "merch_content_sections_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "merch_content_sections_products_parent_id_idx" ON "merch_content_sections_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "merch_content_sections_products_image_idx" ON "merch_content_sections_products" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_sections_order_idx" ON "merch_content_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "merch_content_sections_parent_id_idx" ON "merch_content_sections" USING btree ("_parent_id");
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "tshirts_label";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "tshirts_heading";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "tshirts_body";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "tshirts_image_id";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "tshirts_badge";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "stickers_label";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "stickers_heading";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "stickers_body";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "stickers_image_id";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "stickers_badge";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "board_shorts_label";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "board_shorts_heading";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "board_shorts_body";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "board_shorts_image_id";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "board_shorts_badge";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "board_shorts_caption";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "board_shorts_group_photo_id";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "towel_poncho_label";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "towel_poncho_heading";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "towel_poncho_body";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "towel_poncho_image_id";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "towel_poncho_badge";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "sweatshirt_label";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "sweatshirt_heading";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "sweatshirt_body";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "sweatshirt_image_id";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "sweatshirt_badge";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "sweatshirt_year_label";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "sweatshirt_image_left_id";
  ALTER TABLE "merch_content" DROP COLUMN IF EXISTS "sweatshirt_image_right_id";`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "merch_content_towel_poncho_annotations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"top_percent" numeric NOT NULL
  );
  
  ALTER TABLE "merch_content_sections_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "merch_content_sections" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "merch_content_sections_products" CASCADE;
  DROP TABLE "merch_content_sections" CASCADE;
  ALTER TABLE "merch_content" ADD COLUMN "tshirts_label" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "tshirts_heading" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "tshirts_body" jsonb;
  ALTER TABLE "merch_content" ADD COLUMN "tshirts_image_id" integer NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "tshirts_badge" varchar;
  ALTER TABLE "merch_content" ADD COLUMN "stickers_label" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "stickers_heading" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "stickers_body" jsonb;
  ALTER TABLE "merch_content" ADD COLUMN "stickers_image_id" integer NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "stickers_badge" varchar;
  ALTER TABLE "merch_content" ADD COLUMN "board_shorts_label" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "board_shorts_heading" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "board_shorts_body" jsonb;
  ALTER TABLE "merch_content" ADD COLUMN "board_shorts_image_id" integer NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "board_shorts_badge" varchar;
  ALTER TABLE "merch_content" ADD COLUMN "board_shorts_caption" varchar;
  ALTER TABLE "merch_content" ADD COLUMN "board_shorts_group_photo_id" integer NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "towel_poncho_label" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "towel_poncho_heading" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "towel_poncho_body" jsonb;
  ALTER TABLE "merch_content" ADD COLUMN "towel_poncho_image_id" integer NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "towel_poncho_badge" varchar;
  ALTER TABLE "merch_content" ADD COLUMN "sweatshirt_label" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "sweatshirt_heading" varchar NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "sweatshirt_body" jsonb;
  ALTER TABLE "merch_content" ADD COLUMN "sweatshirt_image_id" integer NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "sweatshirt_badge" varchar;
  ALTER TABLE "merch_content" ADD COLUMN "sweatshirt_year_label" varchar;
  ALTER TABLE "merch_content" ADD COLUMN "sweatshirt_image_left_id" integer NOT NULL;
  ALTER TABLE "merch_content" ADD COLUMN "sweatshirt_image_right_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "merch_content_towel_poncho_annotations" ADD CONSTRAINT "merch_content_towel_poncho_annotations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."merch_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "merch_content_towel_poncho_annotations_order_idx" ON "merch_content_towel_poncho_annotations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "merch_content_towel_poncho_annotations_parent_id_idx" ON "merch_content_towel_poncho_annotations" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "merch_content" ADD CONSTRAINT "merch_content_tshirts_image_id_media_id_fk" FOREIGN KEY ("tshirts_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content" ADD CONSTRAINT "merch_content_stickers_image_id_media_id_fk" FOREIGN KEY ("stickers_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content" ADD CONSTRAINT "merch_content_board_shorts_image_id_media_id_fk" FOREIGN KEY ("board_shorts_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content" ADD CONSTRAINT "merch_content_board_shorts_group_photo_id_media_id_fk" FOREIGN KEY ("board_shorts_group_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content" ADD CONSTRAINT "merch_content_towel_poncho_image_id_media_id_fk" FOREIGN KEY ("towel_poncho_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content" ADD CONSTRAINT "merch_content_sweatshirt_image_id_media_id_fk" FOREIGN KEY ("sweatshirt_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content" ADD CONSTRAINT "merch_content_sweatshirt_image_left_id_media_id_fk" FOREIGN KEY ("sweatshirt_image_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "merch_content" ADD CONSTRAINT "merch_content_sweatshirt_image_right_id_media_id_fk" FOREIGN KEY ("sweatshirt_image_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "merch_content_tshirts_tshirts_image_idx" ON "merch_content" USING btree ("tshirts_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_stickers_stickers_image_idx" ON "merch_content" USING btree ("stickers_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_board_shorts_board_shorts_image_idx" ON "merch_content" USING btree ("board_shorts_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_board_shorts_board_shorts_group_photo_idx" ON "merch_content" USING btree ("board_shorts_group_photo_id");
  CREATE INDEX IF NOT EXISTS "merch_content_towel_poncho_towel_poncho_image_idx" ON "merch_content" USING btree ("towel_poncho_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_sweatshirt_sweatshirt_image_idx" ON "merch_content" USING btree ("sweatshirt_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_sweatshirt_sweatshirt_image_left_idx" ON "merch_content" USING btree ("sweatshirt_image_left_id");
  CREATE INDEX IF NOT EXISTS "merch_content_sweatshirt_sweatshirt_image_right_idx" ON "merch_content" USING btree ("sweatshirt_image_right_id");`)
}
