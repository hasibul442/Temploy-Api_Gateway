import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    cat_name: { type: String, required: true },
    cat_icon_url: { type: String, required: true },
    status: { type: Boolean, default: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model("Categories", categoriesSchema);