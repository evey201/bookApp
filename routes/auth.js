const express = require('express');
const { body } = require('epress-validator/check');
const router = express.Router();
const authController = require('../controllers/authUser/');

const User = require('../models/user');
router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, { req }) => {
        return User.findone({email: value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail address already exists');
            }
        });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min: 5}),
    body('name')
    .trim()
    .not()
    .isEmpty()
], authController.signup
);

module.exports = router;