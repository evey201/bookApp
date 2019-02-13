const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const {signup, signUpValidation, login, deleteUser} = require('../controllers/authController');

const User = require('../server/models/user');

router.post('/signup', signUpValidation, 
    signup
);

router.post('/login', login );

//router.delete('/users/:id', deleteUser );

module.exports = router;