import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export async function ConnectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw error; // rethrow the error for further handling
  }
}
