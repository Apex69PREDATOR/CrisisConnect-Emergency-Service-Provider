import React from 'react'
import "./Select_render.css"
const Select_render = (title) => {
    const set_selection=()=>{
        title.renderfunc(true)
    }
  return (
    <button className='r-selection' onClick={set_selection}>
        Begin Chatting
    </button>
  )
}

export default Select_render
