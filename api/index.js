import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const db_uri = process.env.MONGODB_URI;

mongoose.connect(db_uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Successfully Connected to MongoDB");
});

const port = 8000;

// routes

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
