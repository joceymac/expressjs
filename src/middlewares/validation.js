
import {check, validationResult} from 'express-validator';
const config = require('../config')();

const checkContact = 
[
    check('name','name').notEmpty(),
    check('email','email').isEmail(),
    check('phoneNumber','phoneNumber').isNumeric(),
    check('content','content').notEmpty()
];

const checkUser = [
    check('name','name').notEmpty(),
    check('password','password').isLength({min: config.minPasswordLength}),
    check('email','email').isEmail()
];

const checkAuth = [
    // Include email and password check during auth in order to avoid unnecessary DB cost
    check('email','email').isEmail(),
    check('password','password').isLength({min: config.minPasswordLength})
];

const validate = (req, res, next) => {
    const errors  = validationResult(req) ;
    res.invalid = errors.isEmpty() ? [] : errors.array().map( (err) =>  {return err.msg});
    console.log(res.invalid);
    next();
};



export {checkContact,checkUser, checkAuth, validate};