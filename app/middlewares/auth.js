const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}