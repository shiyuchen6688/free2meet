const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    friends: [String], // array of _id's of friends
    acceptedMeetups: [String] // array of _id's of meetups
});

const User = mongoose.model('User', userSchema);

module.exports = User;