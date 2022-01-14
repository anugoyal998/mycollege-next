import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { queryState } from "../../atoms/queryState";
import { typeState } from "../../atoms/typeState";

export default function DepDrawerComp({ sem, dep }) {
  const [folders, setFolders] = useState();
  const [type, setType] = useRecoilState(typeState);
  const [query, setQuery] = useRecoilState(queryState);
  const router = useRouter();
  useEffect(() => {
    async function fetch() {
      const rsp = await axios.get("/api/drive/getAllFolders");
      setFolders(rsp.data);
    }
    fetch();
  }, []);
  return (
    <div
      className={`bg-white w-[300px] rounded-tr-xl rounded-br-xl p-4 animate__fadeIn animate__animated ${
        !folders && "h-screen"
      } `}
    >
      <p className="text-darkBlue font-semibold text-xl">Filter</p>
      <hr className="border rounded-md mt-2" />
      <p className="font-medium">Semester</p>
      <div className="grid grid-cols-3">
        {sem?.map((e, index) => {
          return (
            <div key={index} className="m-1">
              <div
                className="bg-cl1 text-white text-center py-1 rounded-sm cursor-pointer hover:opacity-70 animation"
                onClick={() => {
                  setType((prev) => "sem");
                  setQuery((prev) => e);
                  router.push(`/departments/${dep}?q=${e}&type=sem`);
                }}
              >
                {e}
              </div>
            </div>
          );
        })}
      </div>
      <hr className="border rounded-md mt-2" />
      <p className="font-medium">Course Code</p>
      {folders ? (
        <div className="grid grid-cols-2">
          {folders?.map((e, index) => {
            return (
              <div key={index} className="m-1">
                <div
                  onClick={() => {
                    setType("folders");
                    setQuery(e?.id);
                    router.push(`/departments/${dep}?q=${e?.id}&type=folders`);
                  }}
                  className="bg-cl1 text-white text-center py-1 px-1 rounded-sm cursor-pointer hover:opacity-70 animation truncate"
                >
                  {e?.name}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-700 pl-3">Loading...</div>
      )}
    </div>
  );
}
