import statusCodes from "http-status-codes";
import * as userDb from '../database/user-database.js';

export function getAllUsers(req, res) {
    const users = userDb.getAllUsers();
    return res.status(statusCodes.OK).json(users);
}

export function getUserById(req, res) {
    const user = findUserById(req.params.id);
    return res.status(statusCodes.OK).json(user);
}

export function postUser(req, res) {
    const user = req.body;
    try {
        userDb.postUser(user);
        return res.status(statusCodes.CREATED).json(user);
    } catch (e) {
        return res.status(e.status).json({error: e.message});
    }
}

export function updateUser(req, res) {
    const userId = req.params.id;
    const user = findUserById(userId);
    const updatedUser = {
        userId: user.userId,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    };
    try {
        userDb.updateUserById(updatedUser);
        return res.status(statusCodes.OK).json(updatedUser);
    } catch (e) {
        return res.status(e.status).json({error: e.message})
    }
}

export function deleteUserById(req, res) {
    const userId = req.params.id;
    const user = findUserById(userId);
    userDb.deleteUserById(user.userId);
    return res.status(statusCodes.NO_CONTENT).json();
}

function findUserById(userId) {
    const id = Number(userId);

    if (isNaN(id)) {
        throw {status: statusCodes.BAD_REQUEST, message: 'Please provide a proper id'}
    }

    const user = userDb.getUserById(id);

    if (!user) {
        throw {status: statusCodes.NOT_FOUND, message: `User with ${id} id couldn't found`};
    }

    return user;
}