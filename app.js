//https://github.com/rahman-aarish19/student-management-system ,for more detail search url 
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require("cors");
const mongoose = require('mongoose');
const passport = require('passport');
const { jwtStrategy } = require('./src/config/passport');
const { authLimiter } = require('./src/middlewares/rateLimiter');
const ApiError = require('./src/utils/ApiError');
const path = require('path');
const httpStatus = require('http-status');
// const config = require('./src/config/config');
// const morgan = require('./src/config/morgan');
require('dotenv').config();

// Load Routes
const routes = require('./src/routes/v1');
//const { errorConverter, errorHandler } = require('./src/middlewares/error');



const app = express();


// Connecting to MongoDB...
const db_url = process.env.MONGODB_URL;
mongoose.connect(`${db_url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log('Connected to MongoDB Server...') }).catch(err => console.error('Error occured connecting to MongoDB...', err));

// if (config.env !== 'test') {
//     app.use(morgan.successHandler);
//     app.use(morgan.errorHandler);
// }

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());


// enable cors
app.use(cors());
app.options('*', cors());

//jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//     app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use('/v1', routes);

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
//app.use(errorConverter);

// handle error
//app.use(errorHandler);


// Listening on Port:8080
//const port = process.env.port || 3000;
const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => {
    console.log(`Listening to port : ${port}`)
});

module.exports = app;