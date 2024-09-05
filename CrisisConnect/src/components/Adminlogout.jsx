import React from 'react'
import { useNavigate } from 'react-router-dom'
const Adminlogout = () => {
  const navigate = useNavigate()
  const hide_logout = () => {
    let logout = document.getElementById("logout-page")
    logout.style.display = "none"
    let sheet = document.querySelector(".sheet")
    sheet.style.display="none"
  }
  const logout = async () => {
    let res = await fetch("http://localhost:5000/admin-logout")
    let log_stat = await res.json()
    if (!log_stat.email && !log_stat.password) {
      navigate("/admin")
    }
  }
  return (
    <div id='logout-page'>
      <span className='question'>
        Are you sure want to log out ?
      </span>
      <div className="buttons">
        <button className='yes' onClick={logout}>Yes</button>
        <button className='no' onClick={hide_logout}>No</button>
      </div>
    </div>
  )
}

export default Adminlogout
