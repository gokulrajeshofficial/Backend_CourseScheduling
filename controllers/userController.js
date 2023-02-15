const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
const courseModel = require("../model/courseModel");
module.exports = {
    userHome : async(req , res )=>{
        let user = req.user
        courseModel.find({ course  : req.user.course}).then((data)=>{
             console.log(data)
        })

    }

}
