import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

let entriesPath = `${__dirname}/../../data/entries.json`;
let usersPath = `${__dirname}/../../data/users.json`;

function checkCreateFile( path, callback) {
    try {
        fs.accessSync(path, fs.constants.F_OK);
        console.log( `File "${path}" exists` );
        callback();
    } catch (err) {
        console.log( `File "${path}" does not exist` );
        console.log(`\nCreating "${path}"`); 
        fs.writeFile(path, '[]','utf8', callback);
    }
};

function readAllData(path,callback) {
    checkCreateFile(path, (err)=> {
        if (err){
            console.log(err);
            callback([]);
        } else {
            fs.readFile(path, (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.error(`${path} doesnot exist`);
                        callback([]);
                    }
                } else {
                    callback(JSON.parse(data));
                }
                
            });
        }
    });
};

function findUsersByEmail( email, callback) {
    readAllData(usersPath, (users) => {
        callback(users.filter(o => o.email === email));
    });
};

let createUser = (req,res) => {
    readAllData(usersPath, (users) => {
        const newUser = {id:uuidv4(), ...req.body };
        users.push(newUser);
        fs.writeFile(usersPath, JSON.stringify(users, null, '\t'), (err) => {
            if (err) {
                res.status(500).json({
                    message: 'failed to write the user'
                });
            } else {
                const ret = (({id, name, email}) => ({id, name, email}))(newUser);
                res.status(201).json(ret);
            }
        });

    });

};


let createEntry = (req,res) => {
    readAllData(entriesPath, (entries) => {
        const newEntry = {id:uuidv4(), ...req.body };
        entries.push(newEntry);
        fs.writeFile(entriesPath, JSON.stringify(entries, null, '\t'), (err) => {
            if (err) {
                res.status(500).json({
                    message: 'failed to write the entry'
                });
            } else {
                res.status(201).json(newEntry);
            }
        });
    });
};



let readEntry = (req,res) => {
    readAllData(entriesPath, (entries) => {
        const ret = entries.find(o => o.id === req.params.id);
        if (undefined === ret) {
            res.status(404).json({
                message: `entry ${req.params.id} not found`
            });
        } else {
            res.status(200).json(ret);
        }
    });
    
};

let readAllEntries = (req,res) => {
    readAllData(entriesPath, (entries) => {
        res.status(200).json(entries); 
    });
    
};

export { createUser, createEntry, readEntry, readAllEntries, findUsersByEmail };