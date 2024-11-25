import bcrypt from "bcrypt"


const password = "divine"

const salt = bcrypt.genSaltSync(10)


console.log("salt = " + salt)

const hashedPassword = bcrypt.hashSync(password, salt)

console.log("hashed password = " + hashedPassword);


const correct = bcrypt.compareSync("ayscript", hashedPassword)

if (correct) {
    console.log("Password OK!")
} else {
    console.error("Incorrect Password.")
}

// console.log(bcrypt)