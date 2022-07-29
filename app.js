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

var app = express();

mongoose.connect('mongodb+srv://free2meet:free2meet@cluster0.ustzz.mongodb.net/?retryWrites=true&w=majority', {
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
// if (process.env.NODE_ENV === 'production') {
//     app.get(express.static(path.join(__dirname, 'frontend/build')));
// } else {
//     app.get(express.static(path.join(__dirname, 'public')));
//     // generate mock data for testing (users and meetups)
//     generateData();
// }
app.use(express.static(path.join(__dirname, 'frontend/build')));
// app.use(express.static(path.join(__dirname, 'frontend/public')));

app.use('/', indexRouter);
app.use('/meetups', meetupsRouter);
app.use('/users', userRouter);
app.use('/invitations', invitationsRouter);

// if (process.env.NODE_ENV === 'production') {
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
//     });
// }
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'frontend/build/index.html'));
});

module.exports = app;
