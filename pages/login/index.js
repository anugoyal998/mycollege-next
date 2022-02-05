import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import {authState} from '../../atoms/authState'
import {handleSignIn} from "../../functions/handleLogin";

const index = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [auth,setAuth] = useRecoilState(authState)
  const handleSignInClick = async ()=> {
      setLoading(true);
      await handleSignIn(email,router,auth,setAuth)
      setLoading(false);
  }
  return (
    <div className="bg-study h-screen flex justify-center items-center text-black">
      <Toaster />
      <div className="w-[400px] border-2 bg-white shadow-xl rounded-md p-4">
        <p className="text-2xl font-bold text-darkBlue text-center">LogIn</p>
        <p className="text-center font-semibold">Enter your Email to login</p>
        <div className="flex flex-col space-y-4 w-full mt-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="border shadow-md p-3 rounded-md outline-none focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className={`bg-cl1 hover:bg-cl2 animation text-white font-semibold py-3 w-full rounded-md mt-8 text-lg ${
            loading && "cursor-not-allowed opacity-50"
          } `}
          onClick={handleSignInClick}
          disabled={loading}
        >
          LogIn
        </button>
      </div>
    </div>
  );
};

export default index;
