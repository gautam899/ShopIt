// while performing operation like adding products to the cart
import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Access Denied" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }
    //NOw we need to decode the jwt token using the secret key.
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decoded.id; //we add user id to the token while creating the token during the login. So we need to set this userId
    // console.log("Congratulation you are authorized to proceed");
 
    next();
  } catch (error) {
    //If any error occurs then we will console log the error.
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default authUser;
