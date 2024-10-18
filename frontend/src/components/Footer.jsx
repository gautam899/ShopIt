/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ThemeBtn from "./ThemeBtn";
const Footer = () => {
  const { navigate } = useContext(ShopContext);
  return (
    <div className="max-sm:text-center ">
      <div className="flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        {/* inside we will have 3 div. */}
        <div>
          <img
            src={assets.logo}
            className="w-40 max-sm:m-auto mb-5 cursor-pointer"
            alt=""
            onClick={() => navigate("/")}
          />

          <p className="w-full text-gray-600 md:w-2/3 dark_text">
            Elevate your style with our curated fashion collections. Follow us
            for the latest trends, exclusive offers, and timeless pieces that
            define elegance and comfort. Your fashion journey starts here.
          </p>
        </div>

        <div className="max-sm:m-auto ">
          <p className="max-sm:hidden font-medium text-xl mb-5 dark_head">
            Company
          </p>
          <ul className="flex sm:flex-col sm:gap-1 gap-3 text-gray-600 dark_text">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/delivery">Delivery</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/conditions">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div className="max-sm:m-auto ">
          <p className="max-sm:hidden font-medium text-xl mb-5 dark_head">
            Get In Touch
          </p>
          <ul className="flex sm:flex-col sm:gap-1 gap-3 text-gray-600 dark_text">
            <li>+91-123-456-789</li>
            <li>bhavyagautam899@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* <ThemeBtn /> */}
      {/* The copyright area */}
      <div>
        <hr className="w-full h-[2px] bg-gray-400 " />
        <p className="py-5 text-center text-sm text-gray-900 dark_head">
          Copyright 2024 © Bhavya Gautam - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
