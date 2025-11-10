import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    description: { type: String },
    created_by: { type: String, default: "system" },
    updated_by: { type: String, default: "system" }
}, { timestamps: true });

export default mongoose.model("Level", levelSchema);
