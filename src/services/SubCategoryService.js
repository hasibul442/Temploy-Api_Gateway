import SubCategories from "../models/SubCategory.js";

export const getAllSubCategories = async (req) => {
    const searchParams = req.query;
    console.log("Search Params:", searchParams);

    const page = parseInt(searchParams.page || '1', 10);
    const limit = parseInt(searchParams.limit || '10', 10);
    const skip = (page - 1) * limit;

    const [subcategories, total] = await Promise.all([
        // populate category name from the referenced Categories collection
        SubCategories.find()
            .populate({ path: "cat_id", select: "cat_name" })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        SubCategories.countDocuments()
    ]);

    return {
        data: subcategories,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const createSubCategory = async (data) => {
    const subcategory = new SubCategories(data);
    return await subcategory.save();
};

export const getSubCategoryById = async (id) => {
    return await SubCategories.findById(id);
};

export const updateSubCategory = async (id, data) => {
    return await SubCategories.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSubCategory = async (id) => {
    return await SubCategories.findByIdAndDelete(id);
};
