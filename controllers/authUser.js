import User from '../models/user';

const { ValidationResult } = require('express-validator/check');

exports.signup = (req, res, next) => {
    const errors = ValidationResult(req);
    if (!errors.isEmpty()) {
        var error = new Error('Validation Failed.');
        error.statusCode = 422,
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    
};