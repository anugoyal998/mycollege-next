import React from "react";
import ce from "../../img/computer.jpg";
import it from "../../img/it.jpg";
import ece from "../../img/ece.jpg";
import ee from "../../img/ee.jpg";
import mech from "../../img/mech.jpg";
import civil from "../../img/civil.jpg";
import pie from "../../img/pie.jpg";
import Image from "next/image";

const arr = [
  { title: "Computer Engineering", img: ce, short: "ce" },
  { title: "Information Technology", img: it, short: "it" },
  { title: "Electronics and Communications", img: ece, short: "ece" },
  { title: "Electrical Engineering", img: ee, short: "ee" },
  { title: "Mechanical Engineering", img: mech, short: "mech" },
  { title: "Civil Engineering", img: civil, short: "civil" },
  { title: "Production and Industrial", img: pie, short: "pie" },
];

export default function Departments() {
  return (
    <div className="px-4 mt-8">
      <p className="text-center text-darkBlue font-semibold text-2xl">
        Engineering Departments
      </p>
      <div className="carousel rounded-box border mt-2">
        {arr.map((e, index) => {
          return (
            <div
              key={index}
              className="carousel-item w-[300px] h-[225px] hover:w-[350px] flex flex-col space-y-2 cursor-pointer animation mb-1"
            >
              <Image src={e?.img} alt={e?.title} className="" />
              <p className="text-lg font-semibold text-center truncate">
                {e?.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
