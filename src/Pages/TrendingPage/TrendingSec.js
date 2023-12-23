import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Logo from "../TrendingPage/Dev-logo.jpg";
import { SlSettings } from "react-icons/sl";

import { HiHome } from "react-icons/hi";
import { GrSnapchat } from "react-icons/gr";
import { TbMessage } from "react-icons/tb";
import { useNavigate } from "react-router";
import ApiClient from "../../Apis/ApiClient";
import toast from "react-hot-toast";
export default function TrendingSec() {
  const history = useNavigate()
const[data,setData]=useState({})
  const GetData = () => {
    ApiClient.get("profile").then((res) => {
      if (res.success) {
        console.log(res);
        setData(res?.data);
        // localStorage.setItem("id", res?.data?.id);
      }else{
        toast.error(res.message)
      }
    });
    
  };
  useEffect(()=>{
GetData()
  },[])
  const Users = [
    {
      id: 1,
      name: "Nikki Rajput",
      username: "@NikkiRajput",
    },
    {
      id: 2,
      name: "Sanjay Rajput",
      username: "@SanjayRajput",
    },
    {
      id: 3,
      name: "Ajay Rajput",
      username: "@AjayRajput",
    },
    {
      id: 4,
      name: "Pardeep Verma",
      username: "@Pardeepverma",
    },
    {
      id: 5,
      name: "Garima Verma",
      username: "@Garimaverma",
    },
    {
      id: 6,
      name: "Akhil Morya",
      username: "@Akhilmorya",
    },
    {
      id: 7,
      name: "Ankit Rajput",
      username: "@Ankitrajput",
    },
  ];
  return (
    <div className="w-[23%] h-[98vh] ml-1 shadow-gray-500 items-center flex flex-col justify-start shadow-2xl rounded-2xl">
      <div className="w-full h-[12vh] shadow-lg rounded-lg flex justify-around items-center">
     
        
<button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
<span class="sr-only">Open user menu</span>
<img class="w-8 h-8 rounded-full" src={data?.image} alt="user photo"/>
</button>


<div id="dropdownAvatar" class="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>{data?.name}</div>
      <div class="font-medium truncate">{data?.email}</div>
    </div>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 z-10" aria-labelledby="dropdownUserAvatarButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="/profile" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
    </ul>
    <div class="py-2">
      <a onClick={()=>{
        localStorage.clear()
        history('/login')
      }} class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
    </div>
</div>
<HiHome className="cursor-pointer" size={25} color="yellow" />
        {/* <SlSettings className="cursor-pointer" size={25} /> */}
        <GrSnapchat className="cursor-pointer" size={25} color="yellow" />
        <TbMessage className="cursor-pointer" size={25} />
      </div>
      <div className="w-[97%] shadow-2xl rounded-xl flex flex-col items-start shadow-black h-[70vh] mt-3">
        <h1 className="text-xl ml-2 mt-2">Trending For You</h1>
        <div className="w-full mt-5 flex flex-col justify-start items-start scrollbar-hide overflow-auto">
          <div className="ml-5 mt-4 flex flex-col">
            <h1 className="text-md">#Javscript</h1>
            <h1 className="text-xs text-neutral-500">97k Shares</h1>
          </div><div className="ml-5 mt-4 flex flex-col">
            <h1 className="text-md">#Reactjs</h1>
            <h1 className="text-xs text-neutral-500">34k Shares</h1>
          </div><div className="ml-5 mt-4 flex flex-col">
            <h1 className="text-md">#Nodejs</h1>
            <h1 className="text-xs text-neutral-500">44k Shares</h1>
          </div><div className="ml-5 mt-4 flex flex-col">
            <h1 className="text-md">#Expressjs</h1>
            <h1 className="text-xs text-neutral-500">78k Shares</h1>
          </div> <div className="ml-5 mt-4 flex flex-col">
            <h1 className="text-md">#MongoDB</h1>
            <h1 className="text-xs text-neutral-500">122k Shares</h1>
          </div><div className="ml-5 mt-4 flex flex-col">
            <h1 className="text-md">#Nextjs</h1>
            <h1 className="text-xs text-neutral-500">62k Shares</h1>
          </div><div className="ml-5 mt-4 flex flex-col">
            <h1 className="text-md">#Bootstrap</h1>
            <h1 className="text-xs text-neutral-500">12k Shares</h1>
          </div><div className="ml-5 mt-4 flex flex-col mb-3">
            <h1 className="text-md">#Redux</h1>
            <h1 className="text-xs text-neutral-500">7k Shares</h1>
          </div>
          
        </div>
      </div>
      <button className="px-20 py-2 rounded-lg mt-5 bg-yellow-300">Share</button>
    </div>
  );
}
