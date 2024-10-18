/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
const ProductCard = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt="first-image"
          className="cursor-pointer h-48 w-full hover:scale-110 ease-in-out object-cover"
        />
      </div>
      <p className="text-[#494949] pt-2 pb-1 dark_text">{name}</p>
      <p className="text-sm font-medium dark_head">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductCard;
