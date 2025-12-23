import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    nativeName: { type: String },
    flag: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Languages", languageSchema);
