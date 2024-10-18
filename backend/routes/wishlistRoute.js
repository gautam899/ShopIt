import express from "express";
import {
  addToWishlistController,
  deleteWishlistById,
  fetchWishlist,
} from "../controllers/wishlistController.js";
import authUser from "../middleware/auth.js";
const wishlistRouter = express.Router();

wishlistRouter.post("/addToWishlist", authUser, addToWishlistController);
wishlistRouter.post("/getUserWishlist", authUser, fetchWishlist);
wishlistRouter.delete(
  "/deleteWishlistItem/:productId",
  authUser,
  deleteWishlistById
);

export default wishlistRouter;
