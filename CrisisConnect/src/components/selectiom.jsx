import React from 'react'
import { useEffect,useState } from 'react'
import "./selection.css"
const Selectiom = (title) => {
    const [optionval,setOptionval]=useState([])
    useEffect(()=>{
        get_messege_email()
    },[])
    const get_messege_email=async ()=>{
        let res=await fetch("http://localhost:5000/get_messege_email")
        let emails=await res.json()
        let email_val=[]
        for(let i=0;i<emails.length;i++){
            email_val.push(emails[i].email)
        }
        setOptionval(email_val)
    }
    const send_selected_email=async ()=>{
        let s=document.querySelector(".selectemail")
        let email_val=s.value
        if(email_val!==''){
        let res=await fetch("http://localhost:5000/session-chat-email",{method:"POST",headers: {
            'Content-Type': 'application/json'
        },body:JSON.stringify({email:email_val})})
        let r=await res.json()
        if(r){
            title.selection(true)
        }
    }
        else{
            alert("plese select")
        }
    }
    const back_off=()=>{
        title.unselect(false)
    }
  return (
    <div className='select-container'>
        <div className="select-heading">
        <h3 className='head'>Select the recipents you want to messege</h3>
        <button onClick={back_off} className="close-btn">X</button>
        </div>
        <select name="emails" id="em" placeholder='select emails' className='selectemail'>
            <option value="">Email</option>
            {optionval.map((key)=>{
               return <option key={key} value={key}>{key}</option>
            })}
        </select>
        <button onClick={send_selected_email} className='sel-con'>Select</button>
    </div>
  )
}

export default Selectiom
