import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: true,
    trim: true,
  },
  l_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  is_email_verified: {
    type: Boolean,
    default: false,
  },
  is_kyc_verified: {
    type: Boolean,
    default: false,
  },
  user_type: {
    type: String,
    enum: ["regular", "pro"],
    default: "regular",
  },
  profile_image: {
    type: String,
    trim: true,
  },
  availability: {
    type: String,
    enum: ["available", "unavailable", "busy"],
    default: "available",
  },
});

export const Users = mongoose.model("Users", userSchema);
