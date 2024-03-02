import User from "../modules/user.module.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  /*  try {
    newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    next(error);
  } */

  newUser
    .save()
    .then(() => res.json({ message: "Signup successful" }))
    .catch((error) => next(error));
};
