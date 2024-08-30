"use client";
import axios from "axios";
import React, { useState } from "react";
import FacebookLogin, {
  FacebookLoginAuthResponse,
} from "react-facebook-login-lite";
import { FaFacebook } from "react-icons/fa";

function Login({ setUser }: any) {
  const [buttonHover, setButtonHover] = useState(false);
  const responceFB = async (response: FacebookLoginAuthResponse) => {
    const { accessToken } = response.authResponse;
    const userResponse = await axios.post("/api/auth/facebook", {
      accessToken,
    });
    console.log(userResponse.data);
    setUser({ ...userResponse.data, accessToken });
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white text-stone-950 shadow-sm dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50 sm:col-span-2 flex flex-wrap justify-between md:gap-4">
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <h1 className="text-2xl leading-none pb-2 font-extrabold tracking-tight text-blue-600 cursor-pointer hover:text-blue-700 duration-100">
          FBinsights
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-lg text-balance leading-relaxed">
          Easily track the performance of your Facebook pages with FBinsights.
          Our intuitive dashboard provides insights into key metrics
        </p>
      </div>
      <div className="p-6 flex flex-col  align-middle justify-center">
        <button
          onMouseEnter={() => {
            setButtonHover(true);
          }}
          onMouseLeave={() => {
            setButtonHover(false);
          }}
          className="px-4 py-[2px] hover:mx-4 hover:p-0 rounded-full flex border text-blue-500 font-bold border-blue-900 flex-row items-center  align-middle justify-center  duration-100 hover:shadow-lg hover:transform hover:translate-y-1 hover:translate-x-1 hover:rounded-sm "
        >
          {/* <FaFacebook
            className={`mr-2 rounded-full ${
              buttonHover ? "text-white" : "text-blue-500"
            }`}
          /> */}
          <FacebookLogin
            appId="893860872775466"
            onSuccess={responceFB}
            imgSrc="https://static.vecteezy.com/system/resources/previews/018/930/476/original/facebook-logo-facebook-icon-transparent-free-png.png"
            onFailure={(error) => console.error("Login failed:", error)}
            scope="public_profile,email,pages_show_list,pages_read_engagement,read_insights"
            fields="name,email,picture"
          />
          {/* <h2 className="text-base">Login with Facebook</h2> */}
        </button>
      </div>
    </div>
  );
}

export default Login;
