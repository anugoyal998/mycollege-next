import Image from "next/image";
import React, { useState } from "react";
import BG from "../../img/computer-lg.jpg";
import { FaPencilAlt } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Modal from "../../helpers/Modal";
import BranchSemModalComponent from "./BranchSemModalComponent";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Club 1",
    "Club 2",
    "Club 3",
    "Club 4",
  ],
  datasets: [
    {
      data: [1, 1, 1, 1],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function ProfileRight() {
  const [branchOpen, setBranchOpen] = useState(false);
  const [semOpen, setSemOpen] = useState(false);
  const [branchState, setBranchState] = useState("Branch");
  const [semState, setSemState] = useState("Semester");
  return (
    <div className="">
      <Modal
        open={branchOpen}
        setOpen={setBranchOpen}
        component={
          <BranchSemModalComponent
            state={branchState}
            setState={setBranchState}
            type="Branch"
            path="/api/auth/updateBranch"
          />
        }
      />
      <Modal
        open={semOpen}
        setOpen={setSemOpen}
        component={
          <BranchSemModalComponent
            state={semState}
            setState={setSemState}
            type="Semester"
            path="/api/auth/updateSem"
          />
        }
      />
      <Image src={BG} alt="" className="rounded-md" />
      <div className="flex justify-between items-center px-2">
        <p className="text-gray-700 text-lg">Untitled Branch</p>
        <div>
          <FaPencilAlt
            className="text-gray-700 text-lg cursor-pointer hover:scale-125 animation transform"
            onClick={() => setBranchOpen(true)}
          />
        </div>
      </div>
      <hr className="my-1" />
      <div className="flex justify-between items-center px-2">
        <p className="text-gray-700 text">Untitled Semester</p>
        <div>
          <FaPencilAlt
            className="text-gray-700 cursor-pointer hover:scale-125 animation transform"
            onClick={() => setSemOpen(true)}
          />
        </div>
      </div>
      <hr className="my-1" />
      <div className="flex justify-between items-center px-2">
        <p className="text-xl font-semibold">Clubs / Societes</p>
        <div>
          <FaPencilAlt
            className="text-gray-700 text-xl cursor-pointer hover:scale-125 animation transform"
            // onClick={() => setSemOpen(true)}
          />
        </div>
      </div>
      {/* chart */}
      <div className="flex space-x-4 items-center">
        <div className="h-[300px] w-[300px] my-2">
          <Pie data={data} />
        </div>
        <div>
          {data?.labels?.map((e, index) => {
            return (
              <div key={index} className="text-lg font-semibold italic">
                {index + 1}) {e}
              </div>
            );
          })}
        </div>
      </div>
      <button className="bg-cl1 text-white font-semibold w-full py-2 mt-1 mb-2 rounded-md shadow-2xl animation hover:my-4 hover:py-3 hover:text-lg">
        Forgot Password
      </button>
      <button className="bg-cl1 text-white font-semibold w-full py-2 mt-1 mb-2 rounded-md shadow-2xl animation hover:my-4 hover:py-3 hover:text-lg">
        Sign Out
      </button>
    </div>
  );
}
