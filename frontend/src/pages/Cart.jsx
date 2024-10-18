/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import Wishlist from "../components/Wishlist";
const Cart = () => {
  const {
    products,
    cartItem,
    currency,
    updateQuantity,
    token,
    navigate,
    addToWishlist,
    getUserCart,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const handleAddWishlist = async (productId, size) => {
    try {
      await addToWishlist(productId, size);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
      for (const itemId in cartItem) {
        for (const sizes in cartItem[itemId]) {
          if (cartItem[itemId][sizes] > 0) {
            tempData.push({
              _id: itemId,
              size: sizes,
              quantity: cartItem[itemId][sizes],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);
  
  return (
    <div className="border-t-2 pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>

      <div>
        {/* The product data */}
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-b flex flex-col sm:flex-row justify-between sm:px-4 items-center gap-5"
            >
              {/* The image and the item info */}
              <div className="w-full sm:w-[50%] flex justify-between">
                <div className="flex items-start gap-6">
                  <img
                    src={productData.image[0]}
                    alt=""
                    className="w-14 sm:w-20"
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium dark_head">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-6 mt-3 dark_head">
                      <p>
                        {currency} {productData.price}
                      </p>
                      <button className="bg-gray-300 py-2 px-4 dark_button">
                        {item.size}
                      </button>
                    </div>
                  </div>
                </div>

                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  max={10}
                  step={1}
                  className="border my-auto sm:max-w-20 py-2 px-2 dark_input rounded"
                  onChange={(e) => {
                    e.preventDefault();

                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        );
                  }}
                />
              </div>
              {/* The delete icon and the wishlist icons. */}
              <div className="flex gap-10 max-sm:mt-3 sm:gap-3 w-[30%] justify-around">
                <img
                  src={assets.love}
                  alt=""
                  className="w-8 cursor-pointer move-wishlist hover:scale-110"
                  title="Add to wishlist"
                  onClick={() => handleAddWishlist(item._id, item.size)}
                />
                <img
                  src={assets.delete_icon}
                  alt=""
                  className="w-8 cursor-pointer delete-cart hover:scale-110"
                  title="Delete Item from cart"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* If the cart is empty */}
      {cartData.length > 0 ? (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 my-20">
          <p className="text-2xl sm:text-3xl text-center dark_head">
            Your Cart is Empty
          </p>
          <button
            className="text-white px-6 py-3 bg-[#28a745] w-full sm:max-w-[200px] mx-auto rounded font-semibold tracking-wide
            "
            onClick={() => navigate("/")}
          >
            Start shopping
          </button>
        </div>
      )}
      {/* The checkout options. */}
      {token && (
        <div>
          <hr className="h-[2px] bg-black" />

          <div className="flex flex-col">
            <p className="mt-10 text-2xl flex sm:text-3xl gap-3 font-semibold tracking-wider m-auto">
              Your Wish List
              <img src={assets.love} alt="" className="w-6 m-auto" />
            </p>
          </div>
          <div>
            {/* <Wishlist wishlistItems={wishlistItems} /> */}
            <Wishlist token={token} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
