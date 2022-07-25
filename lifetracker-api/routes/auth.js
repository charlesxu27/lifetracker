const express = require("express")
const User = require("../models/user")
const router = express.Router()
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")

// all the routes for authentication
router.post("/login", async (req, res, next) => {
    try {
        // take login info and try to authenticate
        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({ user, token })
    }
    catch (err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // take user email password and other info and create new user in DB
        const user = await User.register(req.body)
        const token = createUserJwt(user)

        // return res.status(201).json({"ping":"pong"})
        return res.status(201).json({ user, token })
    } 
    catch (err) {
        next(err)
    }
})

// endpoint to extract email from user
/*
Order of operation:
(1) trigger "/m" route
(2) enter middleware function security.requireAuthenticatedUser()
(3) enter route handler async function
*/
router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // always works bc if user doesn't exist, requireAuthenticatedUser() handles the err
        const { email } = res.locals.user 
        // res.locals.user comes from middleware called earlier in app.js (app.use(security.extractUserFromJwt) 
        const user = await User.fetchUserByEmail(email)
        const publicUser = User.makePublicUser(user)
        return res.status(200).json({ user: publicUser })
    } catch {
        next(err)
    }
})


module.exports = router