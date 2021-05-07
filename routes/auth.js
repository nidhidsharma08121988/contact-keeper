const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('config');
const auth = require('../middleware/auth');

//@route GET api/auth
//@desc Get logged in user (to know which user is loggen in)
//@access Private (getting user which is logged in)
router.get('/', auth, async (req, res) => {
    try {
        //returns user details but we don't want password
        //req.user had id because we assigned it in middleware which is in the parameter of this request
        const user = await User.findById(req.user.id).select('-password');//mongoose method
        res.json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route POST api/auth (send data to get authenticated)
//@desc authenticate user and get token
//@access Public (purpose is to authenticate and get token to access private routes)
router.post('/',
    [
        check('email', 'Please enter valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ erros: errors.array() });
        const { email, password } = req.body;

        try {

            let user = await User.findOne({ email });
            if (!user)
                return res.status(400).json({ msg: "Invalid Credentials" });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).json({ msg: "Invalid Credentials" });

            const payload = {
                user: {
                    id: user.id
                }
            };

            const secret = config.get('jwtSecret');
            const objectOptions = {
                expiresIn: 3600000
            };
            const callbck = (err, token) => {
                if (err)
                    throw err;
                else
                    res.json({ token });
            };

            jwt.sign(payload, secret, objectOptions, callbck);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }

    });


module.exports = router;
