import mongoose from "mongoose";
const messege_sch=mongoose.Schema({
    email:String,
    Messege:Array
})
const messege=mongoose.model("messege",messege_sch)
export default messege