import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import "./Login.css"
import { useRef, useContext } from 'react'

const Login = () => {
    const login = useRef(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm()

    const delay = (d) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, d * 1000);
        })
    }
    const onSubmit = async (data) => {
        await delay(2)
        let res = await fetch("http://localhost:5000/login", {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)
        })
        let r = await res.json()
        if (r.email == true) {
            if (r.password == true) {
                console.log("login sucsesfull")
                login.current = true
            }
            else
            {
                setError("inv_password", { message: "invalid password" })
            }
        }
        else
            setError("inv_email", { message: "Looks like email not registered" })
    }

    const [isVisible, setIsVisible] = useState(true);

    const handleHideAlert = () => {
        setIsVisible(false);
        clearErrors();
    };

    return (
        <>
            {
                login.current && navigate('/Dashboard')
            }
            <nav className='flex justify-between items-center fixed'>
                <div className="logo"><h1 className="logo">CrisisConnect</h1></div>
                <ul className='flex space-x-4 list-none'>
                    <li>
                        <NavLink className='no-underline' to="/">Home</NavLink>
                    </li>
                    <li><NavLink className='no-underline' to='/signup'>Sign Up</NavLink></li>
                </ul>
            </nav>
            <main className='lgbg flex flex-col justify-center items-center'>

                <div id='alert' className="alert flex w-full flex-col items-center">
                {errors.email && isVisible && (
                        <div>
                            <p>Email ID is required !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.inv_email && isVisible && (
                        <div>
                            <p>{errors.inv_email.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.password && isVisible && (
                        <div>
                            <p>{errors.password.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.inv_password && isVisible && (
                        <div>
                            <p>{errors.inv_password.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    </div>

                <div className="loginform flex flex-col items-center gap-9 ">
                    <h1 className='log-head'>Login</h1>
                    {isSubmitting && <div className='loader'>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__ball"></div></div>}

                    <form className='lgform flex flex-col gap-5 items-center justify-center' onSubmit={handleSubmit(onSubmit)}>

                        <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email Address" />
                        <input type="password" {...register("password", { required: { value : true, message: "Password is required !"} ,minLength: { value: 8, message: "Minimum 8 Character required" } })} placeholder="Enter Password" />

                        <NavLink className='no-underline text-black' to='/forgotpassword'>Forgot Password ?</NavLink>

                        <input disabled={isSubmitting} type="submit" value='Log In' />
                        {errors.myform && <div className="text-red-950">{errors.myform.message}</div>}
                        <NavLink className='no-underline text-black' to='/signup'>Don't Have An Account? Sign Up</NavLink>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Login
