const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { PORT } = require("./config")
require("colors")
const authRoutes = require("./routes/auth")
const { BadRequestError, NotFoundError } = require("./utils/errors")
const app = express()
const security = require("./middleware/security")

// allow other origins to access this api
app.use(cors())
// parse incoming request bodies with JSON payloads 
app.use(express.json())
// log request info
app.use(morgan("tiny"))
// extract user info from token; if no token, throw unauthorized error
app.use(security.extractUserFromJwt)

// access the authentication routes
app.use("/auth", authRoutes)
// if no response (aka we call next()), then we continue with middleware layers below

// if endpoint does not match defined endpoints, we call this middleware
app.use((req, res, next) => {
    return next(new NotFoundError())
})

// generic error handler
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status } // response if unsuccessful endpoint call
    })
})

// const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on PORT ${PORT} 🤘`.bgGreen)
})