import {useState} from 'react';
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading,setIsLoading]=useState(false)
    const [errors, setErrors] = useState<{verificationCode?: string, api?: string}>({})
    const location=useLocation()
    const navigate= useNavigate()
    const email=location.state?.email
        const handleSubmit =async ( )=>{
                setIsLoading(true)
                try {
                    const res=await fetch('http://localhost:3000/apis/auth/verify-email',{
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({verificationCode,email})
                        })
                        const data= await res.json()

                        if(!res.ok){
                            setErrors({ api: data.message ?? "Verification failed." });
                            return
                        }
                        navigate("/")
                        console.log('Verification successful')
                } finally {
                    setIsLoading(false)
        }
        }
    const ResendVerification=async()=>{
        console.log(email)
        setIsLoading(true)
                try {
                        const res = await fetch('http://localhost:3000/apis/auth/resend-verification', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email })
                        })
                        const data=await res.json()
                        if(!res.ok){
                                setErrors({api:data.message?? 'Could not resend verification code'})
                                return
                        }
                        console.log('Resending Verification Code sucessfully')
                } finally {
                        setIsLoading(false)
        }
    }
    
    return (
                <AuthLayout
                    eyebrow="Email confirmation"
                    title="Verify your account"
                    description="Use the code from your inbox to finish activation. The screen is intentionally simple and direct."
                    points={[
                        { title: 'One-time code', text: 'Check the email used at sign up and paste the code here.' },
                        { title: 'Fast retry', text: 'Request a fresh code if the old one expired.' },
                        { title: 'Immediate access', text: 'After verification you go straight back to sign in.' },
                    ]}
                >
                    <div className="auth-card-head">
                        <div className="auth-kicker">Step 2 of 2</div>
                        <h2>Enter the verification code</h2>
                        <p>A code was sent to {email || 'your email address'}.</p>
                    </div>
                    <div className="note-box">
                        If the email is not visible, check spam or request a fresh code.
                    </div>
                    <div className="auth-stack">
                        <label className="field">
                            <span>Verification code</span>
                            <input type='text' placeholder='Enter verification code' value={verificationCode} onChange={(e)=>{setVerificationCode(e.target.value)}}/>
                        </label>
                        {errors.api && <div className="error-banner">{errors.api}</div>}
                        <button disabled={isLoading} type='button' onClick={handleSubmit} className="primary-button">{isLoading ? 'Submitting...' : 'Verify email'}</button>
                        <button className="secondary-button" disabled={isLoading} type="button" onClick={ResendVerification}>
                            Resend code
                        </button>
                    </div>
                    <div className="auth-footer">
                        <span>
                            Need a different account? <Link to="/signup">Create one</Link>
                        </span>
                    </div>
                </AuthLayout>
    )
}

export default VerifyEmail