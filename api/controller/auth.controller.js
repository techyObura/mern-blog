import User from "../modules/user.module.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      next(errorHandler(404, "User not found"));
    } else {
      const validPassword = bcrypt.compareSync(password, validUser.password);

      if (!validPassword) {
        next(errorHandler(400, "Invalid Password"));
      } else {
        const token = jwt.sign(
          {
            id: validUser._id,
          },
          process.env.JWT_SECRET_KEY
        );

        const { password: pass, ...rest } = validUser._doc;

        res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json(rest);
      }
    }
  } catch (error) {
    next(error);
  }
};
