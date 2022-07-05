const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    friends: [String], // array of emails of friends
    friendRequests: [String], // array of _id's of friends who have sent you a friend request
    friendRequestsSent: [String], // array of _id's of friends who have sent you a friend request
    meetupsCreated: [{
        meetupId: String,
        // PENDING - The invitation has been sent and is awaiting action by the invitees.
        // COMPLETED - The invitation has been either accepted or declined by all invitees and the best time has been calculated.
        state: String,
        bestLocation: String, // place_id of best location only if state is COMPLETED
        bestTime: [String] // best time to meetup only if state is COMPLETED
    }], // array of _id's of meetups you have created
    meetupsPending: [String], // array of _id's of meetups you have received an invitation to but have not yet accepted or declined
    meetupsAccepted: [{
        meetupId: String,
        availableLocations: [String], // array of place_id of locations you have selected
        availableTimeSlot: [String] // array of time slots you have selected
    }], // array of _id's of meetups you have accepted
    meetupsDeclined: [String], // array of _id's of meetups you have declined
});

const User = mongoose.model('User', userSchema);

module.exports = User;