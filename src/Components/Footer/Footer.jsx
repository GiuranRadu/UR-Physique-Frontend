import styles from './Footer.module.css'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import logo_pic from '../../Assets/logo.png';

{/* 
<FaFacebook />
<FaTwitter />
<FaSquareInstagram />
<IoLogoYoutube /> 
*/}


function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles['logo-div']}>
          <h1>UR Physique</h1>
          <img src={logo_pic} alt="logo" />
        </div>
        <p>Take your health and body to the next level with our comprehensive program designed to help you reach your fitness goals.</p>
        <p>Privacy Policy | © 2024 UR Physique</p>
        <div className={styles['platforms']}>
          <FaFacebook className={styles['platform']} />
          <FaTwitter className={styles['platform']} />
          <FaSquareInstagram className={styles['platform']} />
          <IoLogoYoutube className={styles['platform']} />
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles['center1']}>
          <h1>OurClasses</h1>
        </div>
        <div>
          <ul >
            <li>Open Air Activities</li>
            <li>Fitness Classes</li>
            <li>Full-body Strength</li>
            <li>Aerobics Classes</li>
            <li>Pool Exercises</li>
          </ul>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles['center1']}>
          <h1>Working Hours</h1>
        </div>
        <div>
          <ul >
            <li>Monday - Friday:</li>
            <li>00:00 - 23:59</li>
            <li>Saturday-Sunday:</li>
            <li>7:00am - 19:00pm</li>
          </ul>
        </div>


      </div>


    </div>
  )
}

export default Footer
