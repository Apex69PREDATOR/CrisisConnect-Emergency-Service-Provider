import React from 'react'
import './Dashboard.css'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import Adminlogout from './Adminlogout'
import { useEffect,useState } from 'react'
import "./logout.css"
import Selectiom from './selectiom'
import ChatBox from './ChatBox'
import Select_render from './Select_render'
const AdminDashboard = () => {
  useEffect(()=>{
    const wait=async ()=>{
      let c=await checkLogin()
    if(!c){
      navigate('/admin')
    }
    console.log(c)
    }
    wait()
  },[])
  const [selected,setSelected]=useState(false)
  const [selectionvisible,setSelectionvisible]=useState(false)
  const navigate = useNavigate();
  const set_logout=()=>{
    let log_out=document.getElementById("logout-page")
    let sheet=document.getElementsByClassName("sheet")[0]
    log_out.style.display="flex"
    sheet.style.display="block"
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
  return (
    <>
      <nav className="flex justify-between items-center fixed">
        <div><h1 className=" logo">CrisisConnect</h1></div>
        <button className='logout' onClick={set_logout}>Log Out</button>
      </nav>
      <main className='dash'>
      <div className="welcome flex justify-center pt-32">
          <h1>Welcome Admin</h1>
        </div>
        <div className="dashboard flex gap-20 justify-center mt-28">
          <div onClick={() => navigate("/fireadmin")} className="card fireSupport cursor-pointer">
            <img className="poster" src=".\src\assets\fire.jpg" alt="FireSupport" />
            <h2 className="title">Fire Brigade Support</h2>
          </div>
          <div onClick={() => navigate("/policeadmin")} className="card policeSupport cursor-pointer">
            <img className="poster" src=".\src\assets\police.jpg" alt="PoliceSupport" />
            <h2 className="title">Police Support</h2>
          </div>
          <div onClick={() => navigate("/hospitaladmin")} className="card hospitalSupport cursor-pointer">
            <img className="poster" src=".\src\assets\doc.jpg" />
            <h2 className="title">Hospital Support</h2>
          </div>
          <div onClick={() => navigate("/medicineadmin")} className="card medicineSupport cursor-pointer">
            <img className="poster" src=".\src\assets\shop.jpg" alt="MedicineSupport" />
            <h2 className="title">Medicine Support</h2>
          </div>
        </div>
      </main>
      <Adminlogout/>
      <div className="sheet"></div>
      {!selectionvisible && <Select_render renderfunc={setSelectionvisible}/>}
      {!selected && selectionvisible && (<Selectiom selection={setSelected} unselect={setSelectionvisible}/>)}
      {selected &&  <ChatBox sender={"admin"} selection={setSelected}/>}
      <Footer />
    </>
  )
}

export default AdminDashboard
