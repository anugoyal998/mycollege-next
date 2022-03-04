import React from "react";
import { MdCancel } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { BiNotepad } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { MdSubject } from "react-icons/md";
import { MdOutlineSportsHockey } from "react-icons/md";
import { BiErrorAlt } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import tw from 'tailwind-styled-components'

const Sidebar = () => {
  return (
    <div className="h-screen absolute top-0 left-0 w-[300px] rounded-md bg-bgSecondary flex flex-col">
      <div className="grow bg-bgSecondary">
        <MdCancel className=" bg-bgSecondary text-[1.5rem] mx-2 my-2 " />
        <ul className=" bg-bgSecondary px-6 py-4">
          <ItemsLi>
            <BsNewspaper className="bg-bgSecondary text-white text-[1.5rem]" />
            <span className="bg-bgSecondary text-[1.3rem]">Announcement</span>
          </ItemsLi>
          <li className="bg-bgSecondary flex space-x-3 items-center px-2 py-5 ">
            <BiNotepad className="bg-bgSecondary text-white text-[1.5rem]" />
            <span className="bg-bgSecondary text-[1.3rem]">Notes</span>
          </li>
          <li className="bg-bgSecondary flex space-x-3 items-center px-2 py-5 ">
            <IoIosPeople className="bg-bgSecondary text-white text-[1.5rem]" />
            <span className="bg-bgSecondary text-[1.3rem]">Clubs</span>
          </li>
          <li className="bg-bgSecondary flex space-x-3 items-center px-2 py-5 ">
            <MdSubject className="bg-bgSecondary text-white text-[1.5rem]" />
            <span className="bg-bgSecondary text-[1.3rem]">Courses</span>
          </li>
          <li className="bg-bgSecondary flex space-x-3 items-center px-2 py-5 ">
            <MdOutlineSportsHockey className="bg-bgSecondary text-white text-[1.5rem]" />
            <span className="bg-bgSecondary text-[1.3rem]">Sports</span>
          </li>
          <li className="bg-bgSecondary flex space-x-3 items-center px-2 py-5 ">
            <BiErrorAlt className="bg-bgSecondary text-white text-[1.5rem]" />
            <span className="bg-bgSecondary text-[1.3rem]">Lorem</span>
          </li>
        </ul>
      </div>
      <div className="flex bg-bgSecondary space-x-3 items-center mx-5">
        <AiFillHome className="bg-bgSecondary text-[1.5rem]" />
        <span className="bg-bgSecondary text-[1.3rem] tracking-wider	">
          Back To Home
        </span>
      </div>
    </div>
  );
};

const ItemsLi = tw.li`
	bg-bgSecondary flex space-x-3 items-center px-2 py-5
`

export default Sidebar;
