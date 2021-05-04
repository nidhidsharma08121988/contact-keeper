const express = require('express');
const router = express.Router();

//@route GET api/auth
//@desc Get logged in user (to know which user is loggen in)
//@access Private (getting user which is logged in)
router.get('/', (req, res) => {
    res.send('Get logged in user');
});

//@route POST api/auth (send data to get authenticated)
//@desc authenticate user and get token
//@access Public (purpose is to authenticate and get token to access private routes)
router.post('/', (req, res) => {
    res.send('Login user');
});


module.exports = router;
