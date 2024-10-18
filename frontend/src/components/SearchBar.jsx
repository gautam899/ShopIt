/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  //We want the search bar only to be visible on the collection page and not on the other pages.
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className={`border-t border-b bg-gray-50 text-center dark:bg-black`}>
      <div className="inline-flex items-center justify-center py-2 px-5 my-5 mx-3 border border-gray-400 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          value={search}
          placeholder="Search here..."
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-inherit text-sm outline-none
          dark:placeholder:text-white dark:text-white"
        />
        <img
          src={assets.search_icon}
          alt=""
          className="w-4 cursor-pointer"
          title="Search Products"
        />
      </div>
      <img
        src={assets.cross_icon}
        className="w-4 inline cursor-pointer"
        onClick={() => setShowSearch(false)}
        title="Close"
      />
    </div>
  ) : null;
};

export default SearchBar;
