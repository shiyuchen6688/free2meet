const mongoose = require('mongoose');

const subSchemaLocation = new mongoose.Schema({
    address_components: [{
        long_name: String,
        short_name: String,
        types: [String]
    }],
    adr_address: String,
    formatted_address: String,
    geometry: {
        location: {
            lat: Number,
            lng: Number
        }
    },
    icon: String,
    name: String,
    place_id: String,
    types: [String],
    url: String,
    lat: Number,
    lng: Number
});

const meetupSchema = new mongoose.Schema({
    timestamp: String,
    title: String,
    description: String,
    location: [subSchemaLocation],
    schedule: {
        schedule: [String],
        timezone: {
            value: String,
            label: String,
            offset: Number,
            abbrev: String,
            altName: String
        },
        startDate: String,
        selectionScheme: String,
        numDaysInput: Number,
        numDays: Number,
        hourlyChunkInput: Number,
        hourlyChunk: Number,
        timeInterval: [Number, Number]
    },
    invitees: [{
        email: String,
        username: String
    }],
    creator: {
        email: String,
        username: String
    },
    // PENDING - The invitation has been sent and is awaiting action by the invitee or inviter.
    // ACCEPTED - The invitation has been accepted by the invitee.
    // REJECTED - The invitation has been rejected by the invitee.
    // WITHDRAWN - The invitation has been withdrawn by the inviter.
    state: String
});

const Meetup = mongoose.model('Meetup', meetupSchema);

module.exports = Meetup;