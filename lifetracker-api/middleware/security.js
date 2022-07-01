const bcrypt = require("bcrypt")

const p = "supersecretpassword"

bcrypt.hash(password, 6, (err, hashedPassword) => {
    console.log(`Password is ${password}`)
    console.log(`Hashed`)
})