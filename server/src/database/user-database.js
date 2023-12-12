import * as queries from './query.js';
import Database from "better-sqlite3";
import statusCodes from "http-status-codes";

let db = new Database('database.sqlite');

export function createUsers() {
    let user1 = {
        username: "admin",
        password: "$2a$12$vsDm8ca0k/BhR/FiCVJn3.dUoUMw2.x64T2PmgAAnfvFI7pUA.FrC",
        //password: admin
        role: "Admin"
    }

    let user2 = {
        username: "developer",
        password: "$2a$12$JtIJIApdrVJL3KKctEERJOXfMc2bXzawugrLoeUllGERgDOm6IuuS",
        //password: developer
        role: "Developer"
    }

    let user3 = {
        username: "tester",
        password: "$2a$12$Tx9Ny6wMjMLtjEmG52/k1OSveL7ZHY7oBfbeQy22hUQM4hLC5Yscy",
        //password: tester
        role: "Tester"
    }

    let users = [];
    users.push(user1);
    users.push(user2);
    users.push(user3);

    const insert = db.prepare(queries.insertUserQuery);

    for (const user of users) {
        insert.run(user.username, user.password, user.role);
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

export function getUserById(id) {
    return db.prepare(queries.getUserById).get(id);
}

export function postUser(newUser) {
    checkUserAttributes(newUser);
    return db.prepare(queries.insertUserQuery).run(newUser.username, newUser.password, newUser.role);
}

export function updateUserById(user) {
    checkUserAttributes(user);

    if (isIdExist(user.userId)) {
        return db.prepare(queries.updateUser).run(user.username, user.password, user.role, user.userId);
    } else {
        throw {
            message: `Error while updating user with ${user.userId}`,
            status: statusCodes.BAD_REQUEST
        };
    }
}

export function deleteUserById(userId) {
    return db.prepare(queries.deleteUser).run(userId);
}

function checkUserAttributes(user) {
    const errors = [];

    if (!('username' in user) || user.username == undefined || user.username == '') {
        errors.push('Required username attribute is missing');
    }

    if (!('password' in user) || user.password == undefined || user.password == '') {
        errors.push('Required password attribute is missing');
    }

    if (!('role' in user) || user.role == undefined || user.role == '') {
        errors.push('Required role attribute is missing');
    }

    if (errors.length > 0) {
        throw {
            message: errors,
            status: statusCodes.BAD_REQUEST
        };
    }
}

function isIdExist(userId) {
    const allUsers = getAllUsers();
    for (const user of allUsers) {
        if (user.userId == userId) {
            return true;
        }
    }
    return false;
}
