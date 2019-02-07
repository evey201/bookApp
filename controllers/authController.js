const User = require('../server/models/user');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

//SignUp controller
exports.signup = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.create({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        name:req.body.name
    })
    
    return res.status(201   ).json({success: true, message: 'User Succesfully created'})


};

//signUp Validation
exports.signUpValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value,  { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-mail address already exists');
                }
            });
        })
        .normalizeEmail(),

    body('password')
        .trim()
        .isLength({ min: 5 }),

    body('name')
        .trim()
         .not()
        .isEmpty()
] 