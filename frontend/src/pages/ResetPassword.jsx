/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { backend_url, navigate } = useContext(ShopContext);

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

      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your new Password"
        className="w-full px-4 py-2 border border-gray-900 outline-none dark_input "
        required
      />
      <input
        id="confirm_password"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        placeholder="Confirm Your Password"
        className="w-full px-4 py-2 border border-gray-900 outline-none dark_input "
        required
      />

      <button className="py-2 bg-[#39ac73] text-center w-full text-white text-xl font-medium tracking-wide">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
