/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import ThemeBtn from "./ThemeBtn";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(password);
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backend_url}/api/user/admin`, {
        email,
        password,
      });
      if (response.status === 200 && response.data.token) {
        console.log(response.data.token);
        setToken(response.data.token);
      } else {
        toast.error("sorry");
      }
      console.log(response); //we will get back the token in the response,
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full">
      <ThemeBtn />
      <div className="shadow-2xl max-w-md px-8 py-4 rounded-lg">
        <p className="text-2xl font-bold w-full mb-4 dark_text">Admin Login</p>
        <form action="" className="mb-3" onSubmit={onSubmitHandler}>
          <div className="mb-2 min-w-72">
            <p className=" text-sm text-gray-600 dark_text">Email Id</p>
            <input
              type="email"
              placeholder="Your Email"
              className="px-2 py-2 rounded w-full dark_input border-0 outline-none"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-2 min-w-72">
            <p className=" text-sm text-gray-600 dark_text">Password</p>
            <div className="flex dark_input">
              <input
                type={type}
                placeholder="Your Password"
                className="px-2 py-2 rounded w-full dark_input outline-none"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span
                onClick={handleToggle}
                className="cursor-pointer flex items-center px-2"
              >
                {type === "password" ? (
                  <img
                    src={assets.eye_close}
                    alt=""
                    className="w-5 password_icon"
                  />
                ) : (
                  <img
                    src={assets.eye_open}
                    alt=""
                    className="w-5 password_icon"
                  />
                )}
              </span>
            </div>
          </div>

          <button className=" mt-3 py-3 px-4 w-full justify-center text-center rounded bg-black text-white dark_button">
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
