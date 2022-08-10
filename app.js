var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
var generateData = require('./generate-data');

var indexRouter = require('./routes/index');
var meetupsRouter = require('./routes/meetups');
var userRouter = require('./routes/users');
var invitationsRouter = require('./routes/invitations');
var scheduleMeetupRouter = require('./routes/scheduleMeetup');

var app = express();

var verifyJWT = require("./middlewares/auth")

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB: ', err.message);
});

// Enable Cors
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use('/', indexRouter);
app.use('/schedule', scheduleMeetupRouter);
app.use('/meetups', verifyJWT, meetupsRouter);
app.use('/users', userRouter);
app.use('/invitations', verifyJWT, invitationsRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

module.exports = app;
