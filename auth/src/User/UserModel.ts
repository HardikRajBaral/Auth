import mongoose from "mongoose"
import { User } from "../Types/types"


const userModel=new mongoose.Schema<User>({
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:String,  
    resetCodeExpires: { 
        type: Date, 
        default: null 
    },

},{timestamps:true})

export default mongoose.model("User",userModel)