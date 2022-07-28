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
    place_id: String, // Primary key
    types: [String],
    url: String,
    lat: Number,
    lng: Number,
    attendees: [String]
});

const meetupSchema = new mongoose.Schema({
    id: String, // Primary key
    timestamp: String,
    title: String,
    description: String,
    location: [subSchemaLocation],
    schedule: {
        schedule: Object,
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
    invitees: [String], // emails of invitees
    tags: [String], // tags of meetup
    creator: String, // email of creator
    // PENDING - The invitation has been sent and is awaiting action by the invitees.
    // COMPLETED - The invitation has been either accepted or declined by all invitees and the best time has been calculated.
    // DONE - The creator marks the invitation as done.
    state: String,
    bestLocation: [], // locations that are the best for the meetup
    bestTime: [String], // best times for the meetup
    meetupImage: String // the URL to the meetup's image. Optional. 
});

const Meetup = mongoose.model('Meetup', meetupSchema);

module.exports = Meetup;