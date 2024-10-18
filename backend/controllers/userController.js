// In this file we will have the controllers that will handle the login or register user request.
// Route for user login

import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import generateOTP from "../utils/generateOTP.js";
import otpModel from "../models/otpModel.js";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "This EmailID does not exist!! Please SignUp first.",
      });
    }
    if (existingUser.isVerified === false) {
      return res
        .status(500)
        .json({ message: "Please Verify your Email First" });
    }
    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      const token = createToken(existingUser._id);
      res.status(200).json({ message: "Token Created Successfully.", token });
    } else {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Some Error occurred while logging in. Please try again later.",
    });
  }
};

// Route for user register
// const registerUser = async (req, res) => {
//   try {
//     //first thing that we will do here is we will destructure the
//     //the name email and the password from the req body.
//     const { name, email, password } = req.body;

//     //If the user already exsit
//     const userExist = await userModel.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({ message: "User already Exist" });
//     }
//     //   if not then we create a new user before that we need to secure the password and validate the email
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ message: "Please enter valid Email" });
//     }
//     if (password.length < 8) {
//       return res.status(400).json({
//         message: "Please choose a strong password of atleast 8 character",
//       });
//     }

//     // Create a verification token that we will send to the user email Id for verification.
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const verificationToken = crypto.randomBytes(32).toString("hex");
//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//       isVerified: false,
//     });

//     // const transporter = nodemailer.createTransport({
//     //   service: "gmail",
//     //   auth: {
//     //     user: process.env.EMAIL,
//     //     pass: process.env.APP_PASSWORD_EMAIL,
//     //   },
//     // });
//     // const mailOptions = {
//     //   from: process.env.EMAIL,
//     //   to: req.body.email,
//     //   subject: "Reset Password",
//     //   html: `
//     //   <h1>Verify Your Email</h1>
//     // <p>Click on the following link to verify your email:</p>
//     // <a href="${process.env.FRONTEND_URL}/verify-email/${verificationToken}">Verify Email.</a>
//     //   `,
//     // };
//     // await transporter.sendMail(mailOptions);
//     await newUser.save(); //save the user with isVerified as false.
//     const token = createToken(newUser._id);
//     res.status(201).json({ message: "SignUp Successfull", token });
//     // res.status(201).json({ message: "Verification email sent" });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "Error occured during signup, please try again later" });
//   }
// };

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already Exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter valid Email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "Please choose a strong password of atleast 8 character",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });
    await newUser.save();
    const userId = newUser._id;
    const verificationToken = generateOTP().toString();
    //Store the hashed token in the token model
    const newTokenModel = new otpModel({
      userId,
      verificationToken,
      expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });

    await newTokenModel.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD_EMAIL,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Email Verification",
      html: `
      <h1>Verify Your Email</h1>
    <p>Click on the following link to verify your email:</p>
    <a href="${process.env.FRONTEND_URL}/${userId}/verify-email/${verificationToken}">Verify Email.</a>
    <p>The link will expire in 1 hour.</p>
    <p>If you didn't request a verification, please ignore this email.</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email Sent Successfully" });
    // res.status(201).json({ message: "Verification email sent" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured during signup, please try again later" });
  }
};

const verifyEmail = async (req, res) => {
  const { userId, verificationToken } = req.params;
  try {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found for which the verification email was sent",
      });
    }
    const existingToken = await otpModel.findOne({ userId });
    if (!existingToken) {
      return res.status(500).json({ message: "Otp not found" });
    }
    if (existingToken.expiresAt < new Date()) {
      return res.status(500).json({ message: "Otp has expired" });
    }
    if (
      existingToken &&
      existingToken.verificationToken === verificationToken
    ) {
      await otpModel.findByIdAndDelete(existingToken._id);
      await userModel.findByIdAndUpdate(userId, { isVerified: true });
      const token = createToken(existingUser._id);
      res
        .status(200)
        .json({ message: "Email Verification Successfull!!", token });
    } else {
      return res
        .status(400)
        .json({ message: "OTP is invalid or has expired." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// Controller for admin login
const adminLogin = async (req, res) => {
  try {
    // console.log("Hi this is the admin controller");
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.SECRET_KEY);
      console.log("Welcome Admin");
      res.status(200).json({ token });
    } else {
      res.status(500).json({ message: "Invalid Credientials" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error occured during login, please try again later" });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    //find the user if it exist
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //generate a secret token
    const secret_token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );
    // Send the token to the user's email. Create a transporter for that.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD_EMAIL,
      },
    });
    //Configure the email
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Reset Password",
      html: `
      <h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="${process.env.FRONTEND_URL}/reset-password/${secret_token}">${process.env.FRONTEND_URL}/reset-password/${secret_token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>
      `,
    };

    //Send email
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: "Email Sent" });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    //we attached the token in the link that we sent to the user on email
    const decodedToken = jwt.verify(
      req.params.secret_token,
      process.env.SECRET_KEY
    );
    //if this token is not valid then we return an error.
    if (!decodedToken) {
      return res.status(404).json({ message: "Invalid token" });
    }
    const user = await userModel.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save(); //save the user.
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  resetPasswordController,
  forgotPasswordController,
  verifyEmail,
};
