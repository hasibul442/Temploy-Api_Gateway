import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password here
  },
  // Add these for better security
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Email service configuration error:", error.message);
    console.error("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Missing");
    console.error("EMAIL_PASS:", process.env.EMAIL_PASS ? "Set" : "Missing");
  } else {
    console.log("✅ Email service is ready to send messages");
  }
});

export default transporter;
