import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: [ true, "First name is required" ],
    trim: true,
  },
  l_name: {
    type: String,
    required: [ true, "Last name is required" ],
    trim: true,
  },
  email: {
    type: String,
    required: [ true, "Email is required" ],
    trim: true,
  },
  password: {
    type: String,
    required: [ true, "Password is required" ],
    trim: true,
  },
  phone: {
    type: String,
    required: [ true, "Phone number is required" ],
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
    enum: ["available", "unavailable", "busy", "deactivated", "offline", "deleted"],
    default: "available",
  },
});

export const Users = mongoose.model("Users", userSchema);
