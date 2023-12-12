import Database from "better-sqlite3";
import * as queries from './query.js';
import * as userDb from './user-database.js';


let db;

export function createDatabase() {
    try {
        db = new Database("database.sqlite");

        //Delete all data and start with the dummy data again.
        //We can change it later but for now lez work on with only dummy data.
        db.prepare(queries.dropUserTable).run();

        db.prepare(queries.createUserTableQuery).run();

        userDb.createUsers();
    } catch (e) {
        console.error("Error while initializing database", e);
        throw e;
    }
}
