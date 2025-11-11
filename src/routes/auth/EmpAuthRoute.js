import express from "express";
import { login, profile, registration } from "../../controllers/auth/EmployeeAuthController.js";
const router = express.Router();

router.post("/register", registration);
router.post("/login", login);
router.get("/profile", profile);

export default router;
