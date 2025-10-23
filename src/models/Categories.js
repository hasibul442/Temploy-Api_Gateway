import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    cat_name: { type: String, required: true, unique: true },
    cat_icon_url: { type: String, required: true },
    status: { type: Boolean, default: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    created_by: { type: String, default: "system" },
    updated_by: { type: String, default: "system" }
}, { timestamps: true });

export default mongoose.model("Categories", categoriesSchema);