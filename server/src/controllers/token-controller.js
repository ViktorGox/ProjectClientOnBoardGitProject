import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userDb from "../database/user-database.js";

export function checkToken(req, res) {
    const givenUsername = req.body.username;
    const givenPassword = req.body.password;

    let foundUser = getUser(givenUsername);

    if (!foundUser) {
        return res.status(404).json({error: 'Username could not found'})
    }

    const storedPassword = foundUser.password;

    checkPassword(givenPassword, storedPassword, foundUser, res);
}

function getUser(givenUsername) {
    const allUsers = userDb.getAllUsers();

    let foundUser;
    for (const user of allUsers) {
        if (user.username === givenUsername) {
            foundUser = user;
            break;
        }
    }
    return foundUser;
}

function checkPassword(givenPassword, storedPassword, user, res) {
    bcrypt.compare(givenPassword, storedPassword, function (err, result) {
        if (err) {
            return res.status(500).json({error: 'Internal server error'});
        } else if (result) {
            createToken(user, res);
        } else {
            return res.status(401).json({error: 'Invalid password'});
        }
    });
}

function createToken(user, res) {
    jwt.sign({
        username: user.username,
        role: user.role
    }, 'secretKey', {expiresIn: '12h'}, (err, token) => {
        if (err) {
            return res.status(500).json({error: 'Token generation failed'});
        } else {
            console.log("Token generation is successful");
            return res.status(200).json({token});
        }
    });
}

