require('dotenv').config()
require('colors')

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey"
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 13

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "lifetracker"

    // if the DATABASE_URL env. variable, use that.
    // otherwise, create the db connection string outselves

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

console.log("App Config".red)
console.log("PORT:".blue, PORT)
console.log("Database URI:".blue, getDatabaseUri())
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR)
console.log("SECRET_KEY".red, SECRET_KEY)
console.log("-🐻-🎠-🐝-".blue)

module.exports = {
    PORT,
    getDatabaseUri,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
}