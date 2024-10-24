/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
const Verify = () => {
  const { navigate, token, backend_url, setCartItem } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  
  // A function to verify the stripe payment
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${backend_url}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setCartItem({});
        navigate("/orders");
      } else {
        console.log("trying to navigate")
        navigate("/cart");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>Verify</div>;
};

export default Verify;
