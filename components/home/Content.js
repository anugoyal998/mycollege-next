import Image from "next/image";
import React from "react";
import illustration from "../../img/illustration.png"

export default function Content() {
  return (
    <div className="grid grid-cols-2 px-4 mt-[20vh]">
      <div className="h-full flex flex-col justify-center">
        <p className="text-darkBlue text-4xl font-semibold">
          College Materials and updates, MyCollege
        </p>
        {/* <p className="text-darkBlue text-4xl font-semibold">My College</p> */}
        <p className="text-gray-500 mt-3">
          Lorem iollitia culpa accusantium nobis earum, repellendus dolor cum
          explicabo.
        </p>
        <div className="mt-5">
        <button className="bg-cl1 hover:bg-cl2 animation text-white font-semibold rounded-md px-5 py-3">
          Get Started
        </button>
        </div>
      </div>
      <div>
          <Image src={illustration} alt="" />
      </div>
    </div>
  );
}
