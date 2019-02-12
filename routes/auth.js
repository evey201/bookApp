const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const {signup, signUpValidation, login, deleteBook} = require('../controllers/authController');

const User = require('../server/models/user');

router.put('/signup', signUpValidation, 
    signup
);

router.post('/login', login );

router.deleteBook('/book/:id', deleteBook);

module.exports = router;