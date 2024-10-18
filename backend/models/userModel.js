import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: {
      type: Boolean,
      default: false,
    },
    cartData: { type: Object, default: {} },
    wishlist: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        size: String,
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.model.user || mongoose.model("user", userSchema);
export default userModel;
