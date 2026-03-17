import {useState} from 'react';
import {  Link, useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading,setIsLoading]=useState(false)
    const [errors, setErrors] = useState<{verificationCode?: string, api?: string}>({})
    const location=useLocation()
    const navigate= useNavigate()
    const email=location.state?.email
    const handleSubmit =async ( )=>{
        setIsLoading(true)
        const res=await fetch('http://localhost:3000/apis/auth/verify-email',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({verificationCode,email})
          })
          const data:any= await res.json()
    
          if(!res.ok){
            setErrors({ api: data.message ?? "Verification failed." });
            return
    
          }
          navigate("/")
          setIsLoading(false)
          
          console.log('Verification successful')
        }
    const ResendVerification=async()=>{
        console.log(email)
        setIsLoading(true)
        const res = await fetch('http://localhost:3000/apis/auth/forget-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        const data:any=await res.json()
        if(!res.ok){
            setErrors({api:data.message?? 'Could not resend verification code'})
            return
        }
        setIsLoading(false)
        console.log('Resending Verification Code sucessfully')
    }
    
    return (
        <>
        <h1>Verify Your Email</h1>
        <p>A verification link has been sent to your email address. Please check your inbox and click the link to verify your account.</p>
        <p>If you did not receive the email, please check your spam folder or <Link to="#" onClick={ResendVerification}>click here</Link> to resend the verification email.</p>
        <input type='text' placeholder= 'Enter verification code' value={verificationCode} onChange={(e)=>{setVerificationCode(e.target.value)}}/>
        {errors.api && <div className="error api-error">{errors.api}</div>}
        <button disabled={isLoading} type='button' onClick={handleSubmit}>{isLoading ? 'Submitting ...' : 'Submit'}</button>
        </>
    )
}

export default VerifyEmail