import styles from './ActivitiesGrid.module.css'
import { FaArrowCircleRight } from "react-icons/fa";

function ActivitiesGrid({ activities, handleSelectSport }) {
  console.log(activities[0]);

  return (
    <div className={styles['activities-grid']}>
      {activities.map((act, i) => (
        <div key={i} className={styles['activity']}>
          <img src={act.pictures[0]} alt="" />
          <h1>{act.name}</h1>
          <button onClick={() => handleSelectSport(act.name)}>See Activity  <FaArrowCircleRight /></button>
        </div>
      ))}
    </div>
  )
}

export default ActivitiesGrid
