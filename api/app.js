import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import allRoutes from "./Routes/Routes.js";
import cookieParser from "cookie-parser";
// import path from "path";

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT;
const db = process.env.MONGODB;

const app = express();

// middleware

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
    startServer();
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};

// Function to start the server
const startServer = () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

// Start the application
connectToDatabase();

app.use(allRoutes);
