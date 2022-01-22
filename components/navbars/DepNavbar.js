import React, { useState, useEffect } from "react";
import { TitleName } from "../../constants/TitleName";
import { GoSettings } from "react-icons/go";
import { useRecoilState } from "recoil";
import { tokensState } from "../../atoms/tokensState";
import useTokens from "../../hooks/useTokens";
import Link from "next/link";

export default function DepNavbar({ setOpen }) {
  const [tokens, setTokens] = useRecoilState(tokensState);
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetch() {
      const rsp = await useTokens();
      setTokens(rsp);
      setUser(rsp?.user);
    }
    fetch();
  }, []);
  return (
    <div className="flex justify-between items-center pt-2">
      <p className="text-darkBlue text-2xl font-semibold">{TitleName}</p>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <input
            type="search"
            placeholder="Search"
            className="w-72 py-2 pl-4 bg-cl1 opacity-70 outline-none focus:outline-none text-white rounded-lg rounded-tr-none rounded-br-none"
          />
          <div className="bg-cl1 opacity-70 py-2 pr-4 rounded-tr-lg rounded-br-lg cursor-pointer">
            <GoSettings
              className="text-2xl text-white"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
        {!user ? (
          <Link href="/login">
            <a className="outline-none focus:outline-none text-white font-semibold bg-cl1 hover:bg-cl2 px-5 py-2 rounded-md animation">
              Log In
            </a>
          </Link>
        ) : (
          <Link href={`/profile/${user?.email?.split("@")[0]}`}>
            <a className="text-center outline-none focus:outline-none text-white font-semibold bg-cl1 hover:bg-cl2 px-5 py-2 rounded-md animation w-32 truncate">
              {user?.name}
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
