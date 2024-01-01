import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {performSimpleOneQuery} from "./generic.js";

export async function checkToken(req, res) {
    const givenEmail = req.body.email;
    const givenPassword = req.body.password;

    try {
        const foundUser = await getUser(givenEmail);
        if (!foundUser) {
            return res.status(404).json({ error: 'Username not found' });
        }

        const storedPassword = foundUser.password;
        checkPassword(givenPassword, storedPassword, foundUser, res);
    } catch (error) {
        console.error('Error checking token:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUser(givenEmail) {
    try {
        return performSimpleOneQuery('users','GET','email',givenEmail)
            .then((result) => {
                if(result.length === 0) return false;
                return result[0];
            });
    } catch (error) {
        throw error;
    }
}

function checkPassword(givenPassword, storedPassword, user, res) {
    bcrypt.compare(givenPassword, storedPassword, function (err, result) {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        } else if (result) {
            createToken(user, res);
        } else {
            return res.status(401).json({ error: 'Invalid password' });
        }
    });
}

function createToken(user, res) {
    jwt.sign({
        username: user.username,
        role: user.role
    }, 'secretKey', { expiresIn: '12h' }, (err, token) => {
        if (err) {
            return res.status(500).json({ error: 'Token generation failed' });
        } else {
            console.log("Token generation is successful");
            return res.status(200).json({ token });
        }
    });
}
