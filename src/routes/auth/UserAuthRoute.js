import express from "express";
import { login, profile, registration, userDelete } from "../../controllers/auth/UserAuthController.js";


const router = express.Router();

router.post("/register", registration);
router.post("/login", login);
router.get("/profile", profile);
router.delete("/delete/:id", userDelete);

export default router;
