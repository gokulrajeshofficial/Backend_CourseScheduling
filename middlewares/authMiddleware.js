const express = require('express')
const jwt = require('jsonwebtoken')

module.exports.adminAuth = async(req,res,next)=>{
    let token = req.cookies.token
    console.log(token)
    try{
        const user = jwt.verify( token , process.env.ACCESS_TOKEN_SECRET)
        req.user = user;
        console.log(user)
        next()
    } catch(err){
        res.clearCookie("token");
        console.log(err)
        let response  = {
            error : err,
            message : "No authorization",
            status : false
        }
        return res.json(response)
    }   
}

module.exports.userAuth = (req,res,next)=>{
    let token = req.cookies.usertoken
    try{
        const user = jwt.verify( token , process.env.ACCESS_TOKEN_USER_SECRET)
        req.user = user;
        next()
    } catch(err){
        res.clearCookie("usertoken");
        let response  = {
            error : err,
            message : "No authorization",
            status : false
        }
        return res.json(response)
    }   
}