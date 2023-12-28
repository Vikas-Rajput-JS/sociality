import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import ApiClient from "../../Apis/ApiClient";
import LoadingBar from "react-top-loading-bar";
import Stripe from "stripe";

import io from 'socket.io-client'
import GooglePayButton from "@google-pay/button-react";
const stripe = new Stripe('sk_test_51OSDFOSJXboQazN3q61A2OoN8LwK4MEnOj23goQPUYRqOczFSJtqwQDuSGxCsctOypjQ09Qd0tKKE3USGDnnrrZp009TNkOSks')
function Login() {
  const ConnectSocket = () => {

    const socket = io.connect('http://localhost:3000')
    if (socket) {

    }
  }
  const [eye, setEye] = useState("password");
  const [form, setform] = useState({});
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const ref = useRef(null);


  useEffect(() => {
    // ConnectSocket()
    ref.current.staticStart();
    ref.current.complete();
  }, []);
  useEffect(() => {
    if (token) {
      Navigate("/home");
    } else Navigate("/login");
  }, [token]);

  const HandleSubmit = (e) => {
    ref?.current?.staticStart();
    e.preventDefault();
    ApiClient.post("login", form).then((res) => {
      if (res?.success) {
        ref.current.complete();
        // toast.success(res.message);

        localStorage.setItem("token", res?.token);

        Navigate("/home");
      } else {
        toast.error(res?.message);
        ref.current.complete();
      }
    });
  };

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
        {
            type: "CARD",
            parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"]
            },
            tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                    gateway: "stripe",
                    "stripe:version": "2023-10-16",
                    "stripe:publishableKey": "pk_test_51OSDFOSJXboQazN3RHWUS6CjxDIMbb6RPIMTBZWgmcZPIDRsefXnrEwXzZufUi4aI09iH5gsh1lbCTVZnsd4K0Ld00kOpk53d7"
                }
            }
        }
    ],
    merchantInfo: {
        merchantId: "BCR2DN4TZK2JD4Q2",
        merchantName: "Demo Merchant"
    },
    transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: "499",
        currencyCode: "USD",
        countryCode: "US"
    },
    shippingAddressRequired: true,
    callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],

};

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingBar shadow={true} height={3} color="yellow" ref={ref} />
        <section class="bg-gray-900 dark:bg-gray-900 w-full">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              
              class="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white"
            >
              <img
                class="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              CodeDera
            </a>
            <div class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 onClick={async()=>{
                  const session = await stripe.checkout.sessions.create({
                    line_items: [
                      {
  
                        price: 'price_1OSDIQSJXboQazN3qDBE9CkV',
                        quantity: 1,
                      },
                    ],
                    mode: 'subscription',
                    success_url: 'http://localhost:8053/next',
                    cancel_url: 'http://localhost:8053',
                  });
                  if(session){
                    window.location = session.url
                  }
                  console.log(session)
                }} class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <GooglePayButton
                                                                environment="TEST"
                                                                onPaymentAuthorized={paymentData => {

                                                                    // SetPaymentInfo(paymentData)
                                                                    console.log('Payment Authorised Success', paymentData)
                                                                    console.log(paymentData, "================")
                                                                    // Parse the JSON string
                                                                    // let JsonString = paymentData?.paymentMethodData?.tokenizationData?.token
                                                                    // const decodedData = JSON.parse(JsonString);
                                                                    // console.log(decodedData)
                                                                    // Access the properties
                                                                    // setTokenID(decodedData.id)

                                                                    // ApiClient.post('payment/create-google-intent', {
                                                                    //     googlePayToken: decodedData.id,
                                                                    //     amount: form?.price,
                                                                    //     currency: "USD",
                                                                    //     user_id: user.id,
                                                                    //     plan_id: form?.plan_id
                                                                    // }).then((res) => {
                                                                    //     if (res.success) {
                                                                    //         toast.success(res.message)
                                                                    //         setTimeout(() => {

                                                                    //             history.push('payment-success')
                                                                    //         }, 1000);
                                                                    //     }
                                                                    // })


                                                                    return { transactionState: 'SUCCESS' }
                                                                }
                                                                }
                                                                onPaymentDataChanged={paymentData => {
                                                                    console.log('On Payment Data Changed', paymentData)

                                                                    return {}
                                                                }
                                                                }
                                                                paymentRequest={paymentRequest}
                                                                onLoadPaymentData={paymentRequest => {
                                                                    console.log('load payment data', paymentRequest);
                                                                }}
                                                            />
                <form class="space-y-4 md:space-y-6" onSubmit={HandleSubmit}>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      required
                      value={form?.email}
                      onChange={(e) => {
                        setform({ ...form, email: e.target.value });
                      }}
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"

                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div className="flex w-full relative">
                      <input
                        value={form?.password}
                        onChange={(e) => {
                          setform({ ...form, password: e.target.value });
                        }}
                        type={eye}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        class="bg-gray-50 w-full border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required="true"
                      />
                      {eye == "password" ? (
                        <svg
                          onClick={() => {
                            setEye("text");
                          }}
                          class="h-8 w-8 ml-3 text-red-500 absolute top-2 right-0"
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
                          <circle cx="12" cy="12" r="9" />{" "}
                          <line x1="9" y1="10" x2="9.01" y2="10" />{" "}
                          <line x1="15" y1="10" x2="15.01" y2="10" />{" "}
                          <path d="M9.5 16a10 10 0 0 1 6 -1.5" />
                        </svg>
                      ) : (
                        <svg
                          onClick={() => {
                            setEye("password");
                          }}
                          class="h-8 w-8 ml-3 text-green-500 absolute top-1 right-0"
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
                          <circle cx="12" cy="12" r="9" />{" "}
                          <line x1="9" y1="9" x2="9.01" y2="9" />{" "}
                          <line x1="15" y1="9" x2="15.01" y2="9" />{" "}
                          <path d="M8 13a4 4 0 1 0 8 0m0 0H8" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="remember"
                          class="text-gray-900 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="/forgot-password"
                      class="text-sm font-medium text-black hover:underline dark:text-primary-500"
                      onClick={() => {
                        ref.current.staticStart();
                        ref.current.complete();
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    class="bg-yellow-400 px-2 py-1 rounded-md hover:bg-yellow-300 shadow-lg w-full"
                  >
                    Sign in
                  </button>
                  <p class="text-sm  text-black dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a
                      class="font-medium cursor-pointer text-primary-600 hover:underline dark:text-black"
                      onClick={() => {
                        ref.current.staticStart();
                        Navigate('/')
                        ref.current.complete();
                      }}
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div className="w-[50%] bg-gray-900 h-[100vh] flex justify-center">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            alt=""
          />
        </div>

      </div>
    </>
  );
}

export default Login;
