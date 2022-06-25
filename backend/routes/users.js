var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var verifyJWT = require('../middlewares/auth');
require('dotenv').config()

/** Schema of user include:
 *  username (unique key for user), password (encryption needed?), email address...
 */

let users = [
    {
        email: "a",
        username: "a",
        password: "$2a$10$FKPFoOsz.td5FTaOs5kr7eot3WGjEo3pFP2e7eOBSW5Dw0Mry3yF6" // hash for b
    }
]

/* get all users. */
router.get('/', function (req, res, next) {
    return res.send(users);
});


/* add (register) a new user */
router.post('/register', function (req, res, next) {
    // get user from req
    const user = req.body

    // TODO: verify user information (password strong? email valid?)

    // check duplicate email and username
    const takenUserName = users.find(u => u.username === user.username)
    const takenEmail = users.find(u => u.username === user.username)

    if (takenUserName || takenEmail) {
        res.json({
            status: "error",
            message: "Duplicate username of email",
            code: 400
        })
    }

    // encrypt password
    user.password = bcrypt.hash(user.password, 10).then(
        (password) => {
            user.password = password
            users.push(user)
            return res.send({
                status: "success",
                user: user.username
            })
        }
    )

});


/* sign a new user */
router.post('/login', (req, res) => {
    const user = req.body

    console.log(user)

    const matchStoredUser = users.find(u => u.email === user.email)
    console.log("matchStoredUser", matchStoredUser)
    if (!matchStoredUser) {
        return res.status(404).send(new Error("Email does not exist"))

    }

    // console.log("matchStoredUser", matchStoredUser)

    bcrypt.compare(user.password, matchStoredUser.password)
        .then(passwordCorrect => {
            console.log(passwordCorrect)
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
        })

})

// access information about a particular user
router.get('/:username', verifyJWT, (req, res) => {
    res.json({ message: "not implemented" })
})


module.exports = router;
