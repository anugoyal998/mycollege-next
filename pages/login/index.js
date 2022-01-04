import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import handleSignIn from "../../functions/handleSignIn";

export default function () {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignInClick = async () => {
    setLoading((prev) => true);
    await handleSignIn(state, router);
    setLoading((prev) => false);
  };
  return (
    <div className="bg-study h-screen flex justify-center items-center text-black">
      <div className="w-[400px] border-2 bg-white shadow-xl rounded-md p-4">
        <p className="text-2xl font-bold text-darkBlue text-center">LogIn</p>
        <div className="flex flex-col space-y-4 w-full mt-4">
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
        <p className="text-sm font-semibold text-darkBlue mt-3">
          Don't have an account?{" "}
          <Link href="/signup">
            <a className="underline">SignUp Here</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
