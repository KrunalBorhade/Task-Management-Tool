require("dotenv").config()
const jwt = require("jsonwebtoken")

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            return resolve(decoded)
        })
    })
}

const authenticate = async (req, res, next) => {
    let decoded;
    try {
        decoded = await verifyToken(token)
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).send({ message: "Authorization token not found or incorrect" })
    }


}

module.exports = authenticate