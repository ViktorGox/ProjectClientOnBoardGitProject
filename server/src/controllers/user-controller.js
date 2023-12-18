import statusCodes from "http-status-codes";
import * as userDb from '../database/user-database.js';

export function getAllUsers(req, res) {
    userDb.getAllUsers()
        .then(users => {
            return res.status(statusCodes.OK).json(users);
        })
        .catch(() => {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
        });
}

export function getUserById(req, res) {
    const userId = req.params.id;

    findUserById(userId)
        .then(user => {
            return res.status(statusCodes.OK).json(user);
        })
        .catch(() => {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
        });
}

export function postUser(req, res) {
    const newUser = req.body;

    try {
        userDb.postNewUser(newUser)
            .then(newUser => {
                return res.status(statusCodes.CREATED).json(newUser);
            })
            .catch(() => {
                return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
            });
    } catch (error) {
        return res.status(error.status).json({message: error.message})
    }

}

export function updateUser(req, res) {
    const userId = req.params.id;

    findUserById(userId)
        .then(existingUser => {
            const updatedUser = { ...existingUser, ...req.body };
            return userDb.updateUser(updatedUser);
        })
        .then(updatedUser => {
            return res.status(statusCodes.OK).json(updatedUser);
        })
        .catch(() => {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        });
}

export function deleteUserById(req, res) {
    const userId = req.params.id;
    findUserById(userId)
        .then(existingUser => {
            return userDb.deleteUserById(existingUser.userid);
        })
        .then(() => {
            return res.status(statusCodes.NO_CONTENT).json();
        })
        .catch(error => {
            return res.status(error.status).json({message: error.message});
        });
}

function findUserById(userId) {
    const id = Number(userId);

    if (isNaN(id)) {
        throw {status: statusCodes.BAD_REQUEST, message: 'Please provide a proper id'}
    }

    return userDb.getUserById(userId)
        .then(user => {
            if (!user) {
                throw {
                    status: statusCodes.NOT_FOUND,
                    message: `User with ${userId} couldn't found`
                };
            }
            return user;
        })
        .catch(error => {
            throw {
                status: error.status,
                message: error.message
            }
        });
}