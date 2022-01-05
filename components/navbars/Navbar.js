import Link from "next/link";
import React from "react";
import { TitleName } from "../../constants/TitleName";
import { getCookie } from "cookies-next";

export default function Navbar() {
  const data = getCookie("user");
  const user = data && JSON.parse(data);
  return (
    <div className="px-4 flex justify-between items-center pt-2">
      <p className="text-darkBlue text-2xl font-semibold">{TitleName}</p>
      <div className="flex items-center space-x-4">
        <p className="text-darkBlue font-semibold hover:text-cl1 cursor-pointer">
          Study
        </p>
        <p className="text-darkBlue font-semibold hover:text-cl1 cursor-pointer">
          PYQs
        </p>
        <p className="text-darkBlue font-semibold hover:text-cl1 cursor-pointer">
          Updates
        </p>
        {!user ? (
          <Link href="/login">
            <a className="outline-none focus:outline-none text-white font-semibold bg-cl1 hover:bg-cl2 px-5 py-2 rounded-md animation">
              Log In
            </a>
          </Link>
        ) : (
          <Link href={`/profile/${user?.email?.split('@')[0]}`}>
            <a className="text-center outline-none focus:outline-none text-white font-semibold bg-cl1 hover:bg-cl2 px-5 py-2 rounded-md animation w-32 truncate">
              {user?.name}
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
