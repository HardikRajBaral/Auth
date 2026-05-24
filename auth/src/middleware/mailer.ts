import nodemailer from "nodemailer"


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
    from: '"Auth Verifaction <hardikrajbaral232@gmail.com>',
    to:email,
    subject: "Verify Your Email",
    text: "Verify Your Email", // Plain-text version of the message
    html: `<b>Your verification code is: ${verifactionCode}</b>`, // HTML version of the message
  })
  console.log("Email send Sucessfully",res)
    }catch(error){
        console.log(error)
    }
}

export const sentWelcomeEmail=async(email:string)=>{
    try{
    const res = await transporter.sendMail({
    from: '"Auth Verifaction <hardikrajbaral232@gmail.com>',
    to:email,
    subject: "Welcome to Our Auth System",
    text: "Welcome to Our Auth System", // Plain-text version of the message
    html: `<h1><b>Welcome to Our Auth System</b></h1>`, // HTML version of the message
  })
  console.log("Email send Sucessfully",res)
    }catch(error){
        console.log(error)
    }
}



