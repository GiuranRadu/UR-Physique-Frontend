import { useState } from 'react';
import styles from './ResetPassword.module.css'
import { useNavigate } from 'react-router';


// const API_URL = 'http://localhost:3000';
const API_URL = 'https://ur-physique-backend.onrender.com';


function ResetPassword() {

  const navigate = useNavigate();


  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [code6digits, setCode6digits] = useState(null)

  async function handleResetPassword() {
    if (!password || !confirmPassword || !code6digits) {
      alert('All fields are required')
    } else if (password !== confirmPassword) {
      alert('Password does not match')
    }

    try {
      const response = await fetch(`${API_URL}/login/resetPassword/${code6digits}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          confirmPassword
        })
      })

      const data = await response.json();

      if (data.status === 'success') {
        console.log(data.status); // Display success message
        navigate('/login');

      } else {
        console.error(data); // Display error message
        alert('Try Again: ' + data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (
    <div className={styles['container']}>
      <h1>RESET PASSWORD</h1>
      <div className={styles['form-div']}>
        <form action="submit">
          <div className={styles['input-div']}>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' placeholder='Enter your new password' onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className={styles['input-div']}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id='confirmPassword' placeholder='Confirm your new password' onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className={styles['input-div']}>
            <label htmlFor="receivedCode">6-digits-code</label>
            <input type="text" id='receivedCode' placeholder='Enter the received code from email' onChange={(e) => setCode6digits(e.target.value)} />
          </div>
        </form>
        <button onClick={handleResetPassword}>Reset</button>
      </div>
    </div>
  )
}

export default ResetPassword
