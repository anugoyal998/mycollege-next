import React from "react";
import { arr, semArr } from "../../constants/infoArr";
import { FaChevronCircleDown } from "react-icons/fa";
import axios from "axios";
import { useRecoilState } from "recoil";
import { tokensState } from "../../atoms/tokensState";

export default function BranchSemModalComponent({
  state,
  setState,
  type,
  path,
}) {
  const [tokens, setTokens] = useRecoilState(tokensState);
  const handleClick = async () => {
    if (!tokens) return;
    try {
      await axios.post(
        path,
        { data: state },
        {
          headers: {
            Authorization: `Bearer ${tokens?.access_token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <div className="px-2">
      <p className="text-center text-darkBlue font-semibold text-xl">
        Update {type}
      </p>
      <div className="dropdown w-full mt-2">
        <div
          tabIndex="0"
          className="w-full p-3 bg-white border shadow-md rounded-md flex items-center justify-between cursor-pointer"
        >
          <p className="text-gray-700">{state}</p>
          <div>
            <FaChevronCircleDown className="text-gray-700" />
          </div>
        </div>
        {type === "Branch" ? (
          <ul
            tabIndex="0"
            className="w-full bg-white mt-2 rounded-md menu dropdown-content border shadow-md"
          >
            {arr?.map((e, index) => {
              return (
                <l1
                  key={index}
                  className="p-2 cursor-pointer hover:bg-slate-200"
                  onClick={() => setState(e?.title)}
                >
                  <a>{e?.title}</a>
                </l1>
              );
            })}
          </ul>
        ) : (
          <ul
            tabIndex="0"
            className="w-full bg-white mt-2 rounded-md menu dropdown-content border shadow-md"
          >
            {semArr?.map((e, index) => {
              return (
                <l1
                  key={index}
                  className="p-2 cursor-pointer hover:bg-slate-200"
                  onClick={() => setState(e)}
                >
                  <a>{e} Semester</a>
                </l1>
              );
            })}
          </ul>
        )}
      </div>
      <button
        className="bg-cl1 hover:bg-cl2 animation text-white font-semibold py-3 w-full rounded-md mt-3 text-lg"
        onClick={handleClick}
      >
        Update {type}
      </button>
    </div>
  );
}
