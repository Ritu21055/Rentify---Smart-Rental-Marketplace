import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    productTitle:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    renterName:{
         type:String,
        required:true
    },
    rentDays:{
        type:Number,
        required:true
    },
    totalPrice:{
      type:Number,
      required:true
    },
    status:{
        type:"String",
        default:"Pending"
    }
},{timestamps:true});

const Booking = mongoose.model("Booking",bookingSchema);
export default Booking;