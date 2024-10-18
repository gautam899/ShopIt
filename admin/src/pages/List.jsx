/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backend_url } from "../App";
import { toast } from "react-toastify";
import { currency } from "../App";
const List = ({ token }) => {
  const [allProducts, setAllProducts] = useState([]); // Initialize with an empty array

  const getProducts = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/product/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${backend_url}/api/product/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the products list after deleting. So instead of deleting them all together just call the getProducts functions.
        await getProducts();
        toast.success("Product deleted successfully");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm px-2 dark_text">All Product List</p>
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-2 text-sm text-gray-600 font-bold bg-gray-300 rounded dark_text dark:bg-blue-900">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      {allProducts.map((product, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-2 border border-gray-300 text-sm sm:text-base dark_text"
        >
          <img
            src={product.image && product.image[0]}
            alt=""
            className="w-[80%] sm:w-[80%]"
          />
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>
            {currency}
            {product.price}
          </p>
          <img
            src={assets.delete_icon}
            alt=""
            className="w-5 sm:w-8 cursor-pointer delete_icon"
            onClick={() => handleDelete(product._id)}
          />
        </div>
      ))}
    </div>
  );
};

export default List;
