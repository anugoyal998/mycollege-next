import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiFolder } from "react-icons/hi";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { queryState } from "../../atoms/queryState";
import { filesState } from "../../atoms/filesState";
import pdf from "../../img/pdf.png";
import axios from "axios";
import Link from "next/link";

export default function Files({ dep }) {
  const [files, setFiles] = useRecoilState(filesState);
  const query= useRecoilValue(queryState);
  const [fdr, setFdr] = useState(false);
  const [fle, setFle] = useState(false);
  useEffect(() => {
    const d1 = files?.filter(
      (file) => file.mimeType === "application/vnd.google-apps.folder"
    );
    const d2 = files?.filter(
      (file) => file.mimeType !== "application/vnd.google-apps.folder"
    );
    setFdr(d1 && d1.length > 0 ? true : false);
    setFle(d2 && d2.length > 0 ? true : false);
  }, [files]);
  useEffect(() => {
    async function fetch() {
        if(!query?.q)return
      try {
          const id = query?.q
        const rsp = await axios.post("/api/drive/getDriveFolderData", {
          id
        });
        setFiles(rsp.data);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    fetch();
  }, [query, query?.q]);
  if (files && files.length > 0)
    return (
      <div>
        {fdr && (
          <>
            <hr className="border rounded-md mt-2" />
            <p className="text-center font-semibold text-lg">Folders</p>
            <div className="flex flex-wrap">
              {files?.map((e, index) => {
                return (
                  e?.mimeType === "application/vnd.google-apps.folder" && (
                    <Card key={index} data={e} dep={dep} />
                  )
                );
              })}
            </div>
          </>
        )}
        {fle && (
          <>
            <hr className="border rounded-md mt-2" />
            <p className="text-center font-semibold text-lg">Files</p>
            <div className="flex flex-wrap">
              {files?.map((e, index) => {
                return (
                  e?.mimeType !== "application/vnd.google-apps.folder" && (
                    <Doc key={index} data={e} />
                  )
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  else {
    return (
      <div>
        <hr className="border rounded-md mt-2" />
        <p className="text-center text-2xl mt-12 opacity-80 font-semibold">
          Nothing to Show
        </p>
      </div>
    );
  }
}

const Doc = ({ data }) => {
  const { name, id, mimeType } = data;
  return (
    <Link href={`https://drive.google.com/file/d/${id}/view`} target="_blank">
    <a className="w-[180px] h-[230px] border m-2 rounded-md p-2 cursor-pointer">
      <div className="w-full">
        <Image src={pdf} alt="" />
      </div>
      <p className="font-semibold truncate">{name}</p>
    </a>
    </Link>
  );
};

const Card = ({ data, dep }) => {
  const { id, mimeType, name } = data;
  const [query, setQuery] = useRecoilState(queryState);
  const router = useRouter();
  return (
    <div
      onClick={() => {
        setQuery({ ...query, q: id, type: "folders", name: name });
        router.push(`/departments/${dep}?q=${id}&type=folders&name=${name}`);
      }}
      className="bg-cl1 text-white w-56 rounded-md py-2 px-3 m-2 flex items-center space-x-2 cursor-pointer"
    >
      <div>
        <HiFolder className="text-2xl" />
      </div>
      <span className="truncate">{name}</span>
    </div>
  );
};
