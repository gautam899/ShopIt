/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex text-center gap-5">
      <p className="text-xl sm:text-3xl text bold">
        OOPs Your Cart is Empty!!!!
      </p>
      <Link to="/collection">Go to Collection</Link>
    </div>
  );
};

export default EmptyCart;
