/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from 'react'; // Import useState from 'react'
import styles from './Snackbar.module.css';

const Snackbar = forwardRef(({ message, type }, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000)
    }
  }));

  return (
    <div className={`${styles.snackbar} ${showSnackbar ? styles.show : styles.hide}`} style={{ backgroundColor: type === 'success' ? '#00F593' : '#FF0033' }}>
      <div className={styles.symbol}>
        {type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
})

export default Snackbar;
