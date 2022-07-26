const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String, // Primary key
    username: String,
    password: String,
    friends: [String], // array of emails of friends
    friendRequests: [String], // array of emails of friends who have sent a friend request to the user
    friendRequestsSent: [String], // array of emails of friends the user has sent a friend request to
    meetupsCreated: [String], // array of id's of meetups the user have created
    meetupsPending: [String], // array of id's of meetups the user have received an invitation to but have not yet accepted or declined
    meetupsAccepted: [{
        meetupId: String, // Foreign key
        availableLocations: [String], // array of place_id of locations the user have selected
        availableTimeSlot: [String] // array of time slots the user have selected
    }], // array of id's of meetups the user have accepted
    meetupsDeclined: [String], // array of id's of meetups the user have declined
});

const User = mongoose.model('User', userSchema);

module.exports = User;