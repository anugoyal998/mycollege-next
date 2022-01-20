import Link from "next/link";
import React from "react";
import { HiFolder } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { queryState } from "../../atoms/queryState";
import { typeState } from "../../atoms/typeState";

export default function Semester({ sem, dep }) {
  const [type, setType] = useRecoilState(typeState);
  const [query, setQuery] = useRecoilState(queryState);
  if (!type && !query)
    return (
      <>
        <p className="text-center font-semibold text-lg">Folders</p>
        <div className="grid grid-cols-4">
          {sem?.map((e, index) => {
            return (
              <div key={index}>
                <Link href={`/departments/${dep}?q=${e}&type=sem`}>
                  <a
                    onClick={() => {
                      setQuery(e);
                      setType("sem");
                    }}
                    className="bg-cl1 text-white w-56 rounded-md py-2 px-3 m-2 flex items-center space-x-2 cursor-pointer"
                  >
                    <HiFolder className="text-2xl" /> <span>{e} Sem</span>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
        <hr className="border rounded-md mt-2" />
      </>
    );
  else return null;
}
