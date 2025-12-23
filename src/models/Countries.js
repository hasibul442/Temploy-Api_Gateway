import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    country: { type: String, required: true, unique: true },
    abbreviation: { type: String, required: true, unique: true },
    calling_code: { type: String, required: true },
    capital: { type: String, required: true },
    continent: { type: String, required: true },
    currency_code: { type: String, required: true },
    currency_name: { type: String, required: true },
    flag: { type: String },
  }, { timestamps: true }
);
export default mongoose.model("Countries", countrySchema);
