import React, { useEffect } from 'react'
import Profile from './Profile/Profile'
import PostSec from './PostSection/PostSec'
import TrendingSec from './TrendingPage/TrendingSec'
import { useNavigate } from 'react-router'

function Home() {
 const Navigate = useNavigate()
 const token = localStorage.getItem('token');
  useEffect(()=>{
    if(!localStorage.getItem('token')){
  Navigate('/login')
    }else Navigate('/home')

  },[token])
  return (
    <>
    <Profile/>
    <PostSec/>
    <TrendingSec/>
    </>
  )
}

export default Home
