/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Title from "../components/Title";
import ReviewCard from "../components/ReviewCard";
import DisplayReview from "../components/DisplayReview";

const Product = () => {
  const { products, currency, addCartItem, navigate } = useContext(ShopContext);
  //We also need to fetch the product id from the url to display the particular product.
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [related, setRelated] = useState([]);
  const [choosenSize, setChoosenSize] = useState("");
  //a async function to fetch the product data
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  //a function to find out the related products
  const findRelatedProducts = async () => {
    let filtered = products;
    if (productData) {
      const relatedProducts = filtered.filter(
        (item) =>
          item.subCategory === productData.subCategory &&
          item._id !== productData._id &&
          item.category === productData.category
      );
      setRelated(relatedProducts);
    }
  };
  // We want the function to be called whenever the product or product id change
  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  useEffect(() => {
    findRelatedProducts();
  }, [productData, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row sm:h-[450px]">
          {/* inside we will have two divs. One for the  images and the main image*/}
          <div
            className="flex sm:flex-col overflow-x-auto
          sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full"
          >
            {/* we will map through the images and display them */}
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[24%] h-[100px] sm:w-full sm:h-[200px] sm:mb-3 object-cover cursor-pointer"
              />
            ))}
          </div>

          <div className="flex justify-center items-center overflow-hidden h-full">
            <img
              src={image}
              className="w-full h-[100%] object-cover"
              alt="Image"
            />
          </div>
        </div>

        {/* The product title etc.. */}
        <div className="flex-1">
          <h1 className="text-xl font-medium text-gray-700 mt-3 dark_head">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          {/* price */}
          <p className="text-2xl font-bold mt-5 dark_head">
            {currency}
            {productData.price}
          </p>
          <p className="text-blue-600">inclusive all taxes</p>
          <p className="mt-2 text-sm text-gray-500 dark_text">
            {productData.description}
          </p>
          <p className="mt-2 text-sm text-gray-900 dark_main">Select Size</p>
          <div className="flex gap-4 mt-4">
            {productData.sizes.map((item, index) => (
              <button
                key={index}
                className={`bg-gray-200 py-2 px-4 border-2 ${
                  item === choosenSize
                    ? "border-orange-500"
                    : "border-transparent"
                }`}
                onClick={() => setChoosenSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="bg-black text-white dark_button mt-5 px-6 py-3 active:bg-gray-700"
            onClick={() => addCartItem(productData._id, choosenSize)}
          >
            ADD TO CART
          </button>
          <hr className="h-[2px] mt-6 bg-gray-400" />
          <div className="mt-5 text-base text-gray-500 flex flex-col gap-1 dark_text">
            <p>100% Original Products</p>
            <p>Free Delivery is available for this product.</p>
            <p>Return or replacement facility available for 7 days</p>
          </div>
        </div>
      </div>

      {/* description and reviews */}
      <div>
        <div className="flex mt-20">
          <p className="text px-6 py-4 border-2 border-gray-300 dark_main">
            Description
          </p>
        </div>

        <div className="flex flex-col px-2 py-5 gap-3 text-gray-600 border-2 border-gray-300 dark_text">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-10">
        <div className="w-full sm:w-1/2 border border-gray-400">
          <ReviewCard productId={productId} />
        </div>
        <div className="w-full sm:w-1/2 border flex flex-col gap-3 border-gray-400 p-4">
          <h1 className="text-xl sm:text-3xl font-bold text-center dark_head">
            Review this product
          </h1>
          <p className="text-sm text-center dark_text">
            Share your thoughts with other cutomers
          </p>
          <button
            className="px-3 py-2 border-2 rounded-full dark_button"
            onClick={() => navigate(`/create-review/${productId}`)}
          >
            Write a review
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h1 className="w-full text-center text-2xl sm:text-3xl">Reviews</h1>
        <hr className="h-[2px]  bg-black" />
        <DisplayReview productId={productId} />
      </div>
      {/* Related products */}
      <div className="mt-20">
        <div className="text-center py-2">
          <Title text1={"Related"} text2={"Products"} />
        </div>
        {/* items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols4 lg:grid-cols-5 gap-2 gap-y-4">
          {related.map((item, index) => (
            <ProductCard
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
