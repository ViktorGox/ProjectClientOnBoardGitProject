import Database from "better-sqlite3";
import * as queries from './query.js';


let user1 = {
    username: "manager",
    password: "$2a$12$vPgvMP7LFoFk0sGWJ.o0..f9xgtVZJtlUSqzAJDPJAC4jBHrUBqD6",
    role: "Manager"
}

let user2 = {
    username: "tester",
    password: "$2y$10$v5zXyAfhIyf1RJBnMutY2Ouwatf.KTW8IOy0L512BzFFjm3ocmjCy",
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
