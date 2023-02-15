
const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken')
module.exports = {
    userLogin: (req, res, next) => {
        console.log("reached")
        userModel.verify(req.body).then((data) => {
            let token =  jwt.sign(data.toJSON() , process.env.ACCESS_TOKEN_USER_SECRET ,{ expiresIn : "2d"})
            res.cookie("usertoken", token, {
                httpOnly: true
            })
            res.status(201).json({data})
            console.log(data)
        }).catch((err)=>{
            let response = {
                error : err.message ,
                success : false
            }
         
            console.log(err.message)
            res.status(401).json(response)
        })
    },

    userRegister: (req, res, next) => {
        userModel.create(req.body).then((data) => {
            console.log(data)

            let response = {
                data: data,
                success: true
            }
            res.json(response)

        }).catch((err) => {
            console.log(err)
            let response = {
                err: err.message,
                success: false
            }
            res.json(response)
        })
    },


    // userSignout: (req, res, next) => {
    //     console.log(req.body)

    // }

}