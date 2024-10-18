import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import wishlistRouter from "./routes/wishlistRoute.js";
// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
app.use(express.json());
app.use(cors());

//Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);
app.use("/api/wishlist", wishlistRouter);

app.get("/", (req, res) => {
  res.send(`API is running`);
});

// Start server
app.listen(port, () => console.log("Server is running on port: " + port));
