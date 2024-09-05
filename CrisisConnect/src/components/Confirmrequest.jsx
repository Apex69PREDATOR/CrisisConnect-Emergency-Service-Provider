import React from 'react'

const Confirmrequest = (title) => {
  const submitRequest=async ()=>{
      let res=await fetch("http://localhost:5000/request-service",{method:"POST",headers: {
        'Content-Type': 'application/json'
    },body:JSON.stringify(title.query)})
    let r=await res.text()
    alert(r)
  }
  const hide_page=()=>{
    let c= document.querySelector(".confirm")
    let sheet=document.querySelector(".sheet")
    title.flag(false)
    c.style.display="none"
    sheet.style.display="none"
  }
  return (
    <div className='confirm'>
        <div className="city">
      <h3 className='heading'>City :</h3>
      <span className='city-c'>{title.city}</span>
      </div>
      <div className="city">
      <h3  className='heading'>District :</h3>
      <span className='district'>{title.district}</span>
      </div>
      <div className="city">
      <h3 className='heading'>State :</h3>
      <span className='state'>{title.state}</span>
      </div>
      <div className="city">
      <h3 className='heading'>Pincode :</h3>
      <span className='pin'>{title.pincode}</span>
      </div>
      <div className="city address">
      <h3 className='heading'>Address :</h3>
      <span className='add'>{title.address}</span>
      </div>
      <div className="city buttons">
        <button onClick={submitRequest} className="confirm-b">Confirm</button>
        <button onClick={hide_page} className="cancel">Cancel</button>
      </div>
    </div>
  )
}

export default Confirmrequest
