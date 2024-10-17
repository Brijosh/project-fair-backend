// logic for register
// username, email,password=>(email? in Db )? "user already exists":"post method execution  -data saved to database"

const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
exports.register = async (req, res) => {
    console.log('Inside RegisterController');
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        // 1 Check email in mongodb (model)
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json("User already registered...")
        }
        else {
            const newUser = new users({
                username, email, password, github: "", linkedin: "", profilePic: ""
            })
            // save new user to database
            await newUser.save()
            // send response to client
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json({ message: err })
    }
}

exports.login = async (req, res) => {
    console.log('Inside login controller');
    const { email, password } = req.body
    console.log(email, password);
    try {
        // 1 Check email in mongodb (model)
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            // token generation
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_key)
            res.status(200).json({ user: existingUser, token })
        }
        else {
            res.status(404).json("invalid email or password")
        }
    }
    catch (err) {
        res.status(401).json({ message: err })
    }

}