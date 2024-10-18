import reviewModel from "../models/reviewModel.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";

const createReview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //destructure the req body.
    const { userId, productId, comment, rating } = req.body;
    // console.log("Received data:", { userId, productId, comment, rating });
    const newReview = new reviewModel({
      user: userId,
      product: productId,
      rating,
      comment,
    });
    //save the review.
    await newReview.save({ session });
    const product = await productModel.findById(productId).session(session);
    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Product not found" });
    }
    if (!product.reviews) {
      product.reviews = [];
    }
    product.reviews.push(newReview._id);
    // Calculate average ratings.
    await product.calculateAverageRatings();

    // Save the updated product.
    await product.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Review Created Successfully" });
  } catch (error) {
    console.log(error.message);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      message: "Something Went wrong in review controller",
      error: error.message,
    });
  }
};
export { createReview };
