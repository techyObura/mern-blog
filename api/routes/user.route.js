import express from "express";
import { updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.put("/update/:userId", protect, updateUser);

export default router;
