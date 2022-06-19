var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { default: App } = require('../../frontend/src/App');
const { verifyJWT } = require('../middlewares/auth');
require('dotenv').config()

/** Schema of user include:
 *  username (unique key for user), password (encryption needed?), email address...
 */

let users = []

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
    const takenUserName = users.find(u => r.username === user.username)
    const takenEmail = users.find(u => r.username === user.username)

    if (takenUserName || takenEmail) {
        res.json({
            status: "error",
            message: "Duplicate username of email",
            code: 400
        })
    }

    // encrypt password
    user.password = await bcrypt.hash(user.password, 10)
    users.push(user)
    return res.send({
        status: "success",
        user: user.username
    })
});


/* sign a new user */
router.post('/login', (req, res) => {
    const user = req.body

    const matchStoredUser = users.find(u => r.username === user.username)
    if (!matchStoredUser) {
        return res.json({
            status: "error",
            message: "Username does not exist",
            code: 404
        })
    }

    bcrypt.compare(user.password, matchStoredUser.password)
        .then(passwordCorrect => {
            if (passwordCorrect) {
                let payload = {
                    username: matchStoredUser.username,
                    email: matchStoredUser.email
                }
                jwt.sign(
                    paylod,
                    process.env.JWT_SECRET,
                    { expiresIn: 86400 }, // 1 day
                    (err, token) => {
                        if (err) {
                            return res.json({
                                status: "error",
                                message: err
                            })
                        }
                        // success!
                        return res.send({
                            status: "success",
                            token: "Bearer " + token
                        })

                    }
                )


            } else {
                return res.json({
                    status: "error",
                    message: "Incorrect password",
                    code: 404
                })
            }
        })

})

// access information about a particular user
router.get(':username', verifyJWT, (req, res) => {
    req.json({ message: "not implemented" })
})


module.exports = router;
