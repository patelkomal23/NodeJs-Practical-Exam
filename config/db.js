import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //  Check env variable
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL not found in .env file");
    }

    //  MongoDB connect
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database connected successfully");
  } catch (error) {
    console.log(" DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
