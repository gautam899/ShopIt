/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { token, backend_url, currency } = useContext(ShopContext);
  const [allOrders, setAllOrders] = useState([]);

  const getOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const orders = await axios.post(
        `${backend_url}/api/order/userOrder`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (orders.status === 200) {
        let allOrdersItem = [];
        orders.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["amount"] = order.amount;
            item["quantity"] = item.quantity || 1;
            allOrdersItem.push(item);
          });
        });
        console.log(orders);
        setAllOrders(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, [token]);

  return (
    <div className="border-t flex flex-col">
      <div className="pb-4">
        <Title text1={"My"} text2={"Orders"} />
      </div>

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
    </div>
  );
};

export default Orders;
