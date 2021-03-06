const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logeer = require('morgan');
const users = require('./controllerRoute.js');
const accs = require('./accRoutes.js');
const eHandler = require('errorhandler');
const cors = require('cors');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tasks');
// console.log(mongoose);
mongoose.Promise = global.Promise;
let jwt = require('jsonwebtoken');
app.set('secretKey', 'nodeRestApi');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logeer('dev'));
app.use(cors());

// app.get('/', function(req, res){
//     res.json({"tutorial" : "Build REST API with node.js"});
//     });

app.use('/users', users);

app.use('/accs',  accs);

// app.get('/favicon.ico', function(req, res) {
//     res.sendStatus(204);
// });

// function verifyToken(req, res, next) {
//     if (!req.headers.authorization) {
//         return res.status(401).send('Unauthorized Request')
//     }
//     let token = req.headers.authorization.split(' ')[1]
//     if (token == 'null') {
//         return res.status(401).send('Unauthorized Request')
//     }
//     let payload = jwt.verify(token, 'secretkey');
//     if (!payload) {
//         return res.status(401).send('Unauthorized request');
//     }
//     req.userId = payload.subject;
//     next();
// }

// function validateUser(req, res, next) {
//     jwt.verify(req.headers['x-access-token'],
//     req.app.get('secretKey'), (error, decode) => {
//         console.log(req.headers);
//         if(error) {
//             res.json({status: "error", message:error.message});
//         }
//         else {
//             req.body.userId = decode.userId;
//             next();
//         }
//     });
// }



// app.use(function(req, res, next) {
//     let err = new Error('Not Found');
//        err.status = 404;
//        next(err);
//    });
//    // handle errors
//    app.use(function(err, req, res, next) {
//     console.log(err);
    
//      if(err.status === 404)
//       res.status(404).json({message: "Not found"});
//      else 
//        res.status(500).json({message: "Something looks wrong :( !!!"});
//    });

app.use(eHandler());

app.listen(3000);


