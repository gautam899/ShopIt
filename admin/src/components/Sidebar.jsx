/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] border-r-2 min-h-screen">
      <div className="flex flex-col gap-6 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex  item-center gap-3 border border-gray-400 border-r-0 px-3 py-2"
          to="/add"
        >
          <img src={assets.add} alt="" className="w-7 h-7 add_icon" />
          <p className="hidden md:block dark_text">Add Item</p>
        </NavLink>
        <NavLink
          className="flex item-center gap-3 border border-gray-400 border-r-0 px-3 py-2 "
          to="/list"
        >
          <img src={assets.list} alt="" className="w-7 h-7 list_icon" />
          <p className="hidden md:block dark_text ">List Item</p>
        </NavLink>
        <NavLink
          className="flex item-center gap-3 border border-gray-400 border-r-0 px-3 py-2"
          to="/orders"
        >
          <img src={assets.orders} alt="" className="w-7 h-7 order_icon" />
          <p className="hidden md:block dark_text">Orders </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
