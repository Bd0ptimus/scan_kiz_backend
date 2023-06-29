import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
// import expressValidator from 'express-validator';

import cors from 'cors';
const db = require("./models");
import nodemailer from 'nodemailer';
// const cors = require('cors');


dotenv.config();// required for running process.env.PORT
let app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/product-images', express.static('uploads/products'));
app.use('/request-files', express.static('uploads/requests'));

// app.use(cors({ origin: true }));
// Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
//config app
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(expressValidator());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 3005;
app.listen(port, () => {
    // console.log('Limit file size: ' + limit);
    console.log('backend is running : ' + port);
})

