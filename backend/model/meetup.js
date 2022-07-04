const mongoose = require('mongoose');

const subSchemaAddressComponents = new mongoose.Schema({
    long_name: String,
    short_name: String,
    types: [String]
});

const subSchemaInvitees = new mongoose.Schema({
    email: String,
    username: String
});

const subSchemaLocation = new mongoose.Schema({
    address_components: [subSchemaAddressComponents],
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
    invitees: [subSchemaInvitees],
    creator: {
        email: String,
        username: String
    }
});

const Meetup = mongoose.model('Meetup', meetupSchema);

module.exports = Meetup;