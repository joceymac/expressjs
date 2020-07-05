import jwt from 'jsonwebtoken';
import * as data from './data';

const config = require('../config')();

let issueToken = (req,res) => {
    const { email, password } = req.body;
    if ( email && password) {
        data.findUsersByEmail(email, (users) => {
            const user = users.find( u => u.password === password );
            if ( undefined === user ) {
                res.status(401).json({
                    message: "incorrect credentials provided"
                });
            } else {
                res.status(200).json({
                    "token": jwt.sign({
                        email, 
                        name: user.name, 
                        exp: Math.floor(Date.now() / 1000) + config.sessionLifetimeSec
                    },config.accessTokenSecret)
                });
            }
        });
        
    } else {
        res.status(401).json({
            message: "incorrect credentials provided"
        });
    }
    
};

let checkAuth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.accessTokenSecret, (err,user) => {
            if(err) {
                if (err.name == 'TokenExpiredError') {
                    return res.status(403).json({
                        message: "token expired"
                    });
                } else {
                    return res.status(403).json({
                        message: "token not provided"
                    });
                }
                
            }
            req.user = user;
            next();
        });
    } else {
        res.status(403).json({
            message: "token not provided"
        });
    }
};


export {issueToken, checkAuth};