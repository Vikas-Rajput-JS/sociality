import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import Profile from './Pages/Profile/Profile';
import PostSec from './Pages/PostSection/PostSec';
import TrendingSec from './Pages/TrendingPage/TrendingSec';
import Home from './Pages/Home';
import Login from './Pages/Login Page/Login';
import Signup from './Pages/SignUp Page/SignUp';
import { useEffect, useRef, useState } from 'react';
import ForgotPassword from './Pages/ForgetPassword/html';
import SendOtp from './Pages/ForgetPassword';
import ChangePass from './Pages/ForgetPassword/ChangePass';
import { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import ProfileView from './Pages/ProfileView/Profile';
import Index from './Pages/ProfileView';
import Plan from './Pages/Plan/Plan';
import Chat from './Pages/Chat/Chat';
import io from 'socket.io-client'
import ApiClient from './Apis/ApiClient';
// const socket  = io.connect('http://localhost:3300')




function App() {
  const[user,setUser] = useState({})
  const Navigate = useNavigate()
  const[loading,setloading]=useState(true)
  const key = localStorage.getItem('loading')
  let  token = localStorage.getItem('token')


  
  return (

   
    <div className="App w-full h-[100vh] flex items-center  lg:flex-row flex-col" style={{backgroundImage:'url(https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3917.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}}>
     
  <Routes>
  <Route path='/' element={<Signup/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
<Route path='/home' element={<Home/>}></Route>
<Route path='/verify-otp' element={<ForgotPassword/>}></Route>

<Route path='/forgot-password' element={<SendOtp/>}></Route>
<Route path='/change-password' element={<ChangePass/>}></Route>
<Route path='/edit-profile' element={<ProfileView/>}></Route>
<Route path='/plans' element={<Plan/>}></Route>
{/* <Route path='/chat' element={<Chat socket={socket} room={1234} />}></Route> */}
<Route path='/profile' element={<Index/>}></Route>


  </Routes>

<Toaster/>
    </div>
  );
}

export default App;
