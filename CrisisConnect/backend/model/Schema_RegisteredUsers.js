import mongoose from "mongoose";
let new_user=mongoose.Schema({
    fullname:String,
    sex:String,
    height:Number,
    weight:Number,
    bloodgroup:String,
    dob:Date,
    email:String,
    phoneno:Number,
    adharno:Number,
    homeaddress:String,
    password:String
})
const registered_users=mongoose.model("RegisteredUsers",new_user)
registered_users.collection.createIndex({email:1},{unique:true})
export default registered_users