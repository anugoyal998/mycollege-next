import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DepNavbar from "../../components/navbars/DepNavbar";
import { arr } from "../../constants/infoArr";
import Drawer from "../../helpers/Drawer";
import { useRecoilState } from "recoil";
import { typeState } from "../../atoms/typeState";
import { queryState } from "../../atoms/queryState";
import { filesState } from "../../atoms/filesState";
import DepDrawerComp from "../../components/departments/DepDrawerComp";
import Semester from "../../components/departments/Semester";
import Files from "../../components/departments/Files";
import axios from "axios";

const sem = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export default function department() {
  const router = useRouter();
  const dep = router.query.department;
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [type, setType] = useRecoilState(typeState);
  const [query, setQuery] = useRecoilState(queryState);
  const [files,setFiles] = useRecoilState(filesState);
  useEffect(() => {
    const filter = arr.filter((item) => {
      return item.short === dep;
    });
    setData(filter[0]);
    setType(router.query.type)
    setQuery(router.query.q)
  }, [dep]);
  useEffect(async () => {
    const rsp = await axios.get("/api/drive/getAllFolders");
    setFiles(rsp.data)
    return ()=> {
      setQuery(null)
      setType(null)
    }
  },[])
  if (data)
    return (
      <>
        <Drawer open={open} setOpen={setOpen} component={<DepDrawerComp sem={sem} dep={dep} />} />
        <div className="bg-white text-black px-4">
          <DepNavbar setOpen={setOpen} />
          <img
            src={data.imgLink}
            alt=""
            className="w-full rounded-lg mt-3 border"
          />
          <p className="text-darkBlue text-3xl font-extrabold mt-2">
            {data.title}
          </p>
          <hr className="border rounded-md mt-2" />
          <Semester sem={sem} dep={dep} />
          <Files files={files} />
        </div>
      </>
    );
  else return null;
}