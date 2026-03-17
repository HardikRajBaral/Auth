import {Request,Response} from "express";
import userModel from "../User/UserModel"
import { User ,VerifyBody} from "../Types/types";
import bcrypt from "bcrypt"
import jwtToken from "jsonwebtoken"
import { sentVerifactionCode, sentWelcomeEmail } from "../middleware/mailer";

export const createUser=async(req:Request,res:Response)=>{
    const {username,password,email}=req.body as User;
    if( !password || !email){
        return res.status(400).json({message:"All fields are required"})
    }
   
        const user=await userModel.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
    
        const hassedPassword= await bcrypt.hash(password,10)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); 

        try{
            const newUser= await userModel.create({
                username,
                password:hassedPassword,
                email,
                verificationCode,
                resetCodeExpires
            })
            await sentVerifactionCode(email,verificationCode)
            const token= jwtToken.sign({sub:newUser._id},process.env.JWT_SECRET as string,{expiresIn:"7d"})
            return res.status(201).json({
                message:"User Created Sucessfully",
                token,
                newUser
            })

    }catch(error){
        return res.status(500).json({message:"Error occurred while creating user"})
    }
} 

export const loginUser= async(req:Request,res:Response)=>{
    const {email,password}=req.body as User
    if(!email || !password){
        return res.status(400).json({message:"All feilds are required"})
    }
    const user= await userModel.findOne({email:email})
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const token = jwtToken.sign({sub:user._id},process.env.JWT_SECRET as string,{expiresIn:"7d"})
    if(!token){
        return res.status(500).json({message:"Error occured whaile geneating Token"})
    }
    res.status(200).json({
        message:"Login Sucessfully",
        token
    })
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email }: { email: string } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
    
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.isVerified=false
        user.verificationCode = resetCode;
        user.resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); 
        await user.save();
        
        await sentVerifactionCode(email, resetCode);  
        return res.status(200).json({ message: "Reset code sent to your email" });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while sending reset email" });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string; verificationCode: string; password: string } = req.body;
        if (!email  || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await userModel.findOne({ email });
        if (!user ) {
            return res.status(400).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while resetting password" });
    }
};


export const VerifyEmail = async(req:Request,res:Response)=>{
    try {
        const {verificationCode,email}:VerifyBody= req.body 
        const user= await userModel.findOne({
            verificationCode,
            email
        })
        
        if (!user || !user.resetCodeExpires || user.resetCodeExpires < new Date()) {
            return res.status(400).json({ message: "Invalid or expired reset code" });
        }
        user.isVerified=true
        user.verificationCode=undefined
        user.resetCodeExpires = undefined;
        await user.save()
        await sentWelcomeEmail(email)
        return res.status(200).json({message:"Email verified sucessfully"})
    } catch (error) {
        return res.status(500).json({message:"Error occurred while verifying email"})
    }
}



