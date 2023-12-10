//Creating the tables
export const createUserTableQuery =
    `CREATE TABLE IF NOT EXISTS User (
        UserId INTEGER PRIMARY KEY AUTOINCREMENT,
        username STRING UNIQUE,
        password STRING,
        role STRING
     );`;

export const createBoardUserTableQuery =
    `CREATE TABLE IF NOT EXISTS TestBoardUser (
        userId INTEGER PRIMARY KEY,
        boardId INTEGER,
        role STRING
     );`;

export const createTestBoardTableQuery =
    `CREATE TABLE IF NOT EXISTS TestBoard (
        boardId INTEGER PRIMARY KEY AUTOINCREMENT,
        title STRING,
        dueDate DATE
     );`;

export const createTestTableQuery =
    `CREATE TABLE IF NOT EXISTS Test (
        boardId INTEGER PRIMARY KEY,
        issueId INTEGER
     );`;

export const createTestStepTableQuery =
    `CREATE TABLE IF NOT EXISTS TestStep (
        issueId INTEGER PRIMARY KEY,
        stepNumber INTEGER,
        title STRING,
        description STRING,
        testLog STRING,
        weight INTEGER,
        dueDate DATE
     );`;


//Everytime close and run the server again, it drops the tables and creates it again with dummy data
//We can change it later on
export const dropUserTable = `DROP TABLE IF EXISTS User;`;
export const dropBoardUserTable = `DROP TABLE IF EXISTS TestBoardUser;`;

export const dropTestBoardTable = `DROP TABLE IF EXISTS TestBoard;`;

export const dropTestTable = `DROP TABLE IF EXISTS Test;`;

export const dropTestStepTable = `DROP TABLE IF EXISTS TestStep;`;


export const insertUserQuery = `INSERT INTO User (username, password, role) VALUES (?,?,?);`;



export const getAllUsersQuery = `SELECT * FROM User ;`;
