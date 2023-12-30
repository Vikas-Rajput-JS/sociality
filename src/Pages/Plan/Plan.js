import React, { useEffect, useState } from "react";
import ApiClient from "../../Apis/ApiClient";
import GooglePayButton from "@google-pay/button-react";
import Stripe from "stripe";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useStripe } from "@stripe/react-stripe-js";
function Plan() {
     
  const stripe = new Stripe(
    "sk_test_51OSDFOSJXboQazN3q61A2OoN8LwK4MEnOj23goQPUYRqOczFSJtqwQDuSGxCsctOypjQ09Qd0tKKE3USGDnnrrZp009TNkOSks"
  );
  const Navigate = useNavigate()
  const [Plan, setPlan] = useState([]);
  const [form, setform] = useState({});
  const GetPlan = () => {
    ApiClient.get("subscriptions/plans").then((res) => {
      if (res.success) {
        setPlan(res?.data);
      }else{
        toast.error(res?.message)
Navigate('/login')
      }
    });
  };
  const PaymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "stripe",
            "stripe:version": "2023-10-16",
            "stripe:publishableKey":
              "pk_test_51OSDFOSJXboQazN3RHWUS6CjxDIMbb6RPIMTBZWgmcZPIDRsefXnrEwXzZufUi4aI09iH5gsh1lbCTVZnsd4K0Ld00kOpk53d7",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "BCR2DN4TZKF3FHDB",
      merchantName: "Vikas Rajput",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: form?.price?.toString(),
      currencyCode: "INR",
      countryCode: "IN",
    },
  };
