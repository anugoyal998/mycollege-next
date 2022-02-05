import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DepNavbar from "../../components/navbars/DepNavbar";
import { arr } from "../../constants/infoArr";
import Drawer from "../../helpers/Drawer";
import { useRecoilState } from "recoil";
import { queryState } from "../../atoms/queryState";
import { filesState } from "../../atoms/filesState";
import { pathState } from "../../atoms/pathState";
import DepDrawerComp from "../../components/departments/DepDrawerComp";
import Files from "../../components/departments/Files";
import { useLoadingWithRefresh } from "../../hooks/useLoadingWithRefresh";

const sem = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export default function department() {
  const { loading } = useLoadingWithRefresh();
  const router = useRouter();
  const dep = router.query.department;
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useRecoilState(queryState);
  const [files, setFiles] = useRecoilState(filesState);
  const [path, setPath] = useRecoilState(pathState);
  useEffect(() => {
    const filter = arr.filter((item) => {
      return item.short === dep;
    });
    setData(filter[0]);
    setQuery({
      ...query,
      q: router.query?.q,
      type: router.query?.type,
      name: router.query?.name,
    });
    setPath([
      ...path,
      {
        q: router.query?.q,
        type: router.query?.type,
        name: router.query?.name,
      },
    ]);
  }, [dep, router.query?.q, router.query]);
  useEffect(() => {
    return () => {
      setQuery({ q: null, type: null, name: null });
      setFiles(null);
    };
  }, []);
  if (data)
    return loading ? (
      "Loading..."
    ) : (
      <>
        <Drawer
          open={open}
          setOpen={setOpen}
          component={<DepDrawerComp sem={sem} dep={dep} />}
        />
        <div className="bg-white text-black px-4">
          <DepNavbar setOpen={setOpen} />
          <Path />
          <img
            src={data.imgLink}
            alt=""
            className="w-full rounded-lg mt-3 border"
          />
          <p className="text-darkBlue text-3xl font-extrabold mt-2">
            {data.title}
          </p>
          <Files dep={dep} />
        </div>
      </>
    );
  else return null;
}

const Path = () => {
  const [path, setPath] = useRecoilState(pathState);
  return (
    <div className="flex mt-5 font-semibold text-sm flex-wrap space-x-2">
      {path?.map((item, index) => {
        if (item?.q) {
          return (
            <div key={index} className="underline cursor-pointer">
              {item?.name}/
            </div>
          );
        } else return null;
      })}
    </div>
  );
};
