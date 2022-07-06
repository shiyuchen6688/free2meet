var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var verifyJWT = require('../middlewares/auth');
const queries = require('../model/queries');
require('dotenv').config()

/** Schema of user include:
    email (Primary Key), username, password, friends, friendRequests, friendRequestsSent, meetupsCreated, meetupsPending, meetupsAccepted, meetupsDeclined
 */

// let users = [
//     {
//         email: "a",
//         username: "a",
//         password: "$2a$10$FKPFoOsz.td5FTaOs5kr7eot3WGjEo3pFP2e7eOBSW5Dw0Mry3yF6" // hash for b,
//         friends: [],
//         friendRequests: [],
//         friendRequestsSent: [],
//         meetupsCreated: [],
//         meetupsPending: [],
//         meetupsAccepted: [],
//         meetupsDeclined: []
//     }
// ]

/* get all users. */
router.get('/', function (req, res, next) {
    queries.getUsers({}).then(users => {
        return res.send(users);
    });
});

/* add (register) a new user */
router.post('/register', function (req, res, next) {
    // get user from req
    const user = req.body;

    // TODO: verify user information (password strong? email valid?)

    // check duplicate email and username

    // const takenUserName = users.find(u => u.username === user.username)
    // const takenEmail = users.find(u => u.username === user.username)
    let takenUserName1;
    let takenEmail1;
    queries.getUserByUsername(user.username).then(takenUserName => {
        takenUserName1 = takenUserName;
        queries.getUserByEmail(user.email).then(takenEmail => {
            takenEmail1 = takenEmail;
            if (takenUserName1 !== null || takenEmail1 !== null) {
                return res.json({
                    status: "error",
                    message: "Username or Email already taken"
                })
            } else {
                // encrypt password
                user.password = bcrypt.hash(user.password, 10).then((password) => {
                    user.password = password;
                    user.friends = [];
                    user.friendsRequests = [];
                    user.friendsRequestsSent = [];
                    user.meetupsCreated = [];
                    user.meetupsPending = [];
                    user.meetupsAccepted = [];
                    user.meetupsDeclined = [];
                    queries.addUser(user).then(user => {
                        return res.status(200).send(user);
                    })
                })
            }
        });
    });
});


/* sign a new user */
router.post('/login', (req, res) => {
    const user = req.body

    // console.log(user)

    // const matchStoredUser = users.find(u => u.email === user.email)
    let matchStoredUser;
    queries.getUserByEmail(user.email).then(result => {
        matchStoredUser = result;
        if (!result) {
            return res.status(404).send(new Error("Email does not exist"))
        }
        bcrypt.compare(user.password, matchStoredUser.password).then(passwordCorrect => {
            if (passwordCorrect) {
                let payload = {
                    username: matchStoredUser.username,
                    email: matchStoredUser.email
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 86400 }, // 1 day
                    (err, token) => {
                        if (err) {
                            return res.status(404).send(err)
                        }
                        // success!
                        return res.send({
                            status: "success",
                            token: "Bearer " + token,
                            username: matchStoredUser.username,
                            email: matchStoredUser.email
                        })
                    }
                )
            } else {
                return res.status(404).send(new Error("Incorrect password"))
            }
        });
    });
})

// access information about a particular user
router.get('/:email', verifyJWT, (req, res) => {
    res.json({ message: "not implemented" })
})

// reset password of a user given user email and new password
router.post('/reset-password', verifyJWT, (req, res) => {
    queries.getUserByEmail(req.body.email).then(user => {
        if (user) {
            bcrypt.hash(req.body.password, 10).then((password) => {
                user.password = password;
                queries.updateUser(user).then(user => {
                    return res.status(200).send(user);
                })
            })
        } else {
            return res.status(404).send(new Error("Email does not exist"))
        }
    }).catch(err => {
        return res.status(404).send(err)
    });
});

// get meetups created by a user given user email
router.get('/:email/meetups/created', verifyJWT, (req, res) => {
    const email = req.params.email;
    queries.getMeetupsCreated(email).then(meetups => {
        return res.send(meetups);
    }).catch(err => {
        return res.status(404).send(err)
    });
});

// get pending meetups for a user given user email
router.get('/:email/meetups/pending', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    queries.getMeetupsPending(email).then(meetups => {
        return res.send(meetups);
    }).catch(err => {
        return res.status(404).send(err)
    });
});

// get accepted meetups for a user given user email
router.get('/:email/meetups/accepted', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    queries.getMeetupsAccepted(email).then(meetups => {
        return res.send(meetups);
    }).catch(err => {
        return res.status(404).send(err)
    });
});

// get declined meetups for a user given user email
router.get('/:email/meetups/declined', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    queries.getMeetupsDeclined(email).then(meetups => {
        return res.send(meetups);
    }).catch(err => {
        return res.status(404).send(err)
    });
});

// accept a pending meetup for a user given user email and meetup id and availbale locations and time slots
router.post('/:email/meetups/pending/accept', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    const meetupId = req.body.meetupId;
    const availableLocations = req.body.availableLocations;
    const availableTimeSlots = req.body.availableTimeSlots;
    queries.acceptMeetup(email, meetupId, availableLocations, availableTimeSlots).then(meetup => {
        return res.send(meetup);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// decline a pending meetup for a user given user email and meetup id
router.post('/:email/meetups/pending/decline', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    const meetupId = req.body.meetupId;
    queries.declineMeetup(email, meetupId).then(meetup => {
        return res.send(meetup);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// get all friends for a user given user email
router.get('/:email/friends/', function (req, res, next) {
    const email = req.params.email;
    queries.getFriends(email).then(friends => {
        return res.send(friends);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// get all friend requests for a user given user email
router.get('/:email/friends/requests', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    queries.getFriendRequests(email).then(friendRequests => {
        return res.send(friendRequests);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// get all friend requests sent for a user given user email
router.get('/:email/friends/requests/sent', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    queries.getFriendRequestsSent(email).then(friendRequestsSent => {
        return res.send(friendRequestsSent);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// accept a friend request for a user given user email and friend email
router.post('/:email/friends/requests/accept', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail;
    queries.acceptFriendRequest(email, friendEmail).then(friend => {
        return res.send(friend);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// decline a friend request for a user given user email and friend email
router.post('/:email/friends/requests/decline', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail;
    queries.declineFriendRequest(email, friendEmail).then(friend => {
        return res.send(friend);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// send a friend request for a user given user email and friend email
router.post('/:email/friends/requests/send', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail;
    queries.sendFriendRequest(email, friendEmail).then(friend => {
        return res.send(friend);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// delete a friend for a user given user email and friend email
router.post('/:email/friends/delete', verifyJWT, function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail;
    queries.deleteFriend(email, friendEmail).then(friend => {
        return res.send(friend);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

module.exports = router;
