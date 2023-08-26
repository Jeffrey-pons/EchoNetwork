import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Mongoose Setup
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
})();
