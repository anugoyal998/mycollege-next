import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import handleSignUp from "../../functions/handleSignUp";
import handleVerify from "../../functions/handleVerify";
import { Toaster } from "react-hot-toast";

export default function index() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSentOTP, setHasSentOTP] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-study h-[120vh] flex justify-center items-center text-black">
      <Toaster />
      <div className="w-[400px] border-2 bg-white shadow-xl rounded-md p-4">
        <p className="text-2xl font-bold text-darkBlue text-center">
          {hasSentOTP ? "Verify to Continue" : "SignUp"}
        </p>
        {!hasSentOTP ? (
          <Before
            state={state}
            setState={setState}
            loading={loading}
            setLoading={setLoading}
            setHasSentOTP={setHasSentOTP}
          />
        ) : (
          <After
            otp={otp}
            setOtp={setOtp}
            loading={loading}
            setLoading={setLoading}
            state={state}
            router={router}
          />
        )}
      </div>
    </div>
  );
}

const After = ({ otp, setOtp, loading, setLoading, state, router }) => {
  const handleVerifyClick = async () => {
    setLoading((prev) => true);
    await handleVerify(otp, state, router);
    setLoading((prev) => false);
  };
  return (
    <div>
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
    </div>
  );
};

const Before = ({ state, setState, loading, setLoading, setHasSentOTP }) => {
  const handleSignUpClick = async () => {
    setLoading((prev) => true);
    await handleSignUp(state, setHasSentOTP);
    setLoading((prev) => false);
  };
  return (
    <div>
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
      <p className="text-darkBlue text-center font-semibold mt-4">
        Instructions
      </p>
      <p className="text-sm font-semibold">1) Email should be your NIT KKR’s domain id.</p>
      <p className="text-sm font-semibold">2) Password must consists of atleast 8 digits long.</p>
      <p className="text-sm font-semibold">
        3) Password must contains atleast one lowercase letter, uppercase
        letter, and digit.
      </p>
    </div>
  );
};
