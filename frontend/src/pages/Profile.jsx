/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProfileCard from "../components/ProfileCard";
import OrderCard from "../components/OrderCard";
import WishlistCard from "../components/WishlistCard";
import ProfileWishlist from "../components/ProfileWishlist";
const Profile = () => {
  const {
    getUserData,
    token,
    navigate,
    userData,
    handleLogout,
    getOrders,
    allOrders,
  } = useContext(ShopContext);
  const [currentCard, setCurrentCard] = useState("");
  const renderCard = () => {
    switch (currentCard) {
      case "Orders":
        return <OrderCard allOrders={allOrders} userData={userData} />;
      case "Wishlist":
        return <ProfileWishlist />;
      case "Profile":
        return <ProfileCard userData={userData} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (token) {
      getUserData();
      getOrders();
    }
  }, [token]);

  if (!token) {
    navigate("/login");
    return null;
  }
  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-serif font-semibold dark_head">
          Hi, {userData.name}
        </h1>
        <p className="py-2">Account</p>
      </div>

      <div className="flex gap-5">
        {/* Left Side div */}
        <div className="max-lg:hidden border flex flex-col gap-2 border-gray-500 min-w-[250px] h-[1%] overflow-hidden">
          <div
            className="flex gap-4 px-2 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setCurrentCard("Profile")}
            title="My Profile"
          >
            <img src={assets.profile} alt="" className="w-5 ml-3 user-icon" />
            <p className="text-xl font-semibold dark_head text-gray-800">
              My Profile
            </p>
          </div>
          <hr className="h-[1.5px] rounded  bg-gray-700 hover:bg-gray-100" />
          <div
            className="flex gap-4 px-2 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setCurrentCard("Orders")}
          >
            <img
              src={assets.cart}
              alt=""
              className="w-5 ml-3 cart-icon"
              title="My Orders"
            />
            <p className="text-xl font-semibold dark_head text-gray-800">
              My Orders
            </p>
          </div>
          <hr className="h-[1.5px] rounded  bg-gray-700 " />

          <div
            className="flex gap-4 px-2 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setCurrentCard("Wishlist")}
          >
            <img
              src={assets.love}
              alt=""
              className="w-5 ml-3 move-wishlist"
              title="My Wishlist"
            />
            <p className="text-xl font-semibold dark_head text-gray-800">
              My Wishlist
            </p>
          </div>
          <hr className="h-[1.5px] rounded bg-gray-700" />

          <div
            className="flex gap-4 px-2 py-2 cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            <img
              src={assets.logout}
              alt=""
              className="w-5 ml-3 logout-icon"
              title="Logout"
            />
            <p className="text-xl font-semibold dark_head text-gray-800">
              Logout
            </p>
          </div>
        </div>

        {/* Right side div */}
        <div className="w-0 flex-grow">
          {/* <ProfileCard userData={userData} /> */}
          {renderCard()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
