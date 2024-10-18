/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("25");
  const [category, setCategory] = useState("Men");
  const [subCategory, setsubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!category || !subCategory) {
        toast.error("Please select both Category and Subcategory");
        return; // Prevent form submission if values are missing
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // We need to make sure that if any of the image is not available we can still send the data
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backend_url}/api/product/add`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        toast.success("Product created Successfully.");
        setName("");
        setDescription("");
        setPrice("25");
        setCategory("");
        setsubCategory("");
        setBestseller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        console.log(response.message);
        toast.error("Failed to create product.");
      }
      // console.log(response);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-3 items-start dark:dark_text"
      id="product-form"
    >
      <div className="flex flex-col gap-4 ">
        <p>Upload Image (max-4)</p>
        <div className="flex gap-6">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload : URL.createObjectURL(image1)}
              className="w-10 cursor-pointer upload_image"
              alt="image1"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload : URL.createObjectURL(image2)}
              className="w-10 cursor-pointer upload_image"
              alt="image2"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload : URL.createObjectURL(image3)}
              className="w-10 cursor-pointer upload_image"
              alt="image3"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload : URL.createObjectURL(image4)}
              className="w-10 cursor-pointer upload_image"
              alt="image4"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Enter the product Name</p>
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 w-full max-w-[500px] rounded dark_input"
          placeholder="Enter the product name."
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Enter the product description</p>
        <textarea
          type="text"
          className="px-3 dark_input py-2 border border-gray-300 w-full max-w-[500px] rounded"
          placeholder="Enter the product name."
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            name="category"
            id=""
            className="w-full dark_input px-4 py-3 border border-gray-400 sm:w-[120px] rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Subcategory</p>
          <select
            name="subcategory"
            id=""
            className="w-full dark_input px-4 py-3 border border-gray-400 sm:w-[120px] rounded"
            value={subCategory}
            onChange={(e) => setsubCategory(e.target.value)}
          >
            <option value="Men">Topwear</option>
            <option value="Women">Midwear</option>
            <option value="Kids">Bottomwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="Number"
            value={price}
            className="w-full dark_input sm:w-[120px] px-3 py-2 border border-gray-400"
          />
        </div>
      </div>
      {/* some size buttons */}
      <div>
        <p className="mb-3">Select Size</p>
        <div className="flex gap-3">
          <p
            className={`${
              sizes.includes("S") ? "bg-pink-100" : ""
            } bg-gray-300 dark_button cursor-pointer h-[50px] rounded-full min-w-[50px]  flex justify-center items-center font-semibold`}
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            S
          </p>
          <p
            className={`${
              sizes.includes("M") ? "bg-pink-100" : ""
            } bg-gray-300 dark_button cursor-pointer h-[50px] rounded-full min-w-[50px]  flex justify-center items-center font-semibold`}
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            M
          </p>
          <p
            className={`${
              sizes.includes("L") ? "bg-pink-100" : ""
            } bg-gray-300 dark_button cursor-pointer h-[50px] rounded-full min-w-[50px]  flex justify-center items-center font-semibold`}
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            L
          </p>
          <p
            className={`${
              sizes.includes("XL") ? "bg-red-500" : ""
            } bg-gray-300 dark_button cursor-pointer h-[50px] rounded-full min-w-[50px]  flex justify-center items-center font-semibold`}
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            XL
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-3">
        <input
          type="checkbox"
          className=""
          onChange={(e) => setBestseller((prev) => !prev)}
          id="bestseller"
          checked={bestseller}
        />
        <p className="cursor-pointer">Add to the best seller</p>
      </div>
      <button
        type="submit"
        className="mt-3 text-white bg-black px-6 py-2 w-full dark_button sm:max-w-[120px]"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
