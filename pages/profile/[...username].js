import React from "react";
import Navbar from "../../components/navbars/Navbar";
import ProfileLeft from "../../components/profile/ProfileLeft";
import ProfileRight from "../../components/profile/ProfileRight";
import Footer from "../../components/footer/Footer";
import { useLoadingWithRefresh } from "../../hooks/useLoadingWithRefresh";

export default function username() {
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="bg-study-11 bg-white text-black">
        <Navbar />
        <div className="flex space-x-4 mt-4 px-4">
          <ProfileLeft />
          <ProfileRight />
        </div>
      </div>
      <Footer />
    </>
  );
}
