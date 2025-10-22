import mongoose from "mongoose";


async function connectDB() {
    const MONGODB_URI = process.env.MONGO_DB_URL;

    if (!MONGODB_URI) {
        throw new Error("Please define MONGODB_URI in .env");
    }
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
