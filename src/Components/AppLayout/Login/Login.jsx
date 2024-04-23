import { Link } from "react-router-dom"
import styles from './Login.module.css'
import { useContext, useState } from "react"
import { AuthContext } from "../../../Contexts/AuthContext"
import login_pic from '../../../Assets/Login-amico.svg'
import { Toaster } from 'react-hot-toast';




function Login() {

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    login(email, password)
  }

  return (

    <div className={styles.container}>
      <Toaster position="bottom-right" />
      <h1>LOGIN</h1>
      <div className={styles['form-div']}>
        <div className={styles['inputs-div']}>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
          </form>
        </div>
        <p>Don&apos;t have an account ? </p>
        <div className={styles['forgot-register-div']}>
          <Link to={'/register'}>Click Here to Register</Link>
          <Link to={'/forgotPassword'}>Forgot Password</Link>
        </div>
      </div>
      <img src={login_pic} />
    </div>
  )
}

export default Login
