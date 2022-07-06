var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');
var queries = require('../model/queries');

/** Schema of meetup include:
    id (Primary Key), timestamp, title, description, location, schedule, invitees, creator, state, bestLocation, bestTime
/** 

/* get all meetups listing. */
router.get('/', function (req, res, next) {
    queries.getAllMeetups().then(function (meetups) {
        return res.send(meetups);
    });
});

/* get a single meetup by id. */
router.get(`/meetup`, function (req, res, next) {
    const id = req.query.id;
    queries.getMeetupById(id).then(function (meetup) {
        return res.send(meetup);
    });
});

/* add a new meetup */
router.post('/', function (req, res, next) {
    //   console.log("a")
    //   console.log(req)
    let uid = uuid();
    let creatorEmail = req.body.creator.email;
    let meetup = {
        id: uid,
        timestamp: Date.now(),
        title: req.body.title,
        description: req.body.description,
        schedule: req.body.schedule,
        location: req.body.location,
        invitees: req.body.invitees,
        creator: req.body.creator,
        state: "PENDING",
        bestLocation: null,
        bestTime: null
    }

    queries.addMeetup(meetup).then(function (meetup) {
        console.log("meetup added");
        queries.addMeetupToUserCreator(creatorEmail, uid).then(function (user) {
            console.log("meetup added to user");
            let emails = req.body.invitees.map(function (invitee) {
                return invitee.uid;
            });
            // console.log(emails);
            queries.addMeetupToInvitees(emails, uid).then(function (invitees) {
                console.log("meetup added to invitees");
                // TODO: send email to invitees
                return res.send(meetup);
            }).catch(function (err) {
                console.log(err);
                return res.send(err);
            });
        }).catch(function (err) {
            console.log(err);
            return res.send(err);
        });
    }).catch(function (err) {
        console.log(err);
        return res.send(err);
    });
});


module.exports = router;
