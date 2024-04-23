
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';
import { toastErrorObj, toastSuccessObj } from '../Utils/utilObjects'

// const API_URL = 'http://localhost:3000';
const API_URL = 'https://ur-physique-backend.onrender.com';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')) : false);
  console.log(isLoggedIn);

  //* User LOGIN
  async function login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const responseData = await response.json();

      if (responseData.status === 'success') {
        localStorage.setItem('auth-token', JSON.stringify(responseData.token));
        localStorage.setItem('loggedUser', JSON.stringify(responseData.data));
        setIsLoggedIn(responseData.data)
        toast.success('Login successfully', toastSuccessObj);
        setTimeout(() => {
          window.location.replace('/');
        }, 1300);
      } else {
        toast.error(responseData.message, toastErrorObj);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login.');
    }
  }

  //* User LOGOUT
  function logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('loggedUser');
    setIsLoggedIn(false);

    setTimeout(() => {
      window.location.replace('/login');
    }, 1300);
  }

  //* User REGISTER
  async function register(formData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      if (data.status === 'success') {
        alert(data.message); // Display success message
        window.location.replace('/login')
      } else {
        console.error(data.message); // Display error message
        // alert('Try Again: ' + data.message);
        toast.error('An error occurred during register.');

      }
    } catch (error) {
      // console.error('Error:', error);
      toast.error('An error occurred during register.');

    }
  }



  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };