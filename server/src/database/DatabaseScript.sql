BEGIN;

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

CREATE TABLE IF NOT EXISTS Module
(
    ModuleID integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Label    character varying(255) NOT NULL,
    PRIMARY KEY (ModuleID)

);

CREATE TABLE IF NOT EXISTS Users
(
    UserID   integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    Email    character varying(255) NOT NULL UNIQUE,
    RoleID   integer                NOT NULL,
    Password character varying(255) NOT NULL,
    Role     character varying(255) NOT NULL,
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

CREATE TABLE IF NOT EXISTS Test
(
    TestID      SERIAL PRIMARY KEY,
    Name        VARCHAR(255) NOT NULL,
    UserID      INTEGER               DEFAULT NULL,
    Description VARCHAR(255)          DEFAULT NULL,
    StatusId    INTEGER      NOT NULL DEFAULT 1,
    lastUpdate  DATE                  DEFAULT CURRENT_DATE CHECK (lastUpdate >= CURRENT_DATE),
    FOREIGN KEY (UserID) REFERENCES Users (Userid) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS Testing
(
    SprintID integer,
    TestID   integer,
    StatusID integer,
    FOREIGN KEY (SprintID) REFERENCES Sprint (SprintID)  MATCH SIMPLE ON DELETE CASCADE,
    FOREIGN KEY (TestID) REFERENCES Test (TestId)  MATCH SIMPLE ON DELETE CASCADE,
    FOREIGN KEY (StatusID) REFERENCES TestStatus (statusid) MATCH SIMPLE
);

CREATE TABLE IF NOT EXISTS TestModule
(
    TestID   integer NOT NULL,
    ModuleID integer NOT NULL,
    FOREIGN KEY (TestID) REFERENCES Test (TestID)  MATCH SIMPLE ON DELETE CASCADE,
    FOREIGN KEY (ModuleID) REFERENCES Module (ModuleID)  MATCH SIMPLE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TestStep
(
    StepID      integer                NOT NULL GENERATED ALWAYS AS IDENTITY,
    TestID      integer                NOT NULL,
    StepNR      integer                NOT NULL,
    Title       character varying(255) NOT NULL,
    TestLog     character varying(255) DEFAULT null,
    weight      integer                NOT NULL,
    completion 		boolean 			NOT NULL DEFAULT FALSE,
    PRIMARY KEY (StepID),
    UNIQUE (TestID, StepNR),
    FOREIGN KEY (TestID) REFERENCES Test (TestID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Attachment
(
    AttachmentID integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    TestStepId integer NOT NULL,
    path character varying(255) NOT NULL,
    Primary key (AttachmentID),
    FOREIGN KEY (TestStepId) REFERENCES TestStep (StepID)  MATCH SIMPLE
);

END;

insert into userRole (name)
values ('admin'),
       ('developer'),
       ('tester');

INSERT INTO Users (email, RoleID, password, role)
VALUES ('admin', 1, '$2a$12$vsDm8ca0k/BhR/FiCVJn3.dUoUMw2.x64T2PmgAAnfvFI7pUA.FrC', 'admin'),
       ('developer', 2, '$2a$12$JtIJIApdrVJL3KKctEERJOXfMc2bXzawugrLoeUllGERgDOm6IuuS', 'developer'),
       ('tester', 3, '$2a$12$Tx9Ny6wMjMLtjEmG52/k1OSveL7ZHY7oBfbeQy22hUQM4hLC5Yscy', 'tester'),
       ('tester2', 3, '$2a$12$Tx9Ny6wMjMLtjEmG52/k1OSveL7ZHY7oBfbeQy22hUQM4hLC5Yscy', 'tester');


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

insert into test(name, userid, description, statusId)
values ('Check if first and last name are added correctly', 3, 'first and last name shall be correct', 2),
       ('Check if wrong passwords are rejected', 1, 'wrong passwords shall be rejected', 4),
       ('Check if wrong username are rejected', 2, 'wrong usernames shall be rejected', 3),
       ('Check if background color is not red', 3, 'red background shall not be accepted', 1),
       ('Verify the sidebar is on the side', 1, 'sidebar shall be on the side', 4),
       ('Confirm confirmation works correctly', 1, 'confirmation shall work', 1),
       ('Verify all data is shown', 1, 'data stored shall be shown', 1);

insert into teststep (testid, stepnr, title, testlog, weight)
values (1, 1, 'Open users page', 'nothing to note', 1),
       (1, 2, 'Check first name', 'nothing to note 2', 1),
       (1, 3, 'Check last name', 'nothing to note 3', 12),
       (2, 1, 'Open log in page', 'emptyness', 0),
       (2, 2, 'Enter incorrect password', 'impossible to guess', 1),
       (2, 3, 'Press Log in Button', 'pressed log in button', 20),
       (2, 4, 'Check error text says incorrect log in', 'chill', 1),
       (3, 1, 'Open log in page', 'some log', 1),
       (3, 2, 'Enter incorrect username', 'some log 2', 2),
       (3, 3, 'Press log in Button', 'pressed log in button', 3),
       (3, 4, 'Check erro text', 'And nothing else matters', 4),
       (4, 1, 'Check background is not red', '', 4);


INSERT INTO sprint (title, startdate, duedate)
VALUES ('Sprint 0', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '5 days'),
       ('Sprint 1', CURRENT_DATE + INTERVAL '6 days', CURRENT_DATE + INTERVAL '11 days'),
       ('Sprint 2', CURRENT_DATE + INTERVAL '12 days', CURRENT_DATE + INTERVAL '41 days'),
       ('Sprint 3', CURRENT_DATE + INTERVAL '42 days', CURRENT_DATE + INTERVAL '44 days');

insert into testmodule (testid, moduleid)
values (1, 1),
       (1, 4),
       (2, 2),
       (2, 3),
       (3, 3),
       (4, 1),
       (4, 2),
       (4, 3),
       (4, 4),
       (5, 3),
       (5, 4),
       (6, 2),
       (7, 3),
       (7, 4);

insert into testing (sprintid, testid)
values (1, 4),
       (1, 4),
       (1, 6),
       (1, 7),
       (1, 1),
       (1, 3),
       (1, 3),

       (2, 1),
       (2, 3),
       (2, 3),
       (2, 5),
       (2, 2),
       (2, 5),

       (3, 4),
       (3, 6),
       (3, 6),
       (3, 7),
       (3, 1),
       (3, 1),
       (3, 1),
       (3, 3),
       (3, 3),
       (3, 5),

       (4, 4),
       (4, 6),
       (4, 7),
       (4, 1),
       (4, 1),
       (4, 1),
       (4, 1),
       (4, 3),
       (4, 3),
       (4, 2),
       (4, 2),
       (4, 2),
       (4, 2),
       (4, 2);
