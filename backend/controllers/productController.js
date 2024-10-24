import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    // NOw we cannot directly upload the images to the database but rather we need to
    //first upload them to cloudinary and from there we will receive the URL and we
    //upload the URL
    //Filter the undedefines first
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const imageData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      data: Date.now(),
    };

    const product = new productModel(imageData);
    await product.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (products) {
      res
        .status(200)
        .json({ products, message: "Products fetched Successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message:
        "Some error Occurred while finding the product. Please try again later",
    });
  }
};

const removeProduct = async (req, res) => {
  //removing the product by if
  try {
    const id = req.params.id;
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({ message: "Product not found!!" });
    }

    res.status(200).json({ message: "Product Deleted Successfully." });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Could Not Delete Product. Try again later." });
  }
};

const singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ product, message: "Here is you product" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Some Error occured. Please try again later." });
  }
};

const getReviews = async (req, res) => {
  try {
    const id = req.params.productId;
    const reviews = await reviewModel
      .find({ product: id })
      .populate("user", "name email");
    if (!reviews) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }
    res.status(200).json({ message: "Here are the reviews", reviews });
  } catch (error) {
    console.log(error.message);
  }
};

const getRating = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    await product.calculateAverageRatings();
    res
      .status(200)
      .json({ message: "Here is the rating", rating: product.rating });
    //find the product
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  getReviews,
  getRating,
};
