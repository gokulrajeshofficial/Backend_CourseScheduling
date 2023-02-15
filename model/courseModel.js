const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Course name is required'],
        unique : [true,'Duplicate Exists .Please use another name']
    },
    description : {
        type : String,
        required : [true,'Course desciption is required'],
    },
    duration : {
        type : String,
        required : [true,'Duration is required']
    }, 
    subjects : {
        type : Object,
        required : [true ,'Subjects are required']
    },
    dates : Date

})


module.exports = mongoose.model('Course', courseSchema )