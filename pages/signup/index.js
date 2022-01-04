import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import handleSignUp from "../../functions/handleSignUp";

export default function index() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSentOTP, setHasSentOTP] = useState(false);
  const router = useRouter();
  const handleSignUpClick = async () => {
    setLoading((prev) => true);
    await handleSignUp(state, setState, setHasSentOTP);
    setLoading((prev) => false);
  };
  const handleVerifyClick = async () => {
    setLoading((prev) => true);
    if (!otp) {
      alert("Invalid otp");
      return;
    }
    const isMatch = await bcrypt.compare(otp, state?.otp);
    if (!isMatch) {
      alert("Incorrect otp");
      console.log("incorrect");
      return;
    }
    try {
      const hash = await bcrypt.hash(state?.password, 10);
      const rsp = await axios.post("/api/signup", {
        name: state?.name,
        email: state?.email,
        password: hash,
      });
      if (rsp.data.data === "Already Exists") {
        alert("User Already Exists");
        router.replace("/login");
        return;
      }
    } catch (error) {
      alert("An error occurred");
      console.log(error);
      return;
    }
    setLoading((prev) => false);
    router.replace("/login");
  };
  return (
    <div className="bg-study h-screen flex justify-center items-center text-black">
      <div className="w-[400px] border-2 bg-white shadow-xl rounded-md p-4">
        <p className="text-2xl font-bold text-darkBlue text-center">
          {hasSentOTP ? "Verify to Continue" : "SignUp"}
        </p>
        {!hasSentOTP ? (
          <>
            <div className="flex flex-col space-y-4 w-full mt-4">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="border shadow-md p-3 rounded-md outline-none focus:outline-none"
                value={state?.name}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="border shadow-md p-3 rounded-md outline-none focus:outline-none"
                value={state?.email}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="border shadow-md p-3 rounded-md outline-none focus:outline-none"
                value={state?.password}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="border shadow-md p-3 rounded-md outline-none focus:outline-none"
                value={state?.confirmPassword}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button
              className={`bg-cl1 hover:bg-cl2 animation text-white font-semibold py-3 w-full rounded-md mt-8 text-lg ${
                loading && "cursor-not-allowed opacity-50"
              } `}
              onClick={handleSignUpClick}
              disabled={loading}
            >
              SignUp
            </button>
            <p className="text-sm font-semibold text-darkBlue mt-3">
              Already have an account?{" "}
              <Link href="/login">
                <a className="underline">Login Here</a>
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-4 w-full mt-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="border shadow-md p-3 rounded-md outline-none focus:outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className={`bg-cl1 hover:bg-cl2 animation text-white font-semibold py-3 w-full rounded-md mt-8 text-lg ${
                loading && "cursor-not-allowed opacity-50"
              } `}
              onClick={handleVerifyClick}
              disabled={loading}
            >
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
}
