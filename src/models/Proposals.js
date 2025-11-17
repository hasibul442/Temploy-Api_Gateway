import mongoose from "mongoose";

const proposalsSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
    required: true,
  },
  freelancer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  cover_letter: {
    type: String,
    required: true,
    trim: true,
  },
  proposed_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "withdrawn"],
    default: "pending",
  },
});

export const Proposals = mongoose.model("Proposals", proposalsSchema);
