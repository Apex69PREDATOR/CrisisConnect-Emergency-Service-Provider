import React from 'react'
import './Dashboard.css'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { useRef,useEffect,useState } from 'react'
import Adminlogout from './Adminlogout'
import "./logout.css"
import "./table.css"
const HospitalAdmin = (title) => {
  const service=useRef({name:"Hospital"})
  const [victim,setVictim]=useState([])
  useEffect(()=>{
    const wait=async ()=>{
      let c=await checkLogin()
    if(!c){
      navigate('/admin')
    }
    }
    wait()
   get_data()
  },[])
  const navigate = useNavigate();
  const get_data=async()=>{
    let res=await fetch("http://localhost:5000/regitered-services",{method:"POST",headers: {
      'Content-Type': 'application/json'
  },body:JSON.stringify(service.current)})
  let r=await res.json()
  setVictim(r)
}
const checkLogin=async ()=>{
  let res=await fetch("http://localhost:5000/admin-dashboard")
  let obj= await res.json()
  if(obj.email && obj.password){
    return true
  }
  else
  return false
 }

 const set_logout=()=>{
  let log_out=document.getElementById("logout-page")
  let sheet=document.getElementsByClassName("sheet")[0]
  log_out.style.display="flex"
  sheet.style.display="block"
 }
 const find_place_redirection=(e)=>{
  let arr=e.target.parentElement.getElementsByClassName('coords')[0].innerHTML.split(',')
  let longi=arr[1].slice(0,arr[1].length)
  let lati=arr[0].slice(0,arr[0].length)
  title.modifyCoordinate({lat:lati,lng:longi})
  title.service('hospital')
  navigate("/find-nearest-place")
}
  return (
    <>
      <nav className="flex justify-between items-center fixed">
        <div><h1 className=" logo">CrisisConnect</h1></div>
        <div className='flex gap-9'>
          <button onClick={() => navigate("/admindashboard")} className='loginup'>Dashboard</button>
          <button className='loginup' onClick={set_logout}>Log Out</button>
        </div>
      </nav>
      <main className='dash'>
        <div className="welcome flex justify-center pt-32">
          <h1>Hospital Support</h1>
        </div>
        <div className="overflow-x-auto pt-10">
          <table className='table-auto min-w-full tabserve'>
            <thead className='sticky top-0 bg-white'>
              <tr>
              <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>User Name</h4></th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>Email ID</h4></th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>Phone No</h4></th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>Location</h4></th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>District</h4></th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>State</h4></th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>Pin-Code</h4></th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>Coords</h4></th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'><h4>Time</h4></th>
              </tr>
            </thead>
            <tbody className='bg-white'>
            {victim.map((key)=>{
              return(<tr key={key._id} onClick={find_place_redirection}>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500">{key.name}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500">{key.email}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500">{key.phone}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500"> {key.location}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500">{key.district}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500">{key.state}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500">{key.pincode}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500 coords">{key.coordinates==undefined?'00,00':key.coordinates}</td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500"> {key.req_time}</td>
              </tr>)
              })}
            </tbody>
          </table>
        </div>
      </main>
      <Adminlogout/>
      <div className="sheet"></div>
      <Footer />
    </>
  )
}

export default HospitalAdmin
