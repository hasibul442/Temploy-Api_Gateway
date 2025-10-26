import { getAllSubCategories } from "../services/SubCategoryService.js";

export async function getSub(req, res, next) {

    try {
        const subcategories = await getAllSubCategories(req);
        res.status(200).json({
            status: 200,
            success: true,
            ...subcategories
        });
    } catch (error) {
        next(error);
    }
};