import jwt from 'jsonwebtoken';

export function isLoggedIn(req, res, next) {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) {
            return res.status(401).json({error: 'Unauthorized'});
        }
        req.user = user;
        next();
    });
}

export function isAdmin(req, res, next) {
    if (req.user && req.user.role == 'Admin') {
        next();
    } else {
        res.status(403).json({error: 'Permission denied'});
    }
}

export function isDeveloper(req, res, next) {
    if (req.user && req.user.role == 'Developer') {
        next();
    } else {
        res.status(403).json({error: 'Permission denied'});
    }
}

export function isTester(req, res, next) {
    if (req.user && req.user.role == 'Tester') {
        next();
    } else {
        res.status(403).json({error: 'Permission denied'});
    }
}