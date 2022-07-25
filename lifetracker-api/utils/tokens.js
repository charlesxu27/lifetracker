// store all token functions

const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

// create user payload object
const createUserJwt = (user) => {
    const payload = {
        email: user.email,
        username: user.username,
        userId: user.id
    }
    return generateToken(payload)
}

// create token given data
const generateToken = (data) =>
    jwt.sign(data, SECRET_KEY, { algorithm: "HS256", expiresIn: "24h" })

// validate token
const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    } catch(err) {
        return {}
    }
}

module.exports = {
    createUserJwt,
    generateToken,
    validateToken
}