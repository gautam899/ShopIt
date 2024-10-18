/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { toast } from "react-toastify";
import GooglePay from "../components/GooglePay";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    products,
    cartItem,
    findTotalPrice,
    delivery_fee,
    backend_url,
    token,
    setCartItem,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    house_address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initPay = async (order) => {
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Order Payment",
        description: "Razorpay order payment",
        order_id: order._id,
        receipt: order.receipt,
        handler: async (response) => {
          try {
            // verify payment from the backend
            const { data } = await axios.post(
              `${backend_url}/api/order/verifyRazor`,
              data,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.status === 200) {
              navigate("/orders");
              setCartItem({});
            }
            console.log("Payment Successful:");
          } catch (error) {
            console.log(error);
            toast.error("Somthing Went Wrong");
          }
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderData = [];
      // console.log("Cart Item: ", cartItem);
      for (const itemId in cartItem) {
        for (const item_size in cartItem[itemId]) {
          const productInfo = structuredClone(
            products.find((product) => product._id === itemId)
          );
          if (productInfo) {
            productInfo.size = item_size;
            productInfo.quantity = cartItem[itemId][item_size];
            orderData.push(productInfo);
          }
          // console.log("Product Info: ", productInfo);
        }
      }
      // console.log("Order Info: ", orderData);
      const total = await findTotalPrice();
      // console.log(formData);

      // console.log(total + delivery_fee);

      let data = {
        items: orderData,
        address: formData,
        amount: total + delivery_fee,
      };

      // NOw lets have some switch cases depending upon the method of payment choosen by the user
      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backend_url}/api/order/place`,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (response.status === 200) {
            toast.success("Order Placed Successfully");
            //cart will emptied on its own by the controller.
            setCartItem({});
            navigate("/orders");
          } else {
            toast.error("Failed to place order");
          }
          break;
        case "stripe":
          console.log(data);
          const responseStripe = await axios.post(
            `${backend_url}/api/order/placeStripe`,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseStripe.status === 200) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(
            `${backend_url}/api/order/placeRazor`,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseRazorpay.status === 200) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border-t flex justify-between flex-col sm:flex-row sm:min-h-[80vh] pt-5 sm:pt-14 gap-6"
    >
      {/* The left side div containgin the delivery info */}
      <div className="flex flex-col w-full sm:max-w-[480px] gap-3">
        <Title text1={"Delivery"} text2={"Information"} />
        <div className="flex gap-2">
          <input
            onChange={handleChange}
            value={formData.firstName}
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
          />
          <input
            onChange={handleChange}
            value={formData.lastName}
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
          />
        </div>
        <input
          onChange={handleChange}
          value={formData.email}
          type="text"
          name="email"
          id=""
          placeholder="Email address"
          required
          className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
        />
        <input
          onChange={handleChange}
          value={formData.house_address}
          type="text"
          name="house_address"
          id=""
          placeholder="Address"
          required
          className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
        />
        <div className="flex gap-2">
          <input
            onChange={handleChange}
            value={formData.city}
            type="text"
            name="city"
            placeholder="City"
            required
            className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
          />
          <input
            onChange={handleChange}
            value={formData.state}
            name="state"
            type="text"
            placeholder="State"
            required
            className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
          />
        </div>
        <div className="flex gap-2">
          <input
            onChange={handleChange}
            value={formData.zip}
            type="text"
            name="zip"
            placeholder="Zip Code"
            required
            className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
          />
          <input
            onChange={handleChange}
            value={formData.country}
            type="text"
            name="country"
            placeholder="Country"
            required
            className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
          />
        </div>
        <input
          onChange={handleChange}
          value={formData.phone}
          type="text"
          name="phone"
          placeholder="Phone"
          required
          className="outline-none border-[1px] border-gray-400 py-1.5 px-3.5 rounded w-full dark_input"
        />
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-3 mt-10">
          {/* <div className="flex justify-between px-2">
            <p className="dark_text">SubTotal</p>
            <p className="dark_head">$0.00</p>
          </div>
          <hr className="h-[1px] bg-gray-600" />
          <div className="flex justify-between px-2">
            <p className="dark_text">Delivery Fees:</p>
            <p className="dark_head">$0.00</p>
          </div>
          <hr className="h-[1px] bg-gray-600" />
          <div className="flex justify-between px-2">
            <p className="font-bold dark_head">Total</p>
            <p className="dark_head">$0.00</p>
          </div> */}
          <CartTotal />

          <div className="mt-10 ">
            <div className="text-xl mb-3">
              <Title text1={"Payment"} text2={"Method"} />
            </div>
            <div className="flex flex-col xl:flex-row gap-3">
              <div
                className="flex items-center border-gray-600 gap-3 p-3 px-2 border cursor-pointer dark_pay"
                onClick={() => setMethod("stripe")}
              >
                <p
                  className={`min-w-3.5 border h-3.5 rounded-full border-gray-500 ${
                    method === "stripe" ? "bg-blue-800" : ""
                  }`}
                ></p>
                <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
              </div>

              <div
                className="flex items-center border-gray-600 gap-2 p-2 px-3 border cursor-pointer dark_pay"
                onClick={() => setMethod("razorpay")}
              >
                <p
                  className={`min-w-3.5 border h-3.5 rounded-full border-gray-500 ${
                    method === "razorpay" ? "bg-blue-800" : ""
                  }`}
                ></p>
                <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
              </div>
              <div
                className="flex items-center border-gray-600 gap-3 p-3 px-2 border cursor-pointer dark_pay"
                onClick={() => setMethod("cod")}
              >
                <p
                  className={`min-w-3.5 border h-3.5 rounded-full border-gray-500 ${
                    method === "cod" ? "bg-blue-800" : ""
                  }`}
                ></p>

                <p className="text-gray-800 mx-4 font-semibold tracking-wide text-sm dark_pay">
                  Cash on Delivery
                </p>
              </div>
              <GooglePay />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            type="submit"
            className="text-white bg-black px-6 py-3 rounded text-lg dark_button"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
