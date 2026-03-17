import express from "express"
import { createUser, loginUser, forgotPassword, VerifyEmail, resetPassword } from "../controller/authContorller"


const authRoutes= express.Router()

authRoutes.post("/register",createUser)
authRoutes.post("/login",loginUser)
authRoutes.post("/forget-password",forgotPassword)
authRoutes.post('/reset-password', resetPassword)
authRoutes.post("/verify-email",VerifyEmail)



export default authRoutes