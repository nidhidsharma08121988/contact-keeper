const jwt = require('jsonwebtoken');
const config = require('config');

//AUTH MIDDLEWARE is fro PROTECTED routes

module.exports = function (req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');
    //check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        //once verified the payload is in decoded
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};