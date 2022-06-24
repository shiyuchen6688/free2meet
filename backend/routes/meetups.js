var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');

/** Schema of meetup include:
 *  title, description, availabiliyt times (schedule), locations, invited users (invitees), creater user
 */

let meetups = [
    {
      id: uuid(),
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
              "html_attributions": [],
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
              "value": "friend_0",
              "label": "Sam",
              "uid": "sam@gmail.com"
          }
      ],
      "creator": {
          "email": "a",
          "username": "a"
      }
    },
    {
      id: uuid(),
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
              "html_attributions": [],
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
              "value": "friend_1",
              "label": "Amy",
              "uid": "amy@gmail.com"
          }
      ],
      "creator": {
          "email": "a",
          "username": "a"
      }
    },
    {
      id: uuid(),
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
              "html_attributions": [],
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
              "value": "friend_1",
              "label": "Amy",
              "uid": "amy@gmail.com"
          }
      ],
      "creator": {
          "email": "a",
          "username": "a"
      }
  }
];

// let meetups = [{title: "Party 3", 
// id: 3,
// description: "a description of party 1...", 
// startDate: "2022-07-03", 
// startTime: "12:00PM", 
// endDate: "2022-07-03", 
// endTime: "08:00PM", 
// host: 
//     {
//         name: "user 1",
//         userID: 1, 
//         profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//     }, 
// attendees: [
//     {userID: 2, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//     {userID: 3, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//     {userID: 4, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
// ]},
// {title: "Party 2", 
// id: 2,
// description: "a description of party 2...", 
// startDate: "2022-07-02", 
// startTime: "12:01PM", 
// endDate: "2022-07-02", 
// endTime: "08:01PM", 
// host: 
//     {
//       name: "user 5",
//         userID: 5, 
//         profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//     }, 
// attendees: [
//     {userID: 6, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//     {userID: 7, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//     {userID: 8, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
// ]},
// {title: "Party 1", 
// id: 1,
// description: "a description of party 3...", 
// startDate: "2022-07-01", 
// startTime: "12:02PM", 
// endDate: "2022-07-01", 
// endTime: "08:02PM", 
// host: 
//     {
//         name: "user 9",
//         userID: 9, 
//         profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//     }, 
// attendees: [
//     {userID: 10, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//     {userID: 11, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
//     {userID: 12, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
// ]},
// ];

/* get all meetups listing. */
router.get('/', function (req, res, next) {
  return res.send(meetups);
});

/* get a single meetup by id. */
router.get(`/meetup`, function (req, res, next) {
  const id = req.query.id;
  let meetup = meetups.filter(e => e.id === parseInt(id))[0];
  return res.send(meetup);
});

/* add a new meetup */
router.post('/', function (req, res, next) {
  console.log("a")
  console.log(req)
  let meetup = {
    id: uuid(),
    timestamp: Date.now(),
    title: req.body.title,
    description: req.body.description,
    schedule: req.body.schedule,
    location: req.body.location,
    invitees: req.body.invitees,
    creator: req.body.creator
  }
  meetups.push(meetup)
  console.log(meetups)
  return res.send(meetup)
});



module.exports = router;
