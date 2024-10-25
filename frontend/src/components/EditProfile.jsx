/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const EditProfile = ({ userData }) => {
  const { token, backend_url, navigate } = useContext(ShopContext);
  const [name, setName] = useState(userData.name);
  const [gender, setGender] = useState(userData.gender);
  const [image, setImage] = useState(false);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      name && formData.append("name", name);
      gender && formData.append("gender", gender);
      image && formData.append("image", image);
      const res = await axios.post(
        `${backend_url}/api/user/${userData._id}/updateProfile`,
        formData
      );
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold dark_head">
          Edit <span className="dark_main">Profile</span>
        </h1>
        {/* <hr className="w-[50px] h-[2px] bg-black" /> */}
      </div>

      <form action="submit" onSubmit={handelSubmit}>
        <div className="border-t-2 border-gray-300 pt-5 w-[150px] justify-center items-center">
          <label htmlFor="image" className="w-[100px] h-[100px]">
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={!image ? userData.imageURL : URL.createObjectURL(image)}
              alt=""
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4 gap-y-5  py-6 px-0 sm:px-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-gray-800 flex items-center dark_text">
              Full Name <span className="text-red-500">*</span>:
            </p>
            <input
              id="name"
              type="text"
              placeholder=""
              value={name}
              required
              className="px-2 py-3 border border-gray-600 rounded w-full  outline-none text-xl"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col  gap-1">
            <p className="text-xl font-semibold text-gray-800 flex items-center dark_text">
              Email Address <span className="text-red-500">*</span>:
            </p>
            <input
              id="email"
              type="email"
              placeholder=""
              value={userData.email}
              required
              disabled
              className="px-2 py-3 border border-gray-600 rounded w-full text-xl"
            />
          </div>
          <div className="flex flex-col  gap-1">
            <p className="text-xl font-semibold text-gray-800 flex items-center dark_text">
              Gender <span className="text-red-500">*</span>:
            </p>
            <select
              name="gender"
              value={gender}
              id="gender"
              required
              autoFocus
              className="w-full border px-2 py-3 rounded border-gray-600 text-xl"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between flex-row-reverse">
          <button className="text-white text-xl bg-blue-700 px-4 py-2 rounded  hover:bg-blue-800">
            Update
          </button>
          <button
            className="text-white text-xl bg-red-700 px-4 py-2 rounded  hover:bg-red-800"
            onClick={() => navigate("/forgot-password")}
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
