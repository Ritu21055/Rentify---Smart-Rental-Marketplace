import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from "./routes/productRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";



const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/bookings",bookingRoutes);




mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongodb is connected"))
.catch((err)=>console.log(err));



app.get("/",(req,res)=>{
    res.send("API is running...");
})

app.listen(5000,()=>console.log("server running on port 5000"))