const { response } = require('express');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const  bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required :[true,"First Name is required"]
    },
    email : {
        type :String,
        required : [true , "Email is required"],
        unique : [true , "Email should be unique"]

    },
    password : {
        type : String,
        required : [true , "Password is required"]
    },
    course : {
        type : ObjectId, 
        required : [true , "Please select a course"]
    },
    status : {
        type : Boolean,
        default : false
    }
})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
    next();
})

userSchema.statics.verify = async function({email,password}){
    const user = await this.findOne({email : email});
    console.log(user) 
    if(user) {
        if(user.status){
        const auth = await bcrypt.compare(password,user.password);
        console.log(auth)
        if(auth) {
            return user;
        }
        throw Error("Incorrect Password");
    }
    throw Error("No authorization Granted yet !")
    }
    throw Error("Incorrect Email");
}

let userModel = mongoose.model('Users',userSchema)






module.exports = userModel