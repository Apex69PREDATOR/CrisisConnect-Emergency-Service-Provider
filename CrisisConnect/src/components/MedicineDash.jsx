import React from 'react'
import './Dashboard.css'
import Footer from './Footer'
import { useNavigate, useOutlet } from 'react-router-dom'
import { useEffect,useState } from 'react'
import Confirmrequest from './Confirmrequest'
import "./confirmrequest.css"
import Logout_page from './Logout_page'
import Manual_address from './Manual_address'
const MedicineDash = () => {
    const navigate = useNavigate();
    const [serviceInfo,setServiceinfo]=useState(null)
  const [locationfound,setLocationfound]=useState(false)
  const [coordinateQuery,setCoordinateQuery]=useState({})
  const [name,setName]=useState('')
    useEffect(()=>{
      const wait=async ()=>{
        let c=await get_name()
        if(!c){
          navigate('/login')
        }
      }
      wait()
    },[])
    const update_sheet=()=>{
      let s=document.querySelector(".sheet")
      s.style.display="block"
    }
    const get_name=async ()=>{
      let res=await fetch("http://localhost:5000/dashboard")
      let log_stat=await res.json()
      if(log_stat.email && log_stat.password){
      setName(log_stat.name)
      return true
      }
      else
      return false
      }
      const accessLocation = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    {
                        maximumAge: 0,
                        timeout: 5000,
                        enableHighAccuracy: true
                    }
                );
            });
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude:", latitude, "Longitude:", longitude);
            const coordinates={Latitude:latitude,Longitude:longitude,service:"Medicine",isconfirm:false}
            setCoordinateQuery({Latitude:latitude,Longitude:longitude,service:"Medicine",isconfirm:true})
            let res=await fetch("http://localhost:5000/request-service",{method:"POST",headers: {
              'Content-Type': 'application/json'
          },body:JSON.stringify(coordinates)})
            let obj=await res.json()
            setServiceinfo(obj)
            setLocationfound(true)
            update_sheet()
        } catch (error) {
            console.error("Error accessing location:", error);
            setLocationfound(false)
        }
    };
    const set_logout=()=>{
      let log_out=document.getElementById("logout-page")
      let sheet=document.getElementsByClassName("sheet")[0]
      log_out.style.display="flex"
      sheet.style.display="block"
     }
     const getlocationpage=()=>{
      let mp=document.querySelector(".manual_address")
      let sheet=document.getElementsByClassName("sheet")[0]
  mp.style.display="block"
  sheet.style.display="block"
     }
  return (
    <>
    <nav className="flex justify-between items-center fixed">
        <div><h1 className=" logo">CrisisConnect</h1></div>
        <div className='flex gap-9'>
        <button onClick={() => navigate("/dashboard")} className='retdash'>Dashboard</button>          
        <button  className='logout' onClick={set_logout}>Log Out</button>
        </div>
      </nav>
      <main className='dash'>
        <div className="welcome flex justify-center pt-32">
          <h1>Welcome {name}</h1>
        </div>
        <div className="dashboard flex gap-20 justify-center mt-28">
          <div className="card fireSupport" onClick={accessLocation}>
            <img className="poster" src=".\src\assets\currentlocation.jpeg" alt="CurrentLocation" />
            <h2 className="text-center">Current Location</h2>
          </div>
          <div className="card policeSupport" onClick={getlocationpage}>
            <img className="poster" src=".\src\assets\homelocation.jpeg" alt="HomeLocation" />
            <h2 className="title">Home Location</h2>
          </div>
        </div>
      </main>
      {locationfound &&<Confirmrequest city={serviceInfo.components.suburb} state={serviceInfo.components.state} pincode={serviceInfo.components.postcode} address={serviceInfo.formatted} district={serviceInfo.components.
state_district } flag={setLocationfound} query={coordinateQuery}/>}
<div className="sheet"></div>
<Logout_page/>
<Manual_address hservice={"Medicine"}/>
      <Footer />
    </>
  )
}

export default MedicineDash
