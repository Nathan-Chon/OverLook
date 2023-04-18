set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"phoneNumber" TEXT NOT NULL,
	"managerAccount" BOOLEAN NOT NULL,
  primary key ("userId"),
  unique ("email")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."requests" (
	"requestId" serial,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
  "question" TEXT NOT NULL,
	"createdAt"   timestamptz(6) not null default now(),
	"updatedAt"   timestamptz(6) not null default now(),
	"userId" serial,
  primary key ("requestId"),
  foreign key ("userId")
   references "users" ("userId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "requests" ADD CONSTRAINT "requests_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
