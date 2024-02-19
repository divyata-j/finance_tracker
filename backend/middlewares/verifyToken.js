const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try {
        if (!req.headers.token || req.headers.token === "") {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const jwtSecretKey = process.env.TOKEN_KEY
        const verified = jwt.verify(req.headers.token, jwtSecretKey)

        if (verified) {
            if (!verified.email || !verified.id) {
                res.status(401)
                throw new Error("Invalid token")
            }
            req.body.id = verified.id
            next()
        } else throw new Error("Token expired")
    } catch (err) {
        console.log("VerifyToken: ", err.message)
        res.status(401)
        throw new Error(err.message)
    }
}

module.exports = { verifyToken }
