import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
const LogIn=()=>{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{email?: string,password?:string, api?: string}>({})
  const navigate= useNavigate()


  const handleSubmit =async (e:React.SyntheticEvent<HTMLFormElement>)=>{
    e?.preventDefault()
    setLoading(true)
    try{
      const res= await fetch('http://localhost:3000/apis/auth/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
      })
      const data= await res.json()
      if(!res.ok){
        setErrors({ api: data.message ?? "Invalid email or password." });
        throw new Error('Login failed')

      }
      
      if(data.token){
          localStorage.setItem('auth_token',data.token)
          navigate('/home')

      }
      console.log('Login successful')
        
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <AuthLayout
      eyebrow="Member access"
      title="Welcome back"
      description="Sign in to keep working from where you left off. The flow stays simple and the screen stays quiet."
      points={[
        { title: 'Clean handoff', text: 'Log in and jump straight back into the app without extra noise.' },
        { title: 'Account safety', text: 'Password visibility is tucked away instead of floating in the way.' },
        { title: 'Fast recovery', text: 'Use the reset flow if you cannot get into your account.' },
      ]}
    >
      <div className="auth-card-head">
        <div className="auth-kicker">Sign in</div>
        <h2>Use your email and password</h2>
        <p>We kept this compact on purpose. It should feel like a normal app, not a landing page.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>

        <label className="field">
          <span>Password</span>
          <div className="input-shell">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button className="toggle-button" type="button" onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>

        {errors.api && <div className="error-banner">{errors.api}</div>}

        <button disabled={loading} className="primary-button" type="submit">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="auth-footer">
        <span>
          New here? <Link to="/signup">Create account</Link>
        </span>
        <Link className="inline-link" to="/forget-password">
          Forgot password?
        </Link>
      </div>
    </AuthLayout>
  )
}


export default LogIn