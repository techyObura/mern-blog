import express from "express";
import {
  signIn,
  signup,
  google,
  logout,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signIn);
router.post("/google", google);
router.post("/logout", logout);

export default router;
