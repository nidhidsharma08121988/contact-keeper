const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('config');

//add middleware to server.js to use req.body
//earlier body parser now available in express

//@route POST api/users
//@desc Register a user
//@access Public (you are creating)
router.post(
  '/',
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ erros: errors.array() });

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) return res.status(400).json({ msg: 'User already exist' });
      //if user not already present then assign user to new User module
      user = new User({
        name,
        email,
        password,
      });
      //create salt which will hash the password
      const salt = await bcrypt.genSalt(10);
      //assign the password to encrypted password
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //to sign-in user we need to generate jwt token
      //step 1: create payload
      const payload = {
        user: {
          id: user.id,
        },
      };
      //step 2: get jwt secret
      const secret = config.get('jwtSecret');
      //step 3: options
      const objectOptions = {
        expiresIn: 3600000, //ideally must be 3600sec= an hour
      };
      //step 4: callback
      const callbck = (err, token) => {
        if (err) throw err;
        else res.json({ token });
      };
      //sign 5. call jwtSign with the above parameters
      jwt.sign(payload, secret, objectOptions, callbck);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
