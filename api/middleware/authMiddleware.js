import jwt from "jsonwebtoken";
import User from "../modules/user.module.js";
import { errorHandler } from "../utils/errorHandler.js";

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.jwt_secret_key);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      next(errorHandler(401, "Invalid JWT token"));
    }
  } else {
    next(errorHandler(401, "Not authorized to access"));
  }
};

export default protect;
