import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    service_type: { type: String, required: true },
    otp_code: { type: String, required: true },
    email: { type: String, required: true },
    expires_at: { type: Date, required: true },
    is_used: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Otp", otpSchema);
