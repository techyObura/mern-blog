import User from "../modules/user.module.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

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
    .then((user) => generateToken(res, user._id))
    .then(() => res.status(201).json({ message: "Signup successful" }))
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
        const { password: pass, ...rest } = validUser._doc;
        generateToken(res, validUser._id);
        res.status(200).json(rest);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json("logged out");
};

export const google = async (req, res, next) => {
  try {
    const { email, name, googlePhotoUrl } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        email: email,
      });

      try {
        const savedUser = await newUser.save();
        const token = jwt.sign(
          { id: savedUser._id },
          process.env.JWT_SECRET_KEY
        );
        const { password, ...rest } = savedUser._doc;
        // ... (rest of your code using user data and token)
        res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json(rest);
      } catch (error) {
        // Handle errors during user save or token generation
        console.error(error);
        res.status(500).json({ message: "Error creating user" }); // Example error response
      }
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
