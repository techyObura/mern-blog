import express from "express";
import { signIn, signup, google } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/sign-in", signIn);
router.post("/google", google);

export default router;
