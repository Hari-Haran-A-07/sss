import mongoose from "mongoose";

let isConnecting = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (isConnecting) return;

  try {
    isConnecting = true;
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  } finally {
    isConnecting = false;
  }
};

export default connectDB;
