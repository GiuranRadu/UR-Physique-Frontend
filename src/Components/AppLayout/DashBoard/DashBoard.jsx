
import styles from './DashBoard.module.css'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { progWorkoutNutr } from '../../../Utils/utilObjects'
import open_24 from '../../../Assets//small/open-24-7.png'
import trainer_img from '../../../Assets/small/trainer.png'
import equipment_img from '../../../Assets/small/equipment.png'
import running_girl from '../../../Assets/running-girl-2.png'
import CalculateBmi from '../../../Partials/CalculateBmi';
import Testimonials from '../../../Partials/Testimonials';


function DashBoard() {
  return (
    <div className={styles['container']}>
      <div className={styles.section1}>
        <div className={styles['section1-left']}>
        </div>
        <div className={styles['section1-right']}>
          <h2>Find your energy</h2>
          <h1>Track your fitness activity</h1>
          <h2>Fit & Perfect</h2>
          <Link to='/activities'><button>Our Classes<FaArrowRight /></button></Link>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles['progression-workout-nutritions']}>
          {progWorkoutNutr.map((el, i) => (
            <div key={i} className={styles['board']}>
              <div> <img src={el.image} /></div>
              <div><h1>{el.name}</h1></div>
              <div><p>{el.info}</p></div>
            </div>
          ))}
        </div>

        <div className={styles['section2-lower-div']}>
          <div className={styles.left}>
            <div className={styles['left1']}>
              <h2>WHO WE ARE</h2>
              <h1>Take Your Health And Body To Next Level</h1>
              <p>Take your health and body to the next level with our comprehensive program designed to help you reach your fitness goals.</p>
            </div>
            <div className={styles['left2']}>
              <div>
                <h2>PROFESSIONAL TRAINERS</h2>
                <img src={trainer_img} alt="" />
              </div>
              <div>
                <h2>MODERN EQUIPMENTS</h2>
                <img src={equipment_img} alt="" />
              </div>
              <div>
                <h2>OPEN 24/7H</h2>
                <img src={open_24} alt="" />
              </div>
            </div>

            <div className={styles['left3']}>
              <Link to='/activities'><button>TAKE A TOUR<FaArrowRight /></button></Link>
            </div>
          </div>
          <div className={styles.right}>
            <img src={running_girl} alt="" />
          </div>
        </div>
      </div>

      <div className={styles.section3}>
        <CalculateBmi />
      </div>

      <div className={styles.section4}>
        <Testimonials />
      </div>

    </div>
  )
}

export default DashBoard
