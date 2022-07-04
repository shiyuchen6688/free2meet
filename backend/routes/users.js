var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var verifyJWT = require('../middlewares/auth');
const queries = require('../model/queries');
require('dotenv').config()

/** Schema of user include:
 *  username (unique key for user), password (encryption needed?), email address...
 */

// let users = [
//     {
//         email: "a",
//         username: "a",
//         password: "$2a$10$FKPFoOsz.td5FTaOs5kr7eot3WGjEo3pFP2e7eOBSW5Dw0Mry3yF6" // hash for b
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
    const user = req.body

    // TODO: verify user information (password strong? email valid?)

    // check duplicate email and username

    // const takenUserName = users.find(u => u.username === user.username)
    // const takenEmail = users.find(u => u.username === user.username)
    let takenUserName1;
    let takenEmail1;
    queries.getUserByUsername(user.username).then(takenUserName => {
        // console.log(takenUserName)
        // console.log(1111)
        takenUserName1 = takenUserName;
        queries.getUserByEmail(user.email).then(takenEmail => {
            // console.log(takenEmail)
            // console.log(2222)
            takenEmail1 = takenEmail;
            if (takenUserName1 !== null || takenEmail1 !== null) {
                // console.log(3333)
                return res.json({
                    status: "error",
                    message: "Username or Email already taken"
                })
            } else {
                // console.log(4444)
                // encrypt password
                user.password = bcrypt.hash(user.password, 10).then((password) => {
                    user.password = password;
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
        // console.log("matchStoredUser", matchStoredUser)
        if (!result) {
            return res.status(404).send(new Error("Email does not exist"))
        }
        bcrypt.compare(user.password, matchStoredUser.password).then(passwordCorrect => {
            // console.log(passwordCorrect)
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
router.get('/:username', verifyJWT, (req, res) => {
    res.json({ message: "not implemented" })
})


module.exports = router;
