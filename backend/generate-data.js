const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const Meetup = require('./model/meetup');
const User = require('./model/user');

async function generateData() {
    // query to delete all in meetups collection 
    await Meetup.deleteMany({});
    // query to delete all in users collection
    await User.deleteMany({});

    // generate ids for meetups
    const party1Id = uuid();
    const party2Id = uuid();
    const party3Id = uuid();

    // generate passwords for users
    const passwordForQ = await bcrypt.hash('q', 10);
    const passwordForA = await bcrypt.hash('b', 10);
    const passwordForC = await bcrypt.hash('c', 10);
    const passwordForD = await bcrypt.hash('d', 10);
    
    // create users
    const users = [
        {
            username: 'q',
            email: 'q',
            password: passwordForQ,
            friends: ["a", "c"],
            friendRequests: [],
            friendRequestsSent: ["d"],
            meetupsCreated: [party3Id],
            meetupsPending: [party1Id],
            meetupsAccepted: [],
            meetupsDeclined: []
        },
        {
            username: 'a',
            email: 'a',
            password: passwordForA,
            friends: ["q", "d"],
            friendRequests: [],
            friendRequestsSent: [],
            meetupsCreated: [party1Id],
            meetupsPending: [party3Id, party2Id],
            meetupsAccepted: [],
            meetupsDeclined: []
        },
        {
            username: 'c',
            email: 'c',
            password: passwordForC,
            friends: ["q"],
            friendRequests: [],
            friendRequestsSent: [],
            meetupsCreated: [],
            meetupsPending: [],
            meetupsAccepted: [],
            meetupsDeclined: []
        },
        {
            username: 'd',
            email: 'd',
            password: passwordForD,
            friends: ["a"],
            friendRequests: ["q"],
            friendRequestsSent: [],
            meetupsCreated: [party2Id],
            meetupsPending: [party1Id],
            meetupsAccepted: [],
            meetupsDeclined: []
        }
    ];

    // create meetups
    const meetups = [
        {
            id: party3Id,
            timestamp: Date.now(),
            "title": "Party 3",
            "description": "a description of party 3...",
            "location": [
                {
                    "address_components": [
                        {
                            "long_name": "Vancouver",
                            "short_name": "Vancouver",
                            "types": [
                                "locality",
                                "political"
                            ]
                        },
                        {
                            "long_name": "UBC",
                            "short_name": "UBC",
                            "types": [
                                "neighborhood",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Greater Vancouver A",
                            "short_name": "Greater Vancouver A",
                            "types": [
                                "administrative_area_level_3",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Metro Vancouver",
                            "short_name": "Metro Vancouver",
                            "types": [
                                "administrative_area_level_2",
                                "political"
                            ]
                        },
                        {
                            "long_name": "British Columbia",
                            "short_name": "BC",
                            "types": [
                                "administrative_area_level_1",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Canada",
                            "short_name": "CA",
                            "types": [
                                "country",
                                "political"
                            ]
                        },
                        {
                            "long_name": "V6T 1Z4",
                            "short_name": "V6T 1Z4",
                            "types": [
                                "postal_code"
                            ]
                        }
                    ],
                    "adr_address": "<span class=\"locality\">Vancouver</span>, <span class=\"region\">BC</span> <span class=\"postal-code\">V6T 1Z4</span>, <span class=\"country-name\">Canada</span>",
                    "formatted_address": "Vancouver, BC V6T 1Z4, Canada",
                    "geometry": {
                        "location": {
                            "lat": 49.26060520000001,
                            "lng": -123.2459939
                        }
                    },
                    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png",
                    "name": "The University of British Columbia",
                    "place_id": "ChIJAx7UL8xyhlQR86Iqc-fUncc",
                    "types": [
                        "university",
                        "point_of_interest",
                        "establishment"
                    ],
                    "url": "https://maps.google.com/?cid=14383886875425940211",
                    "lat": 49.26060520000001,
                    "lng": -123.2459939
                }
            ],
            "schedule": {
                "schedule": [
                    "2022-06-24T15:00:00.000Z",
                    "2022-06-24T16:00:00.000Z",
                    "2022-06-24T17:00:00.000Z",
                    "2022-06-24T18:00:00.000Z",
                    "2022-06-24T19:00:00.000Z",
                    "2022-06-24T20:00:00.000Z",
                    "2022-06-24T21:00:00.000Z",
                    "2022-06-24T22:00:00.000Z",
                    "2022-06-24T23:00:00.000Z",
                    "2022-06-25T00:00:00.000Z",
                    "2022-06-25T15:00:00.000Z",
                    "2022-06-25T16:00:00.000Z",
                    "2022-06-25T17:00:00.000Z",
                    "2022-06-25T18:00:00.000Z",
                    "2022-06-25T19:00:00.000Z",
                    "2022-06-25T20:00:00.000Z",
                    "2022-06-25T21:00:00.000Z",
                    "2022-06-25T22:00:00.000Z",
                    "2022-06-25T23:00:00.000Z",
                    "2022-06-26T00:00:00.000Z",
                    "2022-06-26T15:00:00.000Z",
                    "2022-06-26T16:00:00.000Z",
                    "2022-06-26T17:00:00.000Z",
                    "2022-06-26T18:00:00.000Z",
                    "2022-06-26T19:00:00.000Z",
                    "2022-06-26T20:00:00.000Z",
                    "2022-06-26T21:00:00.000Z",
                    "2022-06-26T22:00:00.000Z",
                    "2022-06-26T23:00:00.000Z",
                    "2022-06-27T00:00:00.000Z",
                    "2022-06-27T15:00:00.000Z",
                    "2022-06-27T16:00:00.000Z",
                    "2022-06-27T17:00:00.000Z",
                    "2022-06-27T18:00:00.000Z",
                    "2022-06-27T19:00:00.000Z",
                    "2022-06-27T20:00:00.000Z",
                    "2022-06-27T21:00:00.000Z",
                    "2022-06-27T22:00:00.000Z",
                    "2022-06-27T23:00:00.000Z",
                    "2022-06-28T00:00:00.000Z",
                    "2022-06-28T15:00:00.000Z",
                    "2022-06-28T16:00:00.000Z",
                    "2022-06-28T17:00:00.000Z",
                    "2022-06-28T18:00:00.000Z",
                    "2022-06-28T19:00:00.000Z",
                    "2022-06-28T20:00:00.000Z",
                    "2022-06-30T15:00:00.000Z",
                    "2022-06-30T16:00:00.000Z",
                    "2022-06-30T17:00:00.000Z",
                    "2022-06-30T18:00:00.000Z",
                    "2022-06-30T19:00:00.000Z",
                    "2022-06-30T20:00:00.000Z",
                    "2022-06-30T21:00:00.000Z",
                    "2022-06-30T22:00:00.000Z",
                    "2022-06-30T23:00:00.000Z",
                    "2022-07-01T00:00:00.000Z"
                ],
                "timezone": {
                    "value": "Pacific/Honolulu",
                    "label": "(GMT-10:00) Hawaii",
                    "offset": -10,
                    "abbrev": "HAST",
                    "altName": "Hawaii-Aleutian Standard Time"
                },
                "startDate": "2022-06-24T21:03:51.318Z",
                "selectionScheme": "linear",
                "numDaysInput": 7,
                "numDays": 7,
                "hourlyChunkInput": 1,
                "hourlyChunk": 1,
                "timeInterval": [
                    8,
                    18
                ]
            },
            "invitees": [
                {
                    "email": "a",
                    "username": "a"
                }
            ],
            "creator": {
                "email": "q",
                "username": "q"
            },
            state: "PENDING",
            bestLocation: null,
            bestTime: null
        },
        {
            id: party2Id,
            timestamp: Date.now(),
            "title": "Party 2",
            "description": "a description of party 2...",
            "location": [
                {
                    "address_components": [
                        {
                            "long_name": "8888",
                            "short_name": "8888",
                            "types": [
                                "street_number"
                            ]
                        },
                        {
                            "long_name": "University Dr",
                            "short_name": "University Dr",
                            "types": [
                                "route"
                            ]
                        },
                        {
                            "long_name": "Burnaby",
                            "short_name": "Burnaby",
                            "types": [
                                "locality",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Metro Vancouver",
                            "short_name": "Metro Vancouver",
                            "types": [
                                "administrative_area_level_2",
                                "political"
                            ]
                        },
                        {
                            "long_name": "British Columbia",
                            "short_name": "BC",
                            "types": [
                                "administrative_area_level_1",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Canada",
                            "short_name": "CA",
                            "types": [
                                "country",
                                "political"
                            ]
                        },
                        {
                            "long_name": "V5A 1S6",
                            "short_name": "V5A 1S6",
                            "types": [
                                "postal_code"
                            ]
                        }
                    ],
                    "adr_address": "<span class=\"street-address\">8888 University Dr</span>, <span class=\"locality\">Burnaby</span>, <span class=\"region\">BC</span> <span class=\"postal-code\">V5A 1S6</span>, <span class=\"country-name\">Canada</span>",
                    "formatted_address": "8888 University Dr, Burnaby, BC V5A 1S6, Canada",
                    "geometry": {
                        "location": {
                            "lat": 49.2780937,
                            "lng": -122.9198833
                        }
                    },
                    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png",
                    "name": "Simon Fraser University",
                    "place_id": "ChIJJyJ6hcB5hlQRW7Uwbj9sUAA",
                    "types": [
                        "university",
                        "point_of_interest",
                        "establishment"
                    ],
                    "url": "https://maps.google.com/?cid=22637017824277851",
                    "lat": 49.2780937,
                    "lng": -122.9198833
                }
            ],
            "schedule": {
                "schedule": [
                    "2022-06-01T17:00:00.000Z",
                    "2022-06-01T18:00:00.000Z",
                    "2022-06-01T19:00:00.000Z",
                    "2022-06-01T20:00:00.000Z",
                    "2022-06-01T21:00:00.000Z",
                    "2022-06-01T22:00:00.000Z",
                    "2022-06-01T23:00:00.000Z",
                    "2022-06-02T00:00:00.000Z",
                    "2022-06-03T15:00:00.000Z",
                    "2022-06-03T16:00:00.000Z",
                    "2022-06-03T17:00:00.000Z",
                    "2022-06-03T18:00:00.000Z",
                    "2022-06-03T19:00:00.000Z",
                    "2022-06-03T20:00:00.000Z",
                    "2022-06-03T21:00:00.000Z",
                    "2022-06-03T22:00:00.000Z",
                    "2022-06-03T23:00:00.000Z"
                ],
                "timezone": {
                    "value": "America/Dawson",
                    "label": "(GMT-7:00) Dawson, Yukon",
                    "offset": -7
                },
                "startDate": "2022-06-01T21:08:34.000Z",
                "selectionScheme": "linear",
                "numDaysInput": "5",
                "numDays": "5",
                "hourlyChunkInput": 1,
                "hourlyChunk": 1,
                "timeInterval": [
                    8,
                    18
                ]
            },
            "invitees": [
                {
                    "email": "a",
                    "username": "a"
                }
            ],
            "creator": {
                "email": "d",
                "username": "d"
            },
            state: "PENDING",
            bestLocation: null,
            bestTime: null
        },
        {
            id: party1Id,
            timestamp: Date.now(),
            "title": "Party 1",
            "description": "a description of party 1...",
            "location": [
                {
                    "address_components": [
                        {
                            "long_name": "8888",
                            "short_name": "8888",
                            "types": [
                                "street_number"
                            ]
                        },
                        {
                            "long_name": "University Dr",
                            "short_name": "University Dr",
                            "types": [
                                "route"
                            ]
                        },
                        {
                            "long_name": "Burnaby",
                            "short_name": "Burnaby",
                            "types": [
                                "locality",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Metro Vancouver",
                            "short_name": "Metro Vancouver",
                            "types": [
                                "administrative_area_level_2",
                                "political"
                            ]
                        },
                        {
                            "long_name": "British Columbia",
                            "short_name": "BC",
                            "types": [
                                "administrative_area_level_1",
                                "political"
                            ]
                        },
                        {
                            "long_name": "Canada",
                            "short_name": "CA",
                            "types": [
                                "country",
                                "political"
                            ]
                        },
                        {
                            "long_name": "V5A 1S6",
                            "short_name": "V5A 1S6",
                            "types": [
                                "postal_code"
                            ]
                        }
                    ],
                    "adr_address": "<span class=\"street-address\">8888 University Dr</span>, <span class=\"locality\">Burnaby</span>, <span class=\"region\">BC</span> <span class=\"postal-code\">V5A 1S6</span>, <span class=\"country-name\">Canada</span>",
                    "formatted_address": "8888 University Dr, Burnaby, BC V5A 1S6, Canada",
                    "geometry": {
                        "location": {
                            "lat": 49.2780937,
                            "lng": -122.9198833
                        }
                    },
                    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png",
                    "name": "Simon Fraser University",
                    "place_id": "ChIJJyJ6hcB5hlQRW7Uwbj9sUAA",
                    "types": [
                        "university",
                        "point_of_interest",
                        "establishment"
                    ],
                    "url": "https://maps.google.com/?cid=22637017824277851",
                    "lat": 49.2780937,
                    "lng": -122.9198833
                }
            ],
            "schedule": {
                "schedule": [
                    "2022-06-01T17:00:00.000Z",
                    "2022-06-01T18:00:00.000Z",
                    "2022-06-01T19:00:00.000Z",
                    "2022-06-01T21:00:00.000Z",
                    "2022-06-01T22:00:00.000Z",
                    "2022-06-01T23:00:00.000Z",
                    "2022-06-02T00:00:00.000Z",
                    "2022-06-03T16:00:00.000Z",
                    "2022-06-03T17:00:00.000Z",
                    "2022-06-03T18:00:00.000Z",
                    "2022-06-03T19:00:00.000Z",
                    "2022-06-03T20:00:00.000Z",
                    "2022-06-03T21:00:00.000Z",
                    "2022-06-03T22:00:00.000Z",
                    "2022-06-03T23:00:00.000Z"
                ],
                "timezone": {
                    "value": "America/Dawson",
                    "label": "(GMT-7:00) Dawson, Yukon",
                    "offset": -7
                },
                "startDate": "2022-06-01T21:08:34.000Z",
                "selectionScheme": "linear",
                "numDaysInput": "5",
                "numDays": "5",
                "hourlyChunkInput": 1,
                "hourlyChunk": 1,
                "timeInterval": [
                    8,
                    18
                ]
            },
            "invitees": [
                {
                    "email": "q",
                    "username": "q"
                },
                {
                    "email": "d",
                    "username": "d"
                }
            ],
            "creator": {
                "email": "a",
                "username": "a"
            },
            state: "PENDING",
            bestLocation: null,
            bestTime: null
        }
    ];

    // insert all users to users collection
    for (let i = 0; i < users.length; i++) {
        await User.create(users[i]);
    }

    // insert all meetups to meetups collection
    for (let i = 0; i < meetups.length; i++) {
        await Meetup.create(meetups[i]);
    }
}

module.exports = generateData;
