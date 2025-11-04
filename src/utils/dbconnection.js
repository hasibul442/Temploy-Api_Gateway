import mongoose from "mongoose";


async function connectDB() {
    const MONGODB_URI = process.env.MONGO_DB_URL;

    if (!MONGODB_URI) {
        throw new Error("Please define MONGODB_URI in .env");
    }
    try {
        await mongoose.connect(MONGODB_URI);
        return "MongoDB connected";
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return "MongoDB connection error";
    }
};

export default connectDB;
