import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots, FaHeart, FaShare } from "react-icons/fa";
import Logo from "../PostSection/Dev-logo.jpg";
import ApiClient from "../../Apis/ApiClient";
import toast, { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
function Cards() {
  const [blur, setblur] = useState("");
  const [Post, setPost] = useState([]);
  const [likebtn, setlike] = useState(false);
  const [loading, setloading] = useState(false);
  const key = localStorage.getItem("update");

  const ref = useRef(null);
  const id = localStorage.getItem("id");

  const GetPost = () => {
    ApiClient.get("posts/allposts").then((res) => {
      if (res.success) {
        setPost(res?.data);
        localStorage.removeItem("update");
      }
    });
  };

  const DeletePost = (post) => {
    ref.current.staticStart();
    if (window.confirm("Do you want to delete this post")) {
      ApiClient.delete("posts/posts", { id: post }).then((res) => {
        if (res.success) {
          toast.success(res.message);
          ref.current.complete();
          GetPost();
        } else {
          toast.error(res.message);
          ref.current.complete();
        }
      });
    }
  };
  useEffect(() => {
    GetPost();
  }, [key]);
  return (
    <div
      style={{ filter: `blur(${blur})` }}
      className="w-full flex flex-col mt-[16vh] "
    >
      <LoadingBar shadow={true} height={3} color="red" ref={ref} />
      {Post.map((item, index) => {
        return (
          <div  className={` ${item.id} w-full bg-white h-[74vh]  shadow-lg  flex flex-col  items-center  rounded-xl mt-5 `}>
            <div className="w-full flex mt-1 items-center">
              <img
                className="rounded-full  w-10 shadow-2xl  shadow-black ml-6"
                src={Logo}
                alt=""
              />
              <h1 className="ml-2">{item.name}</h1>
            </div>
            <img
              className="w-[97%] h-[50vh] mt-2 rounded-xl"
              src={item.image}
              alt=""
            />
            <div className="w-full flex justify-start items-start">
              <div className="w-[15%] flex  justify-around mt-3 ml-3  items-center">
                <FaHeart
                  size={25}
                  cursor={"pointer"}
                  color={item?.islike ? "red" : "black"}
                />
                <FaRegCommentDots
                  onClick={() => {
                    window.scroll({ bottom: 0, left: 0, behavior: "smooth" });
                  }}
                  cursor={"pointer"}
                  size={25}
                />
                <FaShare cursor={"pointer"} size={23} />
              </div>
            </div>
            <div className="flex justify-end items-center w-full">
              {item?.user_id == id ? (
                <svg
                  onClick={() => {
                    DeletePost(item.id);
                  }}
                  class="h-8 w-8 text-red-500 mr-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <rect x="3" y="4" width="18" height="4" rx="2" />{" "}
                  <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />{" "}
                  <line x1="10" y1="12" x2="14" y2="12" />
                </svg>
              ) : null}
            </div>
            <div className="w-full flex flex-col mt-2 justify-start items-start">
              <h1 className="text-sm text-zinc-400 ml-3 ">345 Likes</h1>
              <h1 className="text-md text-black-400 ml-3 mt-1 ">
                {item.caption}
              </h1>
            </div>
          </div>
        );
      })}
      {/* <div className='w-full bg-white h-[74vh] shadow-lg  flex flex-col  items-center  rounded-xl mt-5'>
    <div className='w-full flex mt-1 items-center  '>
      <img
                className="rounded-full  w-10 shadow-2xl  shadow-black ml-6"
                src={Logo}
                alt=""
              />
              <h1 className='ml-2'>Vikas Rajput</h1>
      </div>
      <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src="https://dlcdnrog.asus.com/rog/media/1591712225260.webp" alt="" />

      <div className='w-full flex justify-start items-start'>
        <div className='w-[15%] flex  justify-around mt-3 ml-3 items-center'>

        <FaHeart className='cursor-pointer' size={25} color='red'/>
        <FaRegCommentDots className='cursor-pointer' size={25}/>
        <FaShare className='cursor-pointer' size={23}/>
        </div>
      </div>
      <div className='w-full flex flex-col mt-2 justify-start items-start'>

        <h1 className='text-sm text-zinc-400 ml-3 '>345 Likes</h1>
        <h1 className='text-sm text-zinc-400 ml-3 mt-1 '>Welcome To Developer's Zone</h1>
      </div>
    </div>
    <div className='w-full bg-white h-[74vh] shadow-lg  flex flex-col  items-center  rounded-xl mt-5'>
    <div className='w-full flex mt-1 items-center  '>
      <img
                className="rounded-full  w-10 shadow-2xl  shadow-black ml-6"
                src={Logo}
                alt=""
              />
              <h1 className='ml-2'>Vikas Rajput</h1>
      </div>
      <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src="https://dlcdnrog.asus.com/rog/media/1590514757306.webp" alt="" />
      <div className='w-full flex justify-start items-start'>
        <div className='w-[15%] flex  justify-around mt-3 ml-3 items-center'>

        <FaHeart className='cursor-pointer' size={25} color='red'/>
        <FaRegCommentDots className='cursor-pointer' size={25}/>
        <FaShare className='cursor-pointer' size={23}/>
        </div>
      </div>
      <div className='w-full flex flex-col mt-2 justify-start items-start'>

        <h1 className='text-sm text-zinc-400 ml-3 '>345 Likes</h1>
        <h1 className='text-sm text-zinc-400 ml-3 mt-1 '>Welcome To Developer's Zone</h1>
      </div>
    </div>
    <div className='w-full bg-white h-[74vh] shadow-lg  flex flex-col  items-center  rounded-xl mt-5'>
    <div className='w-full flex mt-1 items-center  '>
      <img
                className="rounded-full  w-10 shadow-2xl  shadow-black ml-6"
                src={Logo}
                alt=""
              />
              <h1 className='ml-2'>Vikas Rajput</h1>
      </div>
      <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src="https://dlcdnrog.asus.com/rog/media/168080574510.webp" alt="" />
      <div className='w-full flex justify-start items-start'>
        <div className='w-[15%] flex  justify-around mt-3 ml-3 items-center'>

        <FaHeart className='cursor-pointer' size={25} color='red'/>
        <FaRegCommentDots className='cursor-pointer' size={25}/>
        <FaShare className='cursor-pointer' size={23}/>
        </div>
      </div>
      <div className='w-full flex flex-col mt-2 justify-start items-start'>

        <h1 className='text-sm text-zinc-400 ml-3 '>345 Likes</h1>
        <h1 className='text-sm text-zinc-400 ml-3 mt-1 '>Welcome To Developer's Zone</h1>
      </div>
    </div> */}
   
    </div>
  );
}

export default Cards;
