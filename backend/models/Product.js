import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    pricePerDay:{
        type:Number,
        required:true
    },

    deposit:{
        type:Number,
        required:true
    },

    image:{
        type:String
    }
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);

export default Product;