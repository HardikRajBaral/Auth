import nodemailer from "nodemailer"
import { buildAuthEmailTemplate } from "./emailTemplate"


export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "hardikrajbaral232@gmail.com",
    pass: process.env.GOOGLE_CLIENT_ID,
  },
});


export const sentVerifactionCode=async(email:string,verifactionCode:string)=>{
    try{
    const res = await transporter.sendMail({
    from: '"Auth Verification" <hardikrajbaral232@gmail.com>',
    to:email,
    subject: "Verify your email",
    text: `Your verification code is: ${verifactionCode}`,
    html: buildAuthEmailTemplate({
      title: 'Account verification',
      heading: 'Use this verification code',
      message: 'Enter the code below to verify your email address and finish setting up your account.',
      codeLabel: 'Verification code',
      code: verifactionCode,
      highlight: 'This code expires soon, so use it while it is still active.',
    }),
  })
  console.log("Email send Sucessfully",res)
    }catch(error){
        console.log(error)
    }
}

export const sentWelcomeEmail=async(email:string)=>{
    try{
    const res = await transporter.sendMail({
    from: '"Auth Verification" <hardikrajbaral232@gmail.com>',
    to:email,
    subject: "Welcome to your account",
    text: "Welcome to your account. Your email has been verified successfully.",
    html: buildAuthEmailTemplate({
      title: 'Welcome aboard',
      heading: 'Your email is verified',
      message: 'Your account is ready to use. You can sign in anytime and continue from where you left off.',
      highlight: 'Thanks for confirming your email address.',
    }),
  })
  console.log("Email send Sucessfully",res)
    }catch(error){
        console.log(error)
    }
}



