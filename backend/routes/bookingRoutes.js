import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

//create booking
router.post("/add",async(req,res)=>{
    try{
        const booking = new Booking(req.body)
        await booking.save();

        res.status(201).json({
            message:"Booking created successfully"
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//get all bookings
router.get("/",async(req,res)=>{
    try{
        const bookings = await Booking.find();
        res.status(200).json(bookings)


    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

//update booking status
router.put("/:id",async(req,res)=>{
    try{
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            {
                status:req.body.status
            },
            {
                new:true
            },
        )
       res.status(200).json(updatedBooking)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})











export default router;
