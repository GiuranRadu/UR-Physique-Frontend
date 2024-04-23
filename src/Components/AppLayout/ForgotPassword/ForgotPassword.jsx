import { useState } from 'react'
import styles from './ForgotPassword.module.css'
import { useNavigate } from 'react-router';
import forgot_password_pic from '../../../Assets/Forgot password-amico.svg'
import { Link } from 'react-router-dom';

// const API_URL = 'http://localhost:3000';
const API_URL = 'https://ur-physique-backend.onrender.com';


function ForgotPassword() {

  const navigate = useNavigate();

  const [myEmail, setEmail] = useState('')

  async function sendToEmail(e) {
    e.preventDefault()
    if (myEmail) {
      try {
        const response = await fetch(`${API_URL}/login/forgotPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: myEmail
          })
        });

        const data = await response.json();

        if (data.status === 'success') {
          console.log(data.message); // Display success message
          navigate('/resetPassword');
        } else {
          console.error(data.message); // Display error message
          alert('Try Again: ' + data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <div className={styles['container']}>
      <div>
        <h1>FORGOT PASSWORD</h1>
      </div>
      <div className={styles['picture-and-form-container']}>
        <div className={styles['picture-div']}>
          <img src={forgot_password_pic} alt="" />
        </div>
        <div className={styles['form-div']}>
          <form >
            <p>1. Type your email to reset your password</p>
            <p>2. You will receive an email with further instructions</p>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' placeholder='Enter your email adress...' onChange={(e) => setEmail(e.target.value)} />
            <button onClick={sendToEmail}>SEND</button>
            <div className={styles['link-div']}>
              <Link to="/login">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
