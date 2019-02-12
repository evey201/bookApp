const User = require('../server/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

//SignUp controller
exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
    
        await User.create({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            name:req.body.name
        })
        
        return res.status(201).json({success: true, message: 'User Succesfully created'})
        
    } catch (error) {
        return res.status(500).json({ error });

    }
    


};

//signUp Validation
exports.signUpValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value,  { req }) => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
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

//loggingIn controller
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                const Error = new Error('A user with this email could not be found');
                err.statusCode = 400;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        }).then(isEqual => {
            if (!isEqual) {
                const Error = new Error('Password is does not match the User');
                err.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                email: loadedUser.email, 
                name: loadedUser.name,
                userId: loadedUser._id.toString()
                }, 
                    'secret', 
                    { expiresIn: '1h'}
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString(), name: loadedUser.name });
        })
        .catch(err => {
            if (!err.status) {
                err.statusCode = 500;
            }
            next(err);
        });

    //Delete COntroller
    exports.deleteUser = async(req, res) => {
        const deleteUserId = req.params.id;
        console.log('ID ==> ', deleteUserId);
        if (!ObjectID.isValid(deleteUserId)) {
            console.log('not found!!');
            return res.status(404).send();
        }

        User.findOneAndDelete(deleteUserId).exec().then(() => {
            return res.json('User Deleted Successfully!');
        }).catch(error => {
            console.log('Error:: ', error);
        });
    }

    

}

