/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { backend_url, navigate } = useContext(ShopContext);
  const [type, setType] = useState("password");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const secret_token = window.location.pathname.split("/").pop();
      console.log(secret_token);

      const response = await axios.post(
        `${backend_url}/api/user/resetPassword/${secret_token}`,
        { password },
        { headers: {} }
      );
      if (response.status === 200) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.success("Something Went wrong");
      }
    } catch (error) {
      console.error(error);
      toast(error.message);
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
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col m-auto items-center max-w-[90%] sm:max-w-96 gap-4 mt-14"
    >
      <div className="text-2xl mt-2 font-serif flex gap-2">
        <p className="font-serif font-medium font-2xl dark_head">
          Reset Password
        </p>
        <hr className="h-[2px] bg-black w-11 my-auto" />
      </div>
      <div className="flex dark_input">
        <input
          id="password"
          type={type}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your new Password"
          className="w-full px-4 py-2 border border-gray-900 outline-none dark_input "
          required
        />
        <span
          onClick={handleToggle}
          className="cursor-pointer flex items-center px-2"
        >
          {type === "password" ? (
            <img src={assets.eye_close} alt="" className="w-5 password_icon" />
          ) : (
            <img src={assets.eye_open} alt="" className="w-5 password_icon" />
          )}
        </span>
      </div>
      <div className="flex dark_input">
        <input
          id="confirm_password"
          type={type}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirm Your Password"
          className="w-full px-4 py-2 border border-gray-900 outline-none dark_input "
          required
        />
        <span
          onClick={handleToggle}
          className="cursor-pointer flex items-center px-2"
        >
          {type === "password" ? (
            <img src={assets.eye_close} alt="" className="w-5 password_icon" />
          ) : (
            <img src={assets.eye_open} alt="" className="w-5 password_icon" />
          )}
        </span>
      </div>

      <button className="py-2 bg-[#39ac73] text-center w-full text-white text-xl font-medium tracking-wide">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
