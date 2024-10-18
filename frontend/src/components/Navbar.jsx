/* eslint-disable no-unused-vars */

import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import ThemeBtn from "./ThemeBtn";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, token, setToken, setCartItem, navigate } =
    useContext(ShopContext);
  const { showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const handleSearchClick = () => {
    setShowSearch(true);
  };
  const handleLogout = () => {
    try {
      navigate("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      setToken("");
      setCartItem({});
    } catch (error) {
      console.error(error);
    }
  };
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  return (
    <div
      className={`flex items-center justify-between font-medium py-5  
      `}
    >
      <div className="flex items-center gap-6">
        <img src={assets.logo} className="h-20 w-20" />
        <p className="text-2xl text-black dark:text-white max-lg:hidden">
          Shop<span className="dark_main">It</span>{" "}
        </p>
      </div>

      <ul className="hidden sm:flex gap-5 text-[16px] text-gray-700 dark_text">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden dark_hr" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden dark_hr" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden dark_hr" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-800 hidden dark_hr" />
        </NavLink>
      </ul>

      {/* the cart and the account */}
      <div className="flex items-center gap-6">
        <ThemeBtn />
        {visible && (
          <img
            src={assets.search}
            className="w-7 cursor-pointer search-icon"
            onClick={handleSearchClick}
          />
        )}

        {/* We need to show a drop down upon hover on the userIcon */}
        <div className="group relative">
          <div
            className="flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.user}
              className="w-7 cursor-pointer user-icon"
              alt=""
            />
            <img src={assets.down_arrow} alt="" className="w-2 down-arrow" />
          </div>
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 border-2 border-gray-300">
              <div className="flex flex-col gap-2 w-[200px] sm:w-[200px] bg-white px-[9px]">
                <h1 className="font-bold text-xl text-black text-center mt-3">
                  Your Account
                </h1>
                <ul className="flex flex-col gap-2 justify-center text-center">
                  <li
                    className="text-sm text-[#444] hover:underline cursor-pointer hover:text-[#f57b42]"
                    onClick={handleLogout}
                  >
                    <a>Log Out</a>
                  </li>
                  <li
                    className="text-sm text-[#444] hover:underline cursor-pointer hover:text-[#f57b42]"
                    onClick={() => navigate("/orders")}
                  >
                    <a>Your Orders</a>
                  </li>
                  <li
                    className="text-sm text-[#444] hover:underline cursor-pointer hover:text-[#f57b42]"
                    onClick={() => navigate("/cart")}
                  >
                    <a>Your Wishlist</a>
                  </li>
                  <li
                    className="text-sm text-[#444] hover:underline cursor-pointer hover:text-[#f57b42] mb-3"
                    onClick={() => navigate("/cart")}
                  >
                    <a>Go to Cart</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart}
            alt="cart-icon"
            title="Go to Cart"
            className="w-7 cursor-pointer cart-icon"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
            {cartCount}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt="menu icon"
          className="sm:hidden w-6 cursor-pointer menu-icon"
          onClick={() => setToggle(true)}
        />
      </div>

      {/* Mobile screen side bar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all ${
          toggle ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setToggle(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown-menu"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>

          <NavLink
            to="/"
            className="p-y pl-6 border"
            onClick={() => setToggle(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className="p-y pl-6 border"
            onClick={() => setToggle(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            className="p-y pl-6 border"
            onClick={() => setToggle(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className="p-y pl-6 border"
            onClick={() => setToggle(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
