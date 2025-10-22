import Categories from "../models/Categories.js";

export const getAllCategories = async () => {
  return await Categories.find().sort({ createdAt: -1 });
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
