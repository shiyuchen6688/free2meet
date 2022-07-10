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
    const invitationID = req.body.invitationID;
    const availableLocations = req.body.availableLocations;
    const availableTimeSlots = req.body.availableTimeSlots;
    // check if invitation exists
    queries.getMeetupById(invitationID).then(invitation => {
        if (invitation) {
            // check if invitation is pending
            if (invitation.state === "PENDING") {
                // accept invitation
                queries.acceptInvitation(email, invitation.id, availableLocations, availableTimeSlots).then(invitation => {
                    return res.send(invitation);
                }).catch(err => {
                    return res.status(404).send(err);
                });
            } else {
                return res.status(404).send(new Error("invitation is not pending"));
            }
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
    const invitationID = req.body.invitationID;
    // check if invitation exists
    queries.getMeetupById(invitationID).then(invitation => {
        if (invitation) {
            // check if invitation is pending
            if (invitation.state === "PENDING") {
                // decline invitation
                queries.declineInvitation(email, invitation.id).then(invitation => {
                    return res.send(invitation);
                }).catch(err => {
                    return res.status(404).send(err);
                });
            } else {
                return res.status(404).send(new Error("invitation is not pending"));
            }
        } else {
            return res.status(404).send(new Error("invitation does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});


module.exports = router;