
const mongoose = require('mongoose')


const scheduleSchema =new mongoose.Schema({

    courseId : {
        type :mongoose.Types.ObjectId,
        required : [true , "Select a Course"]
    },
    subject : {
        type : String,
        required : [true , "Please choose a subject"]
    },
    date : {
        type : String,
        required : [true , "Please choose a date to schedule the class"]
    },
    users : {
        type : [{type : mongoose.Types.ObjectId}], 
    },
    slots : {
        type : Number,
        required : [true , " Please choose a slot "]
    }
})

module.exports = mongoose.model('Schedule',scheduleSchema)