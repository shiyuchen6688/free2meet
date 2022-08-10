var express = require('express');
var router = express.Router();
var queries = require('../model/queries');
var tagQueries = require('../model/tagQueries');

/* get all meetups listing. */
router.get('/', function (req, res, next) {
    const option = req.query.filterPeopleOption;
    const person = req.query.filterByPerson;
    const self = req.query.selfEmail || req.user.email;
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
router.get(`/meetup/`, function (req, res, next) {
    const id = req.query.id;
    queries.getMeetupById(id).then(function (meetup) {
        return res.send(meetup);
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

router.get('/users/:email/tags', async function (req, res, next) {
    const email = req.params.email;
    const text = req.headers.text;
    tagQueries.classifyNLP(email, text).then(tags => {
        return res.send(tags);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// get all friends for a user given user email
router.get('/users/:email/friends/', function (req, res, next) {
    const email = req.params.email;
    queries.getFriends(email).then(friends => {
        return res.send(friends);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

module.exports = router;
