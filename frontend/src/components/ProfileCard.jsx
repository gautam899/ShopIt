/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FormatDate from "../utils/FormatDate";
import EditProfile from "./EditProfile";

const ProfileCard = ({ userData }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsEditOpen(!isEditOpen);
  };
  return (
    <div>
      {isProfileOpen && (
        <div>
          <div className="flex justify-between px-2">
            {/* <p className="text-2xl font-semibold leading-6 flex justify-center items-center">
              My Profile
            </p> */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold dark_head">My <span className="dark_main">Profile</span></h1>
              <hr className="w-[50px] h-[2px] bg-black" />
            </div>
            <button
              className="px-4 py-2 dark_button text-purple-950 border border-purple-900 rounded"
              onClick={handleClick}
            >
              Edit Profile
            </button>
          </div>
          <hr className="mt-2 h-[1.5px] bg-gray-500" />
          <div className="border sm:px-4 px-0">
            <div className="flex justify-center py-2">
              <img
                src={userData.imageURL}
                alt=""
                className="w-[140px] h-[140px] object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-x-4 py-4">
              <p className="w-[140px] text-xl font-semibold md:mb-2 mb-0 dark_head">
                Full Name:{" "}
              </p>
              <p className="w-full dark_text lg:w-[340px] text-lg font-semibold text-gray-600">
                {userData.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-4 py-4">
              <p className="w-[140px] text-xl font-semibold md:mb-2 mb-0 dark_head">
                Email Id:{" "}
              </p>
              <p className="w-full dark_text lg:w-[340px] text-lg font-semibold text-gray-600">
                {userData.email}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-x-4 py-4">
              <p className="w-[140px] text-xl font-semibold md:mb-2 mb-0 dark_head">
                Gender:{" "}
              </p>
              <p className="w-full lg:w-[340px] dark_text text-lg font-semibold text-gray-600">
                {userData.gender}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-4 py-4">
              <p className="w-[140px] text-xl font-semibold md:mb-2 mb-0 dark_head">
                Registerd At:{" "}
              </p>
              <p className="w-full lg:w-[340px] text-lg font-semibold text-gray-600 dark_text">
                {FormatDate(userData.createdAt)}
              </p>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && <EditProfile userData={userData} />}
    </div>
  );
};

export default ProfileCard;
