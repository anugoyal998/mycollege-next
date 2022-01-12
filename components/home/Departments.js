import React from "react";
import {arr} from '../../constants/infoArr'
import Image from "next/image";
import Link from "next/link";

export default function Departments() {
  return (
    <div className="px-4 mt-8">
      <p className="text-center text-darkBlue font-semibold text-2xl">
        Engineering Departments
      </p>
      <div className="carousel rounded-box border mt-2">
        {arr.map((e, index) => {
          return (
            <Link href={`/departments/${e?.short}`}>
            <a
              key={index}
              className="carousel-item w-[300px] h-[225px] hover:w-[350px] flex flex-col space-y-2 cursor-pointer animation mb-1"
            >
              <Image src={e?.img} alt={e?.title} className="" />
              <p className="text-lg font-semibold text-center truncate">
                {e?.title}
              </p>
            </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
