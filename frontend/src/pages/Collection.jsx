/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import NotFound from "../components/NotFound";

const Collection = () => {
  const { products } = useContext(ShopContext);
  //a state variable to open and close the drop down filter
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  //state variable to filter the products based on the categories
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("relevant");

  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const applyFilter = () => {
    //Create a copy of the products
    let filtered = products.slice();
    if (selectedCategory.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategory.includes(product.category)
      );
    }
    if (selectedSubCategory.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSubCategory.includes(product.subCategory)
      );
    }
    if (showSearch && search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilterProducts(filtered);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    //if the list of choosen subcategory already includes the selected on then we remove it
    //else we add it
    setSelectedCategory((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    //if the list of choosen subcategory already includes the selected on then we remove it
    //else we add it
    setSelectedSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((subCategory) => subCategory !== value)
        : [...prev, value]
    );
  };

  const sortProduct = () => {
    let copy = filterProducts.slice();
    switch (sortOrder) {
      case "lowToHigh":
        setFilterProducts(copy.sort((a, b) => a.price - b.price));
        break;
      case "highToLow":
        setFilterProducts(copy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [selectedCategory, selectedSubCategory, search, showSearch, products]);
  //now lets write a use Effect for sorting the list of products
  useEffect(() => {
    sortProduct();
  }, [sortOrder]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          className="my-2 uppercase text-xl flex items-center cursor-pointer gap-2 dark_main"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 dark_text mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="text-sm font-medium mb-3 uppercase dark_head">
            Categories
          </p>
          <div className="flex flex-col gap-2">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"All"}
                onChange={handleCategoryChange}
              />{" "}
              ALL
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={handleCategoryChange}
              />{" "}
              MEN
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={handleCategoryChange}
              />{" "}
              WOMEN
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={handleCategoryChange}
              />{" "}
              KIDS
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 dark_text py-3 my-5 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="text-sm font-medium mb-3 uppercase dark_head">Types</p>
          <div className="flex flex-col gap-2">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={handleSubCategoryChange}
              />{" "}
              TOPWEAR
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={handleSubCategoryChange}
              />{" "}
              BOTTOMWEAR
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Midwear"}
                onChange={handleSubCategoryChange}
              />{" "}
              MIDWEAR
            </p>
          </div>
        </div>
      </div>

      {/* Right side. All the collections */}
      <div className="flex flex-col">
        <div className="flex justify-between p-5 gap-2">
          <div className="flex gap-3 items-center">
            <p className="uppercase text-base md:text-2xl text-gray-600 dark_head">
              All{" "}
              <span className="font-bold text-gray-900 dark_main">
                Collections
              </span>
            </p>
            <hr className="h-[3px] max-sm:hidden bg-gray-800 w-10 " />
          </div>

          <select
            className="flex py-2 px-1 border-2 border-gray-400 "
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="relevant">Sort By: Relevent</option>
            <option value="lowToHigh">Sort By: Low To High</option>
            <option value="highToLow">Sort By: High To Low</option>
          </select>
        </div>
        <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductCard
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
