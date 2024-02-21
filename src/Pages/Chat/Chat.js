import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import dateFormat from "dateformat";
import ApiClient from "../../Apis/ApiClient";
import EmojiPicker from "emoji-picker-react";

// const socket = io.connect("http://localhost:3300");
function Chat({ socket, room }) {
  console.log(room);
  const [Sent, setSent] = useState([]);
  const [form, setform] = useState({});
  const [user, setUser] = useState({});
  const [Received, setReceived] = useState([]);
  let [Data, setData] = useState([]);
  const [connectedUser, SetConnect] = useState({});
  const [display, setDisplay] = useState(false);
  const GetProfile = () => {
    ApiClient.get("profile").then((res) => {
      if (res.success) {
        setUser(res?.data);
      }
    });
  };

  const SendMessage = async () => {
    let data = {
      user: user.name,
      Sending: "me",
      image: user.image,
      message: form.message,
      room: 1234,
      time: Date.now(),
    };
    setSent([...Sent, data]);
    await socket.emit("send_message", data);
    document
      .getElementById("MainDiv")
      .scroll({ top: 1500000000, left: 0, behavior: "smooth" });
      setform({message:''})
  };
  socket.on("getData", (data) => {
    SetConnect(data);
    console.log(data, "=====================================!!!!!!!!!!!!!");
  });

  useEffect(() => {
    socket.on("join_room", {
      name: user.name,
      id: 1234,
    });

    socket.on("receive_message", (data) => {
      console.log(data, "receiving");
      setReceived([...Received, data]);
      document
        .getElementById("MainDiv")
        .scroll({ top: 1500000000, left: 0, behavior: "smooth" });
    });
  }, [socket]);

  useEffect(() => {
    GetProfile();
  }, []);

  console.log(Received);
  console.log(Sent);

  return (
    <div class="flex h-[100vh] antialiased text-gray-800 w-full">
      <div class="flex flex-row h-full w-full overflow-x-hidden w-[100%]">
        <div class="flex flex-col flex-auto h-full p-6 w-[100%]">
          <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 w-[100%]  scrollbar-hide">
            <div
              id="MainDiv"
              class="flex flex-col h-full overflow-x-auto overflow-scroll mb-4 scrollbar-hide "  onClick={()=>{
                setDisplay(false)
              }}
            >
              <div class="flex flex-col h-full">
                <div class="grid grid-cols-12 gap-y-2">
                  <div class="col-start-1 col-end-8 p-3 rounded-lg w-[100%] bg-yellow-300">
                    <div class="flex flex-row items-center">
                      <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        {/* {itm.user.split('')[0]} */}
                        <img
                          src={connectedUser.image}
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                      </div>
                      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl flex flex-col justify-end items-center flex">
                        <div className="flex w-full justify-end items-end">
                          <div>{connectedUser.name}</div>
                          {/* {dateFormat(itm.date, "h:MM TT")} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {Received &&
                    Received.map((itm,i) => {
                      return (
                        <div key={i} class="col-start-1 col-end-8 p-3 rounded-lg">
                          <div class="flex flex-row items-center">
                            <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              {/* {itm.user.split('')[0]} */}
                              <img
                                src={itm.image}
                                className="w-10 h-10 rounded-full"
                                alt=""
                              />
                            </div>
                            <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl flex flex-col justify-end items-center flex">
                              <div>{itm.message}</div>
                              <div className="flex w-full justify-end items-end">
                                {dateFormat(itm.date, "h:MM TT")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  {/* <div class="col-start-1 col-end-8 p-3 rounded-lg">
                    <div class="flex flex-row items-center">
                      <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Vel ipsa commodi illum saepe numquam maxime
                          asperiores voluptate sit, minima perspiciatis.
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {Sent &&
                    Sent.map((itm) => {
                      return (
                        <div class="col-start-6 col-end-13 p-3 rounded-lg" >
                          <div class="flex items-center justify-start flex-row-reverse">
                            <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              <img
                                src={user.image}
                                className="w-10 h-10 rounded-full"
                                alt=""
                              />
                              {/* {itm.user.split('')[0]} */}
                            </div>
                            <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl flex justify-end items-center flex-col">
                              <div>{itm.message}</div>
                              <div className="w-full flex justify-end items-center">
                                {dateFormat(itm.time, "h:MM TT")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex-grow ml-4">
                <div class="relative w-full">
                  <input
                    type="text"
                    value={form.message}
                    onChange={(e) => {
                      setform({...form,message:e.target.value});
                      console.log(Sent, "==================Sent");
                      console.log(Received, "==================Received");
                    }}
                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />

                  <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      onClick={() => {
                        setDisplay(true);
                      }}
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="ml-4">
                <button
                  onClick={SendMessage}
                  class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span class="ml-2">
                    <svg
                      class="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {display ? (
        <EmojiPicker
          onEmojiClick={(e) => {
            setform({...form,message:e.emoji});
          }}
          className="absolute top-[50vh] right-[40%]"
          height={"40vh"}
          width={"500px"}
        />
      ) : null}
    </div>
  );
}

export default Chat;
