import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logout
} from "../controllers/userControllers.js";
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/profile").get(isAuthenticated, getProfile);



export default router;