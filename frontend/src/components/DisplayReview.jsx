/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const DisplayReview = ({ productId }) => {
  const { backend_url, navigate } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/product/reviews/${productId}`
      );

      // console.log(data.reviews);
      setReviews(data.reviews);
      //   toast.success("Reviews fetched successfully.");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong in fetching reviews: " + error.message);
    }
  };
  const Star = ({ filled }) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "gray"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
  function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} filled={i <= rating} />);
    }
    return stars;
  }
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    fetchReviews();
  }, [productId]);

  
  return (
    <div className="flex flex-col gap-2">
      {reviews.length === 0 ? (
        <p className="w-full text-center text-2xl dark_head">
          No reviews yet
          <span
            className="text-xs ml-2 text-gray-500 cursor-pointer dark_text"
            onClick={() => navigate(`/create-review/${productId}`)}
          >
            Write the first review
          </span>
        </p>
      ) : (
        <div>
          {reviews.map((review) => (
            <div key={review._id} className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-col gap-4 w-full sm:w-[35%] border border-gray-400 p-3">
                <div className="flex gap-2">
                  <img src={assets.user_icon} alt="" className="w-7" />
                  <strong className="flex items-center dark_head">
                    {review.user.name}
                  </strong>
                </div>

                <div className="flex dark_text">
                  <strong>Rating: </strong>
                  {renderStars(review.rating)}
                </div>

                <p className="font-semibold dark_text">
                  Reviewd At:{" "}
                  <span className="font-normal">
                    {formatDate(review.createdAt)}
                  </span>{" "}
                </p>
              </div>

              <p className="w-full border border-gray-400 rounded text-[20px] text-gray-800 px-3 dark_text">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayReview;
