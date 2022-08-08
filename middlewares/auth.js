var jwt = require('jsonwebtoken')

function verifyJWT(req, res, next) {
    let token = req.headers["x-access-token"]?.split(' ')[1]
    console.log(req.originalUrl)
    console.log("verifyJWT", req.originalUrl)

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: "error",
                    message: "Token verification failed"
                })

            }
            // add decoded user to req
            req.user = {
                username: decoded.username,
                email: decoded.email
            }

            console.log("jwt user is", req.user)

            if (!req.params.email || req.params.email === 'null') {
                req.params.email = req.user.email
            }
            if (!req.params.username || req.params.username === 'null') {
                req.params.username = req.user.username
            }

            console.log("req.params is", req.params)
            console.log("next is called")
            next()
        })
    } else {
        return res.status(403).json({
            status: "error",
            message: "No token given"
        })
    }
}

module.exports = verifyJWT

