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
router.post('/reset-password', (req, res) => {
    // check if user exists
    queries.getUserByEmail(req.body.email).then(user => {
        if (user) {
            // encrypt password
            bcrypt.hash(req.body.password, 10).then((password) => {
                user.password = password;
                // update user
                queries.updateUser(user).then(user => {
                    return res.status(200).send(user);
                })
            })
        } else {
            return res.status(404).send(new Error("Email (user) does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// get meetups created by a user given user email
// router.get('/:email/meetups/created', (req, res) => {
//     const email = req.params.email;
//     queries.getMeetupsCreated(email).then(meetups => {
//         return res.send(meetups);
//     }).catch(err => {
//         return res.status(404).send(err);
//     });
// });


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
router.get('/:email/friends/requests', function (req, res, next) {
    const email = req.params.email;
    queries.getFriendRequests(email).then(friendRequests => {
        return res.send(friendRequests);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// get all friend requests sent for a user given user email
router.get('/:email/friends/requests/sent', function (req, res, next) {
    const email = req.params.email;
    queries.getFriendRequestsSent(email).then(friendRequestsSent => {
        return res.send(friendRequestsSent);
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// accept a friend request for a user given user email and friend email
router.post('/:email/friends/requests/accept', function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail;
    // check if friend request exists
    queries.getFriendRequest(email, friendEmail).then(friendRequest => {
        if (friendRequest) {
            // accept friend request
            queries.acceptFriendRequest(email, friendEmail).then(friendRequest => {
                return res.send(friendRequest);
            }).catch(err => {
                return res.status(404).send(err);
            });
        } else {
            return res.status(404).send(new Error("Friend request does not exist"));
        }
    });
});

// decline a friend request for a user given user email and friend email
router.post('/:email/friends/requests/decline', function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail;
    // check if friend request exists
    queries.getFriendRequest(email, friendEmail).then(friendRequest => {
        if (friendRequest) {
            // delete friend request
            queries.declineFriendRequest(email, friendEmail).then(friend => {
                return res.send(friend);
            }).catch(err => {
                return res.status(404).send(err);
            });
        } else {
            return res.status(404).send(new Error("Friend request does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// send a friend request for a user given user email and friend email
router.post('/:email/friends/requests/send', function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail;
    // check if friend is a user in the database
    queries.getUserByEmail(friendEmail).then(friend => {
        if (friend) {
            // check if friend request already exists
            queries.getFriendRequest(email, friendEmail).then(friendRequest => {
                if (friendRequest) {
                    return res.status(404).send(new Error("Friend request already exists"));
                } else {
                    // check if friend already exists
                    queries.getFriend(email, friendEmail).then(friend => {
                        if (friend) {
                            return res.status(404).send(new Error("Friend already exists"));
                        } else {
                            // send friend request
                            queries.sendFriendRequest(email, friendEmail).then(friend => {
                                return res.send(friend);
                            }).catch(err => {
                                return res.status(404).send(err);
                            });
                        }
                    }).catch(err => {
                        return res.status(404).send(err);
                    });
                }
            });
        } else {
            return res.status(404).send(new Error("Friend does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});

// delete a friend for a user given user email and friend email
router.post('/:email/friends/delete', function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail;
    // check if friend is a user in the database
    queries.getUserByEmail(friendEmail).then(friend => {
        if (friend) {
            // check if the friend exists
            queries.getFriend(email, friendEmail).then(friend => {
                if (friend) {
                    // delete friend
                    queries.deleteFriend(email, friendEmail).then(friend => {
                        return res.send(friend);
                    }).catch(err => {
                        return res.status(404).send(err);
                    });
                } else {
                    return res.status(404).send(new Error("Friend does not exist"));
                }
            }).catch(err => {
                return res.status(404).send(err);
            });
        } else {
            return res.status(404).send(new Error("Friend does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});

module.exports = router;
