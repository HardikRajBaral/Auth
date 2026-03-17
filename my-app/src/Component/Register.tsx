import { useState } from "react"
import { useNavigate } from 'react-router-dom'


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
      const data:any= await res.json()
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
          <>  
    <form className="singUp-Card" onSubmit={handleSubmit}>
          <h1>Create Your Account</h1>
          <p>Register to your account</p>
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

        <button disabled={loading} type='submit'>{loading ? 'Regestering...' : 'Register'}</button>
        <div>Already have an account? <a href="/">LogIn</a></div>
    </form>
    </>
    )
}

export default Register