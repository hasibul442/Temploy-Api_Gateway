import mongoose from "mongoose";

const subcategoriesSchema = new mongoose.Schema({
    sub_cat_name: { type: String, required: true, unique: true },
    cat_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
    sub_cat_icon_url: { type: String, required: true },
    status: { type: Boolean, default: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    created_by: { type: String, default: "system" },
    updated_by: { type: String, default: "system" }
}, { timestamps: true });

export default mongoose.model("SubCategories", subcategoriesSchema);