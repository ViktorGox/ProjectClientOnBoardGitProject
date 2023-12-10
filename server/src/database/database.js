import Database from "better-sqlite3";
import * as queries from './query.js';


let user1 = {
    username: "manager",
    password: "$2a$12$vPgvMP7LFoFk0sGWJ.o0..f9xgtVZJtlUSqzAJDPJAC4jBHrUBqD6",
    //manager
    role: "Manager"
}

let user2 = {
    username: "tester",
    password: "$2a$12$B8uneEk97kFijTp/9SoZPOrmuKjTuwC4STOHEtDLKBjzOSEwF4sWG",
    //tester
    role: "Tester"
}

let users = [];
users.push(user1);
users.push(user2);

let db;
export function createDatabase() {
    try {
        db = new Database("database.sqlite");

        db.prepare(queries.dropUserTable).run();

        db.prepare(queries.createUserTableQuery).run();

        insertUsers();

    } catch (e) {
        console.error('Error while initializing database!', e);
        throw e;
    }
}

export function getAllUsers() {
    try {
        return db.prepare(queries.getAllUsersQuery).all();
    } catch (e) {
        console.error("Error while getting all users: ", e);
        return [];
    }
}

function insertUsers() {
    const insert = db.prepare(queries.insertUserQuery);

    for (const user of users) {
        insert.run(user.username, user.password, user.role);
    }
}
