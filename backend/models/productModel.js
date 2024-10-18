import mongoose from "mongoose";

// Create a product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true },
    bestseller: { type: Boolean },
    data: { type: Number, required: true },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// For a specific product we need to find the average rating.
productSchema.methods.calculateAverageRatings = async function () {
  //find all the review for this product.
  const reviews = await mongoose.model("review").find({ product: this._id });
  if (reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    const avgRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    this.rating = avgRating;
    this.numReviews = reviews.length;
  }
  await this.save();
};

// if the model already exist then use the existing one otherwise create new mode
const productModel =
  mongoose.model.product || mongoose.model("product", productSchema);
export default productModel;
