const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const {signup, signUpValidation} = require('../controllers/authController');

const User = require('../server/models/user');

router.put('/signup', signUpValidation, 
    signup
);

module.exports = router;