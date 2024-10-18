/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { assets } from "../assets/assets";
const Orders = ({ token }) => {
  //first we need to get all the orders from the backend
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.response);
      if (response.data.response) {
        // Check if response.data.response exists if it does then we sort the orders in reverse order. i.e. the oldest order will appear on the top
        setOrders(response.data.response.reverse()); // Reverse after setting orders
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleStatusChange = async (event, orderId) => {
    try {
      const res = await axios.post(
        `${backend_url}/api/order/status`,
        { orderId, status: event.target.value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log("Error from update status: ", error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="flex flex-col gap-3 dark_text">
      <p className="text-xl text-gray-800 dark_text font-semibold">
        Orders Page
      </p>
      {orders.map((order, index) => {
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toISOString().split("T")[0];
        return (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5 px-10 py-8
          border-2 border-gray-300 text-xs sm:text-sm items-start"
          >
            <img src={assets.order_icon1} alt="" className="w-10 order_icon" />
            <div className="flex flex-col gap-3">
              {order.items.map((item, index) => {
                return (
                  <p key={index} className="">
                    {item.name} x {item.quantity} <span>{item.size}</span>
                  </p>
                );
              })}

              <p>Name: {order.address.firstName}</p>
              <p>{order.address.house_address}</p>
              <p>
                {order.address.city}, {order.address.country},{" "}
                {order.address.zip}
              </p>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p>items: {order.items.length}</p>
              <p className="mt-3">Payment Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment === false ? "Pending" : "Done"}</p>
              <p>Date: {formattedDate}</p>
            </div>
            <p className="text-sm sm:text-[15px]">${order.amount}</p>

            <select
              name=""
              id=""
              value={order.status}
              className="p-2 font-semibold border outline-none dark_button rounded"
              onChange={(event) => handleStatusChange(event, order._id)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
