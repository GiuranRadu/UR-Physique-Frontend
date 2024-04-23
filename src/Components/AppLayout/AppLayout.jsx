import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from "react-router-dom"
import styles from './AppLayout.module.css'


function AppLayout() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default AppLayout
