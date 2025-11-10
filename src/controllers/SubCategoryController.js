import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory } from "../services/SubCategoryService.js";

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

export async function createSub(req, res) {
    const newSubCategoryData = await createSubCategory(req.body);
    res.status(200).json({
        status: 200,
        success: true,
        data: newSubCategoryData
    });
};

export async function getSubCat(req, res, next) {
    try {
        const id = req.params.id;
        const subcategories = await getSubCategoryById(id);
        res.status(200).json({
            status: 200,
            success: true,
            ...subcategories
        });
    } catch (error) {
        next(error);
    }
}

export async function updateSub(req, res, next) {
    try {
        const updatedSubCategory = await updateSubCategory(req.params.id, req.body);
        res.status(200).json({
            status: 200,
            success: true,
            data: updatedSubCategory
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteSub(req, res, next) {
    try {
        const deletedSubCategory = await deleteSubCategory(req.params.id);
        res.status(200).json({
            status: 200,
            success: true,
            data: deletedSubCategory
        });
    } catch (error) {
        next(error);
    }
}   
