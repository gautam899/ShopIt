/* eslint-disable no-unused-vars */
//here we will only display the cards in which we have the

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [best, setBest] = useState([]);
  useEffect(() => {
    const bestSellers = products.filter((product) => product.bestseller);
    setBest(bestSellers);
  }, [products]);
  //Every time the products gets updated the function will called to make an update to the best seller.
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Best"} text2={"Seller"} />
        <p className="w-3/4 text-sm md:text-base m-auto text-gray-700 dark_text">
          Discover our top-selling fashion pieces that blend style and comfort,
          making you stand out effortlessly.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-6">
        {best.map((product, index) => (
          <ProductCard
            key={index}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
