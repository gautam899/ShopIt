/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

/* eslint-disable react/prop-types */
const CreateReview = () => {
  const { products, token, backend_url, navigate } = useContext(ShopContext);
  const { productId } = useParams();
  const [image, setImage] = useState("");
  const [productData, setProductData] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to create a review");
      return null;
    }
    try {
      const response = await axios.post(
        `${backend_url}/api/review/create`,
        { productId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Review created successfully");
        navigate(`/product/${productId}`);
      } else {
        toast.error("Review could not be created");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  // console.log(products);
  // console.log(productId)
  // console.log(productData);
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  return (
    <form
      onSubmit={formSubmitHandler}
      className="w-full sm:max-w-[400px] m-auto mt-10 border border-gray-400 rounded p-5"
    >
      <h1 className="text-center text-2xl sm:text-3xl font-bold p-3 dark_head">
        Write a Review
      </h1>
      <img src={image} alt="review_image" className="h-[200px] mx-auto " />
      <p className="text-xl text-center py-4 dark_head">{productData.name}</p>
      <select
        name="ratings"
        id=""
        className="w-full border border-gray-400 rounded px-3 py-2 dark_input dark_input"
        defaultValue={5}
        value={rating}
        required
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">Select...</option>
        {[1, 2, 3, 4, 5].map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <textarea
        className="border border-gray-400 rounded w-full mt-3 placeholder:text-xl px-3 py-2 dark_input"
        placeholder="Write your review here!!"
        value={comment}
        required
        onChange={(e) => setComment(e.target.value)}
        rows={10}
      />
      <button
        type="submit"
        className="mt-3 w-full text-white bg-black py-3 rounded dark_button"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateReview;
