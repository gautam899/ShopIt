/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";
import ThemeBtn from "./ThemeBtn";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex justify-between items-center py-2 px-[10%] ">
      <img src={assets.logo} alt="" className="w-[max(10%,80px)]" />
      <div
       className="flex gap-2">
       <ThemeBtn/>
        <button
          className="bg-gray-600 px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm text-white font-medium
      tracking-widest"
          onClick={() => setToken("")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
