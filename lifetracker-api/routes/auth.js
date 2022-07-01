const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        // take login info and try to authenticate
        const user = await User.login(req.body)
        return res.status(200).json({ user })
    }
    catch (err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // take user email password and other info and create new user in DB
        const user = await User.register(req.body)
        // return res.status(201).json({"ping":"pong"})
        return res.status(201).json({ user })
    } 
    catch (err) {
        next(err)
    }
})


module.exports = router