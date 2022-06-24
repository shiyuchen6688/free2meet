var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');

/** Schema of meetup include:
 *  title, description, availabiliyt times, locations, invited users, creater user
 */

let meetups = [{title: "Party 3", 
id: 3,
description: "a description of party 1...", 
startDate: "2022-07-03", 
startTime: "12:00PM", 
endDate: "2022-07-03", 
endTime: "08:00PM", 
host: 
    {
        userID: 1, 
        profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    }, 
attendees: [
    {userID: 2, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
    {userID: 3, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
    {userID: 4, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
]},
{title: "Party 2", 
id: 2,
description: "a description of party 2...", 
startDate: "2022-07-02", 
startTime: "12:01PM", 
endDate: "2022-07-02", 
endTime: "08:01PM", 
host: 
    {
        userID: 5, 
        profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    }, 
attendees: [
    {userID: 6, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
    {userID: 7, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
    {userID: 8, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
]},
{title: "Party 1", 
id: 1,
description: "a description of party 3...", 
startDate: "2022-07-01", 
startTime: "12:02PM", 
endDate: "2022-07-01", 
endTime: "08:02PM", 
host: 
    {
        userID: 9, 
        profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    }, 
attendees: [
    {userID: 10, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
    {userID: 11, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}, 
    {userID: 12, profilePictureLink: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
]},
];

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
    title: req.body.title,
    description: req.body.description
    // TODO: more keys here
  }
  meetups.push(meetup)
  console.log(meetups)
  return res.send(meetup)
});



module.exports = router;
