import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import "../assets/css/loginCss.css"
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
      const data:any= await res.json()
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
    <>  
    <form className="Login-Card" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        <div>
          <label>Email</label>
          <input type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        <div>
          <label>Password</label>
          <input type={show?"text":"password"} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={()=>{setShow(!show)}}>{show?"hide":"show"}</button>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {errors.api && <div className="error api-error">{errors.api}</div>}

        <button disabled={loading} type='submit'>{loading ? 'Loging in...' : 'LogIn'}</button>
        <span>Create Account? <a href="/signup">Register</a></span><br/>
        <span><a href="/forget-password">Forgot password?</a></span>

    </form>
    </>
  )
}


export default LogIn