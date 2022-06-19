var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');

/** Schema of meetup include:
 *  title, detail, availabiliyt times, locations, invited users, creater user
 */

let meetups = []

/* get all meetups listing. */
router.get('/', function (req, res, next) {
  return res.send(meetups);
});


/* add a new meetup */
router.post('/', function (req, res, next) {
  let meetup = {
    id: uuid()
  }
  meetups.push(meetup)
  return res.send(meetup)
});



module.exports = router;
