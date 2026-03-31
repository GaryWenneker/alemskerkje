ALTER TABLE "agenda_items" ADD COLUMN "slug" varchar(500);--> statement-breakpoint
ALTER TABLE "agenda_items" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "agenda_items" ADD COLUMN "category" varchar(100);--> statement-breakpoint
ALTER TABLE "agenda_items" ADD COLUMN "video_url" varchar(1000);--> statement-breakpoint
ALTER TABLE "agenda_items" ADD COLUMN "video_type" varchar(20);--> statement-breakpoint
ALTER TABLE "agenda_items" ADD COLUMN "ticket_url" varchar(1000);--> statement-breakpoint
ALTER TABLE "agenda_items" ADD CONSTRAINT "agenda_items_slug_unique" UNIQUE("slug");