const CreateCheckout = async()=>{
  let Session = await stripe.checkout.sessions.create({
    line_items:[{
      price:'price_1OSfp6SJXboQazN3CR9vjfiY',
      quantity:1

    },
],
    mode:'payment',
    success_url:'https://codedera-officials.pages.dev/',
    cancel_url:'http://localhost:3000/plans'
    
  })
  if(Session.url){
    window.location = Session.url
  }
}


  const PaymentResult = async(paymentData)=>{
    console.log(paymentData,"===================")
    if(paymentData.paymentMethodData){
        let JsonString = paymentData?.paymentMethodData?.tokenizationData?.token;
        let decode = JSON.parse(JsonString)
        console.log(decode.id)
        
        ApiClient.post('subscriptions/create-payment',{plan_id:form?.plan_id,googlePayToken:decode?.id,}).then(async(res)=>{
            if(res.success){
                toast.success(res?.message)
            
      
            }
        })
    }
  }
  useEffect(() => {
    GetPlan();
  }, []);
  return (
    <div className="w-[100%] h-[100vh] bg-transparent flex flex-col justify-around items-center">
      <h1 className="text-3xl font-serif mt-5">
        Select your Plan and Starts Premium Journey !
      </h1>
      <div className="w-[100%] h-[90vh] flex justify-around items-center">
        {Plan &&
          Plan.map((itm) => {
            return (
              <div class="w-80 p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
                <p class="mb-4 text-xl font-medium text-gray-800 dark:text-gray-50" onClick={()=>{
                  CreateCheckout()
                }}>
                  {itm.name}
                </p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white">
                  ${itm.price}
                  <span class="text-sm text-gray-300">/ month</span>
                </p>
                <p class="mt-4 text-xs text-gray-600 dark:text-gray-100">
                  For most businesses that want to optimize web queries.
                </p>
                <ul class="w-full mt-6 mb-6 text-sm text-gray-600 dark:text-gray-100">
                  <li class="mb-3 flex items-center ">
                    <svg
                      class="w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="#10b981"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    All illimited components
                  </li>
                  <li class="mb-3 flex items-center ">
                    <svg
                      class="w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="#10b981"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Own custom Tailwind styles
                  </li>
                  <li class="mb-3 flex items-center ">
                    <svg
                      class="w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="#10b981"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Unlimited Templates
                  </li>
                  <li class="mb-3 flex items-center ">
                    <svg
                      class="w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="#10b981"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Free premium dashboard
                  </li>
                  <li class="mb-3 flex items-center ">
                    <svg
                      class="w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="#10b981"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Best ranking
                  </li>
                  <li class="mb-3 flex items-center opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      class="w-6 h-6 mr-2"
                      fill="red"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    Premium svg
                  </li>
                  <li class="mb-3 flex items-center opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      class="w-6 h-6 mr-2"
                      fill="red"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    My wife
                  </li>
                </ul>
                <button
                  onClick={() => {
                    setform({ ...form, plan_id: itm.id,price:itm.price });
                    document.getElementById("OpenModel").click();
                  }}
                  type="button"
                  class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Choose plan
                </button>
              </div>
            );
          })}

        {/* <div class="w-80 p-4  shadow-lg rounded-2xl bg-gray-800">
          <p class="mb-4 text-xl font-medium text-gray-50">Standard</p>
          <p class="text-3xl font-bold text-white">
            $199
            <span class="text-sm text-gray-300">/ month</span>
          </p>
          <p class="mt-4 text-xs text-gray-100">
            For most businesses that want to optimize web queries.
          </p>
          <ul class="w-full mt-6 mb-6 text-sm text-gray-100">
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              All illimited components
            </li>
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Own custom Tailwind styles
            </li>
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Unlimited Templates
            </li>
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Free premium dashboard
            </li>
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Best ranking
            </li>
            <li class="mb-3 flex items-center opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                class="w-6 h-6 mr-2"
                fill="red"
                viewBox="0 0 1792 1792"
              >
                <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Premium svg
            </li>
            <li class="mb-3 flex items-center opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                class="w-6 h-6 mr-2"
                fill="red"
                viewBox="0 0 1792 1792"
              >
                <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              My wife
            </li>
          </ul>
          <button
            type="button"
            class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Choose plan
          </button>
        </div>
        <div class="w-80 p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
          <p class="mb-4 text-xl font-medium text-gray-800 dark:text-gray-50">
            Premium
          </p>
          <p class="text-3xl font-bold text-gray-900 dark:text-white">
            $499
            <span class="text-sm text-gray-300">/ month</span>
          </p>
          <p class="mt-4 text-xs text-gray-600 dark:text-gray-100">
            For most businesses that want to optimize web queries.
          </p>
          <ul class="w-full mt-6 mb-6 text-sm text-gray-600 dark:text-gray-100">
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              All illimited components
            </li>
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Own custom Tailwind styles
            </li>
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Unlimited Templates
            </li>
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Free premium dashboard
            </li>
            <li class="mb-3 flex items-center ">
              <svg
                class="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                stroke="currentColor"
                fill="#10b981"
                viewBox="0 0 1792 1792"
              >
                <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Best ranking
            </li>
            <li class="mb-3 flex items-center opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                class="w-6 h-6 mr-2"
                fill="red"
                viewBox="0 0 1792 1792"
              >
                <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              Premium svg
            </li>
            <li class="mb-3 flex items-center opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                class="w-6 h-6 mr-2"
                fill="red"
                viewBox="0 0 1792 1792"
              >
                <path d="M1277 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
              </svg>
              My wife
            </li>
          </ul>
          <button
          onClick={()=>{
            document.getElementById('OpenModel').click()
          }}
            type="button"
            class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Choose plan
          </button>
        </div> */}
      </div>
      <div>
        <button
          type="button"
          data-modal-target="crypto-modal"
          data-modal-toggle="crypto-modal"
          id="OpenModel"
          class="text-gray-900 hidden bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        >
          <svg
            aria-hidden="true"
            class="w-4 h-4 me-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
          Choose Payment Method
        </button>

        <div
          id="crypto-modal"
          tabindex="-1"
          aria-hidden="true"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Choose Payment Method
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crypto-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div class="p-4 md:p-5">
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Connect with one of our available wallet providers or create a
                  new one.
                </p>
                <ul class="my-4 space-y-3">
                  <li>
                    <GooglePayButton
                      environment="TEST"
                      paymentRequest={PaymentRequest}
                      onLoadPaymentData={PaymentResult}
                    />
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        class="h-5"
                        viewBox="0 0 292 292"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M145.7 291.66C226.146 291.66 291.36 226.446 291.36 146C291.36 65.5541 226.146 0.339844 145.7 0.339844C65.2542 0.339844 0.0400391 65.5541 0.0400391 146C0.0400391 226.446 65.2542 291.66 145.7 291.66Z"
                          fill="#3259A5"
                        />
                        <path
                          d="M195.94 155.5C191.49 179.08 170.8 196.91 145.93 196.91C117.81 196.91 95.0204 174.12 95.0204 146C95.0204 117.88 117.81 95.0897 145.93 95.0897C170.8 95.0897 191.49 112.93 195.94 136.5H247.31C242.52 84.7197 198.96 44.1797 145.93 44.1797C89.6904 44.1797 44.1104 89.7697 44.1104 146C44.1104 202.24 89.7004 247.82 145.93 247.82C198.96 247.82 242.52 207.28 247.31 155.5H195.94Z"
                          fill="white"
                        />
                      </svg>
                      <span class="flex-1 ms-3 whitespace-nowrap">
                        Coinbase Wallet
                      </span>
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="#"
                      class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        svg
                        class="h-5"
                        viewBox="0 0 75.591 75.591"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                      >
                        <linearGradient
                          id="a"
                          gradientTransform="matrix(0 -54.944 -54.944 0 23.62 79.474)"
                          gradientUnits="userSpaceOnUse"
                          x2="1"
                        >
                          <stop offset="0" stop-color="#ff1b2d" />
                          <stop offset=".3" stop-color="#ff1b2d" />
                          <stop offset=".614" stop-color="#ff1b2d" />
                          <stop offset="1" stop-color="#a70014" />
                        </linearGradient>
                        <linearGradient
                          id="b"
                          gradientTransform="matrix(0 -48.595 -48.595 0 37.854 76.235)"
                          gradientUnits="userSpaceOnUse"
                          x2="1"
                        >
                          <stop offset="0" stop-color="#9c0000" />
                          <stop offset=".7" stop-color="#ff4b4b" />
                          <stop offset="1" stop-color="#ff4b4b" />
                        </linearGradient>
                        <g transform="matrix(1.3333 0 0 -1.3333 0 107.2)">
                          <path
                            d="m28.346 80.398c-15.655 0-28.346-12.691-28.346-28.346 0-15.202 11.968-27.609 26.996-28.313.44848-.02115.89766-.03314 1.3504-.03314 7.2574 0 13.876 2.7289 18.891 7.2137-3.3227-2.2036-7.2074-3.4715-11.359-3.4715-6.7504 0-12.796 3.3488-16.862 8.6297-3.1344 3.6999-5.1645 9.1691-5.3028 15.307v1.3349c.13821 6.1377 2.1683 11.608 5.302 15.307 4.0666 5.2809 10.112 8.6297 16.862 8.6297 4.1526 0 8.038-1.2679 11.361-3.4729-4.9904 4.4643-11.569 7.1876-18.786 7.2144-.03596 0-.07122.0014-.10718.0014z"
                            fill="url(#a)"
                          />
                          <path
                            d="m19.016 68.025c2.6013 3.0709 5.9607 4.9227 9.631 4.9227 8.2524 0 14.941-9.356 14.941-20.897s-6.6891-20.897-14.941-20.897c-3.6703 0-7.0297 1.851-9.6303 4.922 4.0659-5.2809 10.111-8.6297 16.862-8.6297 4.1519 0 8.0366 1.2679 11.359 3.4715 5.802 5.1906 9.4554 12.735 9.4554 21.133 0 8.397-3.6527 15.941-9.4533 21.131-3.3234 2.205-7.2088 3.4729-11.361 3.4729-6.7504 0-12.796-3.3488-16.862-8.6297"
                            fill="url(#b)"
                          />
                        </g>
                      </svg>
                      <span class="flex-1 ms-3 whitespace-nowrap">
                        Opera Wallet
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        class="h-5"
                        viewBox="0 0 512 512"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                      >
                        <defs>
                          <radialGradient
                            cx="0%"
                            cy="50%"
                            fx="0%"
                            fy="50%"
                            r="100%"
                            id="radialGradient-1"
                          >
                            <stop stop-color="#5D9DF6" offset="0%"></stop>
                            <stop stop-color="#006FFF" offset="100%"></stop>
                          </radialGradient>
                        </defs>
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g id="logo">
                            <rect
                              id="base"
                              fill="url(#radialGradient-1)"
                              x="0"
                              y="0"
                              width="512"
                              height="512"
                              rx="256"
                            ></rect>
                            <path
                              d="M169.209772,184.531136 C217.142772,137.600733 294.857519,137.600733 342.790517,184.531136 L348.559331,190.179285 C350.955981,192.525805 350.955981,196.330266 348.559331,198.676787 L328.82537,217.99798 C327.627045,219.171241 325.684176,219.171241 324.485851,217.99798 L316.547278,210.225455 C283.10802,177.485633 228.89227,177.485633 195.453011,210.225455 L186.951456,218.549188 C185.75313,219.722448 183.810261,219.722448 182.611937,218.549188 L162.877976,199.227995 C160.481326,196.881474 160.481326,193.077013 162.877976,190.730493 L169.209772,184.531136 Z M383.602212,224.489406 L401.165475,241.685365 C403.562113,244.031874 403.562127,247.836312 401.165506,250.182837 L321.971538,327.721548 C319.574905,330.068086 315.689168,330.068112 313.292501,327.721609 C313.292491,327.721599 313.29248,327.721588 313.29247,327.721578 L257.08541,272.690097 C256.486248,272.103467 255.514813,272.103467 254.915651,272.690097 C254.915647,272.690101 254.915644,272.690105 254.91564,272.690108 L198.709777,327.721548 C196.313151,330.068092 192.427413,330.068131 190.030739,327.721634 C190.030725,327.72162 190.03071,327.721606 190.030695,327.721591 L110.834524,250.181849 C108.437875,247.835329 108.437875,244.030868 110.834524,241.684348 L128.397819,224.488418 C130.794468,222.141898 134.680206,222.141898 137.076856,224.488418 L193.284734,279.520668 C193.883897,280.107298 194.85533,280.107298 195.454493,279.520668 C195.454502,279.520659 195.45451,279.520651 195.454519,279.520644 L251.65958,224.488418 C254.056175,222.141844 257.941913,222.141756 260.338618,224.488222 C260.338651,224.488255 260.338684,224.488288 260.338717,224.488321 L316.546521,279.520644 C317.145683,280.107273 318.117118,280.107273 318.71628,279.520644 L374.923175,224.489406 C377.319825,222.142885 381.205562,222.142885 383.602212,224.489406 Z"
                              id="WalletConnect"
                              fill="#FFFFFF"
                              fill-rule="nonzero"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <span class="flex-1 ms-3 whitespace-nowrap">
                        WalletConnect
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        class="h-4"
                        viewBox="0 0 96 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M72.0998 0.600098H48.3998H24.5998H0.799805V24.4001V48.2001V49.7001V71.8001V71.9001V95.5001H24.5998V72.0001V71.9001V49.8001V48.3001V24.5001H48.3998H72.1998H95.9998V0.700104H72.0998V0.600098Z"
                          fill="#617BFF"
                        />
                        <path
                          d="M48.5 71.8002H72.1V95.6002H73C79.1 95.6002 84.9 93.2002 89.2 88.9002C93.5 84.6002 95.9 78.8002 95.9 72.7002V48.2002H48.5V71.8002Z"
                          fill="#617BFF"
                        />
                      </svg>
                      <span class="flex-1 ms-3 whitespace-nowrap">
                        Fortmatic
                      </span>
                    </a>
                  </li> */}
                </ul>
                <div>
                  <a
                    href="#"
                    class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                  >
                    <svg
                      class="w-3 h-3 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Why do I need to connect with my wallet?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plan;
