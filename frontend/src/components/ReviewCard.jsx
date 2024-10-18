/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useDeferredValue, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
//In this page we will be displaying the average rating of the product.
const ReviewCard = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const { backend_url } = useContext(ShopContext);
  const getRating = async () => {
    try {
      const response = await axios.get(
        `${backend_url}/api/product/get-average-rating/${productId}`
      );
      if (response.status === 200) {
        // console.log(response);
        setAverageRating(response.data.rating);
      } else {
        toast.error("Error fetching average rating");
      }
      // setAverageRating(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRating();
  }, [productId]);
  return (
    <div className="flex justify-center gap-8 items-center mt-[60px]">
      <p className="text-2xl sm:text-3xl text-gray-800 dark_head">Average Rating:</p>
      <p className="flex items-center text-2xl font-semibold text-gray-900 h-full dark_text">
        {averageRating}
      </p>
    </div>
  );
};

export default ReviewCard;
