import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  forgotPasswordController,
  resetPasswordController,
  verifyEmail,
} from "../controllers/userController.js";

const userRouter = express.Router();

// If there is post request on /register path then we will call registerUser
//handler and similarly for the other
userRouter.post("/register", registerUser); //api/user/register
userRouter.post("/login", loginUser); //api/user/login
userRouter.post("/admin", adminLogin); //api/user/admin
userRouter.post("/forgotPassword", forgotPasswordController);
userRouter.post("/resetPassword/:secret_token", resetPasswordController);
userRouter.get("/:userId/verify-email/:verificationToken", verifyEmail);
export default userRouter;
