//what will a review schma have.
//1. The userId->Which user has created this review.
//2. For what product the review. i.e. the product id.
//3. Rating. 1->5
//4. comment->the actual review.
//5. date->when the review was created.
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reviewModel =
  mongoose.model.review || mongoose.model("review", reviewSchema);
export default reviewModel;
