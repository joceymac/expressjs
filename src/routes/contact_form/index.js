import express from 'express';
import {checkContact,validate} from '../../middlewares/validation';
import {checkAuth} from '../../middlewares/authentication';
import * as data from '../../middlewares/data';

let router = express.Router();

router.post('/entries', checkContact, validate, (req,res) => {
    if (res.invalid.length === 0) {
        data.createEntry(req,res);
    } else {
        res.status(400).json({
            message: "validation error",
            invalid: res.invalid
        });
    }
    
});

router.get('/entries', checkAuth, (req,res) => {
    data.readAllEntries(req,res);
});

router.get('/entries/:id', checkAuth, (req,res) => {
    data.readEntry(req,res);
});

export default router;