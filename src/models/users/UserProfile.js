import mongoose from "mongoose";


const userProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    skills : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
        default: [],
    }],
    kyc: [{
        documentType: {
            type: String,
            trim: true,
        },
        documentUrl: {
            type: String,
            trim: true,
        },
    }],
    hourly_rate: {
        type: Number,
        default: 0,
    },
    service: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        default: [],
    }],
    
    social_links: [{
        platform: {
            type: String,
            trim: true,
        },
        url: {
            type: String,
            trim: true,
        },
    }],
    certifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCertification",
        default: [],
    }]
});

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);
