import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      process.env.MONGO_URL
    )
    .then(() =>console.log("DB Connected"));
};
