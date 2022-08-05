var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var verifyJWT = require('../middlewares/auth');
const queries = require('../model/queries');
const tagQueries = require('../model/tagQueries');
require('dotenv').config()

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
                    user.friendRequests = [];
                    user.friendRequestsSent = [];
                    user.meetupsCreated = [];
                    user.meetupsPending = [];
                    user.meetupsAccepted = [];
                    user.meetupsDeclined = [];
                    user.tags = [];
                    user.model = "";
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
router.patch('/reset-password', (req, res) => {
    // check if user exists
    queries.getUserByEmail(req.body.email).then(user => {
        if (user) {
            // encrypt password
            bcrypt.hash(req.body.password, 10).then((password) => {
                user.password = password;
                // update user
                queries.patchUser(user).then(user => {
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

router.patch('/:email/change-password', async function (req, res, next) {
    const email = req.params.email;
    const { oldPassword, newPassword } = req.body
    queries.getUserByEmail(email).then(matchedUser => {
        if (matchedUser) {
            bcrypt.compare(oldPassword, matchedUser.password).then(passwordCorrect => {
                if (passwordCorrect) {
                    bcrypt.hash(newPassword, 10).then(encryptedNewPassword => {
                        matchedUser.password = encryptedNewPassword
                        // update user
                        queries.patchUser(email, { password: encryptedNewPassword }).then(user => {
                            return res.status(200).send(user)
                        })
                    })
                } else {
                    return res.status(404).send({ message: "Old Password is incorrect" })
                }
            })
        } else {
            return res.status(404).send(new Error("Email does not exist"))
        }
    })
})


router.patch('/:email/change-username', async function (req, res, next) {
    const email = req.params.email;
    const { password, newUsername } = req.body
    queries.getUserByUsername(newUsername).then(matchedUser => {
        // check if new username already exist
        if (matchedUser) {
            return res.status(404).send(
                { message: "Username already used by another user" }
            )
        }
        // update email of exisitng user
        queries.getUserByEmail(email).then(matchedUser => {
            if (matchedUser) {
                bcrypt.compare(password, matchedUser.password).then(passwordCorrect => {
                    if (passwordCorrect) {
                        matchedUser.username = newUsername
                        // update user
                        queries.patchUser(email, { username: newUsername }).then(user => {
                            return res.status(200).send(user)
                        })

                    } else {
                        return res.status(404).send({ message: "Password is incorrect" })
                    }
                })
            } else {
                return res.status(404).send({ message: "User does not exist" })
            }
        })
    })
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
router.get('/:email/friends/requests', function (req, res, next) {
    const email = req.params.email;
    queries.getFriendRequests(email).then(friendRequests => {
        console.log("friendRequests", friendRequests)
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
    const friendEmail = req.body.friendEmail; // fromEmail, friend sent my the request
    // check if friend request exists
    queries.getFriendRequestReceived(email, friendEmail).then(friendRequest => {
        if (friendRequest) {
            // accept friend request
            queries.acceptFriendRequest(email, friendEmail).then(friendRequest => {
                return res.send(friendRequest);
            }).catch(err => {
                console.log(err)
                return res.status(404).send(err);
            });
        } else {
            console.log("Friend request does not exist")
            return res.status(404).send(
                {
                    message: "Friend request does not exist",
                    error: new Error("Friend request does not exist")
                }
            );
        }
    });
});

// decline a friend request for a user given user email and friend email
router.post('/:email/friends/requests/decline', function (req, res, next) {
    const email = req.params.email;
    const friendEmail = req.body.friendEmail; // fromEmail
    // check if friend request exists
    queries.getFriendRequestReceived(email, friendEmail).then(friendRequest => {
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
    if (email === friendEmail) {
        return res.status(404).send({ error: "User email cannot equal to friend email" });
    }
    // check if friend is a user in the database
    queries.getUserByEmail(friendEmail).then(friend => {
        if (friend) {
            // check if friend request already exists
            queries.getFriendRequestSent(email, friendEmail).then(friendRequest => {
                if (friendRequest) {
                    console.log("Friend request already exists")
                    return res.status(404).send(new Error("Friend request already exists"));
                } else {
                    // check if friend already exists
                    queries.isFriend(email, friendEmail).then(isFriend => {
                        if (isFriend) {
                            console.log("Friend already exists")
                            return res.status(404).send(new Error("Friend already exists"));
                        } else {
                            // send friend request
                            queries.sendFriendRequest(email, friendEmail).then(friend => {
                                return res.send(friend);
                            }).catch(err => {
                                console.log(err)
                                return res.status(404).send(err);
                            });
                        }
                    }).catch(err => {
                        console.log(err)
                        return res.status(404).send(err);
                    });
                }
            });
        } else {
            console.log("Friend does not exist")
            return res.status(404).send(new Error("Friend does not exist"));
        }
    }).catch(err => {
        console.log(err)
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
            queries.isFriend(email, friendEmail).then(isFriend => {
                if (isFriend) {
                    // delete friend
                    queries.deleteFriend(email, friendEmail).then(friend => {
                        return res.send(friend);
                    }).catch(err => {
                        console.log(err)
                        return res.status(404).send(err);
                    });
                } else {
                    return res.status(404).send(new Error("Friend does not exist"));
                }
            }).catch(err => {
                console.log(err)
                return res.status(404).send(err);
            });
        } else {
            return res.status(404).send(new Error("Friend does not exist"));
        }
    }).catch(err => {
        return res.status(404).send(err);
    });
});

router.delete('/:email/delete-account', async function (req, res, next) {
    const email = req.params.email;

    // delete meetups this user created
    meetupsCreated = await queries.getMeetupsCreated(email)
    for (m of meetupsCreated) {
        await queries.deleteMeetupById(m.id)
    }

    // delete user from meetups that invited this user
    meetupsInvited = await queries.getMeetupsByInvitedUser(email)
    for (m of meetupsInvited) {
        await queries.deleteUserFromMeetupInvitees(email, m)
    }

    // delete user
    deleteResult = await queries.deleteUserByEmail(email)
    return res.status(200).send(deleteResult)
});

module.exports = router;
