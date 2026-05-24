import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'


const Register=()=>{
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
      const res= await fetch('http://localhost:3000/apis/auth/register',{
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
          navigate('/verify-email',{state:{email}})
      }
      
      setLoading(false)
      console.log('SignUp successful')
        
    } catch (error) {
      console.error('SignUp error:', error)
    } finally {
      setLoading(false)
    }

  }

    return(
      <AuthLayout
        eyebrow="Create account"
        title="Set up your profile"
        description="Use a clean registration flow that feels like part of the product, not a form dump."
        points={[
          { title: 'Short form', text: 'Only the fields the backend actually needs are on the page.' },
          { title: 'Verification step', text: 'People know what happens next before they submit.' },
          { title: 'Consistent flow', text: 'The same visual system carries across every auth screen.' },
        ]}
      >
        <div className="auth-card-head">
          <div className="auth-kicker">Register</div>
          <h2>Make your account</h2>
          <p>Create the account first, then finish verification from the next screen.</p>
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
                placeholder="Create a password"
                autoComplete="new-password"
              />
              <button className="toggle-button" type="button" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </label>

          {errors.api && <div className="error-banner">{errors.api}</div>}

          <button disabled={loading} className="primary-button" type='submit'>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="auth-footer">
          <span>
            Already have an account? <Link to="/">Sign in</Link>
          </span>
        </div>
      </AuthLayout>
    )
}

export default Register