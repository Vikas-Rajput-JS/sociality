import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import ApiClient from '../../Apis/ApiClient'

function Signup() {
  const Navigate = useNavigate()
  const [form, setform] = useState({})
  const ref = useRef(null)
  const [eye, setEye] = useState('password')
  useEffect(() => {
    if (localStorage.getItem('token')) {
      Navigate('/home')
    }

  }, [])


  useEffect(() => {

    ref.current.staticStart()
    ref.current.complete()
  }, [])

const HandleSubmit = (e)=>{
  ref.current.staticStart()
  e.preventDefault()
  ApiClient.post('signup',form).then((res)=>{
    if(res.success){
      toast.success(res?.message)
      ref.current.complete()


    }else{
      toast.error(res?.message)
      ref.current.complete()

    }
  })
}

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <LoadingBar shadow={true} height={3} color='#e4ff00' ref={ref} />
      <section class="bg-gray-900 dark:bg-gray-900 w-full h-screen">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
          <img
                class="w-12 h-12 mr-2 rounded-full"
                src="https://ih1.redbubble.net/image.2386420274.5433/st,small,507x507-pad,600x600,f8f8f8.jpg"
                alt=""
              />            SociaLity
          </a>
          <div class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={HandleSubmit}>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input value={form?.name} onChange={(e) => {
                    setform({ ...form, name: e.target.value })
                  }} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Name" required />
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                  <input value={form?.email} onChange={(e) => {
                    setform({ ...form, email: e.target.value })
                  }} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Password</label>
                  <div className='flex w-full relative'>

                  
                  <input value={form?.password} onChange={(e) => {
                    setform({ ...form, password: e.target.value })
                  }} type={eye} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  {
                                            eye == 'password' ?  <svg onClick={() => {
                                                setEye('text')
                                            }} class="h-8 w-8 ml-3 text-red-500 absolute top-1 right-0" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="10" x2="9.01" y2="10" />  <line x1="15" y1="10" x2="15.01" y2="10" />  <path d="M9.5 16a10 10 0 0 1 6 -1.5" /></svg>:<svg onClick={() => {
                                                setEye('password')
                                            }} class="h-8 w-8 ml-3 text-green-500 absolute top-1 right-0" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="9" y1="9" x2="9.01" y2="9" />  <line x1="15" y1="9" x2="15.01" y2="9" />  <path d="M8 13a4 4 0 1 0 8 0m0 0H8" /></svg>
                                          }
                                          </div>
                </div>
               
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class=" text-black dark:text-gray-300">I accept the <a class="font-medium text-black hover:underline dark:text-primary-500 " href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" class="w-full bg-yellow-400 py-1 px-1 font-semibold hover:bg-yellow-500 rounded-md shadow-lg">Create an account</button>
                <p class="text-sm  text-gray-900 dark:text-gray-400">
                  Already have an account? <button  class="font-medium cursor-pointer text-black hover:underline dark:text-primary-500" onClick={()=>{
                    ref.current.staticStart()
                    Navigate('/login')
                    ref.current.complete()
                  }}>Login here</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className='w-[50%] bg-gray-900 h-[100vh] flex justify-center'>
        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg" alt="" />
      </div>
  
    </div>
  )
}

export default Signup
