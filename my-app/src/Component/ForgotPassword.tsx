import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword=()=>{
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading,setIsLoading]=useState(false)
    const [errors, setErrors] = useState<{ api?: string}>({})
    const [isVerified,setIsVerified]=useState(false)
    const [show,setShow]=useState(false)
    const [email,setemail]=useState('')
    const [emailInput,setEmailInput]=useState(false)
    const navigate= useNavigate()

     const ResendVerification= async(e:React.MouseEvent)=>{
        e?.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch('http://localhost:3000/apis/auth/resend-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        const data:any=await res.json()
        if(!res.ok){
            setErrors({api:data.message?? 'Could not resend verification code'})
            return
        }
        console.log('Resending Verification Code sucessfully')
        } catch (error) {
          setErrors({api:'Error occured during verifcation'})  
        }finally{

            setIsLoading(false)
        }
    }
    const handleSubmit =async ( e:React.FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)
        try {
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
          console.log('Verification successful')
            
        } catch (error) {
            setErrors({api:'Error occured during verifcation'})  
        }finally{

            setIsLoading(false)
            setIsVerified(true)
        }
          
    }
        const handleEmailSubmit = async (e:React.FormEvent) => {
        e.preventDefault();  
        setIsLoading(true);
        

        if(!email){
            setErrors({ api: 'Email is required' });
            setIsLoading(false);
            return;

        }
    
        const res = await fetch('http://localhost:3000/apis/auth/forget-password', {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })  
        });
        const data: any = await res.json();
        if (!res.ok) {
            setErrors({ api: data.message ?? 'Could not send reset email' });
            setIsLoading(false);
            return;
        }
        setEmailInput(true); 
        setIsLoading(false);
    }


        const handleForgotPassword=async(e:React.FormEvent)=>{
            e.preventDefault()
            setIsLoading(true)
            if(password!==confirmPassword){
                setErrors({api:'Password donot match'})
                setIsLoading(false)
                return
            }
            if(!password || password.length<6){
            setErrors({ api: 'Password must be at least 6 characters' });
            setIsLoading(false);
            return;

            }
            const res= await fetch('http://localhost:3000/apis/auth/reset-password',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({password,email})
            })
            const data:any=await res.json()
            if(!res.ok){
                setErrors({api: data.message?? 'Could not reset Password'})
                return
            }
            navigate('/')
            setemail('');
            setVerificationCode('');
            setPassword('');
            setConfirmPassword('');
            setIsLoading(false)
            setEmailInput(false);
            setIsVerified(false);
            setIsLoading(false);
            console.log("password reset sucessful")   
        }
    return isVerified?(
        <div>
            <h1>Reset Passowrd</h1>
            <p> Reset set your password</p>
            <form onSubmit={handleForgotPassword}>
                <div>
                    <label>Email</label>
                    <input
                    type='email'
                    value={email}
                    onChange={((e)=>setemail(e.target.value))}
                    placeholder='Email'
                    />
               </div>
               <div>
                    <label>New password</label>
                    <input
                    type={show?"text":"password"}
                    value={password}
                    onChange={((e)=>setPassword(e.target.value))}
                    placeholder='new password'
                    />
                    <button type='button' onClick={()=>{setShow(!show)}}>{show?"hide":"show"}</button>
               </div>
               <div>
                    <label>Confirm password</label>
                    <input
                    type={show?"text":"password"}
                    value={confirmPassword}
                    onChange={((e)=>setConfirmPassword(e.target.value))}
                    placeholder='Confirm password'
                    />
                    <button type='button' onClick={()=>{setShow(!show)}}>{show?"hide":"show"}</button>
                </div>
                {errors.api && <div className="error api-error">{errors.api}</div>}

                <button type='submit' disabled={isLoading}>{isLoading ? 'Submiting...' : 'Submit'}</button>
            </form>
        </div>)

        :emailInput?(
        <div>
            <h1>Verify Your Email</h1>
            <p>A verification link has been sent to your email address. Please check your inbox and click the link to verify your account.</p>
            <p>If you did not receive the email, please check your spam folder or <Link to="#" onClick={ResendVerification}>click here</Link> to resend the verification email.</p>
           <form onSubmit={handleSubmit}>
             
            <input 
                type='text'
                placeholder= 'Enter verification code' 
                value={verificationCode} 
                onChange={(e)=>{setVerificationCode(e.target.value)}}
             />
            {errors.api && <div className="error api-error">{errors.api}</div>}

            <button disabled={isLoading} type='button' >{isLoading ? 'Submitting ...' : 'Submit'}</button>
           </form>

        </div>
        ):(
        <div>
           <form  onSubmit={handleEmailSubmit}>
             <label>Email</label>
            <input
                type='email'
                value={email}
                placeholder='Email'
                onChange={(e)=>{setemail(e.target.value)}}
            />
            <button disabled={isLoading} type='submit' >{isLoading ? 'Submitting ...' : 'Submit'}</button>
           </form>
        </div>
        )
        
    
    
}

export default ForgotPassword