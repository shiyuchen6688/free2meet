const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const Meetup = require('./model/meetup');
const User = require('./model/user');

let scheduleA = {
    "2022-07-14T15:00:00|000Z": [
        "a"
    ],
    "2022-07-14T16:00:00|000Z": [
        "a"
    ],
    "2022-07-14T17:00:00|000Z": [
        "a"
    ],
    "2022-07-14T18:00:00|000Z": [
        "a"
    ],
    "2022-07-14T19:00:00|000Z": [
        "a"
    ],
    "2022-07-14T20:00:00|000Z": [
        "a"
    ],
    "2022-07-14T21:00:00|000Z": [
        "a"
    ],
    "2022-07-14T22:00:00|000Z": [
        "a"
    ],
    "2022-07-14T23:00:00|000Z": [
        "a"
    ],
    "2022-07-15T00:00:00|000Z": [
        "a"
    ],
    "2022-07-15T15:00:00|000Z": [
        "a"
    ],
    "2022-07-15T16:00:00|000Z": [
        "a"
    ],
    "2022-07-15T17:00:00|000Z": [
        "a"
    ],
    "2022-07-15T18:00:00|000Z": [
        "a"
    ],
    "2022-07-15T19:00:00|000Z": [
        "a"
    ],
    "2022-07-15T20:00:00|000Z": [
        "a"
    ],
    "2022-07-15T21:00:00|000Z": [
        "a"
    ],
    "2022-07-15T22:00:00|000Z": [
        "a"
    ],
    "2022-07-15T23:00:00|000Z": [
        "a"
    ],
    "2022-07-16T00:00:00|000Z": [
        "a"
    ],
    "2022-07-16T15:00:00|000Z": [
        "a"
    ],
    "2022-07-16T16:00:00|000Z": [
        "a"
    ],
    "2022-07-16T17:00:00|000Z": [
        "a"
    ],
    "2022-07-16T18:00:00|000Z": [
        "a"
    ],
    "2022-07-16T19:00:00|000Z": [
        "a"
    ],
    "2022-07-16T20:00:00|000Z": [
        "a"
    ],
    "2022-07-16T21:00:00|000Z": [
        "a"
    ],
    "2022-07-16T22:00:00|000Z": [
        "a"
    ],
    "2022-07-16T23:00:00|000Z": [
        "a"
    ],
    "2022-07-17T00:00:00|000Z": [
        "a"
    ],
    "2022-07-18T15:00:00|000Z": [
        "a"
    ],
    "2022-07-18T16:00:00|000Z": [
        "a"
    ],
    "2022-07-18T17:00:00|000Z": [
        "a"
    ],
    "2022-07-18T18:00:00|000Z": [
        "a"
    ],
    "2022-07-18T19:00:00|000Z": [
        "a"
    ],
    "2022-07-18T20:00:00|000Z": [
        "a"
    ],
    "2022-07-18T21:00:00|000Z": [
        "a"
    ],
    "2022-07-18T22:00:00|000Z": [
        "a"
    ],
    "2022-07-17T20:00:00|000Z": [
        "a"
    ],
    "2022-07-17T21:00:00|000Z": [
        "a"
    ],
    "2022-07-17T22:00:00|000Z": [
        "a"
    ],
    "2022-07-17T23:00:00|000Z": [
        "a"
    ]
};

let scheduleQ = {
    "2022-07-13T15:00:00|000Z": [
        "q"
    ],
    "2022-07-13T16:00:00|000Z": [
        "q"
    ],
    "2022-07-13T17:00:00|000Z": [
        "q"
    ],
    "2022-07-13T18:00:00|000Z": [
        "q"
    ],
    "2022-07-13T19:00:00|000Z": [
        "q"
    ],
    "2022-07-13T20:00:00|000Z": [
        "q"
    ],
    "2022-07-13T21:00:00|000Z": [
        "q"
    ],
    "2022-07-13T22:00:00|000Z": [
        "q"
    ],
    "2022-07-13T23:00:00|000Z": [
        "q"
    ],
    "2022-07-14T00:00:00|000Z": [
        "q"
    ],
    "2022-07-19T15:00:00|000Z": [
        "q"
    ],
    "2022-07-19T16:00:00|000Z": [
        "q"
    ],
    "2022-07-19T17:00:00|000Z": [
        "q"
    ],
    "2022-07-19T18:00:00|000Z": [
        "q"
    ],
    "2022-07-19T19:00:00|000Z": [
        "q"
    ],
    "2022-07-19T20:00:00|000Z": [
        "q"
    ],
    "2022-07-19T21:00:00|000Z": [
        "q"
    ],
    "2022-07-19T22:00:00|000Z": [
        "q"
    ],
    "2022-07-19T23:00:00|000Z": [
        "q"
    ],
    "2022-07-20T00:00:00|000Z": [
        "q"
    ],
    "2022-07-16T15:00:00|000Z": [
        "q"
    ],
    "2022-07-16T16:00:00|000Z": [
        "q"
    ],
    "2022-07-16T17:00:00|000Z": [
        "q"
    ],
    "2022-07-16T18:00:00|000Z": [
        "q"
    ],
    "2022-07-16T19:00:00|000Z": [
        "q"
    ],
    "2022-07-16T20:00:00|000Z": [
        "q"
    ],
    "2022-07-16T21:00:00|000Z": [
        "q"
    ],
    "2022-07-16T22:00:00|000Z": [
        "q"
    ],
    "2022-07-16T23:00:00|000Z": [
        "q"
    ],
    "2022-07-17T00:00:00|000Z": [
        "q"
    ]
};

