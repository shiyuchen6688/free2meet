var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');
var queries = require('../model/queries');

/* add a new meetup */
router.post('/', function (req, res, next) {
    let uid = uuid();
    let creatorEmail = req.body.creator.email;
    let inviteesModified = [];
    for (let i = 0; i < req.body.invitees.length; i++) {
        inviteesModified.push(req.body.invitees[i].value);
    }
    let meetup = {
        id: uid,
        timestamp: Date.now(),
        title: req.body.title,
        description: req.body.description,
        schedule: req.body.schedule,
        location: req.body.location,
        invitees: inviteesModified,
        tags: req.body.tags,
        creator: creatorEmail,
        meetupImage: req.body.meetupImage,
        state: "PENDING",
        bestLocation: null,
        bestTime: null
    };
    // if creator is in invitees return error
    for (let i = 0; i < inviteesModified.length; i++) {
        if (inviteesModified[i] === creatorEmail) {
            return res.send({
                error: "Creator cannot be invited to meetup"
            });
        }
    }
    // if meetup.title is larger than 50 characters, keep only first 50 characters
    if (meetup.title.length > 50) {
        meetup.title = meetup.title.substring(0, 50);
    }
    // if meetup.description is larger than 1000 characters, keep only first 1000 characters
    if (meetup.description.length > 1000) {
        meetup.description = meetup.description.substring(0, 1000);
    }
    // if invitees emails are not in creator's friends return error
    queries.getFriends(creatorEmail).then(function (friends) {
        for (let i = 0; i < inviteesModified.length; i++) {
            let isFriend = false;
            for (let j = 0; j < friends.length; j++) {
                if (inviteesModified[i] === friends[j].email) {
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
            queries.addMeetupToUserCreator(creatorEmail, uid).then(function (user) {
                queries.addMeetupToInvitees(inviteesModified, uid).then(function (invitees) {
                    return res.send(meetup);
                }).catch(function (err) {
                    return res.send(err);
                });
            }).catch(function (err) {
                return res.send(err);
            });
        }).catch(function (err) {
            return res.send(err);
        });
    }).catch(function (err) {
        return res.send(err);
    });
});

module.exports = router;