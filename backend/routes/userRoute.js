import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  forgotPasswordController,
  resetPasswordController,
  verifyEmail,
  getUserData,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

// If there is post request on /register path then we will call registerUser
//handler and similarly for the other
userRouter.post(
  "/register",
  upload.fields([{ name: "image", maxCount: 1 }]),
  registerUser
); //api/user/register
userRouter.post("/login", loginUser); //api/user/login
userRouter.post("/admin", adminLogin); //api/user/admin
userRouter.post("/forgotPassword", forgotPasswordController);
userRouter.post("/resetPassword/:secret_token", resetPasswordController);
userRouter.get("/:userId/verify-email/:verificationToken", verifyEmail);
userRouter.get("/getUserData", authUser, getUserData);
userRouter.post(
  "/:userId/updateProfile",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProfile
);
export default userRouter;
