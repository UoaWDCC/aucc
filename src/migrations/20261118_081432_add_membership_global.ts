import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "membership_global_tiers_perks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"perk" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "membership_global_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "membership_global_benefit_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "membership_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_image_id" integer,
  	"heading" varchar DEFAULT 'Membership' NOT NULL,
  	"subheading" varchar DEFAULT 'Join the Auckland University Canoe Club.' NOT NULL,
  	"intro" varchar DEFAULT 'Pick the membership that suits you.' NOT NULL,
  	"benefits_intro" varchar DEFAULT 'Your membership is your ticket to the river, the pool and one of the best crews on campus.',
  	"signup_url" varchar DEFAULT 'https://pci.jotform.com/form/260532948493870',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "membership_global_tiers_perks" ADD CONSTRAINT "membership_global_tiers_perks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."membership_global_tiers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "membership_global_tiers" ADD CONSTRAINT "membership_global_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."membership_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "membership_global_benefit_items" ADD CONSTRAINT "membership_global_benefit_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."membership_global"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "membership_global" ADD CONSTRAINT "membership_global_header_image_id_media_id_fk" FOREIGN KEY ("header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "membership_global_tiers_perks_order_idx" ON "membership_global_tiers_perks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "membership_global_tiers_perks_parent_id_idx" ON "membership_global_tiers_perks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "membership_global_tiers_order_idx" ON "membership_global_tiers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "membership_global_tiers_parent_id_idx" ON "membership_global_tiers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "membership_global_benefit_items_order_idx" ON "membership_global_benefit_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "membership_global_benefit_items_parent_id_idx" ON "membership_global_benefit_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "membership_global_header_image_idx" ON "membership_global" USING btree ("header_image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "membership_global_tiers_perks" CASCADE;
  DROP TABLE "membership_global_tiers" CASCADE;
  DROP TABLE "membership_global_benefit_items" CASCADE;
  DROP TABLE "membership_global" CASCADE;`)
}
