import express from 'express';
import {checkUser,validate} from '../../middlewares/validation';
import {v4 as uuidv4} from 'uuid';
import * as data from '../../middlewares/data';

let router = express.Router();

router.post('/',checkUser, validate, (req,res) => {
    if (res.invalid.length === 0) {
        data.createUser(req,res);
    } else {
        res.status(400).json({
            message: "validation error",
            invalid: res.invalid
        });
    }
});

export default router;