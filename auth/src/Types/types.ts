export interface User{
    username:string
    password:string
    email:string
    isVerified:boolean
    verificationCode?:string|undefined
    resetCodeExpires:Date |undefined
}
export interface VerifyBody {
  email:            string
  verificationCode: string
}



