import express from "express";
import {
  getAllOrders,
  placeOrderCOD,
  placeOrderRazorpay,
  placeOrderStripe,
  userOrderById,
  updateStatus,
  verifyStripe,
  verifyRazorPay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
const orderRouter = express.Router();

//create the routes.

//place order with cod
orderRouter.post("/place", authUser, placeOrderCOD);
//Get all the orders. This is for the admin
orderRouter.post("/list", adminAuth, getAllOrders);
//update the status of the order of a user.
orderRouter.post("/status", adminAuth, updateStatus);
//get all the orders of a particular user
orderRouter.post("/userOrder", authUser, userOrderById);
//place order with stripe
orderRouter.post("/placeStripe", authUser, placeOrderStripe);
//verify Stripe
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazor", authUser, verifyRazorPay);
//place order with razor.
orderRouter.post("/placeRazor", authUser, placeOrderRazorpay);

export default orderRouter;
