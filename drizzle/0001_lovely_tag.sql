ALTER TABLE "inquiries" RENAME COLUMN "message_type" TO "subject";--> statement-breakpoint
ALTER TABLE "inquiries" ALTER COLUMN "phone" SET DATA TYPE varchar;