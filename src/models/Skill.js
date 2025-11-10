import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    skill_name: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    created_by: { type: String, default: "system" },
    updated_by: { type: String, default: "system" }
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);