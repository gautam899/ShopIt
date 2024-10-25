/* eslint-disable no-unused-vars */

import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { backend_url } = useContext(ShopContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault(); 
    try {
      await axios.post(`${backend_url}/api/user/forgotPassword`, { email });
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.log(error);
      toast("Something Went Wrong.");
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col m-auto items-center max-w-[90%] sm:max-w-96 gap-4 mt-14"
    >
      <div className="text-2xl mt-2 font-serif flex gap-2">
        <p className="font-serif font-medium font-2xl dark_head">
          Forgot Password
        </p>
        <hr className="h-[2px] bg-black w-11 my-auto" />
      </div>

      <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-900 outline-none dark_input "
        required
      />

      <button className="py-2 bg-green-700 hover:bg-green-900  text-center w-full text-white text-xl font-medium tracking-wide">
        Request reset Link
      </button>
    </form>
  );
};

export default ForgotPassword;
