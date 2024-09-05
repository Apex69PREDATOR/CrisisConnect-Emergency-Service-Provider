import mongoose from "mongoose";
const admin_dat_typ=mongoose.Schema({
    email:String,
    password:String
})
const admin=mongoose.model("admin",admin_dat_typ)
export default admin