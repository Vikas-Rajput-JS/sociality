import React, { useEffect, useRef, useState } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import LoadingBar from 'react-top-loading-bar';
import ApiClient from '../../Apis/ApiClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
function ChangePass() {
    const [OTP, setOTP] = useState("");
    const ref = useRef(null)
    const [form, setform] = useState({})
    const navigate = useNavigate()
    const email = localStorage.getItem('email')
    const [eye, setEye] = useState('password')
    const [eye2, setEye2] = useState('password')
    console.log(OTP)
    useEffect(() => {
        ref.current.staticStart()
        ref.current.complete()
    }, [])
    const HandleSubmit = (e) => {
        ref.current.staticStart()
        e.preventDefault()
        ApiClient.post('reset-password', {newPassword:form?.newPassword,email:email}).then((res) => {
            if (res.success) {
                ref.current.complete()
                toast.success(res?.message)
                // localStorage.setItem('email', form?.email)
                setTimeout(() => {

                    navigate('/login')
                }, 600);

            } else {
                toast.error(res?.message)
                ref.current.complete()
            }
        })
    }
console.log(form)
    return (

        <div class="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <LoadingBar shadow={true} height={4} color='#2fb345' ref={ref} />
            <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div class="flex flex-col items-center justify-center text-center space-y-2">
                        <div class="font-semibold text-3xl">
                            <p>Reset Your Password</p>
                        </div>
                        <div class="flex flex-row text-sm font-medium text-gray-400">
                            {/* <p>We will  a code to your email</p> */}
                        </div>
                    </div>

                    <div>
                        <form onSubmit={HandleSubmit} method="post">
                            <div class="flex flex-col space-y-16">
                                <div class="flex  items-center justify-between mx-auto flex-col w-full max-w-xs">
                                    <div class="w-80 h-12 flex justify-center items-center ">
                                        {/* <label htmlFor="">Enter Password</label> */}
                                        <input value={form?.newPassword} onChange={(e) => {
                                            setform({ ...form, newPassword: e.target.value })
                                        }} placeholder='Enter New Password' class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type={eye} name="" id="" />
                                         {
                                            eye == 'password' ?  <svg onClick={() => {
                                                setEye('text')
                                            }} class="h-8 w-8 ml-3 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M9.5 16a10 10 0 0 1 6 -1.5" /></svg>:<svg onClick={() => {
                                                setEye('password')
                                            }} class="h-8 w-8 ml-3 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="9" x2="9.01" y2="9" />  <line x1="15" y1="9" x2="15.01" y2="9" />  <path d="M8 13a4 4 0 1 0 8 0m0 0H8" /></svg>
                                        }
                                    </div>
                                    <div class="w-80 h-12 mt-4 justify-center items-center flex   ">
                                        {/* <label htmlFor="">Confirm Password</label> */}
                                        <input value={form?.confirmPassword} onChange={(e) => {
                                            setform({ ...form, confirmPassword: e.target.value })
                                        }} placeholder='Confirm Password' class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type={eye2} name="" id="" />
                                        {
                                            eye2 == 'password' ?  <svg onClick={() => {
                                                setEye2('text')
                                            }} class="h-8 w-8 ml-3 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M9.5 16a10 10 0 0 1 6 -1.5" /></svg>:<svg onClick={() => {
                                                setEye2('password')
                                            }} class="h-8 w-8 ml-3 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="9" x2="9.01" y2="9" />  <line x1="15" y1="9" x2="15.01" y2="9" />  <path d="M8 13a4 4 0 1 0 8 0m0 0H8" /></svg>
                                        }

                                    </div>

                                </div>

                                <div class="flex flex-col space-y-5 justify-center">
                                    <div>
                                        <button class="flex flex-row items-center justify-center text-center w-[70%] ml-16 border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm">
                                            Update
                                        </button>
                                    </div>

                                    <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Remembered Password ?</p> <a class="flex flex-row items-center text-blue-600" href="http:/login" target="_blank" rel="noopener noreferrer">Log In</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
        </div>
    )
}

export default ChangePass
