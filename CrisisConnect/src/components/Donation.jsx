import React from 'react'
import "./Donation.css"
import { useState } from 'react'

const Donation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true)

  const buttonHide = () => {
    setIsVisible(true);
    setBtnVisible(false)
  }

  const handleHideAlert = () => {
    setIsVisible(false);
    setBtnVisible(true);
  }
  return (
    <>
      {isVisible &&
        <div className="donation">
          <h1>Donation</h1>
          <img className='donationimg' src=".\src\assets\QR.png" alt="QR Code" />
          <p>Scan the QR code to donate. Your donation will help to improve our services</p>
          <p>Thank You From CrisisConnect</p>
          <button onClick={handleHideAlert} className='donationclosebtn'>Close</button>
        </div>
      }
      {btnVisible &&
      <div onClick={buttonHide} className='donbtn absolute bottom-12 left-2/4'>
          <button className="bg-green-300 border-none rounded-xl w-24 h-12 shadow-xl shadow-slate-800 cursor-pointer"><h3>Donate US</h3></button>
      </div>}
    </>
  )
}

export default Donation
