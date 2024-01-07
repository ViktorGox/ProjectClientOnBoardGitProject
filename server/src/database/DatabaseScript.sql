DO
$$
    DECLARE
        table_to_drop text;
    BEGIN
        FOR table_to_drop IN (SELECT table_name
                              FROM information_schema.tables
                              WHERE table_schema = 'public'
                                AND table_type = 'BASE TABLE')
            LOOP
                EXECUTE 'DROP TABLE IF EXISTS ' || table_to_drop || ' CASCADE';
            END LOOP;
    END
$$;

BEGIN;

CREATE TABLE IF NOT EXISTS userRole
(
    roleID integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    name   character varying(255) NOT NULL,
    PRIMARY KEY (roleID)
);

CREATE TABLE IF NOT EXISTS testStatus
(
    statusID integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    name     character varying(255) NOT NULL,
    PRIMARY KEY (statusID)
);

CREATE TABLE IF NOT EXISTS Users
(
    UserID   integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Email    character varying(255) NOT NULL UNIQUE,
    RoleID   integer                NOT NULL,
    Password character varying(255) NOT NULL,
    PRIMARY KEY (UserID),
    FOREIGN KEY (RoleID) REFERENCES userRole (RoleID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Sprint
(
    SprintID  integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Title     character varying(255) NOT NULL,
    StartDate date                   NOT NULL,
    DueDate   date                   NOT NULL,
    PRIMARY KEY (SprintID)
);


CREATE TABLE IF NOT EXISTS SprintUsers
(
    SprintID integer NOT NULL,
    UserID   integer NOT NULL,
    RoleId   integer Not Null,
    FOREIGN KEY (SprintID) REFERENCES Sprint (SprintID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Test
(
    TestID         integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Name           character varying(255) NOT NULL,
    UserID         integer                         DEFAULT null,
    Description    character varying(255)          DEFAULT null,
    StatusId       integer                NOT NULL DEFAULT 1,
    CompletionDate date                            DEFAULT null,
    PRIMARY KEY (TestID)
);

CREATE TABLE IF NOT EXISTS Testing
(
    SprintID integer,
    TestID   integer,
    FOREIGN KEY (SprintID) REFERENCES Sprint (SprintID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TestModule
(
    TestID   integer NOT NULL,
    ModuleID integer NOT NULL
);

CREATE TABLE IF NOT EXISTS Module
(
    ModuleID integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Label    character varying(255) NOT NULL,
    PRIMARY KEY (ModuleID)

);

CREATE TABLE IF NOT EXISTS TestStep
(
    StepID      integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    TestID      integer                NOT NULL,
    StepNR      integer                NOT NULL,
    Title       character varying(255) NOT NULL,
    Description character varying(255) DEFAULT null,
    TestLog     character varying(255) DEFAULT null,
    weight      integer                NOT NULL,
    PRIMARY KEY (StepID),
    UNIQUE (TestID, StepNR),
    FOREIGN KEY (TestID) REFERENCES Test (TestID) ON DELETE CASCADE
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

END;

ALTER TABLE IF EXISTS Testmodule
    ADD CONSTRAINT testID FOREIGN KEY (TestID)
        REFERENCES Test (TestID) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;
ALTER TABLE IF EXISTS Testmodule
    ADD CONSTRAINT ModuleID FOREIGN KEY (ModuleID)
        REFERENCES Module (ModuleID) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;

insert into userRole (name)
values ('admin'),
       ('developer'),
       ('tester');

INSERT INTO Users (email, RoleID, password)
VALUES ('admin', 1, '$2a$12$vsDm8ca0k/BhR/FiCVJn3.dUoUMw2.x64T2PmgAAnfvFI7pUA.FrC'),
       ('developer', 2, '$2a$12$JtIJIApdrVJL3KKctEERJOXfMc2bXzawugrLoeUllGERgDOm6IuuS'),
       ('tester', 3, '$2a$12$Tx9Ny6wMjMLtjEmG52/k1OSveL7ZHY7oBfbeQy22hUQM4hLC5Yscy');

insert into module (label)
values ('LogIn Page'),
       ('Register Page'),
       ('Home Page'),
       ('Users Page');

insert into teststatus (name)
values ('To do'),
       ('Passed'),
       ('Blocker'),
       ('Bug');

insert into test(name, userid, description, statusId, completiondate)
values ('Check if first and last name are added correctly', 3, 'first and last name shall be correct', 2, '14/12/2023'),
       ('Check if wrong passwords are rejected', 1, 'wrong passwords shall be rejected', 4, '14/12/2023'),
       ('Check if wrong username are rejected', 2, 'wrong usernames shall be rejected', 3, '14/12/2023'),
       ('Check if background color is not red', 3, 'red background shall not be accepted', 1, '14/12/2023');

insert into teststep (testid, stepnr, title, description, testlog, weight)
values (1, 1, 'Open users page', 'Elaborational description', 'nothing to note', 1),
       (1, 2, 'Check first name', 'Elaborational description 2', 'nothing to note 2', 1),
       (1, 3, 'Check last name', 'Elaborational description 3', 'nothing to note 3', 12),
       (2, 1, 'Open log in page', 'Press on log in text in header', 'emptyness', 0),
       (2, 2, 'Enter incorrect password', 'enter random characters', 'impossible to guess', 1),
       (2, 3, 'Press Log in Button', 'Press Log in Button', 'pressed log in button', 20),
       (2, 4, 'Check error text says incorrect log in', 'Error text shall not say incorrect password', 'chill', 1),
       (3, 1, 'Open log in page', 'Press on log in text in header', 'some log', 1),
       (3, 2, 'Enter incorrect username', 'Enter random characters, impossible to guess', 'some log 2', 2),
       (3, 3, 'Press log in Button', 'Press log in Button', 'pressed log in button', 3),
       (3, 4, 'Check erro text', 'Error text shall say incorrect log in', 'And nothing else matters', 4),
       (4, 1, 'Check background is not red', 'It shall never be red', '', 4);


insert into sprint (title, startdate, duedate)
values ('Sprint 0', '10/10/2023', '20/10/2023'),
       ('Sprint 1', '20/10/2023', '30/10/2023'),
       ('Sprint 2', '30/10/2023', '10/11/2023'),
       ('Sprint 3', '10/11/2023', '20/11/2023');

insert into testmodule (testid, moduleid)
values (1, 1),
       (1, 4),
       (2, 2),
       (2, 3),
       (3, 3),
       (4, 1),
       (4, 2),
       (4, 3),
       (4, 4);

insert into testing (sprintid, testid)
values (1, 1),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 2),
       (2, 3),
       (2, 4),
       (3, 1),
       (3, 2),
       (3, 3),
       (3, 4),
       (4, 2),
       (4, 3),
       (4, 4);

insert into sprintusers (sprintid, userid, roleid)
values (1, 1, 1),
       (1, 2, 2),
       (1, 3, 3),
       (2, 1, 3),
       (2, 2, 2),
       (2, 3, 1),
       (3, 2, 3),
       (3, 3, 3),
       (4, 1, 1),
       (4, 3, 3);