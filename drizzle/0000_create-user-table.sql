CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"image" varchar(255),
	"role" varchar(255) DEFAULT 'user' NOT NULL,
	"status" varchar(255) DEFAULT 'active' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
