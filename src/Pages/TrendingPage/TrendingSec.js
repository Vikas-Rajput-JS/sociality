import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Logo from "../TrendingPage/Dev-logo.jpg";
import { SlSettings } from "react-icons/sl";
import { IoMdCloudUpload } from "react-icons/io";
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/dist/sweetalert2.js'


import { HiHome } from "react-icons/hi";
import { GrSnapchat } from "react-icons/gr";
import { TbMessage } from "react-icons/tb";
import { useNavigate } from "react-router";
import ApiClient from "../../Apis/ApiClient";
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
export default function TrendingSec() {
  // const Navigate = useNavigate()
  const history = useNavigate();
  const ref = useRef(null);

  const [data, setData] = useState({});
  const [Story, setStory] = useState([]);
  const [Form, setform] = useState({ title: "New Story" });
  const GetData = () => {
    ApiClient.get("profile").then((res) => {
      if (res.success) {
        console.log(res);
        setData(res?.data);
        // localStorage.setItem("id", res?.data?.id);
      } else if (res.code == 500) {
        // localStorage.clear()
        // history('/login')
      } else {
        toast.error(res.message);
      }
    });
  };
  useEffect(() => {
    GetData();
  }, []);
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

  useEffect(() => {
    GetStories();
  }, []);

  const GetStories = () => {
    ApiClient.get("stories").then((res) => {
      if (res.success) {
        setStory(res?.data);
      }
    });
  };

  const PostStory = () => {
    ref.current.staticStart();

    ApiClient.post("story", Form).then((res) => {
      if (res.success) {
        toast.success(res.message);
        GetStories();
      }
    });
    ref.current.complete();
  };

  const SubmitImage = async (image) => {
    ref.current.staticStart();

    const file = image.target.files;
    const form = new FormData();
    form.append("image", file[0]);

    const UploadImage = await fetch(
      "https://api.imgbb.com/1/upload?key=81e51e4b5abab8382e2f6561ba765ef8",
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

      <div className="w-[100%] lg:w-[23%] h-[98vh] ml-1 shadow-gray-500 items-center flex flex-col justify-start shadow-2xl rounded-2xl">
        <div className="w-full h-[12vh] shadow-lg rounded-lg flex justify-around items-center">
          <input
            className="hidden"
            type="file"
            name=""
            id="StoryInput"
            onChange={SubmitImage}
          />
          <button
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src={data?.image}
              alt=""
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
                <a
                  onClick={() => {
                    history("/change-password");
                  }}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Change Password
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    history("/edit-profile");
                  }}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
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
              <a
                onClick={() => {
                  localStorage.clear();
                  history("/login");
                }}
                class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
          <HiHome className="cursor-pointer" size={25} color="yellow" />
          {/* <SlSettings className="cursor-pointer" size={25} /> */}
          <GrSnapchat className="cursor-pointer" size={25} color="yellow" />
          <TbMessage
            className="cursor-pointer"
            onClick={() => {
              history("/chat");
            }}
            size={25}
          />
        </div>
        <div className="w-[97%] shadow-2xl rounded-xl flex flex-col items-start shadow-black h-[70vh] mt-3">
          <h1 className="text-xl ml-2 mt-2">Trending For You</h1>

          <div class="w-full max-w-md p-4 bg-inherit rounded-lg shadow sm:p-8 ">
            <div class="flex items-center justify-between mb-4">
              {/* <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5> */}
              {/* <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a> */}
            </div>
            <div class="flow-root">
              <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li class="py-3 sm:py-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src={data?.image}
                        alt=""
                      />
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                      <p  class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {Story?.some((itm) => itm?.addedBy?.id == data?.id)
                          ? <p className="cursor-pointer" onClick={()=>{
                            Swal.fire({
                            
                              // title: "Sweet!",
                              text: Story[0]?.title,
                              imageUrl: Story[0]?.image,
                              imageWidth: 400,
                              imageHeight: 200,
                              imageAlt: ""
                            });
                          }}>View Story</p>
                          : <p>Share Story</p>}
                      </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <IoMdCloudUpload
                        size={"3vh"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (!Form?.image) {
                            document.getElementById("StoryInput").click();
                          } else {
                            PostStory();
                          }
                        }}
                      />
                    </div>
                  </div>
                </li>
                {Story?.map((itm) => {
                  return (
                    <>
                      {itm?.addedBy?.id != data?.id && (
                        <li class="py-3 sm:py-4">
                          <div class="flex items-center">
                            <div class="flex-shrink-0">
                              <img
                                class="w-8 h-8 rounded-full"
                                src={itm?.addedBy?.image}
                                alt=""
                              />
                            </div>
                            <div class="flex-1 min-w-0 ms-4">
                              <p onClick={()=>{
                        Swal.fire({
                          title: "Sweet!",
                          text: "Modal with a custom image.",
                          imageUrl: itm?.image,
                          imsageWidth: 400,
                          imageHeight: 200,
                          imageAlt: ""
                        });
                      }} class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {itm?.title}
                              </p>
                             
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              $320
                            </div>
                          </div>
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <button className="px-20 py-2 rounded-lg mt-5 bg-yellow-300">
          Share
        </button>
      </div>
    </>
  );
}
