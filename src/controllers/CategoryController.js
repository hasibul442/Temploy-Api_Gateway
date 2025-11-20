import { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory, getCategoryWithSubCategories } from "../services/CategoryService.js";

export async function getCategories(req, res, next) {

    try {
        const categories = await getAllCategories(req);
        res.status(200).json({
            status: 200,
            success: true,
            ...categories
        });
    } catch (error) {
        next(error);
    }
};

export async function createCat(req, res, next) {
    try {
        const category = await createCategory(req);
        res.status(200).json({
            status: 200,
            success: true,
            data: category
        });
    } catch (error) {
        next(error);
    }
};

export async function getCategory(req, res, next) {
    try {
        const category = await getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: category
        });
    } catch (error) {
        next(error);
    }
};

export async function updateCat(req, res, next) {
    try {
        const category = await updateCategory(req.params.id, req);
        if (!category) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: category
        });
    }
    catch (error) {
        next(error);
    }
};

export async function deleteCat(req, res, next) {
    try {
        const category = await deleteCategory(req.params.id);
        if (!category) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export async function getCategoryWithSubs(req, res, next) {
    try {
        const data = await getCategoryWithSubCategories(req.params.id);
        if (!data) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: data
        });
    } catch (error) {
        next(error);
    }
};
