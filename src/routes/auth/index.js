import express from 'express';
import {checkAuth,validate} from '../../middlewares/validation';
import {issueToken} from '../../middlewares/authentication';

let router = express.Router();
router.post('/', checkAuth, validate, (req,res) => {
    if (res.invalid.length === 0) {
        issueToken(req,res);
    } else {
        res.status(401).json({
            message: "incorrect credentials provided"
        });
    }
});

export default router;