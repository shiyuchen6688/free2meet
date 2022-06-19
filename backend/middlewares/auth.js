var jwt = require('jsonwebtoken')

export function verifyJWT(req, res, next) {
    let token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    status: "error",
                    message: "Token verification failed"
                })
                // add decoded user to req
                req.user = {
                    username: decoded.username,
                    email: decoded.email
                }
                next()
            }
        })
    } else {
        return res.json({
            status: "error",
            message: "No token given"
        })
    }
}