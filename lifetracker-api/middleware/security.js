const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")

// extract JWT from request header
const jwtFrom = ({ headers }) => {
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ")
        if (scheme.trim() === "Bearer") { // if token prefix is correct
            return token
        }
    }
    return undefined
}

// extract user from a valid JWT in the request
const extractUserFromJwt = (req, res, next) => {
    try {
        const token = jwtFrom(req)
        if (token) {
            // TODO: check if this is the right interpretation
            res.locals.user = jwt.verify(token, SECRET_KEY)
            // verify() returns the payload
            // res.locals.user exposes the payload info (email, username, userId)
        }
        return next()
    } catch(err) {
        return next() // pass to requireAuthenticatedUser function
    }
}

// cerify that an authenticated user exists
const requireAuthenticatedUser = (req, res, next) => {
    try {
        console.log("security", res.locals)
        const { user } = res.locals // TODO: how do we know res.locals has the payload? Ohhhh from the previous middleware extractUserFromJwt()?
        // btw { user } means you are getting res.locals.user here
        if (!user?.email) {
            throw new UnauthorizedError()
        }
        return next()
    } catch(err) {
        return next(err)
    }
}

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser
}