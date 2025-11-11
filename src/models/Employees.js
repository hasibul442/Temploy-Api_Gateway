import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
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
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Employees = mongoose.model("Employees", employeesSchema);
