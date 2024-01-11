import statusCodes from "http-status-codes";
import {badRequestOnly, notFoundReq, performSimpleOneQuery} from "./generic.js";
import {performQuery} from "../database/database.js";
import bcrypt from "bcrypt";

export function getAllUsers(req, res) {
    return badRequestOnly(req, res);
}

export function getAllUsernames(req, res) {
    performQuery('SELECT email FROM users')
        .then(data => {
            return res.status(200).json({usernames: data});
        })
}

export function getUserById(req, res) {
    return notFoundReq(req, res);
}

export async function postUser(req, res) {
    try {
        checkUserAttributes(req.body);
        await checkIfEmailExists(req.body.email);
    } catch (e) {
        return res.status(e.status).json({message: e.message});
    }
    req.body.password = await hashPassword(req.body.password);
    return badRequestOnly(req, res);
}

export async function updateUserPassword(req, res) {
    const userId = req.params.userid;
    const currentPassword = req.body.password;
    const newPassword = req.body.newPassword;

    const user = await performSimpleOneQuery("users", "GET", "userid", userId);

    if (!user[0]) {
        return res.status(404).json({error: 'User not found'});
    }
    bcrypt.compare(currentPassword, user[0].password, async (err, result) => {
        if (err) {
            return res.status(500).json({error: "Internal Server Error"});
        } else if (result) {
            req.body.password = await hashPassword(newPassword);
            delete req.body.newPassword;
            delete req.body.email;
            delete req.body.roleid;
            delete req.body.userid;
            return badRequestOnly(req, res);
        } else {
            return res.status(401).json({error: 'Password is wrong'})
        }
    })
}

export async function updateUserEmail(req, res) {
    const userId = req.params.userid;
    const user = await performSimpleOneQuery("users", "GET", "userid", userId);

    if (!user[0]) {
        return res.status(404).json({error: 'User not found'});
    }
    delete req.body.roleid;
    delete req.body.userid;
    return badRequestOnly(req, res);
}

export function deleteUserById(req, res) {
    return badRequestOnly(req, res);
}

function checkUserAttributes(user) {
    const errors = [];

    if (!('email' in user) || user.email === undefined || user.email === '') {
        errors.push('Required email attribute is missing');
    }

    if (!('password' in user) || user.password === undefined || user.password === '') {
        errors.push('Required password attribute is missing');
    }

    if (!('roleid' in user) || user.roleid === undefined || user.roleid === '') {
        errors.push('Required roleid attribute is missing');
    }

    if (errors.length > 0) {
        throw {
            message: errors,
            status: statusCodes.BAD_REQUEST
        };
    }
}

async function checkIfEmailExists(email) {
    const errors = [];

    const user = await performSimpleOneQuery("users", "GET", "email", email);
    if (user[0]) {
        errors.push('Email exists');
    }
    if (errors.length > 0) {
        throw {
            message: errors,
            status: 400
        };
    }
}

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (e) {
        throw e;
    }
}