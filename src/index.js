
"strict mode";
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const config = require('./config')();
const app = express();
const port = process.env.PORT || 3000;
var cors = require('cors')

// app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Prefer");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
	next();
});

app.use((err, req, res, next) => {
    if (err) {
      console.log('Invalid Request data');
      res.status(400).send({message: 'invalid request data'});
    } else {
      next();
    }
});

app.use(config.baseUrl, routes);

// Response "Not Found" with customized message
app.use((req, res, next) => {
    res.status(404).json({message: "not found"});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))