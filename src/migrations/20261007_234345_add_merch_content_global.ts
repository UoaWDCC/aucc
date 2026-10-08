import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Earlier revisions of this PR shipped migrations that created these
  // tables with a different shape. Drop any leftovers so this migration
  // also works on databases that ran those (the global was never released).
  await db.execute(sql`
   DROP TABLE IF EXISTS "merch_content_sections_products" CASCADE;
  DROP TABLE IF EXISTS "merch_content_sections" CASCADE;
  DROP TABLE IF EXISTS "merch_content_towel_poncho_annotations" CASCADE;
  DROP TABLE IF EXISTS "merch_content" CASCADE;`)

  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "merch_content_towel_poncho_annotations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"top_percent" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "merch_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tshirts_label" varchar NOT NULL,
  	"tshirts_heading" varchar NOT NULL,
  	"tshirts_body" jsonb,
  	"tshirts_image_id" integer NOT NULL,
  	"tshirts_badge" varchar,
  	"stickers_label" varchar NOT NULL,
  	"stickers_heading" varchar NOT NULL,
  	"stickers_body" jsonb,
  	"stickers_image_id" integer NOT NULL,
  	"stickers_badge" varchar,
  	"board_shorts_label" varchar NOT NULL,
  	"board_shorts_heading" varchar NOT NULL,
  	"board_shorts_body" jsonb,
  	"board_shorts_image_id" integer NOT NULL,
  	"board_shorts_badge" varchar,
  	"board_shorts_caption" varchar,
  	"board_shorts_group_photo_id" integer NOT NULL,
  	"towel_poncho_label" varchar NOT NULL,
  	"towel_poncho_heading" varchar NOT NULL,
  	"towel_poncho_body" jsonb,
  	"towel_poncho_image_id" integer NOT NULL,
  	"towel_poncho_badge" varchar,
  	"sweatshirt_label" varchar NOT NULL,
  	"sweatshirt_heading" varchar NOT NULL,
  	"sweatshirt_body" jsonb,
  	"sweatshirt_image_id" integer NOT NULL,
  	"sweatshirt_badge" varchar,
  	"sweatshirt_year_label" varchar,
  	"sweatshirt_image_left_id" integer NOT NULL,
  	"sweatshirt_image_right_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "merch_content_towel_poncho_annotations" ADD CONSTRAINT "merch_content_towel_poncho_annotations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."merch_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
  
  CREATE INDEX IF NOT EXISTS "merch_content_towel_poncho_annotations_order_idx" ON "merch_content_towel_poncho_annotations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "merch_content_towel_poncho_annotations_parent_id_idx" ON "merch_content_towel_poncho_annotations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "merch_content_tshirts_tshirts_image_idx" ON "merch_content" USING btree ("tshirts_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_stickers_stickers_image_idx" ON "merch_content" USING btree ("stickers_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_board_shorts_board_shorts_image_idx" ON "merch_content" USING btree ("board_shorts_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_board_shorts_board_shorts_group_photo_idx" ON "merch_content" USING btree ("board_shorts_group_photo_id");
  CREATE INDEX IF NOT EXISTS "merch_content_towel_poncho_towel_poncho_image_idx" ON "merch_content" USING btree ("towel_poncho_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_sweatshirt_sweatshirt_image_idx" ON "merch_content" USING btree ("sweatshirt_image_id");
  CREATE INDEX IF NOT EXISTS "merch_content_sweatshirt_sweatshirt_image_left_idx" ON "merch_content" USING btree ("sweatshirt_image_left_id");
  CREATE INDEX IF NOT EXISTS "merch_content_sweatshirt_sweatshirt_image_right_idx" ON "merch_content" USING btree ("sweatshirt_image_right_id");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "merch_content_towel_poncho_annotations" CASCADE;
  DROP TABLE "merch_content" CASCADE;`)
}
