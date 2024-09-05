import React from 'react'
import { useForm } from "react-hook-form"
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import "./Login.css"
import { useState } from 'react'

const Adminlogin = () => {
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
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        await delay(1.2)
        let res = await fetch("http://localhost:5000/admin-login", {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)
        })
        let r = await res.json()
        if (r.email == true) {
            if (r.password == true) {
                setLogin(true)
            }
            else
                setError("inv_pass", { message: "invalid password" })
        }
        else
            setError("inv_email", { message: "That's not email of the admin" })
    }

    const [isVisible, setIsVisible] = useState(true);

    const handleHideAlert = () => {
        setIsVisible(false);
        clearErrors();
    };

    return (
        <>
            {login && navigate('/AdminDashboard')}
            <nav className='flex justify-between items-center fixed'>
                <div className="logo"><h1 className="logo">CrisisConnect</h1></div>
                <ul>
                    <li>
                        <NavLink className='no-underline' to="/">Home</NavLink>

                    </li>
                </ul>
            </nav>
            <main className='lgbg flex justify-center items-center'>
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
                            <p>Password is required !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.inv_pass && isVisible && (
                        <div>
                            <p>{errors.inv_pass.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                </div>

                <div className="loginform flex flex-col items-center gap-12">
                    <h1 className='log-head'>Admin Login</h1>
                    {isSubmitting && <div className='loader'>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__ball"></div></div>}
                    <form className='lgform flex flex-col gap-5 items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" {...register("email", { required: true })} placeholder="Enter Email Address" />

                        {/* {errors.inv_email && <div className='error-red'>{errors.inv_email.message}</div>} */}

                        <input type="password" {...register("password", { required: true })} placeholder="Enter Password" />
                        {/* 
                        {errors.password && <div className="text-red-950">{errors.password.message}</div>}
                        {errors.inv_pass && <div className='error-red'>{errors.inv_pass.message}</div>} */}
                        {/* <NavLink className='no-underline text-black' to='#'>Forgot Password ?</NavLink> */}
                        <input className="mt-16" disabled={isSubmitting} type="submit" value='Log In' />
                        {/* {errors.myform && <div className="text-red-950">{errors.myform.message}</div>} */}
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Adminlogin
