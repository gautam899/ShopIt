/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latest, setLatest] = useState([]);
  useEffect(() => {
    setLatest(products.slice(0, 10));
  }, [products]);
  //Every time a product is added by the admin and the product is updated the useEffect will be executed and the latest collection section of the 
  //home page will be updated.
  // console.log(products);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 text-sm md:text-base m-auto text-gray-600 dark_text">
          Discover the elegance and innovation of our latest fashion collection,
          where timeless style meets modern sophistication.
        </p>
      </div>

      {/* below we will displaying our product cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-6">
        {latest.map((item, index) => (
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
  );
};

export default LatestCollection;
