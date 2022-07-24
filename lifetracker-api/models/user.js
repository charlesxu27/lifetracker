const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const db = require("../db")
const BCRYPT_WORK_FACTOR = require("../config")
const bcrypt = require("bcrypt")

class User {

    static makePublicUser(user) {
        return {
            username: user.username,
            password: user.password,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
        }
    }

    static async login(credentials) {
        // submit email and password
        // otherwise, throw error
        const requiredFields = ["email", "password"]
        requiredFields.forEach((property) => {
            if (!credentials.hasOwnProperty(property)) {
                throw new BadRequestError(`Missing ${property} in request body.`)
            }
        })

        // fetch user data from database
        const user = await User.fetchUserByEmail(credentials.email) 
        if (user) {
            // compare user pw with inputted pw
            const isValid = await bcrypt.compare(credentials.password, user.password) 
            if (isValid) {
                return User.makePublicUser(user)
            }
        }

        // otherwise, throw unauthorized error
        throw new UnauthorizedError("Invalid Email or Password")
    }

    static async register(credentials) {
        // submit email, password, vaccine info, etc.
        // if any of the fields are missing, throw an error
        const requiredFields = ["username", "password", "firstName", "lastName", "email"]
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) { // checks if this field already exists
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // check if email has the @ symbol
        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }

        // make sure no user already exists with email, otherwise throw error
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        const existingUserWithUsername = await User.fetchUserByUsername(credentials.username)
        if (existingUserWithUsername) {
            throw new BadRequestError(`A user already exists with username: ${credentials.username}`)
        }

        // take user password and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, 13) // why can't I pass in const? 
        // take user email and lowercase it
        const normalizedEmail = credentials.email.toLowerCase()

        // create new user in DB with all the info
        const userResult = await db.query(`
        INSERT INTO users (
            username,
            password,
            first_name,
            last_name,
            email
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING username, password, first_name, last_name, email;
        `, [credentials.username, hashedPassword, credentials.firstName, credentials.lastName, normalizedEmail])
        // return the user
        const user = userResult.rows[0]

        return User.makePublicUser(user)
    }


    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError(`No email provided!`)
        }
        const query = `SELECT * FROM users WHERE email = $1;` // best practice when inserting params
        // query returns a promise
        // https://node-postgres.com/api/client
        const result = await db.query(query, [email.toLowerCase()])
        const user = result.rows[0]

        return user
    }

    static async fetchUserByUsername(username) {
        if (!username) {
            throw new BadRequestError(`No email provided`)
        }
        const query = `SELECT * FROM users WHERE username = $1;`
        const result = await db.query(query, [username])
        const user = result.rows[0]

        return user
    }

}

module.exports = User

