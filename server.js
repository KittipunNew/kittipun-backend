import express from "express"
import cors from "cors"
import dotenv from 'dotenv'; 
dotenv.config()

import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import userRoutes from "./routes/userRoute.js"
import productRoutes from "./routes/productRoute.js"
import cartRoutes from "./routes/cartRoute.js"
import orderRoutes from "./routes/orderRoute.js"

// App Config
const app = express()
const port = process.env.PORT || 4000

// Servive connections
connectDB()
connectCloudinary()

// Middleware
app.use(express.json())

// Define allowed origins
const allowedOrigins = [
    "https://artnakkk-frontend-admin.vercel.app",
    "http://localhost:5175", // For local development
    "http://localhost:5176", // For local development
  ];
  
  // Configure CORS
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the origin
        } else {
          callback(new Error("Not allowed by CORS")); // Block the origin
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Allow cookies or Authorization headers
    })
  );

// API endpoints
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

app.get("/", (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})