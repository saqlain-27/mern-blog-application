import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();
const port = process.env.PORT || 3000;
const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",  // Allow only the React dev server or from env
  credentials: true,                 // Allow cookies to be sent with requests
  optionsSuccessStatus: 200         // Some legacy browsers choke on 204
}));
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/blogs",blogRoutes);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});