import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom"
import styles from './AppLayout.module.css'


function AppLayout() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default AppLayout
