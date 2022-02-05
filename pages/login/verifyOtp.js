import { useRouter } from "next/router";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atoms/authState";
import { handleOtp } from "../../functions/handleLogin";

const verifyOtp = () => {
    const [loading,setLoading] = useState(false)
    const [otp, setOtp] = useState();
    const {otp: authOtp} = useRecoilValue(authState)
    const {email,hash} = authOtp
    const [auth,setAuth] = useRecoilState(authState)
    const router = useRouter()
    const handleOtpClick = async ()=> {
        setLoading(true)
        await handleOtp(otp,hash,email,router,auth,setAuth)
        setLoading(false)
    }
  return (
    <div className="bg-study h-screen flex justify-center items-center text-black">
      <Toaster />
      <div className="w-[400px] border-2 bg-white shadow-xl rounded-md p-4">
        <p className="text-2xl font-bold text-darkBlue text-center">LogIn</p>
        <p className="text-center font-semibold">Verify Otp to continue...</p>
        <div className="flex flex-col space-y-4 w-full mt-4">
          <input
            type="text"
            placeholder="Enter Otp"
            name="otp"
            className="border shadow-md p-3 rounded-md outline-none focus:outline-none"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button
          className={`bg-cl1 hover:bg-cl2 animation text-white font-semibold py-3 w-full rounded-md mt-8 text-lg ${
            loading && "cursor-not-allowed opacity-50"
          } `}
          onClick={handleOtpClick}
          disabled={loading}
        >
          LogIn
        </button>
      </div>
    </div>
  );
};

export default verifyOtp;
