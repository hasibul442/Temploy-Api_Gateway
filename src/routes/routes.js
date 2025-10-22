import express from "express";
import { healthCheck } from "../controllers/HealthController.js";
import { createCat, deleteCat, getCategories, getCategory, updateCat } from "../controllers/CategoryController.js";


const router = express.Router();

router.get("/health", healthCheck);

router.get("/categories", getCategories);
router.post("/categories", createCat);
router.get("/categories/:id", getCategory);
router.put("/categories/:id", updateCat);
router.delete("/categories/:id", deleteCat);

export default router;