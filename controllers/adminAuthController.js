
const jwt = require('jsonwebtoken')

const admin = {
    username: 'admin',
    password: 'admin'
}

module.exports = {
    adminLogin: (req, res) => {
        let { username, password } = req.body
        console.log(req.body)
        if (username == admin.username) {
            if (password == admin.password) {

                let token = jwt.sign({ username: admin.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })
                console.log(token)
                res.cookie("token", token, {
                    httpOnly: true
                })
                res.json({
                    message: "Login successful",
                    status : true
                })
            } else {
                res.json({
                    error: "Password is incorrect",
                    status : false
                })
            }

        } else {
            res.json({
                error: "Username is not valid",
                status : false

            })

        }
    }
}