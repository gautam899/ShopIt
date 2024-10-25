/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const OrderCard = ({ allOrders, userData }) => {
  const { currency } = useContext(ShopContext);
  return (
    <div className="border-t flex flex-col">
      <div className="pb-4 pt-4">
        <h1 className="text-2xl font-semibold text-gray-700 dark_head">
          Hi, {userData.name}
        </h1>
      </div>
      <div>
        {allOrders ? (
          allOrders.length > 0 ? (
            <div>
              {allOrders.map((order, index) => (
                <div
                  key={index}
                  className="border-t border-b flex flex-col md:flex-row md:justify-between gap-4 py-4 md:items-center"
                >
                  <div className="flex items-start gap-6">
                    <img src={order.image[0]} alt="" className="w-16 sm:w-20" />
                    <div className="flex flex-col text-sm text-gray-700">
                      <p className="text-black text-sm font-medium dark_head">
                        {order.name}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <p className="dark_head">
                          {currency}
                          {order.amount}
                        </p>
                        <p className="dark_head">
                          Quantity:{" "}
                          <span className="dark_text">{order.quantity}</span>
                        </p>
                        <p className="dark_head">
                          Size: <span className="dark_text">L</span>
                        </p>
                      </div>
                      <p className="mt-6 dark_text">
                        <span className="text-gray-900 dark_head">Date: </span>{" "}
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="text-base dark_text">
                        Payment Method: {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <div className="flex md:w-1/2 justify-between items-center py-2">
                    <div className="flex gap-2 justify-center items-center">
                      <p className="w-2 h-2 rounded-full border border-gray-300 bg-green-600"></p>
                      <p className="dark_main">{order.status}</p>
                    </div>
                    <button className="border bg-gray-200 px-6 py-3 rounded">
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading Your Orders</p>
          )
        ) : (
          <p>Loading Orders</p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
