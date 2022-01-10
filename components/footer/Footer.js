import React from "react";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillHeart,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";

const socials = [
  { title: "Facebook", icon: <BsFacebook className="animation transform hover:scale-125 text-2xl" />, href: "" },
  { title: "Instagram", icon: <GrInstagram className="animation transform hover:scale-125 text-2xl" />, href: "" },
  { title: "Github", icon: <AiFillGithub className="animation transform hover:scale-125 text-2xl" />, href: "" },
  {
    title: "Linkedin",
    icon: <AiFillLinkedin className="animation transform hover:scale-125 text-2xl" />,
    href: "",
  },
];

export default function Footer() {
  return (
    <div className="bg-white text-black pt-12">
      <div className="flex justify-center items-center space-x-6">
        <p className="font-semibold text-lg">About</p>
        <p className="font-semibold text-lg">Contact us</p>
        <p className="font-semibold text-lg">Study</p>
        <p className="font-semibold text-lg">PYQs</p>
        <p className="font-semibold text-lg">Developers</p>
      </div>
      <div className="flex justify-center items-center space-x-6 mt-2">
        {socials?.map((item, index) => {
          return (
            <a href={item?.href} target="_blank" className="">
              {item?.icon}
            </a>
          );
        })}
      </div>
      <p className="flex justify-center items-center space-x-2 mt-8">
        <span>Made with</span> <AiFillHeart /> <AiOutlineCopyrightCircle />{" "}
        <span>MyCollege</span>
      </p>
    </div>
  );
}
