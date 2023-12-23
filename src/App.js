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

function App() {
  
  const Navigate = useNavigate()
  const[loading,setloading]=useState(true)
  const key = localStorage.getItem('loading')

  const ref = useRef(null)


  return (

   
    <div className="App w-full h-[100vh] flex items-center" style={{backgroundImage:'url(https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3917.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}}>
          <LoadingBar shadow={true} height={3} color="red" ref={ref} />
      {/* {
        !loading?<img className="w-[100%] h-[100vh]" src="https://superstorefinder.net/support/wp-content/uploads/2018/01/elastic.gif" alt="" />: */}
  <Routes>
  <Route path='/' element={<Signup/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
<Route path='/home' element={<Home/>}></Route>
<Route path='/verify-otp' element={<ForgotPassword/>}></Route>

<Route path='/forgot-password' element={<SendOtp/>}></Route>
<Route path='/change-password' element={<ChangePass/>}></Route>
<Route path='/profile' element={<ProfileView/>}></Route>


  </Routes>
  
  {/* } */}
  <Toaster/>
    </div>
  );
}

export default App;
