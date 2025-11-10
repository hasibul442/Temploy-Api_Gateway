import express from "express";
import { healthCheck } from "../controllers/HealthController.js";
import { createCat, deleteCat, getCategories, getCategory, updateCat } from "../controllers/CategoryController.js";
import { createSub, deleteSub, getSub, getSubCat, updateSub } from "../controllers/SubCategoryController.js";
import { createLevel, getLevels } from "../controllers/LevelController.js";
import { createSkillData, deleteSkillData, getSkill, getSkillList, updateSkillData } from "../controllers/SkillController.js";


const router = express.Router();

router.get("/health", healthCheck);

router.get("/categories", getCategories);
router.post("/categories", createCat);
router.get("/categories/:id", getCategory);
router.put("/categories/:id", updateCat);
router.delete("/categories/:id", deleteCat);

router.get("/subcategories", getSub);
router.post("/subcategories", createSub);
router.get("/subcategories/:id", getSubCat);
router.put("/subcategories/:id", updateSub);
router.delete("/subcategories/:id", deleteSub);

router.get("/levels", getLevels);
router.post("/levels", createLevel);

router.get("/skills", getSkillList);
router.post("/skills", createSkillData);
router.get("/skills/:id", getSkill);
router.put("/skills/:id", updateSkillData);
router.delete("/skills/:id", deleteSkillData);

export default router;
