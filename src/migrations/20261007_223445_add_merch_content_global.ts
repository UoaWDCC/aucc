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
  
  CREATE TABLE IF NOT EXISTS "merch_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
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
  CREATE INDEX IF NOT EXISTS "merch_content_sections_parent_id_idx" ON "merch_content_sections" USING btree ("_parent_id");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "merch_content_sections_products" CASCADE;
  DROP TABLE "merch_content_sections" CASCADE;
  DROP TABLE "merch_content" CASCADE;`)
}
