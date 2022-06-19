var express = require('express');
var router = express.Router();

/** Schema of user include:
 *  username, password (encryption needed?), ...
 */

let users = []

/* get all users. */
router.get('/', function (req, res, next) {
    return res.send(users);
});


/* add a new user */
router.post('/', function (req, res, next) {
    let user = {
        username: req.body.username, // id of a user
    }
    userss.push(user)
    return res.send(user)
});

module.exports = router;
