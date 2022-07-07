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
    let uid = uuid();
    let creatorEmail = req.body.creator.email;
    let inviteesModified = req.body.invitees;
    // change invitees label to username
    // change invitees uid to email
    for (let i = 0; i < inviteesModified.length; i++) {
        inviteesModified[i].username = inviteesModified[i].label;
        inviteesModified[i].email = inviteesModified[i].uid;
    }
    let meetup = {
        id: uid,
        timestamp: Date.now(),
        title: req.body.title,
        description: req.body.description,
        schedule: req.body.schedule,
        location: req.body.location,
        invitees: inviteesModified,
        creator: req.body.creator,
        state: "PENDING",
        bestLocation: null,
        bestTime: null
    }
    // if creator is in invitees return error
    for (let i = 0; i < inviteesModified.length; i++) {
        if (inviteesModified[i].email === creatorEmail) {
            return res.send({
                error: "Creator cannot be invited to meetup"
            });
        }
    }
    // if invitees emails are not in creator's friends return error
    queries.getFriends(creatorEmail).then(function (friends) {
        for (let i = 0; i < inviteesModified.length; i++) {
            let isFriend = false;
            for (let j = 0; j < friends.length; j++) {
                if (inviteesModified[i].email === friends[j].email) {
                    isFriend = true;
                }
            }
            if (!isFriend) {
                return res.send({
                    error: "Invitee is not a friend"
                });
            }
        }
        queries.addMeetup(meetup).then(function (meetup) {
            console.log("meetup added");
            queries.addMeetupToUserCreator(creatorEmail, uid).then(function (user) {
                console.log("meetup added to user");
                let emails = req.body.invitees.map(function (invitee) {
                    return invitee.uid;
                });
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
    }).catch(function (err) {
        console.log(err);
        return res.send(err);
    });
});

module.exports = router;
