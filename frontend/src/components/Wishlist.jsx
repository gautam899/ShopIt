/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import WishlistCard from "./WishlistCard";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
const Wishlist = ({ token }) => {
  const [items, setItems] = useState([{}]);
  const { wishlistItems, backend_url } = useContext(ShopContext);

  const fetchWishlist = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/api/wishlist/getUserWishlist`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.wishlist);
      if (response.status === 200) {
        const wishlist = response.data.wishlist;
        if (wishlist.length === 0) {
          toast.info("Your wishlist is empty"); // Inform the user that their wishlist is empty
        }
        setItems(wishlist);
      } else {
        toast.error("Failed to fetch wishlist");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error fetching the wishlist");
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, [wishlistItems]);

  return (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-2">
      {items ? (
        items.map((item, index) => (
          <WishlistCard
            key={index}
            productId={item.productId}
            name={item.name}
            image={item.image && item.image[0]} // Assuming image is an array and you need the first one
            price={item.price}
            size={item.size}
          />
        ))
      ) : (
        <p className="sm:text-4xl text-2xl font-bold">Your wishlist is empty</p>
      )}
    </div>
  );
};

export default Wishlist;
