import mongoose from "mongoose";

// Cache connection across serverless invocations
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const FALLBACK_MONGO_URI =
  "mongodb+srv://suryahari971_db_user:Jzc9k59FqpDmWBRu@cluster0.gt3sine.mongodb.net/socialmedia?retryWrites=true&w=majority";

const connectDB = async () => {
  // If already connected, return cached connection immediately
  if (cached.conn && mongoose.connection.readyState >= 1) {
    return cached.conn;
  }

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || FALLBACK_MONGO_URI;

  // If a connection attempt is already in flight, await it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB Connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        console.error("❌ MongoDB connection error:", err.message);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectDB;
