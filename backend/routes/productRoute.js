import express from "express";
import {
  addProduct,
  removeProduct,
  listProducts,
  singleProduct,
  getReviews,
  getRating,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", listProducts);
productRouter.get("/reviews/:productId", getReviews); //product/reviews/:id and also the user can see the reviews without logging in so we do not need to userAuth this
productRouter.delete("/remove/:id", adminAuth, removeProduct);
productRouter.get("/single/:id", singleProduct);
productRouter.get("/get-average-rating/:productId", getRating);

export default productRouter;
