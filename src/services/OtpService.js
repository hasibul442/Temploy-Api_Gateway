import Otp from "../models/Otp.js";
import transporter from "../utils/lib/emailService.js";

export async function createOTP(email, userId, serviceType) {
    const checkEmail = await Otp.findOne({ email: email, service_type: serviceType, is_used: false, expires_at: { $gt: new Date() } });
    if (checkEmail) {
        throw new Error("An active OTP already exists for this email and service type.");
    }
    const otpCode = generateOTP();
    const expiresAt = getExpiryTime();

    const newOtp = new Otp({
        user_id: userId,
        service_type: serviceType,
        otp_code: otpCode,
        email: email,
        expires_at: expiresAt,
    });

    await newOtp.save();
    await sendOTPEmail(email, otpCode);
}


export async function validateOTP(email, serviceType, otpCode) {
    const otpRecord = await Otp.findOne({
        email: email,
        service_type: serviceType,
        otp_code: otpCode,
        is_used: false,
        expires_at: { $gt: new Date() },
    });
    if (!otpRecord) {
        throw new Error("Invalid or expired OTP.");
    }
    otpRecord.is_used = true;
    await otpRecord.save();
}

export async function resendOTP(email, userId, serviceType) {
    const existingOtp = await Otp.findOne({
        email: email,
        service_type: serviceType,
        is_used: false,
        expires_at: { $gt: new Date() },
    });

    if (existingOtp) {
        existingOtp.is_used = true;
        await existingOtp.save();
    }

    return createOTP(email, userId, serviceType);
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function getExpiryTime() {
    return new Date(Date.now() + 5 * 60 * 1000);
}


async function sendOTPEmail(email, otpCode) {
   try {
       const mailOptions = {
           from: process.env.EMAIL_USER,
           to: email,
           subject: 'Your OTP Code',
           text: `Your OTP code is: ${otpCode}. It is valid for 5 minutes.`,
       };
       await transporter.sendMail(mailOptions);
   } catch (error) {
       console.error("Error sending OTP email:", error);
       throw new Error("Failed to send OTP email.");
   }
}
