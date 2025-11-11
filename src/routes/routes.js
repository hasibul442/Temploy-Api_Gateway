import express from "express";
import { healthCheck } from "../controllers/HealthController.js";
import { createCat, deleteCat, getCategories, getCategory, updateCat } from "../controllers/CategoryController.js";
import { createSub, deleteSub, getSub, getSubCat, updateSub } from "../controllers/SubCategoryController.js";
import { createLevel, getLevels } from "../controllers/LevelController.js";
import { createSkillData, deleteSkillData, getSkill, getSkillList, updateSkillData } from "../controllers/SkillController.js";
import EmpAuthRoute from "./auth/EmpAuthRoute.js";
import { checkAuthentication } from "../middlewares/middleware.js";


const router = express.Router();

router.get("/health", healthCheck);

// Protected routes - require authentication
router.get("/categories", getCategories);
router.post("/categories", checkAuthentication, createCat);
router.get("/categories/:id", getCategory);
router.put("/categories/:id", checkAuthentication, updateCat);
router.delete("/categories/:id", checkAuthentication, deleteCat);

router.get("/subcategories", getSub);
router.post("/subcategories", checkAuthentication, createSub);
router.get("/subcategories/:id", getSubCat);
router.put("/subcategories/:id", checkAuthentication, updateSub);
router.delete("/subcategories/:id", checkAuthentication, deleteSub);

router.get("/levels", getLevels);
router.post("/levels", checkAuthentication, createLevel);

router.get("/skills", checkAuthentication, getSkillList);
router.post("/skills", checkAuthentication, createSkillData);
router.get("/skills/:id", checkAuthentication, getSkill);
router.put("/skills/:id", checkAuthentication, updateSkillData);
router.delete("/skills/:id", checkAuthentication, deleteSkillData);

//Auth Routes
router.use("/auth/employee", EmpAuthRoute);

export default router;
