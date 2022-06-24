var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');

/** Schema of meetup include:
 *  title, description, availabiliyt times (schedule), locations, invited users (invitees), creater user
 */

let meetups = []

/* get all meetups listing. */
router.get('/', function (req, res, next) {
  return res.send(meetups);
});


/* add a new meetup */
router.post('/', function (req, res, next) {
  console.log("a")
  console.log(req)
  let meetup = {
    id: uuid(),
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
