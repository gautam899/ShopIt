/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import WishlistCard from "./WishlistCard";
import { assets } from "../assets/assets";

const ProfileWishlist = () => {
  const { fetchWishlist, items, wishlistItems, token, navigate } =
    useContext(ShopContext);

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token, wishlistItems]);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-2">
      {items.length > 0 &&
        items.map((item, index) => (
          <WishlistCard
            key={index}
            productId={item.productId}
            name={item.name}
            image={item.image && item.image[0]} // Assuming image is an array and you need the first one
            price={item.price}
            size={item.size}
          />
        ))}
    </div>
  );
};

export default ProfileWishlist;
