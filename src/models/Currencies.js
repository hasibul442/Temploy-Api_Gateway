import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    symbol: { type: String },
    symbol_native: { type: String },
    decimal_digits: { type: Number },
    rounding: { type: Number },
    name_plural: { type: String }

}, { timestamps: true });

export default mongoose.model("Currencies", currencySchema);