let scheduleD = {
    "2022-07-14T15:00:00|000Z": [
        "d"
    ],
    "2022-07-14T16:00:00|000Z": [
        "d"
    ],
    "2022-07-14T17:00:00|000Z": [
        "d"
    ],
    "2022-07-14T18:00:00|000Z": [
        "d"
    ],
    "2022-07-14T19:00:00|000Z": [
        "d"
    ],
    "2022-07-14T20:00:00|000Z": [
        "d"
    ],
    "2022-07-14T21:00:00|000Z": [
        "d"
    ],
    "2022-07-14T22:00:00|000Z": [
        "d"
    ],
    "2022-07-14T23:00:00|000Z": [
        "d"
    ],
    "2022-07-15T00:00:00|000Z": [
        "d"
    ],
    "2022-07-16T18:00:00|000Z": [
        "d"
    ],
    "2022-07-16T19:00:00|000Z": [
        "d"
    ],
    "2022-07-16T20:00:00|000Z": [
        "d"
    ],
    "2022-07-16T21:00:00|000Z": [
        "d"
    ],
    "2022-07-16T22:00:00|000Z": [
        "d"
    ],
    "2022-07-16T23:00:00|000Z": [
        "d"
    ],
    "2022-07-17T15:00:00|000Z": [
        "d"
    ],
    "2022-07-17T16:00:00|000Z": [
        "d"
    ],
    "2022-07-17T17:00:00|000Z": [
        "d"
    ],
    "2022-07-17T18:00:00|000Z": [
        "d"
    ],
    "2022-07-17T19:00:00|000Z": [
        "d"
    ],
    "2022-07-17T20:00:00|000Z": [
        "d"
    ],
    "2022-07-17T21:00:00|000Z": [
        "d"
    ],
    "2022-07-17T22:00:00|000Z": [
        "d"
    ],
    "2022-07-17T23:00:00|000Z": [
        "d"
    ],
    "2022-07-18T00:00:00|000Z": [
        "d"
    ],
    "2022-07-18T15:00:00|000Z": [
        "d"
    ],
    "2022-07-18T16:00:00|000Z": [
        "d"
    ],
    "2022-07-18T17:00:00|000Z": [
        "d"
    ],
    "2022-07-18T18:00:00|000Z": [
        "d"
    ]
};

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
            meetupsDeclined: [],
            tags: [
                {
                    tag: "party",
                    details: ["a description of party 3..."],
                    count: 1
                },
                {
                    tag: "fun",
                    details: ["a description of party 3..."],
                    count: 1
                }
            ],
            countFromPreviousTraining: 2
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
            meetupsDeclined: [],
            tags: [
                {
                    tag: "party",
                    details: ["a description of party 1..."],
                    count: 1
                },
                {
                    tag: "fun",
                    details: ["a description of party 1..."],
                    count: 1
                }
            ],
            countFromPreviousTraining: 2
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
            meetupsDeclined: [],
            tags: [],
            countFromPreviousTraining: 0
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
            meetupsDeclined: [],
            tags: [
                {
                    tag: "party",
                    details: ["a description of party 2..."],
                    count: 1
                },
                {
                    tag: "fun",
                    details: ["a description of party 2..."],
                    count: 1
                }
            ],
            countFromPreviousTraining: 2
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
                    "lng": -123.2459939,
                    "attendees": ["q"]
                }
            ],
            "schedule": {
                "schedule": scheduleQ,
                "timezone": {
                    "value": "Pacific/Honolulu",
                    "label": "(GMT-10:00) Hawaii",
                    "offset": -10,
                    "abbrev": "HAST",
                    "altName": "Hawaii-Aleutian Standard Time"
                },
                "startDate": "2022-07-12T21:00:00.000Z",
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
            "invitees": ["a"],
            "tags": ["party", "fun"],
            "creator": "q",
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
                    "lng": -122.9198833,
                    "attendees": ["d"]
                }
            ],
            "schedule": {
                "schedule": scheduleD,
                "timezone": {
                    "value": "America/Dawson",
                    "label": "(GMT-7:00) Dawson, Yukon",
                    "offset": -7
                },
                "startDate": "2022-07-12T21:00:00.000Z",
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
            "invitees": ["a"],
            "tags": ["party", "fun"],
            "creator": "d",
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
                    "lng": -122.9198833,
                    "attendees": ["a"]
                }
            ],
            "schedule": {
                "schedule": scheduleA,
                "timezone": {
                    "value": "America/Dawson",
                    "label": "(GMT-7:00) Dawson, Yukon",
                    "offset": -7
                },
                "startDate": "2022-07-12T21:00:00.000Z",
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
            "invitees": ["q","d"],
            "tags": ["party", "fun"],
            "creator": "a",
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
