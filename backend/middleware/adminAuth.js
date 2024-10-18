import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try { 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Access Denied" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Access Denied" }); 
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      console.log(error.message);
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Some error occured!" });
  }
};
export default adminAuth;
