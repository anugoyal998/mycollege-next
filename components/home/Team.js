import Image from "next/image";
import React from "react";
import avatar from '../../img/avatar.png'
import {
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";

export default function Team() {
  return (
    <div className="px-4 mt-10">
      <p className="text-center text-darkBlue font-semibold text-2xl">
        MyCollege Team
      </p>
      <div className="flex justify-center items-center space-x-8 mt-2">
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  );
}


const Card = ()=> {
  return(
    <div className="p-4 border-2 shadow-xl rounded-xl">
      <div className="w-56">
        <Image src={avatar} alt="" />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg text-darkBlue">Avatar</p>
          <p className="font-medium opacity-80">SDE</p>
        </div>
        <div className="flex items-center space-x-2">
          <a href="" className="opacity-60"><AiFillLinkedin className="text-xl"/></a>
          <a href="" className="opacity-60"><AiFillGithub className="text-xl"/></a>
        </div>
      </div>
    </div>
  )
}