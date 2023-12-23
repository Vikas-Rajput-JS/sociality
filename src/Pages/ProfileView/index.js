import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Logo from "../Profile/Dev-logo.jpg";
import ApiClient from "../../Apis/ApiClient";
import { Navigate, useNavigate } from "react-router";
import LoadingBar from "react-top-loading-bar";
import toast from "react-hot-toast";
function Index() {
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
  const [Post, setPost] = useState([]);
  const [length, setlength] = useState(0);
  const [form, setform] = useState({});
  const ref = useRef(null);
  const GetData = () => {
    ApiClient.get("profile").then((res) => {
      if (res.success) {
        console.log(res);
        setData(res?.data);
        localStorage.setItem("id", res?.data?.id);
      }else{
        toast.error(res.message)
      }
    });
    const GetPost = () => {
      ApiClient.get("posts/allposts").then((res) => {
        if (res.success) {
          setPost(res?.data);
          localStorage.removeItem("update");
        }else{
            toast.error(res.message)
          }
      });
    };
    GetPost();
    ApiClient.get("getUser").then((res) => {
      if (res.success) {
      } else{
        toast.error(res.message)
      }
      
    });
  };
  useEffect(() => {
    GetData();
  }, []);

  const SubmitImage = async (image) => {
    ref.current.staticStart();

    const file = image.target.files;
    const ImageForm = new FormData();
    ImageForm.append("image", file[0]);

    const UploadImage = await fetch(
      "https://api.imgbb.com/1/upload?expiration=600&key=81e51e4b5abab8382e2f6561ba765ef8",
      {
        method: "post",
        body: ImageForm,
      }
    );
    const res = await UploadImage.json();
    console.log(res);

    if (res.success) {
      ref.current.complete();
      setform({ ...form, bannerImage: res?.data?.url });
      ApiClient.put("profile", { bannerImage: res?.data?.url }).then((res) => {
        if (res.success) {
          toast.success(res.message);
        }else{
            toast.error(res.message)
          }
      });
      // toast.success("Image Uploaded Successfully");
      // toast.custom((t) => (
      //   <div
      //     className={`${
      //       t.visible ? "animate-enter" : "animate-leave"
      //     } max-w-md w-full  bg-white shadow-lg rounded-lg pointer-events-auto flex-col flex ring-1 ring-black ring-opacity-5`}
      //   >
      //     <div className="flex-1 w-full p-4">
      //       <div className="flex items-start w-full">
      //         <div className="flex-shrink-0 pt-0.5 w-full">
      //           <img
      //             className="h-[30vh] w-[100%] rounded-2xl"
      //             src={res?.data?.url}
      //             alt=""
      //           />
      //         </div>
      //       </div>
      //     </div>
      //     <div className="flex border-l border-gray-200">
      //       <button
      //         onClick={() => toast.dismiss(t.id)}
      //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      //       >
      //         Close
      //       </button>
      //     </div>
      //   </div>
      // ));
    }
  };
  console.log(data);

  return (
    <div className="w-[100%] h-[100vh]   items-center flex flex-col justify-start  rounded-2xl">
      <LoadingBar shadow={true} height={3} color="red" ref={ref} />
      <nav class="bg-white border-gray-200 dark:bg-gray-900 absolute top-0 w-full">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span class="sr-only">Open user menu</span>
              <img
                className="w-12 h-12 shadow-2xl shadow-black border-x-1 rounded-full"
                src={data?.image}
                alt="user photo"
              />
            </button>

            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">
                  {data?.name}
                </span>
                <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {data?.email}
                </span>
              </div>
              <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="/home"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="w-[100%] mt-4 h-[45vh] rounded-xl bg-transparent shadow-lg shadow-slate-400">
        <div className="w-full h-[47vh]">
          <img
            className="w-[100%] h-[47vh] rounded-xl absolute top-[8vh]"
            src={data?.bannerImage}
            alt=""
          />
          <svg
            onClick={() => {
              document.getElementById("input_Image2").click();
            }}
            class="h-8 w-8 text-red-500 relative top-24 left-[95%] cursor-pointer z-50"
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
            <polyline points="6 21 21 6 18 3 3 18 6 21" />{" "}
            <line x1="15" y1="6" x2="18" y2="9" />{" "}
            <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />{" "}
            <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
          </svg>
        </div>
        <div className="w-full flex justify-center  flex-col items-center text-black">
          <img
            className="rounded-full w-28 h-28 z-50 shadow-2xl shadow-black"
            src={data.image}
            alt=""
          />
          <h1 className="mt-4 text-black">{data.name}</h1>
          <h1 className="mt-2 text-black">
            {data?.bio?.substr(0, 15) + "...."}
          </h1>
        </div>

        <div
          className="grid grid-cols-3 w-[100%] h-auto gap-3 h-auto"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3917.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          {Post?.map((itm) => {
            return (
              <div class="max-w-sm rounded overflow-hidden shadow-lg  mb-5 mt-3">
                <img
                  class="w-full h-[25vh]"
                  src={itm?.image}
                  alt="Sunset in the mountains"
                />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">Vikas Rajput</div>
                  <p class="text-gray-700 text-base">{itm?.caption}</p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #photography
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #travel
                  </span>
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #winter
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <input
        type="file"
        name=""
        id="input_Image2"
        onChange={(e) => {
          SubmitImage(e);
        }}
        className="hidden"
      />
    </div>
  );
}

export default Index;
