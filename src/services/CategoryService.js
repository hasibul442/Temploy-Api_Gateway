import Categories from "../models/Categories.js";
import fs from "fs";
const fsPromises = fs.promises;
import path from "path";
import { deleteFile, saveBase64Image, updateBase64Image } from "../utils/helper/fileHelper.js";



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

export const createCategory = async (req) => {
  const currentUrl = `${req.protocol}://${req.get('host')}`;

  const categoryData = { ...req.body };

  // If cat_icon_url is provided as base64 data URL, save it and replace with public URL
  // const saved = await saveBase64Image(categoryData.cat_icon_url, 'categories', 'category-icon', currentUrl);
  // if (saved?.url) {
  //   categoryData.cat_icon_url = saved.url;
  // }

  if (categoryData.cat_name) {
    categoryData.slug = categoryData.cat_name.toLowerCase();
  }

  const category = new Categories(categoryData);
  return await category.save();
};

export const getCategoryById = async (id) => {
  return await Categories.findById(id);
};

export const updateCategory = async (id, req) => {
  const currentUrl = `${req.protocol}://${req.get('host')}`;
  const category = await Categories.findById(id);
  if (!category) return null;
  const updated = await updateBase64Image(req.body.cat_icon_url, category.cat_icon_url, "categories", "category-icon", currentUrl);
  if (updated?.url) req.body.cat_icon_url = updated.url;

  return await Categories.findByIdAndUpdate(id, req.body, { new: true });
};

export const deleteCategory = async (id) => {
  // Fetch the category first so we can delete the file (if any) before removing the DB record
  const category = await Categories.findById(id);
  if (!category) return null;

  if (category.cat_icon_url) {
    try {
      await deleteFile(category.cat_icon_url, 'categories');
    } catch (err) {
      // Log and continue - don't block DB deletion for file removal issues
      console.error('Error deleting category file:', err);
    }
  }

  await Categories.findByIdAndDelete(id);
  return category;
};
 