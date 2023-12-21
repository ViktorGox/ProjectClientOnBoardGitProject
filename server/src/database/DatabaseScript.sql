BEGIN;


CREATE TABLE IF NOT EXISTS Sprint
(
    SprintID integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    Title character varying(255) NOT NULL,
    StartDate date NOT  NULL,
    DueDate date NOT NULL,
    PRIMARY KEY (SprintID)
    );

CREATE TABLE IF NOT EXISTS Users
(
    UserID integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    Email character varying(255) NOT NULL,
    Role character varying(255) NOT NULL,
    Password character varying(255) NOT NULL,
    PRIMARY KEY (UserID)
    );

CREATE TABLE IF NOT EXISTS SprintUsers
(
    SprintID integer NOT NULL,
    UserID integer NOT NULL
);

CREATE TABLE IF NOT EXISTS Test
(
    TestID integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    Name character varying(255) NOT NULL,
    UserID integer DEFAULT null,
    Description character varying(255) DEFAULT null,
    Status character varying(255) DEFAULT null,
    CompletionDate date DEFAULT null,
    PRIMARY KEY (TestID)
    );

CREATE TABLE IF NOT EXISTS Testing
(
    SprintID integer,
    TestID integer
);

CREATE TABLE IF NOT EXISTS Module
(
    TestID integer,
    ModuleID integer
);

CREATE TABLE IF NOT EXISTS TestStep
(
    StepID integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    TestID integer,
    StepNR integer,
    Title character varying(255) NOT NULL,
    Description character varying(255) DEFAULT null,
    TestLog character varying(255) DEFAULT null,
    weight integer NOT NULL,
    PRIMARY KEY (StepID)
    );

ALTER TABLE IF EXISTS SprintUsers
    ADD CONSTRAINT SprintID FOREIGN KEY (SprintID)
    REFERENCES Sprint (SprintID) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS SprintUsers
    ADD CONSTRAINT UserID FOREIGN KEY (UserID)
    REFERENCES Users (UserID) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS Test
    ADD CONSTRAINT UserID FOREIGN KEY (UserID)
    REFERENCES Users (UserID) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS Testing
    ADD CONSTRAINT SprintID FOREIGN KEY (SprintID)
    REFERENCES Sprint (SprintID) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS Testing
    ADD CONSTRAINT TestID FOREIGN KEY (TestID)
    REFERENCES Test (TestID) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS Module
    ADD CONSTRAINT TestID FOREIGN KEY (TestID)
    REFERENCES Test (TestID) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS TestStep
    ADD CONSTRAINT TestID FOREIGN KEY (TestID)
    REFERENCES Test (TestID) MATCH SIMPLE
    ON UPDATE NO ACTION
       ON DELETE NO ACTION
        NOT VALID;

END;