const mongoose = require('mongoose');

const subSchemaTagAndDetails = new mongoose.Schema({
    tag: String,
    details: [String],
    count: Number,
});

const userSchema = new mongoose.Schema({
    email: String, // Primary key
    username: String,
    password: String,
    friends: [String], // emails of friends
    friendRequests: [String], // emails of friends who have sent a friend request to the user
    friendRequestsSent: [String], // emails of friends the user has sent a friend request to
    meetupsCreated: [String], // id's of meetups the user have created
    meetupsPending: [String], // id's of meetups the user have received an invitation to but have not yet accepted or declined
    meetupsAccepted: [{
        meetupId: String, // Foreign key
        availableLocations: [String], // place_id of locations the user have selected
        availableTimeSlot: [String] // time slots the user have selected
    }], // id's of meetups the user have accepted with the locations and time slots they have selected
    meetupsDeclined: [String], // id's of meetups the user have declined
    tags: [subSchemaTagAndDetails], // tags of meetups the user have created,
    countFromPreviousTraining: Number, // number of new meetups the user has created since the last training
    model: String, // The NLP model used to classify tags
});

const User = mongoose.model('User', userSchema);

module.exports = User;