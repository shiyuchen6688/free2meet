var express = require('express');
var router = express.Router();
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

// accept a pending invitation for a user given user email and invitation ID and availbale locations and time slots
router.post('/:email/accept', function (req, res, next) {
    const email = req.params.email;
    const invitationId = req.body.invitationId;
    const availableLocations = req.body.availableLocations;
    const availableTimeslots = req.body.availableTimeslots;
    for (let i = 0; i < availableTimeslots.length; i++) {
        availableTimeslots[i] = availableTimeslots[i].replace('.', '|');
    }
    // check if invitation exists
    queries.getMeetupById(invitationId).then(invitation => {
        if (invitation) {
            // get creator time slots
            const creatorTimeSlot = (invitation.schedule.schedule === null || invitation.schedule.schedule === undefined || Object.keys(invitation.schedule.schedule).length === 0) ? [] : Object.keys(invitation.schedule.schedule);
            // filter available timeslots by creator's timeslots prevent invitee select other timeslots
            const availableTimeslotsFiltered = availableTimeslots.filter(timeSlot => {
                return creatorTimeSlot.includes(timeSlot);
            });
            // accept invitation
            queries.acceptInvitation(email, invitation.id, availableLocations, availableTimeslotsFiltered).then(invitation => {
                return res.send(invitation);
            }).catch(err => {
                return res.status(404).send(err);
            });
        } else {
            return res.status(404).send(new Error("invitation does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// decline a pending invitation for a user given user email and invitation ID
router.post('/:email/decline', function (req, res, next) {
    const email = req.params.email;
    const invitationId = req.body.invitationId;
    const availableLocations = req.body.availableLocations;
    const availableTimeslots = req.body.availableTimeslots;
    // check if invitation exists
    queries.getMeetupById(invitationId).then(invitation => {
        if (invitation) {
            queries.declineInvitation(email, invitation.id, availableLocations, availableTimeslots).then(invitation => {
                return res.send(invitation);
            }).catch(err => {
                return res.status(404).send(err);
            });
        } else {
            return res.status(404).send(new Error("invitation does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});

module.exports = router;