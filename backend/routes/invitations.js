var express = require('express');
var router = express.Router();
// var jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
// var verifyJWT = require('../middlewares/auth');
const queries = require('../model/queries');
require('dotenv').config()


// get pending invitations for a user given user email
router.get('/:email/pending', function (req, res, next) {
    const email = req.params.email;
    queries.getInvitationsPending(email).then(invitations => {
        return res.send(invitations);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// get accepted invitations for a user given user email
router.get('/:email/accepted', function (req, res, next) {
    const email = req.params.email;
    queries.getInvitationsAccepted(email).then(invitations => {
        return res.send(invitations);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// get declined invitations for a user given user email
router.get('/:email/declined', function (req, res, next) {
    const email = req.params.email;
    queries.getInvitationsDeclined(email).then(invitations => {
        return res.send(invitations);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// accept a pending meetup for a user given user email and meetup id and availbale locations and time slots
router.post('/:email/pending/accept', function (req, res, next) {
    const email = req.params.email;
    const meetupId = req.body.meetupId;
    const availableLocations = req.body.availableLocations;
    const availableTimeSlots = req.body.availableTimeSlots;
    // check if meetup exists
    queries.getMeetupById(meetupId).then(meetup => {
        if (meetup) {
            // check if meetup is pending
            if (meetup.status === "PENDING") {
                // accept meetup
                queries.acceptMeetup(email, meetupId, availableLocations, availableTimeSlots).then(meetup => {
                    return res.send(meetup);
                }).catch(err => {
                    return res.status(404).send(err);
                });
            } else {
                return res.status(404).send(new Error("Meetup is not pending"));
            }
        } else {
            return res.status(404).send(new Error("Meetup does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// decline a pending meetup for a user given user email and meetup id
router.post('/:email/pending/decline', function (req, res, next) {
    const email = req.params.email;
    const meetupId = req.body.meetupId;
    // check if meetup exists
    queries.getMeetupById(meetupId).then(meetup => {
        if (meetup) {
            // check if meetup is pending
            if (meetup.status === "PENDING") {
                // decline meetup
                queries.declineMeetup(email, meetupId).then(meetup => {
                    return res.send(meetup);
                }).catch(err => {
                    return res.status(404).send(err);
                });
            } else {
                return res.status(404).send(new Error("Meetup is not pending"));
            }
        } else {
            return res.status(404).send(new Error("Meetup does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});


module.exports = router;