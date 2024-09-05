import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm();
    const [isVisible, setIsVisible] = useState(true);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [disptimeout, setDisptimeout] = useState(false);
    const [timer, setTimer] = useState(59);
    const [timermin, setTimermin] = useState(3);
    const intervalRef = useRef();

    useEffect(() => {
        if (disptimeout) {
            intervalRef.current = setInterval(() => {
                setTimermin(prevTimer=>{
                    if (prevTimer <= 0) {
                      setTimer(prevTimersec=>{
                        console.log(prevTimersec)
                        if(prevTimersec <=0 ){
                            clearInterval(intervalRef.current)
                            return 0;   
                        }
                        return prevTimersec - 1
                      })
                      return prevTimer
                    }
                    else{
                    setTimer(prevTimersec=>{
                        if(prevTimersec <=0 ){
                           setTimermin(prevTimer=>{
                            return prevTimer - 1
                           })
                            return 59;   
                        }
                        return prevTimersec - 1
                      })

                      return prevTimer
                }
            });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [disptimeout]);

    const handleHideAlert = () => {
        setIsVisible(false);
        clearErrors();
    };

    const get_otp = async () => {
        setSendingOtp(true);
        let obj = { otpemail: document.getElementById('otpemail').value };
        let res = await fetch("http://localhost:5000/generate-otp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        let otp = await res.text();
        setSendingOtp(false);
        if (otp === 'check your email for otp') {
            setDisptimeout(true);
        }
        alert(otp);
    };

    const verify_otp = async () => {
        let obj = { otpemail: document.getElementById('otpemail').value, otp: document.getElementById('otp').value };
        let res = await fetch("http://localhost:5000/verify-otp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        let verify_status = await res.json();
        if (verify_status.email_matched) {
            if (verify_status.otp_matched) {
                alert('otp verified successfully');
                alert('create new password');
                setDisptimeout(false)
            } else {
                alert('otp didn\'t match');
            }
        } else {
            alert('otp expired');
        }
    };

    const onSubmit = async () => {
        let obj = {
            otpemail: document.getElementById('otpemail').value,
            otp: document.getElementById('otp').value,
            password: document.getElementById('password').value
        };
        let res = await fetch("http://localhost:5000/update-password", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        let r = await res.json();
        if (r.updatedone) {
            alert('password changed successfully');
            navigate('/login');
        } else {
            alert("problem changing password");
        }
    };

    return (
        <>
            <nav className='flex justify-between items-center fixed'>
                <div className="logo"><h1 className="logo">CrisisConnect</h1></div>
                <ul className='flex space-x-4 list-none'>
                    <li>
                        <NavLink className='no-underline' to="/">Home</NavLink>
                    </li>
                    <li><NavLink className='no-underline' to='/login'>Log In</NavLink></li>
                </ul>
            </nav>

            <main className='lgbg flex flex-col justify-center items-center'>
                <div id='alert' className="alert flex w-full flex-col items-center">
                    {errors.otpemail && isVisible && (
                        <div>
                            <p>Email ID is required !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.otp && isVisible && (
                        <div>
                            <p>{errors.otp.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.otppassword && isVisible && (
                        <div>
                            <p>{errors.password.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                </div>

                <div className="loginform flex flex-col items-center gap-9 ">
                    <h1 className='fogpasshead'>Forgot Password</h1>
                    {sendingOtp && <div className='senotp'>Sending otp...</div>}
                    {disptimeout && (<div id='timeout'>Time remaining:{` ${timermin}:${timer}`}</div>)}
                    <form className='lgform flex flex-col gap-5 items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
                        <input id='otpemail' type="email" {...register("otpemail", { required: true })} placeholder='Enter Your Email Address' />

                        <input id='otp' type="number" {...register("otp", { required: { value: true, message: "OTP is required !" }, minLength: { value: 4, message: "Minimum 4 Character required" } })} placeholder='Enter Your OTP' />

                        <input id='password' type="password" {...register("otppassword", { required: { value: true, message: "Password is required !" }, minLength: { value: 8, message: "Minimum 8 Character required" } })} placeholder='Set New Password' />

                        <button type="submit" className='savechange'>Save</button>
                    </form>
                    <button className='otp' onClick={get_otp}>Send OTP</button>
                    <button className="verify" onClick={verify_otp}>Verify</button>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ForgotPassword;
