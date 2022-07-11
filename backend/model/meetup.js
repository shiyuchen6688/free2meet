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
    lng: Number
});

const meetupSchema = new mongoose.Schema({
    id: String, // Primary key
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
    invitees: [String], // array of emails of invitees
    creator: String, // email of creator
    // PENDING - The invitation has been sent and is awaiting action by the invitees.
    // COMPLETED - The invitation has been either accepted or declined by all invitees and the best time has been calculated.
    state: String,
    bestLocation: String, // place_id of best location only if state is COMPLETED
    bestTime: [String] // best time to meetup only if state is COMPLETED
});

const Meetup = mongoose.model('Meetup', meetupSchema);

module.exports = Meetup;