import express from "express";
import { healthCheck } from "../controllers/HealthController.js";
import { createCat, deleteCat, getCategories, getCategory, getCategoryWithSubs, updateCat } from "../controllers/CategoryController.js";
import { createSub, deleteSub, getSub, getSubCat, updateSub } from "../controllers/SubCategoryController.js";
import { createLevel, getLevels } from "../controllers/LevelController.js";
import { createSkillData, deleteSkillData, getSkill, getSkillList, updateSkillData } from "../controllers/SkillController.js";
import EmpAuthRoute from "./auth/EmpAuthRoute.js";
import UserAuthRoute from "./auth/UserAuthRoute.js";
import { checkAuthentication } from "../middlewares/middleware.js";
import { createBanner, deleteBanner, getBanner, getBannerById, updateBanner } from "../controllers/BannerController.js";
import { addCountry, deleteCountry, getCountries, getCountryById, updateCountry } from "../controllers/CountriesController.js";
import { getCurrencies } from "../controllers/CurrencyController.js";
import { getLanguages } from "../controllers/LanguagesController.js";


const router = express.Router();

router.get("/health", healthCheck);

// Countries route
router.get("/countries", getCountries);
router.post("/countries", checkAuthentication, addCountry);
router.get("/countries/:id", checkAuthentication, getCountryById);
router.put("/countries/:id", checkAuthentication, updateCountry);
router.delete("/countries/:id", checkAuthentication, deleteCountry);

// Currency route
router.get("/currency", getCurrencies);

// language route
router.get("/languages", getLanguages);

// Protected routes - require authentication
router.get("/categories", getCategories);
router.post("/categories", checkAuthentication, createCat);
router.get("/categories/:id", getCategory);
router.get("/categories/:id/subcat", getCategoryWithSubs);
router.put("/categories/:id", checkAuthentication, updateCat);
router.delete("/categories/:id", checkAuthentication, deleteCat);

router.get("/subcategories", getSub);
router.post("/subcategories", checkAuthentication, createSub);
router.get("/subcategories/:id", getSubCat);
router.put("/subcategories/:id", checkAuthentication, updateSub);
router.delete("/subcategories/:id", checkAuthentication, deleteSub);

router.get("/levels", getLevels);
router.post("/levels", checkAuthentication, createLevel);

router.get("/banners", getBanner);
router.post("/banners", checkAuthentication, createBanner);
router.get("/banners/:id", checkAuthentication, getBannerById);
router.put("/banners/:id", checkAuthentication, updateBanner);
router.delete("/banners/:id", checkAuthentication, deleteBanner);

router.get("/skills", checkAuthentication, getSkillList);
router.post("/skills", checkAuthentication, createSkillData);
router.get("/skills/:id", checkAuthentication, getSkill);
router.put("/skills/:id", checkAuthentication, updateSkillData);
router.delete("/skills/:id", checkAuthentication, deleteSkillData);

//Auth Routes
router.use("/auth/employee", EmpAuthRoute);
router.use("/auth/user", UserAuthRoute);

export default router;
