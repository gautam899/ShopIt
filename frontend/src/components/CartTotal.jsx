/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { toast } from "react-toastify";

const CartTotal = () => {
  const { currency, delivery_fee, findTotalPrice, navigate, token } =
    useContext(ShopContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleCheckoutClick = () => {
    if (!token) {
      toast.error("Please Login to continue");
      navigate("/login");
    } else {
      navigate("/place-order");
    }
  };
  useEffect(() => {
    const fetchTotalPrice = async () => {
      const total = await findTotalPrice();
      setTotalPrice(total);
    };

    fetchTotalPrice();
  }, [findTotalPrice]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 mt-2 text-sm dark_text">
        <Title text1={"Cart"} text2={"Totals"} />
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="dark_head">
            {currency} {totalPrice}
          </p>
        </div>
        <hr className=" h-[1px] bg-gray-700" />
        <div className="flex justify-between">
          <p>Delivery Fees</p>
          <p className="dark_head">
            {currency}
            {delivery_fee}
          </p>
        </div>
        <hr className=" h-[1px] bg-gray-700" />
        <div className="flex justify-between">
          <p className="font-bold dark_head">Total</p>
          <p className="dark_head">
            {currency} {totalPrice === 0 ? 0 : totalPrice + delivery_fee}
          </p>
        </div>
        {location.pathname !== "/place-order" && (
          <div className="flex justify-end p,y-10">
            <button
              className="text-white bg-black dark_button text-xl px-10 py-5 rounded tracking-wide"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
