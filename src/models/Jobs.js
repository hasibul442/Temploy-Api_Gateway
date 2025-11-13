import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  required_skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  location: {
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    lat: { type: Number },
    lng: { type: Number },
  },
  budget: {
    type: Number,
    required: true,
  },
  job_type: {
    type: String,
    enum: ["fixed", "hourly"],
    required: true,
  },
  job_na
});

export const Jobs = mongoose.model("Jobs", jobsSchema);
