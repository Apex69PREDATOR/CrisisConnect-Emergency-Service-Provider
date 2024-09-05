import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import "./Signup.css"
import { useRef } from 'react'

const Signup = () => {
    const navigate = useNavigate()
    const signin = useRef(false)
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
    function contains_upper(str) {
        for (let i = 0; i < str.length; i++) {
            if (str[i] >= 'A' && str[i] <= 'Z') {
                return true
            }
        }
        return false
    }
    const check_strong_pass = (password) => {
        let val = contains_upper(password)
        console.log(val)
    }
    const onSubmit = async (data) => {
        await delay(2)
        check_strong_pass(data.password)
        let r = await fetch("http://localhost:5000/createAccount", {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)
        })
        let res = await r.json()
        if (!res.email_unique) {
            setError("inv_email", { message: "E-mail is already registered" })
        }
        else
        signin.current = true
    };

    const [isVisible, setIsVisible] = useState(true);

    const handleHideAlert = () => {
        setIsVisible(false);
        setError("aadhar",null)
        clearErrors();
    };

    const validatePassword = (value, { password }) => {
        return value === password || "Passwords do not match";
      };
      
    return (
        <>
        {signin.current && (navigate("/Login"))}
            <nav className='flex justify-between items-center fixed'>
                <div className="logo"><h1 className="logo">CrisisConnect</h1></div>
                <ul className='flex space-x-4 list-none'>
                    <li>
                        <NavLink className='no-underline' to="/">Home</NavLink>
                    </li>
                    <li><NavLink className='no-underline' to='/login'>Login</NavLink></li>
                </ul>
            </nav>
            <main className="sup flex flex-col justify-center items-center">

                <div id='alert' className="alert flex w-full flex-col items-center">
                    {errors.name && isVisible && (
                        <div>
                            <p>Name is required !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.sex && isVisible && (
                        <div>
                            <p>Gender </p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.height && isVisible && (
                        <div>
                            <p>Height is required !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.weight && isVisible && (
                        <div>
                            <p>Weight is required !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.bloodgroup && isVisible && (
                        <div>
                            <p>Please select your blood group</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.dob && isVisible && (
                        <div>
                            <p>Date of Birth is required !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.email && isVisible && (
                        <div>
                            <p>Email ID is required !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.phone && isVisible && (
                        <div>
                            <p>Enter a valid 10 digit phone number !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.aadhar && isVisible && (
                        <div>
                            <p>Enter a valid 12 digit Aadhar number !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.address && isVisible && (
                        <div>
                            <p>Address !</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.password && isVisible && (
                        <div>
                            <p>{errors.password.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.confirmpassword && isVisible && (
                        <div>
                            <p>{errors.confirmpassword.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                    {errors.inv_email && isVisible && (
                        <div>
                            <p>{errors.inv_email.message}</p>
                            <button onClick={handleHideAlert} className='closebtn'>X</button>
                        </div>
                    )}
                </div>


                <div className="signupform flex flex-col items-center gap-12">
                    <h1 className='text-white '>Create Account</h1>
                    {isSubmitting && <div className='loading top-20'></div>}

                    <form className="sgform grid grid-cols-3 gap-5" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register("name", { required: true })} placeholder="Enter Your Fullname" />


                        <select {...register("sex", { required: true })}>
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>

                        <input type="number" {...register("height", { required: true, maxLength: 3 })} placeholder="Enter Your Height In CM" />

                        <input type="number" {...register("weight", { required: true, maxLength: 3 })} placeholder="Enter Your Weight In KG" />


                        <select {...register("bloodgroup", { required: true })}>
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>O+
                        </select>

                        <input type="date" {...register("dob", { required: true })} placeholder="Date Of Birth" />

                        <input type="email" {...register("email", { required: true })} placeholder="Email Address" />

                        <input type="number" {...register("phone", { required: true, minLength: 10, maxLength: 10 })} placeholder="Phone Number" />


                        <input type="number" {...register("aadhar", { required: true, minLength: 12, maxLength: 12 })} placeholder=" Aadhar Card Number" />

                        <input type="text" {...register("address", { required: true })} placeholder="Home Address" />

                        <input type="password" {...register("password", { required: { value: true, message: 'Password is required !' }, minLength: { value: 8, message: "Minimum 8 Character required" } })} placeholder="Enter Password" />


                        <input type="password" {...register("confirmpassword", { required: { value: true, message: 'Re-enter your password !' }, minLength: { value: 8, message: "Minimum 8 Character required" },validate: validatePassword })} placeholder="Re-enter Password" />


                        <input className="col-start-2" disabled={isSubmitting} type="submit" value='Sign Up' />

                    </form>
                    {/* {errors.inv_email && <div className='error-red'>{errors.inv_email.message}</div>} */}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Signup
