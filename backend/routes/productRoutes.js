import express from "express";
import Product from "../models/Product.js";
import upload from "../config/multer.js";

const router = express.Router();

//ADD PRODUCT
router.post("/add",upload.single("image"),async (req,res)=>{
    try{
        const product = new Product({
            title:req.body.title,
            description:req.body.description,
            pricePerDay:req.body.pricePerDay,
            deposit: req.body.deposit,
            image: req.file.path,
        });

        await product.save();

        res.status(201).json({
            message:"Product added successfully"
        })
    }catch(error){
      res.status(500).json({
        message:error.message
      })
    }
})

//GET ALL PRODUCTS
router.get("/", async (req,res)=>{
    try{
        const products = await Product.find()
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})

export default router;