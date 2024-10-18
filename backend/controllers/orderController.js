import e from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const deliveryCharge = 10;
const currency = "usd";
//Get all the orders to display on the admin side.
const getAllOrders = async (req, res) => {
  try {
    const response = await orderModel.find({});
    console.log(response);
    res.status(200).json({ message: "Orders fetched successfully", response });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//Place order with COD method.
const placeOrderCOD = async (req, res) => {
  const { userId, items, amount, address } = req.body;

  try {
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
      date: new Date(),
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({ message: "Order Placed Successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("Validation Error:", error.errors);
      res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    } else {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

//Place order with stripe.
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;
    console.log("Request Body:", req.body);
    if (!amount || !address) {
      return res
        .status(400)
        .json({ message: "Amount and address are required" });
    }
    const { origin } = req.headers; //the frontend url
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      status: "Order Placed",
      paymentMethod: "stripe",
      payment: false,
      date: new Date(),
    });
    await newOrder.save(); //we will be intially saving the order. If somehow the
    //stripe payment fails in the future we will just remove the orderId from the database.

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    // Now since we have created the line items we can now create a session

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res
      .status(200)
      .json({ message: "Order Placed Successfully", session_url: session.url });
  } catch (error) {
    console.log("Something went wrong in the stripe controller", error.message);
    res.status(500).json({
      message: "Something went wrong in the stripe controller",
      error: error.message,
    });
  }
};

//Now we need to verify the stripe payment. As we need to update the payment and
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      console.log("Stripe payment successfull");
      res.status(200).json({ message: "Verify stripe Successfull" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(500).json({ message: "Stripe Payment Failed" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//Place order with razor pay.
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;
    console.log("Request Body:", req.body);
    if (!amount || !address) {
      return res
        .status(400)
        .json({ message: "Amount and address are required" });
    }
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      status: "Order Placed",
      paymentMethod: "stripe",
      payment: false,
      date: new Date(),
    });
    await newOrder.save(); //we will be intially saving the order. If somehow the
    //stripe payment fails in the future we will just remove the orderId from the database.

    //The options
    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    //create a instance of razor pay.
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
      }
      res
        .status(200)
        .json({ message: "Payment through razorpay successfull", order });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

//Verify the paymnet with razor pay.
//Details sent by razorpay after completing the payment.
//razorpay_orderID,
//razorpay_paymentID,
//razorpay_signature

const verifyRazorPay = async (req, res) => {
  try {
    // const {
    //   orderId,
    //   userId,
    //   razorpay_orderID,
    //   razorpay_paymentID,
    //   razorpay_signature,
    // } = req.body;
    // const sign = razorpay_orderID + "|" + razorpay_paymentID;
    // const resultSign = crypto
    //   .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    //   .update(sign.toString())
    //   .digest("hex");

    // if (razorpay_signature == resultSign) {
    //   await orderModel.findByIdAndUpdate(orderId, { payment: true });
    //   await userModel.findByIdAndUpdate(userId, { cartData: {} });
    //   res.status(200).json({ message: "Payment verified successfully" });
    // } else {
    //   await orderModel.findByIdAndDelete(orderId);
    //   res.status(500).json({ message: "Payment Failed" });
    // }
    const { userId, razorpay_orderID } = req.body;
    const orderInfo = await razorPayInstance.orders.fetch(razorpay_orderID);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ message: "Payment verified successfully" });
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
    }
    console.log(orderInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

//Get all the orders of a user using the userId
const userOrderById = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await orderModel.find({ userId: userId });
    console.log(orders);
    res.status(200).json({ message: "Order fetched Successfully", orders });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//Update the status of the order place by a user.
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: "Status Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export {
  getAllOrders,
  placeOrderCOD,
  placeOrderRazorpay,
  placeOrderStripe,
  userOrderById,
  updateStatus,
  verifyStripe,
  verifyRazorPay,
};
