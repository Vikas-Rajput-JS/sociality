import React, { useEffect, useRef, useState } from "react";
import Logo from "../PostSection/Dev-logo.jpg";
import { BsImageFill } from "react-icons/bs";
import { MdPlayCircleOutline } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";

import { BsCalendar2Date } from "react-icons/bs";
import Cards from "./Cards";
import toast from "react-hot-toast";

import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import ApiClient from "../../Apis/ApiClient";
import { useNavigate } from "react-router";
function PostSec() {
  const [Form, setform] = useState({});
  const [img, setimg] = useState("");
  const Navigate = useNavigate();

  const ref = useRef(null);
  useEffect(() => {
    ApiClient.get("profile").then((res) => {
      if (res.success) {
        console.log(res);
        setimg(res?.data?.image);
        setform({ ...Form, user_id: res?.data?.id, name: res?.data?.name });
      } else if (res.code == 500) {
        localStorage.clear();
        Navigate("/login");
      } else {
        toast.error(res.message);
      }
    });
  }, []);
  function OpenFile() {
    document.getElementById("file_input").click();
  }

  const HandleSubmit = () => {
    ref.current.staticStart();
    ApiClient.post("posts/create-post", {
      caption: Form?.caption,
      name: Form?.name,
      image: Form?.image,
      user_id: Form?.user_id,
    }).then((res) => {
      if (res.success) {
        toast.success(res?.message);
        ref.current.complete();
        localStorage.setItem("update", res?.success);

        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={Form?.image}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {Form?.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{Form?.caption}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        ));
        setform({ ...Form, caption: "" });
      }
    });
  };

  useEffect(() => {
    ref.current.staticStart();
    ref.current.complete();
  }, []);

  const SubmitImage = async (image) => {
    ref.current.staticStart();

    const file = image.target.files;
    const form = new FormData();
    form.append("image", file[0]);

    const UploadImage = await fetch(
      "https://api.imgbb.com/1/upload?expiration=600&key=81e51e4b5abab8382e2f6561ba765ef8",
      {
        method: "post",
        body: form,
      }
    );
    const res = await UploadImage.json();
    console.log(res);

    if (res.success) {
      ref.current.complete();
      setform({ ...Form, image: res?.data?.url });
      // toast.success("Image Uploaded Successfully");
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full  bg-white shadow-lg rounded-lg pointer-events-auto flex-col flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-full p-4">
            <div className="flex items-start w-full">
              <div className="flex-shrink-0 pt-0.5 w-full">
                <img
                  className="h-[30vh] w-[100%] rounded-2xl"
                  src={res?.data?.url}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  };

  return (
    <>
      <LoadingBar shadow={true} height={3} color="red" ref={ref} />

      <div className="w-[100%] lg:w-[54%] h-[97vh]  lg:overflow-auto lg:scrollbar-hide  bg-transparent shadow-xl shadow-zinc-500 rounded-lg ml-2">
        <div
          className=" lg:fixed w-[100%] lg:w-[53%] z-20  bg-slate-100 h-[18vh] rounded-lg shadow-lg flex flex-col "
          style={{ filter: `blur(${0})` }}
        >
          <div className="w-[100%] flex items-center justify-center h-20">
            <img className="bg-black rounded-full w-12 h-12" src={img} alt="" />
            <input
              value={Form?.caption}
              onChange={(e) => {
                setform({ ...Form, caption: e.target.value });
              }}
              className="w-[80%] ml-8 rounded-lg py-2 bg-[#cecece5e] text-sm border-none focus:border-none placeholder:text-sm px-4 text-black "
              placeholder="What's Happening ?"
              type="text"
            />
            <input
              className="hidden"
              type="file"
              name=""
              id="file_input"
              onChange={(e) => {
                SubmitImage(e);
              }}
            />
          </div>
          <div className="w-full flex justify-evenly items-center mt-5">
            <div
              className="flex w-16 justify-between items-center"
              onClick={OpenFile}
            >
              <BsImageFill className="cursor-pointer" size={20} color="green" />
              <h1 className="text-green-500 text-sm cursor-pointer">Photo</h1>
            </div>
            <div className="flex w-16 justify-between ml-8 items-center">
              <MdPlayCircleOutline
                className="cursor-pointer"
                size={20}
                color="purple"
              />
              <h1 className="text-purple-500 text-sm cursor-pointer">Video</h1>
            </div>
            <div className="flex w-20 justify-between ml-8 items-center">
              <TfiLocationPin
                className="cursor-pointer"
                size={20}
                color="red"
              />
              <h1 className="text-red-500 text-sm cursor-pointer">Location</h1>
            </div>
            <div className="flex w-24 justify-between ml-8 items-center">
              <BsCalendar2Date
                className="cursor-pointer"
                size={20}
                color="blue"
              />
              <h1 className="text-cyan-500 text-sm cursor-pointer">Sechdule</h1>
            </div>
            <button
              className="px-4 bg-yellow-300 mr-1 rounded-lg py-1"
              onClick={HandleSubmit}
            >
              Share
            </button>
          </div>
        </div>
        <Cards />
      </div>

      {/* <div className="absolute top-[25vh] left-[30%]" style={{display:`${display}`}}>

    <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src='../../../../../../Pictures/desktop-wallpaper-lord-krishna-shree-krishna-krishna-radha-painting-krishna-thumbnail.jpg' alt="" />
    </div> */}
    </>
  );
}

export default PostSec;
