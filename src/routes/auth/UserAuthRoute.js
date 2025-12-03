import express from "express";
import { login, profile, registration, userDelete, otpValidation } from "../../controllers/auth/UserAuthController.js";


const router = express.Router();

router.post("/register", registration);
router.post("/login", login);
router.get("/profile", profile);
router.delete("/delete/:id", userDelete);
router.post("/otp/verification", otpValidation);

export default router;
