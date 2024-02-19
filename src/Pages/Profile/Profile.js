import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Logo from "../Profile/Dev-logo.jpg";
import ApiClient from "../../Apis/ApiClient";
import { Navigate, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
function Profile() {
  const [follow, setfollow] = useState(true);
  const [data, setData] = useState({});
  const [AllUser, setUser] = useState([]);
  const [text, settext] = useState("All Users");
  const [section, setsection] = useState("home");
  const [FollowingCount, setFolwingCount] = useState("");
  const [FollowerCount, SetFollowerCount] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [Followers, setFollowers] = useState([]);
  const ref = useRef(null);
  const [length, setlength] = useState(0);
  const GetData = () => {
    ref.current.staticStart();
    ApiClient.get("profile").then((res) => {
      if (res.success) {
        console.log(res);
        setData(res?.data);

        localStorage.setItem("id", res?.data?.id);
      }else  if(res.code==500){
        // localStorage.clear()
        // navigate('/login')
      }else{
        toast.error(res.message)
      }
      ref.current.complete();
    });
    ApiClient.get("getUser").then((res) => {
      if (res.success) {
      } else  if(res.code==500){
        // localStorage.clear()
        // navigate('/login')
      }else{
        toast.error(res.message)
      }
      
    });
  };
  useEffect(() => {
    
    GetData();
  }, []);

  console.log(data);

  return (
    <div className="w-[100%] lg:w-[23%] l h-[98vh] ml-3 shadow-gray-500 items-center flex flex-col justify-start shadow-2xl rounded-2xl">
      <LoadingBar shadow={true} height={3} color="red" ref={ref} />
      <div className="flex justify-around mt-2 w-full">
      <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          class="flex text-sm bg-gray-800  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          type="button"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-12 h-12 rounded-full"
            src={data?.image}
            alt=""
            onClick={()=>{
              navigate('/chat')
            }}
          />
        </button>

        <div
          id="dropdownAvatar"
          class="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{data?.name}</div>
            <div class="font-medium truncate">{data?.email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200 z-10"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <button
               onClick={()=>{
                navigate('/change-password')
               }}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Change Password
              </button>
            </li>
            <li>
              <button
              onClick={()=>{
                navigate('/edit-profile')
              }}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </button>
            </li>
            <li>
              <a
                href="/plans"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Plans
              </a>
            </li>
          </ul>
          <div class="py-2">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="flex bg-[#cecece94] w-[70%] rounded-xl py-1">
          <input
            className="w-44 rounded-lg py-2 bg-[#cecece2c] text-sm border-none focus:border-none placeholder:text-sm px-4 text-black "
            placeholder="#Explore"
            type="text"
          />
          <CiSearch
            size={40}
            className="ml-1 cursor-pointer  bg-yellow-300 rounded-xl"
          />
        </div>
      </div>
      <div className="w-[97%] mt-4 h-[45vh] rounded-xl bg-transparent shadow-lg shadow-slate-400">
        <div className="w-full h-[10vh]">
          <img
            className="w-full h-[17vh] rounded-xl"
            src={data?.bannerImage}
            alt=""
          />
        </div>
        <div className="w-full flex justify-center flex-col items-center text-black">
          <img
            className="rounded-full w-20 h-20 shadow-2xl shadow-black"
            src={data.image}
            alt=""
          />
          <h1 className="mt-4 text-black">{data.name}</h1>
          <h1 className="mt-2 text-black">{data?.bio?.substr(0, 15) + "...."}</h1>
        </div>
        {/* <div className="w-[92%] bg-black h-[1px] ml-3 mt-1"></div> */}
        <div className="w-full h-16 flex justify-around items-center mb-3">
          <div>
            <h1 className="mt-4  text-black">{FollowerCount}</h1>
            <h1
              className=" text-black text-xs cursor-pointer "
              onClick={() => {
                setsection("Followers");
                console.log(section);
                settext("Who is following Me");
              }}
            >
              Followers
            </h1>
          </div>
          <div className="w-[1px] h-[50px] mt-2 bg-black  "></div>
          <div>
            <h1 className="mt-4  text-black">{FollowingCount}</h1>
            <h1
              className=" text-black text-xs cursor-pointer "
              onClick={() => {
                setsection("Following");
                console.log(section);
                settext("Who I Followed");
              }}
            >
              Following
            </h1>
          </div>
          <div className="w-[1px] h-[50px] mt-2 bg-black  "></div>
          <div>
            <h1 className="mt-4  text-black">5</h1>
            <h1 className=" text-black text-xs ">Posts</h1>
          </div>
        </div>
       
        {/* <div className="w-[92%] bg-black h-[1px] ml-3 mt-2"></div> */}
      </div>
      <div className="w-full h-auto overflow-auto scrollbar-hide mt-5 flex flex-col items-start ">
        <h1 className="ml-4">{text}</h1>
        {/* {AllUser?.map((item, id) => {
          return (
            <div className="w-[97%] ml-1 rounded-xl  mb-2 h-14 bg-transparent mt-5 flex items-center justify-between ">
              <img
                className="rounded-full w-10 shadow-2xl shadow-black ml-2"
                src={Logo}
                alt=""
              />
              <div>
                <h1 className="">{!follow? item.name:item.username}</h1>
                <h1 className="text-xs">@{!follow? item.name:item.username}</h1>
              </div>
              <button className="px-3 bg-yellow-300 mr-1 rounded-lg py-1" onClick={async(e)=>{
   if(section==='Following'){
    console.log(section)
    setfollow(true)
    const Update = await fetch(`http://localhost:5500/api/auth/unfollow/${item._id}`,{
      method:"Post",
      headers:{"Content-Type":"application/json"}
     
    
    })
    const res = await Update.json();
    console.log(res)
  }

  if(section==='Followers' || section==='home'){

 
    const Update = await fetch('http://localhost:5500/api/auth/startfollow',{
      method:"Post",
      headers:{"Content-Type":"application/json","Auth":token},
      body:JSON.stringify({userId:UserData._id,followId:item._id,name:item.name,username:UserData.name})
    
    })
    const res = await Update.json();
    console.log(res)


  }

  }
  
  
  
  
  }>

                 
                Follow
              </button>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}

export default Profile;
