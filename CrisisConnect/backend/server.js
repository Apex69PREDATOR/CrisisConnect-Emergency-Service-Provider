import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser';
import registered_users from './model/Schema_RegisteredUsers.js';
import transporter from './model/mail.js';
import mailOptions from './model/mailOptions.js';
import admin from './model/admin_schema.js';
import service from './model/service_seek_schema.js';
import messege from './model/messege_schema.js';
import axios from 'axios';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
const client=mongoose.connect('mongodb://0.0.0.0:27017/CrisisConnect').then((val)=>{
    console.log('connected')
})
const log_stat={email:false,password:false,name:null,email_val:null}
const admin_log_stat={email:false,password:false}
const chat={current:null}
const otp_info={}
const verify_status=[]
const setchat=(obj,email)=>{
  obj.current=email
}
app.get('/',(req,res)=>{
res.send("hello world!!")
})
const set_logout=(obj)=>{
  obj.email=false
  obj.password=false
  obj.name=null
  obj.email_val=null
}
const set_logout_adm=(obj)=>{
  obj.email=false
  obj.password=false
}
const geo_code=async (latitude,longitude)=>{
  let f=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=f5ec9f0dc41d40498e09d0421f507c4a`)
  let res=await f.json()
  return res
}
function generateOtp(){
  let num=0
  for(let i=0;i<4;i++){
    num=num*10+Math.floor(Math.random()*9)
  }
  return num
}
function unverify_otp(obj,key_to_del){
  delete obj[key_to_del]
}
function empty_email_otp(obj,str){
  delete obj[str]
}
function empty_email_otp_timeout(obj,str){
  setTimeout(() => {
    empty_email_otp(obj,str)
  }, 180 * 1000);
}
app.post('/createAccount', async (req, res) => {
  let u_fullname=req.body.name
  let u_sex=req.body.sex
  let u_height=req.body.height
  let u_weight=req.body.weight
  let u_bloodgroup=req.body.bloodgroup
  let u_dob=req.body.dob
  let u_email=req.body.email
  let u_phoneno=req.body.phone
  let u_adharno=req.body.aadhar
  let u_homeaddress=req.body.address
  let u_password=req.body.password
  let new_user
  let sign_in_stat={email:false,email_unique:false,password:false}
  let existed_user= await registered_users.findOne({email:u_email})
  try{
  new_user=await new registered_users({fullname:u_fullname,sex:u_sex,height:u_height,weight:u_weight,bloodgroup:u_bloodgroup,dob:u_dob,email:u_email,phoneno:u_phoneno,adharno:u_adharno,homeaddress:u_homeaddress,password:u_password})
  await new_user.save()
  sign_in_stat.email=true
  sign_in_stat.email_unique=true
  sign_in_stat.password=true
  }
  catch(error){
    res.send(sign_in_stat)
  }
  if(existed_user==null){
  mailOptions['to']=u_email
  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      res.send("error")
      console.log("error sending mail")
    }
    else
    console.log("sent successfully")
  })
  console.log(`${u_fullname} have been created`)
  res.send(sign_in_stat)
}
});
app.post("/login",async (req,res)=>{
  set_logout(log_stat)
  let log_email=req.body.email
  let log_pass=req.body.password
  let db_email= await registered_users.findOne({email:log_email})
  if(db_email!==null){
    log_stat.email=true
  if(db_email.password === log_pass){
    log_stat.password=true
    log_stat.name=db_email.fullname
    log_stat.email_val=db_email.email
  }
  else
    log_stat.password=false
  }
  res.send(log_stat)
})
app.get('/dashboard',(req,res)=>{
  res.send(log_stat)
})
app.get('/logout',(req,res)=>{
  set_logout(log_stat)
  res.send(log_stat)
})
app.post("/admin-login",async (req,res)=>{
  set_logout_adm(admin_log_stat)
  let a_email=req.body.email
  let a_password=req.body.password
  let admin_val=await admin.findOne({})
  if(admin_val!==null){
  if(a_email===admin_val.email){
    admin_log_stat.email=true
    if(a_password===admin_val.password){
      admin_log_stat.password=true
    }
  }
}
  res.send(admin_log_stat)
})
app.get("/admin-dashboard",(req,res)=>{
  res.send(admin_log_stat)
})
app.get("/admin-logout",(req,res)=>{
  set_logout_adm(admin_log_stat)
  res.send(admin_log_stat)
})
app.post("/request-service",async (req,res)=>{
  let latitude=req.body.Latitude
  let longitude=req.body.Longitude
  let coordinate=latitude.toString() + " N," + longitude.toString() +" E"
  let problem=req.body.service
  let confirm=req.body.isconfirm
  let obj=await geo_code(latitude,longitude)
  let now = new Date()
  if(confirm){
  if(log_stat.email===true && log_stat.password==true){
    let user_details=await registered_users.findOne({email:log_stat.email_val})
    try{
    let serve=await new service({name:user_details.fullname,
      email:user_details.email,
      phone:user_details.phoneno,
      req_time:now,
      location:obj.results[0].formatted,
      pincode:obj.results[0].components.postcode,
      state:obj.results[0].components.state,
      suburb:obj.results[0].components.suburb,
      fullfilled:false,
      service:problem,
      district:obj.results[0].components.state_district,
      coordinates:coordinate});
      await serve.save()
      console.log("service created")
      let requestMailOptions = {
        from: mailOptions.from,
        to: user_details.email,
        subject: "Service Request Confirmation",
        text: `Dear ${user_details.fullname},\n\nYour service request for '${problem}' has been successfully submitted.\n\nDetails:\nLocation: ${obj.results[0].formatted}\nTime: ${now}\n\nThank you,\nCrisisConnect Team`
      };
      transporter.sendMail(requestMailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email: ", error);
          res.status(500).send("Service request submitted, but there was an error sending the confirmation email.");
        } else {
          console.log("Email sent successfully: ");
          res.send("Service request submitted and confirmation email sent.");
        }
      });
    }
    catch(error){
      res.send("Sorry your service request cannot be submitted try again after some time")
    }
  }
  else
  res.send("Sorry your service request cannot be submitted try again after some time")
 }
  else{
  res.send(obj.results[0])
  }
})
app.post("/reqsermanually",async (req,res)=>{
  if(log_stat.email && log_stat.password){
    let now=new Date()
    let user_details=await registered_users.findOne({email:log_stat.email_val})
    try{
      let x=await  fetch(`https://api.opencagedata.com/geocode/v1/json?q= ${req.body.hcity}+${req.body.hdistrict}+${req.body.hstate}+${req.body.hcountry}&key=f5ec9f0dc41d40498e09d0421f507c4a&pretty=1`)
     let forgeo=await x.json()
     let coords=forgeo.results[0].geometry.lat.toString() + "," + forgeo.results[0].geometry.lng.toString()
     console.log(forgeo.results[0].geometry)
    let serve=await new service({name:user_details.fullname,
      email:user_details.email,
      phone:user_details.phoneno,
      req_time:now,
      location:req.body.haddress,
      pincode:req.body.hpin,
      state:req.body.hstate,
      suburb:req.body.hcity,
      fullfilled:false,
      service:req.body.hservice,
      district:req.body.hdistrict,
      coordinates:coords})
      await serve.save()
      console.log("service created")
      let requestMailOptions = {
        from: mailOptions.from,
        to: user_details.email,
        subject: "Service Request Confirmation",
        text: `Dear ${user_details.fullname},\n\nYour service request for '${req.body.hservice}' has been successfully submitted.\n\nDetails:\nLocation: ${req.body.haddress}\nTime: ${now}\n\nThank you,\nCrisisConnect Team`
      };
      transporter.sendMail(requestMailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email: ", error);
          res.status(500).send("Service request submitted, but there was an error sending the confirmation email.");
        } else {
          console.log("Email sent successfully: ");
          res.send("Service request submitted and confirmation email sent.");
        }
      });
    }
      catch(error){
      res.send("Sorry your service request cannot be submitted try again after some time")
      } 
  }
  else{
    res.send("Sorry your service request cannot be submitted try again after some time")
  }
})
app.post("/regitered-services",async (req,res)=>{
  let service_name=req.body.name
  let seekers=await service.find({service:service_name})
  res.send(seekers)
})
app.post("/chat-post",async (req,res)=>{
  let email_tobefind=''
  if(req.body.sender==='admin'){
    if(admin_log_stat.email && admin_log_stat.password){
      email_tobefind=chat.current
    }
  }
  else if(req.body.sender='user'){
    if(log_stat.email && log_stat.password){
      email_tobefind=log_stat.email_val
    }
  }
  const msg=await messege.findOne({email:email_tobefind})
  if(msg===null){
    let new_msg=await new messege({email:email_tobefind,Messege:[{sender:req.body.sender,messege:req.body.messege}]})
    await new_msg.save()
  }
  else{
    let all_msg=await messege.findOne({email:email_tobefind})
    let x=all_msg.Messege
    x.push({sender:req.body.sender,messege:req.body.messege})
    await messege.findOneAndUpdate({email:email_tobefind},{Messege:x})
  }
  res.send({chat:true})
})
app.post("/chat-get",async (req,res)=>{
  let email_tobefind=''
  if(req.body.sender=='admin'){
    if(admin_log_stat.email && admin_log_stat.password){
     email_tobefind=chat.current
    }
  }
  else if(req.body.sender='user'){
    if(log_stat.email && log_stat.password)
     email_tobefind=log_stat.email_val
  }
    let messeges=await messege.findOne({email:email_tobefind})
    if(messeges !== null)
    res.send({chat:true,messege:messeges.Messege})
    else
    res.send({chat:false})
})
app.get("/get_messege_email",async (req,res)=>{
  let emails=await messege.find({})
  res.send(emails)
})
app.post("/generate-otp",async (req,res)=>{
  let email_for_otp=req.body.otpemail
  let email_present=await registered_users.findOne({email:email_for_otp})
  if(email_present!==null){
    let otp=generateOtp()
    let requestMailOptions={
      from: mailOptions.form,
      to: email_for_otp,
      subject: "Crisist Connect otp confirmation",
      text: `your one time password is ${otp} valid for 3 min`
    }
    transporter.sendMail(requestMailOptions,(error,info)=>{
      if(error){
        res.send("error sending mail")
      }
      else{
        res.send('check your email for otp')
        otp_info[`${email_for_otp}`]=otp
        empty_email_otp_timeout(otp_info,email_for_otp)
      }
    })
  }
  else{
    res.send('email not registered or invalid email')
  }
})
app.post("/find_keyplaces",async (req,res)=>{
  // async function findNearestPlace(lat, lng, query) {
    // try {
    //   const response = await axios.get("https://nominatim.openstreetmap.org/search", {
    //     params: {
    //       q: query,
    //       format: "json",
    //       limit: 2,
    //       viewbox: `${lng-0.2},${lat+0.2},${lng+0.2},${lat-0.2}`,
    //       bounded: 1
    //     }
    //   });
  
    //   return response.data;
    // } catch (error) {
    //   console.error(error);
    // }
  // }

// Define the search radius (in meters)
let radius
req.body.type==='fire_station' || req.body.type==='hospital' ?radius=40000:radius=10000
// Overpass API query to find restaurants
const overpassUrl = "http://overpass-api.de/api/interpreter";
const overpassQuery = `
[out:json];
node
  ["amenity"="${req.body.type}"]
  (around:${radius},${req.body.lat},${req.body.lng});
out body;
`;

async function findNearbyPlaces() {
  try {
    const response = await axios.get(overpassUrl, {
      params: {
        data: overpassQuery
      }
    });
    const data = response.data;
    // Extract relevant information
    if (data.elements) {
      data.elements.forEach(element => {
        const name = element.tags?.name || 'No name available';
        const lat = element.lat;
        const lon = element.lon;
      });
      res.send(data.elements)
    } else {
      console.log('No results found');
    }
  } catch (error) {
    console.error('Error fetching data from Overpass API:', error);
  }
}

findNearbyPlaces();

  // findNearestPlace(parseFloat(req.body.lat),parseFloat(req.body.lng), req.body.type)
  //   .then(results => {
  //     console.log(results[0])
  //     res.send(results[0])})
  //   .catch(err => res.send(err));
  
})
app.post("/verify-otp",async (req,res)=>{
  let otp=parseInt(req.body.otp)
  let email=req.body.otpemail
  let verify_info={email_matched:false,otp_matched:false}
  for(let i=0;i<Object.keys(otp_info).length;i++){
    if(email===Object.keys(otp_info)[i]){
      verify_info.email_matched=true
      if(otp===otp_info[`${email}`]){
        verify_status.push(email)
        verify_info.otp_matched=true
      }
    }
  }
  res.send(verify_info)
})
app.post("/update-password",async (req,res)=>{
  let new_password=req.body.password
  let email_for_otp=req.body.otpemail
  let verify_done=false
  let update_stat={updatedone:false}
  verify_status.forEach(val=>{
    if(val===email_for_otp)
    verify_done=true
  })
  if(verify_done){
    let updatepass=await registered_users.findOneAndUpdate({email:email_for_otp},{password:new_password})
    if(updatepass!==null)
    update_stat.updatedone=true
    console.log(verify_status)
    unverify_otp(verify_status,verify_status.indexOf(email_for_otp))
    console.log(verify_status)
    empty_email_otp(otp_info,email_for_otp)
  }
  res.send(update_stat)
})
app.post("/session-chat-email",(req,res)=>{
  try{
    let email=req.body.email
    setchat(chat,email)
    res.send(true)
  }
  catch(error){
    res.send(false)
  }
})
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
