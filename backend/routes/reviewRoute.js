import express from "express";
import authUser from "../middleware/auth.js";
import { createReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

//post request on the path api/review/create will handled by the createReview controller.
reviewRouter.post("/create", authUser, createReview); //api/review/create auth user will add the userId to the request body and the product Id will be passed in the body from the frontend.
export default reviewRouter;
