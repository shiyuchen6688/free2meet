var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');

/** Schema of meetup include:
 *  title, description, availabiliyt times, locations, invited users, creater user
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
    timestamp: Date.now(),
    title: req.body.title,
    description: req.body.description,
    locations: req.body.locations,
    // TODO: more keys here
  }
  meetups.push(meetup)
  console.log(meetups)
  return res.send(meetup)
});



module.exports = router;
