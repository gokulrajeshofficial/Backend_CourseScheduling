

const express = require('express')
const { default: mongoose } = require('mongoose')
const courseModel = require('../model/courseModel')
const scheduleModel = require('../model/scheduleModel')
const userModel = require('../model/userModel')
const nodemailer = require('../services/nodemailer')
module.exports = {
    
    home: (req, res, next) => {
        console.log(req.user)
    },


    createCourse: (req, res, next) => {
        let {name,description,duration,subject1,subject2,subject3,subject4} = req.body;
        let subjects ={subject1,subject2,subject3,subject4}
        courseModel.create({name,description,duration,subjects}).then((data) => {
            console.log(data)
            let response = {
                success: true,
                data
            }
            res.json( response )
        }).catch((err) => {
            console.log(err)
            let response = {
                success: false,
                err: err.message
            }
            res.json(response)
        })

    },

    updateCourse: (req, res, next) => {
        let courseId = req.params.id;
        let {name , description , dates} = req.body
        console.log(courseId)
         courseModel.findByIdAndUpdate(courseId,{
            name : name ,
            description : description,
            dates : dates
         },{new:true},(err,data)=>{
            if(err)console.log(err)
            console.log(data)
            let response = {
                status : true ,
                data : data
            }
            res.json(response)
         })
    },
    deleteCourse: (req, res, next) => {
        let courseId = req.params.id;
        courseId = mongoose.Types.ObjectId(courseId)
         courseModel.deleteOne({_id : courseId}).then((data)=>{
            console.log(data)
            let response = {
                success : true,
                _id : courseId
            }
            res.json(response)
         })

    },
    courseList: async(req, res, next) => {
        try{
        let courses  = await courseModel.find({})
        console.log(courses)
        let response = {
            data : courses,
            status : true
        }
        res.json(response)
        }catch(err){
            console.log(err.message)
            let response = {
                err : err.message,
                status : false
            }
            res.json(response)
        }
    },

    userApprovalList : async(req,res)=>{
        try{
        let users = await userModel.find({status : false})
        console.log(users)
        let response = {
            data : users,
            success : true
        }
        res.json(response)
        }catch(err){
            console.log(err)
            let response = {
                err : err.message,
                success : false
            }
            res.json(response)
        }
    },
    userApproval : (req,res,next)=>{
        try{
            let userId = req.params.id ; 
            userModel.findByIdAndUpdate(userId,{status:true},{new:true},(err,data)=>{
                if(err) throw err
                let response = {
                    status : true ,
                    data : data
                }
                nodemailer(data.email)
                res.json(response)
            })

        }catch(err)
        {
            console.log(err)
            let response = {
                status : true,
                err : err
            }
            res.json(response)
        }
        
    },

    scheduleCourse : (req,res,nex)=>{
   
            let {date , subject , slots} = req.body
            let courseId = req.params.id;
            scheduleModel.create({courseId,subject,date,slots}).then((data)=>{
                console.log(data)
                let response = {
                    data : data,
                    success : true
                }
                res.json(response)

            }).catch((error)=>{
                console.log(error.message)
                let response = {
                    err : error,
                    success : false
                }
                res.json(response)
            })


    }






}