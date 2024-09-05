import mongoose from "mongoose";
const service=mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    req_time:Date,
    location:String,
    pincode:String,
    state:String,
    suburb:String,
    fullfilled:Boolean,
    service:String,
    district:String,
    coordinates:String
})
const requestService=mongoose.model("requestService",service)
export default requestService