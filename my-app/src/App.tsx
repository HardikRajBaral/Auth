
import './App.css'
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import LogIn from './Component/LoginPage'
import Home from './Component/Home'
import Register from './Component/Register'
import VerifyEmail from './Component/VerifyEmail'
import ForgotPassword from './Component/ForgotPassword'

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/signup' element={<Register/>} />
        <Route path='/verify-email' element={<VerifyEmail/>} />
        <Route path='/forget-password' element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  )
} 


export default App
