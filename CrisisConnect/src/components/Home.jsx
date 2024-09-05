import React from 'react'
import { useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import './Home.css'
import './Mobile.css'
import { NavLink } from 'react-router-dom'
import { set } from 'mongoose'

const Home = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  const service=useRef()
  useEffect(()=>{
    let ry=0
    let x=setInterval(()=>{
      service.current.style.transform=`rotate3d(0, 1, 0, ${ry}turn)`
      ry-=0.001
      if(ry<=-0.25){
        clearInterval(x)
      service.current.style.transform=`rotate3d(0, 1, 0, ${0}turn)`
      }
    },10)
  console.log(admin_button.current)
  console.log(home.current)
  const callback=(entries,observer)=>{
      entries.forEach(async (element) => {
        if(!element.isIntersecting){
          admin_button.current.style.height='0';
          admin_button.current.style.width='0';
          admin_button.current.style.fontSize='0';
          await new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve()
            },150)
          })
          admin_button.current.style.display='none';

        }
        else{
          admin_button.current.style.display='block';
          await new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve()
            },150)
          })
          admin_button.current.style.height='7vh';
          admin_button.current.style.width='7vw';
          admin_button.current.style.fontSize='1.3em';
        }
      });
  }
  const observer=new IntersectionObserver(callback,{
    root:null,
    rootMargin:'0px',
    threshold:0.07
  })
  observer.observe(home.current)
  },[])
  const handel_turn=(event)=>{
    service.current.style.transition='0.3s ease-in-out'
    if(event.clientX>90 && event.clientX<=348){
      service.current.style.transform=`rotate3d(0, 1, 0, ${0.1}turn)`
    }
    else if(event.clientX>348 && event.clientX<=700){
      service.current.style.transform=`rotate3d(0, 1, 0, ${0.1}turn)`
    }
    else if(event.clientX>700 && event.clientX<=950){
      service.current.style.transform=`rotate3d(0, 1, 0, ${-0.1}turn)`
    }
    else if(event.clientX>951 && event.clientX<=1350){
      service.current.style.transform=`rotate3d(0, 1, 0, ${-0.1}turn)`
    }
  }
  const neutral_turn=()=>{
    service.current.style.transform=`rotate3d(0, 1, 0, ${0}turn)`
  }
  function go_admin(){
    location.href='/admin'
  }
  const admin_button=useRef()
  const home=useRef()
  return (
    <>
      <nav className='flex justify-between items-center fixed'>
        <div><h1 className="logo">CrisisConnect</h1></div>
        <ul className='flex space-x-4 list-none'>
          <li><a href="#Home">Home</a></li>
          <li><a href="#AboutUs">About Us</a></li>
          <li><a href="#Services">Services</a></li>
          <li><a href="#contacts">Contacts</a></li>
          <li><NavLink className='no-underline' to='/signup'>Sign Up</NavLink></li>
        </ul>
      </nav>
      <main className='homemain'>
        <button ref={admin_button} style={{position:'sticky',height:'7vh',width:'7vw',backgroundColor:'#5be7bb',zIndex:'2',top:'10vh',left:'2vw',borderRadius:'5px',border:'none',fontFamily:'-moz-initial',fontSize:'1.3em',cursor:'pointer',transition:'0.1s ease-in-out'}} onClick={go_admin}>Admin</button>
      
        <div ref={home} id='Home' className="home flex flex-col gap-2 justify-center items-center">
          <div className="welcometag"><h3>Welcome to</h3></div>
          <div className="banner logo"><h1 className="logo">CrisisConnect</h1></div>
          <div className="tagline"><h3>"Instant Assistance, Endless Support"</h3></div>
          <button className="login" onClick={login}>Log In</button>
        </div>
        <div className="Aboutus flex flex-col gap-40" id='AboutUs'>
          <h1 className='flex justify-center'>About Us</h1>
          <p>Welcome to CrisisConnect, your trusted companion in times of emergency.<br/><br/>
            At CrisisConnect, we understand that during critical moments, having access to reliable assistance can make all the difference. Our platform is dedicated to providing a seamless connection between individuals in crisis and the essential services they need.
            <br/><br/>
            Whether you're facing a natural disaster, medical emergency, or any other urgent situation, CrisisConnect is here to support you. Our user-friendly interface ensures quick and efficient access to emergency resources, including contact information for local authorities, medical facilities, and support organizations.
            <br/><br/>
            Driven by a passion for community well-being, our team is committed to facilitating swift responses and fostering resilience in times of adversity. With CrisisConnect, you're never alone – we're with you every step of the way.
            <br/><br/>
            Join us in building safer, stronger communities. Together, we can navigate through any crisis.
            <br/><br/>
            Welcome to CrisisConnect – where help is just a click away.</p>
        </div>
        <div className="Services flex flex-col gap-40" id='Services'>
          <h1 className='flex justify-center'>Our Services</h1>
          <div ref={service} onMouseMove={handel_turn} onMouseLeave={neutral_turn} className="servicebox flex justify-center">
            <div className="cards">
              <img src=".\src\assets\fire.jpg" alt="firesupport" />
              <h2>Fire Brigade Support</h2>
            </div>
            <div className="cards">
              <img src=".\src\assets\police.jpg" alt="policesupport" />
              <h2>Police Support</h2>
            </div>
            <div className="cards">
              <img src=".\src\assets\nurse.jpg" alt="hospitalsupport" />
              <h2>Hospital Support</h2>
            </div>
            <div className="cards">
              <img src=".\src\assets\shop.jpg" alt="medicalsupport" />
              <h2>Medical Support</h2>
            </div>
          </div>
        </div>
        <div className="contacts flex flex-col gap-10 items-center" id='contacts'>
          <h1 className='flex justify-center'>Contacts</h1>
          <h3>For any inquiries or emergenciesplease reach out to us at crisisconnect@contact.com</h3>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Home
