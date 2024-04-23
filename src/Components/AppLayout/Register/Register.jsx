import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import styles from './Register.module.css'
import { AuthContext } from "../../../Contexts/AuthContext";
import signup_pic from '../../../Assets/Sign up-amico.svg'


function Register() {

  const { register } = useContext(AuthContext)

  const initialFormData = {
    name: '',
    age: '',
    height: '',
    weight: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match') //! early exit
    }
    register(formData)
    setFormData(initialFormData)
    console.log(formData);
  };


  return (
    <div className={styles.container}>
      <h1>REGISTER</h1>
      <div className={styles['form-div']}>
        <div className={styles['inputs-div']}>
          <form onSubmit={handleSubmit}>

            <label htmlFor="name">Name:</label>
            <input className={styles.input} type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="age">Age:</label>
            <input className={styles.input} type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />

            <label htmlFor="height">Height:</label>
            <input className={styles.input} type="number" id="height" name="height" value={formData.height} onChange={handleChange} required />

            <label htmlFor="weight">Weight:</label>
            <input className={styles.input} type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input className={styles.input} type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="password">Password:</label>
            <input className={styles.input} type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input className={styles.input} type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

            <button className={styles.button} type="submit">Register</button>
          </form>
        </div>
        <div className={styles['links-div']}>
          <p>Already Registered ?</p>
          <Link to={'/login'}>Click here to Login</Link>
        </div>
      </div>

      <img src={signup_pic} alt="" />
    </div>
  )
}

export default Register
