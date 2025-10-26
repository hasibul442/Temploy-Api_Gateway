import Categories from "../models/Categories.js";

export const getAllCategories = async (req) => {
  const searchParams = req.query;
  if (Object.keys(searchParams).length === 0) {
    const categories = await Categories.find().sort({ createdAt: -1 });
    return { data: categories };
  } else {
    const page = parseInt(searchParams.page || '1', 10);
    const limit = parseInt(searchParams.limit || '10', 10);
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      Categories.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Categories.countDocuments()
    ]);

    return {
      data: categories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
};

export const createCategory = async (data) => {
  const category = new Categories(data);
  return await category.save();
};

export const getCategoryById = async (id) => {
  return await Categories.findById(id);
};

export const updateCategory = async (id, data) => {
  return await Categories.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id) => {
  return await Categories.findByIdAndDelete(id);
};
