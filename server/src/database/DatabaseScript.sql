BEGIN;


CREATE TABLE IF NOT EXISTS public."Sprint"
(
    "SprintID" integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    "Title" character varying(255) NOT NULL,
    "StartDate" date NOT  NULL,
    "DueDate" date NOT NULL,
    PRIMARY KEY ("SprintID")
);

CREATE TABLE IF NOT EXISTS public."User"
(
    "UserID" integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    "Email" character varying(255) NOT NULL,
    "Role" character varying(255) NOT NULL,
    "Password" character varying(255) NOT NULL,
    PRIMARY KEY ("UserID")
);

CREATE TABLE IF NOT EXISTS public."SprintUsers"
(
    "SprintID" integer NOT NULL,
    "UserID" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS public."Test"
(
    "TestID" integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    "Name" character varying(255) NOT NULL,
    "UserID" integer DEFAULT null,
    "Description" character varying(255) DEFAULT null,
    "Status" character varying(255) DEFAULT null,
    "CompletionDate" date DEFAULT null,
    PRIMARY KEY ("TestID")
);

CREATE TABLE IF NOT EXISTS public."Testing"
(
    "SprintID" integer,
    "TestID" integer
);

CREATE TABLE IF NOT EXISTS public."Module"
(
    "TestID" integer,
    "ModuleID" integer
);

CREATE TABLE IF NOT EXISTS public."TestStep"
(
    "StepID" integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    "TestID" integer,
    "StepNR" integer,
    "Title" character varying(255) NOT NULL,
    "Description" character varying(255) DEFAULT null,
    "TestLog" character varying(255) DEFAULT null,
    weight integer NOT NULL,
    PRIMARY KEY ("StepID")
);

ALTER TABLE IF EXISTS public."SprintUsers"
    ADD CONSTRAINT "SprintID" FOREIGN KEY ("SprintID")
    REFERENCES public."Sprint" ("SprintID") MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public."SprintUsers"
    ADD CONSTRAINT "UserID" FOREIGN KEY ("UserID")
    REFERENCES public."User" ("UserID") MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public."Test"
    ADD CONSTRAINT "UserID" FOREIGN KEY ("UserID")
    REFERENCES public."User" ("UserID") MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public."Testing"
    ADD CONSTRAINT "SprintID" FOREIGN KEY ("SprintID")
    REFERENCES public."Sprint" ("SprintID") MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public."Testing"
    ADD CONSTRAINT "TestID" FOREIGN KEY ("TestID")
    REFERENCES public."Test" ("TestID") MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public."Module"
    ADD CONSTRAINT "TestID" FOREIGN KEY ("TestID")
    REFERENCES public."Test" ("TestID") MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;


ALTER TABLE IF EXISTS public."TestStep"
    ADD CONSTRAINT "TestID" FOREIGN KEY ("TestID")
    REFERENCES public."Test" ("TestID") MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
              NOT VALID;

END;