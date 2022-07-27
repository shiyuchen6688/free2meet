var express = require('express');
var router = express.Router();
const { v4: uuid } = require('uuid');
var queries = require('../model/queries');

/** Schema of meetup include:
    id (Primary Key), timestamp, title, description, location, schedule, invitees, creator, state, bestLocation, bestTime
/** 

/* get all meetups listing. */
router.get('/', function (req, res, next) {
    const option = req.query.filterPeopleOption;
    const person = req.query.filterByPerson;
    const self = req.query.selfEmail;
    console.log(option, person, self);
    if (option === null || option === undefined || option === "all") {
        queries.getAllMeetups().then(function (meetups) {
            return res.send(meetups);
        });
    }
    if (option === "created-by-me") {
        queries.getMeetupsCreated(self).then(function (meetups) {
            return res.send(meetups);
        })
    }
    if (option === "attended-by-me") {
        queries.getMeetupsByInvitedUser(self).then(function (meetups) {
            return res.send(meetups);
        })
    }
    if (option === "custom") {
        queries.getMeetupsByInvitedUser(person).then(function (meetups) {
            queries.getMeetupsCreated(person).then(function (meetups2) {
                if (meetups === undefined) {
                    return res.send(meetups2);
                }
                if (meetups2 === undefined) {
                    return res.send(meetups);
                }
                return res.send(meetups2.concat(meetups));
            })
        })
    }
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
        creator: creatorEmail,
        state: "PENDING",
        bestLocation: null,
        bestTime: null
    }
    // if invitees is empty, set state to COMPLETED
    if (inviteesModified.length === 0) {
        meetup.state = "COMPLETED";
    }
    // if creator is in invitees return error
    for (let i = 0; i < inviteesModified.length; i++) {
        if (inviteesModified[i] === creatorEmail) {
            return res.send({
                error: "Creator cannot be invited to meetup"
            });
        }
    }
    // if invitees emails are not in creator's friends return error
    queries.getFriends(creatorEmail).then(function (friends) {
        console.log(friends);
        console.log(inviteesModified);
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
            console.log("meetup added");
            queries.addMeetupToUserCreator(creatorEmail, uid).then(function (user) {
                console.log("meetup added to user");
                queries.addMeetupToInvitees(inviteesModified, uid).then(function (invitees) {
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

// get meetups created by a user given user email
router.get('/:email/created', (req, res) => {
    const email = req.params.email;
    queries.getMeetupsCreated(email).then(meetups => {
        return res.send(meetups);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// check if all invitees have responded to a meetup
router.get('/:id/noresponse', (req, res) => {
    const id = req.params.id;
    queries.checkIfMeetupIsComplete(id).then(completed => {
        console.log(completed);
        return res.send(completed);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// calculate best location and best time for a meetup
router.post('/:id/calculate', (req, res) => {
    const id = req.params.id;
    queries.calculateMeetupBestLocationandTime(id).then(meetup => {
        return res.send(meetup);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

module.exports = router;
