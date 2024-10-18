/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const WishlistCard = ({ productId, image, name, price, size }) => {
  const { currency, navigate, deleteWishlistItem, updateWishlistItem } =
    useContext(ShopContext);

  return (
    <div>
      <div className="overflow-hidden">
        <img
          src={image}
          alt="first-image"
          className="cursor-pointer hover:scale-110 ease-in-out object-fit"
        />
      </div>
      <p
        className="text-[#494949] pt-2 pb-1 dark_text cursor-pointer
      "
        onClick={() => navigate(`/product/${productId}`)}
      >
        {name}
      </p>
      <p className="text-xl font-bold dark_head">
        {currency}
        {price}
      </p>
      <p className="text-xs py-1">Eligibe for free shipping</p>
      <button
        className="w-full border-2 hover:bg-gray-100 rounded-full py-2 font-semibold dark_button dark:border-0"
        onClick={() => deleteWishlistItem(productId, size)}
      >
        Move to cart
      </button>
      <div className="flex flex-col gap-1 mt-2">
        <p
          className="text-xs text-red-700 cursor-pointer hover:underline"
          onClick={() => updateWishlistItem(productId, size)}
        >
          Delete
        </p>
        <p
          className="text-xs text-green-700 cursor-pointer hover:underline"
          onClick={() => navigate("/collection")}
        >
          See more like this
        </p>
        <p className="text-sm text-black ">
          Size: <span className="font-semibold">{size}</span>
        </p>
      </div>
    </div>
  );
};

export default WishlistCard;
