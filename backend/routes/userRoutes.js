import express from 'express';
import User from '../models/User.js';

const router = express.Router();


//Register
router.post("/register",async(req,res)=>{
    console.log(req.body);
    try{
        const {name,email,password} = req.body;
       

        const newUser = new User({
            name,
            email,
            password
        })

        await newUser.save();

        res.status(201).json({
            message:"User registered successfully"
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }

})

//Login
router.post("/login", async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }

        if(user.password !== password){
            return res.status(400).json({
                message:"Invalid password"
            })
        }

        res.status(200).json({
            message:"Login successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })

    }catch{
        res.status(500).json({
            message:error.message
        })
    }
})

export default router;