import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DepNavbar from "../../components/navbars/DepNavbar";
import { arr } from "../../constants/infoArr";
import { HiFolder } from "react-icons/hi";
import Link from "next/link";
import Drawer from "../../helpers/Drawer";

const sem = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export default function department() {
  const router = useRouter();
  const dep = router.query.department;
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const filter = arr.filter((item) => {
      return item.short === dep;
    });
    setData(filter[0]);
  }, [dep]);
  if (data)
    return (
      <>
        <Drawer open={open} setOpen={setOpen} component={<DrawerComponent/>} />
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
          <p className="text-center font-semibold text-lg">Folders</p>
          <div className="grid grid-cols-4">
            {sem?.map((e, index) => {
              return (
                <div>
                  <Link href={`/departments/${dep}/${e}`}>
                    <a className="bg-cl1 text-white w-56 rounded-md py-2 px-3 m-2 flex items-center space-x-2 cursor-pointer">
                      <HiFolder className="text-2xl" /> <span>{e} Sem</span>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
          <hr className="border rounded-md mt-2" />
          <p className="text-center font-semibold text-lg">Files</p>
        </div>
      </>
    );
  else return null;
}

const DrawerComponent = () => {
  return(
    <div className="bg-white w-[300px] h-screen rounded-tr-xl rounded-br-xl">

    </div>
  )
}