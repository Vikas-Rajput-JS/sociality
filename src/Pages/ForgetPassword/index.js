import React, { useEffect, useRef, useState } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import LoadingBar from "react-top-loading-bar";
import ApiClient from "../../Apis/ApiClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
function SendOtp() {
  const [OTP, setOTP] = useState("");
  const ref = useRef(null);
  const [form, setform] = useState({});
  const navigate = useNavigate();
  console.log(OTP);
  useEffect(() => {
    ref.current.staticStart();
    ref.current.complete();
  }, []);
  const HandleSubmit = (e) => {
    ref.current.staticStart();
    e.preventDefault();
    ApiClient.post("forgot-password", form).then((res) => {
      if (res.success) {
        ref.current.complete();
        toast.success(res?.message);
        localStorage.setItem("email", form?.email);
        setTimeout(() => {
          navigate("/verify-otp");
        }, 600);
      } else {
        toast.error(res?.message);
        ref.current.complete();
      }
    });
  };
  return (
    <div class="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <LoadingBar shadow={true} height={4} color="#2fb345" ref={ref} />
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <div class="font-semibold text-3xl">
              <p>Please Enter Your Email </p>
            </div>
            <div class="flex flex-row text-sm font-medium text-gray-400">
              <p>We will a code to your email</p>
            </div>
          </div>

          <div>
            <form onSubmit={HandleSubmit} method="post">
              <div class="flex flex-col space-y-16">
                <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div class="w-80 h-12  ">
                    <input
                      value={form?.email}
                      onChange={(e) => {
                        setform({ ...form, email: e.target.value });
                      }}
                      required
                      class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>

                <div class="flex flex-col space-y-5 justify-center">
                  <div>
                    <button class="flex flex-row items-center justify-center text-center w-[70%] ml-16 border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Send OTP
                    </button>
                  </div>

                  <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Remembered Password ?</p>{" "}
                    <a
                      class="flex flex-row items-center text-blue-600"
                      href="http:/login"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Log In
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Toaster/> */}
    </div>
  );
}

export default SendOtp;
