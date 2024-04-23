import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import logo_pic from '../../Assets/logo.png';
import ConfirmDialog from '../../Partials/ConfirmDialog';
import toast, { Toaster } from 'react-hot-toast';
import { toastSuccessObj } from '../../Utils/utilObjects'

function Header() {

  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation(); // Get the current location
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })

  // console.log(isLoggedIn);

  function logoutBtn() {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure you want to logout?',
      subtitle: "You will be redirected to the login page",
      onConfirm: handleLogout
    })
  }

  function handleLogout() {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    toast.success(`Good Bye ${isLoggedIn.name}`, toastSuccessObj);
    logout()
  }

  return (
    <div className={styles.container}>
      <Toaster position="bottom-right" />

      <div className={styles['logo-div']}>
        <Link to={'/'}>
          <img src={logo_pic} alt="logo_pic" />
        </Link>
      </div>


      <div className={styles["links-div"]}>
        {isLoggedIn && <Link to={'/activities'} className={location.pathname === '/activities' ? styles.active : ''}>Activities</Link>}
        {isLoggedIn && <Link to={'/schedule'} className={location.pathname === '/schedule' ? styles.active : ''}>Schedule</Link>}
        {isLoggedIn && <Link to={'/gallery'} className={location.pathname === '/gallery' ? styles.active : ''}>Gallery</Link>}

        <Link to={'/pricing'} className={location.pathname === '/pricing' ? styles.active : ''}>Pricing</Link>
        <Link to={'/contact'} className={location.pathname === '/contact' ? styles.active : ''}>Contact</Link>
      </div>

      {!isLoggedIn && <div>
        <Link to={'/login'} >
          <button>Login</button>
        </Link>
      </div>}

      {isLoggedIn && <div>

        <button onClick={logoutBtn}>Logout</button>

      </div>}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

    </div>
  )
}

export default Header
