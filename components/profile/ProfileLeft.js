import Image from "next/image";
import React, { useEffect, useState } from "react";
import useTokens from "../../hooks/useTokens";
import avatar from "../../img/avatar.png";
import { GrLocation } from "react-icons/gr";
import { FiMail } from "react-icons/fi";
import { BiLink } from "react-icons/bi";

export default function ProfileLeft() {
  const [tokens, setTokens] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetch() {
      const rsp = await useTokens();
      setTokens(rsp);
      setUser(rsp?.user);
    }
    fetch();
  }, []);
  return (
    <div className="w-[300px]">
      <div className="w-72 h-72 border rounded-full">
        <Image src={avatar} alt="" />
      </div>
      <p className="font-bold text-2xl mt-2 truncate">{user?.name}</p>
      <p className="font-medium text-lg truncate">
        {user?.email?.split("@")[0]}
      </p>
      <p className="font-semibold">I am a Engineering Student</p>
      <button className="bg-cl1 text-white font-semibold w-full py-2 mt-1 mb-2 rounded-md shadow-2xl animation hover:my-4 hover:py-3 hover:text-lg">
        Edit Profile
      </button>
      <div className="flex space-x-2">
        <GrLocation className="text-2xl animation transform hover:scale-125 cursor-pointer" />
        <p className="truncate">Location</p>
      </div>
      <div className="flex space-x-2 mt-1">
        <FiMail className="text-2xl animation transform hover:scale-125 cursor-pointer" />
        <p className="truncate">{user?.email}</p>
      </div>
      <div className="flex space-x-2 mt-1">
        <BiLink className="text-2xl animation transform hover:scale-125 cursor-pointer" />
        <a href="#" className="truncate underline">
          https://example.com
        </a>
      </div>
    </div>
  );
}
