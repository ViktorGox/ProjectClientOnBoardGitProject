import * as queries from './query/user-query.js'
import statusCodes from "http-status-codes";
import {performQuery} from "./database.js";

export function getAllUsers() {
    return performQuery(queries.getAllUsersQuery)
        .then(result => result.rows)
        .catch(() => {
            throw {
                status: statusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            };
        });
}

export function getUserById(userId) {
    return performQuery(queries.getUserById, [userId])
        .then(result => result.rows[0])
        .catch(() => {
            throw {
                status: statusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            };
        })
}

export function postNewUser(newUser) {
    const {email, role, password} = newUser;
    checkUserAttributes(newUser);

    return performQuery(queries.createNewUser, [email, role, password])
        .then(result => result.rows[0])
        .catch(error => {
            throw error;
        })
}

export function updateUser(userData) {
    const {email, role, password, userid} = userData;

    return performQuery(queries.updateUser, [
        email,
        role,
        password,
        userid,
    ])
        .then(result => {
            if (result.rowCount === 0) {
                throw {
                    status: statusCodes.NOT_FOUND,
                    message: `User with ${userid} id not found`
                };
            }
            return result.rows[0];
        })
        .catch(error => {
            throw error;
        });
}

export function deleteUserById(userId) {
    return performQuery(queries.deleteUser, [userId])
        .then(result => {
            if (result.rowCount === 0) {
                throw {
                    status: statusCodes.NOT_FOUND,
                    message: `User with ${userid} id not found`
                };
            }

            return result.rows[0];
        })
        .catch(() => {
            throw {
                status: statusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            };
        });
}

function checkUserAttributes(user) {
    const errors = [];

    if (!('email' in user) || user.email == undefined || user.email == '') {
        errors.push('Required email attribute is missing');
    }

    if (!('role' in user) || user.role == undefined || user.role == '') {
        errors.push('Required role attribute is missing');
    }

    if (!('password' in user) || user.password == undefined || user.password == '') {
        errors.push('Required password attribute is missing');
    }

    if (errors.length > 0) {
        throw {
            message: errors,
            status: statusCodes.BAD_REQUEST
        };
    }
}