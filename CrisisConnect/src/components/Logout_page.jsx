import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Logout_page = (props) => {
  const navigate=useNavigate()
  const hide_logout=()=>{
    let logout=document.getElementById("logout-page")
    let sheet=document.querySelector(".sheet")
    logout.style.display="none"
    sheet.style.display="none"
  }
  const logout=async ()=>{
    let res=await fetch("http://localhost:5000/logout")
    let log_stat=await res.json()
    if(!log_stat.name){
      navigate("/")
    }
   }
  return (
    <div id='logout-page'>
    <span className='question'>
        Are you sure want to log out ?
    </span>
    <div className="buttons">
        <button className='yes' onClick={logout}>OK</button>
        <button className='no' onClick={hide_logout}>Cancel</button>
    </div>
    </div>
  )
}

export default Logout_page
