import { getAllSelectedUserActivities } from '../../../services/apiActivities'
import { Link, useLoaderData } from "react-router-dom";
import styles from './Schedule.module.css'
import { useState } from 'react';
import lazy_man from '../../../Assets/lazy-man2.png'
import sport_beneficial from '../../../Assets/sport-beneficial.png'
import { capitalizeFirstLetter } from '../../../Utils/utilFunctions'
import PieChart from '../../../Partials/PieChart.jsx';

const daysArray = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

function customSort(a, b) {
  return daysArray.indexOf(a.day) - daysArray.indexOf(b.day);
}

function Schedule() {
  const days = useLoaderData();
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayInfo, setDayInfo] = useState(null);
  const [summary, setSummary] = useState(true);

  function handleDayClick(day) {
    setSelectedDay(day);
    setSummary(false)
    setDayInfo(days.find(obj => obj._id === day));
  }

  function weeklySummary() {
    setSummary(!summary);
    setSelectedDay(false)
  }

  // Step 1: Accumulate calories burned for each day
  const aggregatedData = days.reduce((acc, curr) => {
    curr.activities.forEach(activity => {
      if (acc[activity.day]) {
        acc[activity.day] += activity.caloriesBurned;
      } else {
        acc[activity.day] = activity.caloriesBurned;
      }
    });
    return acc;
  }, {});

  // Step 2: Transform the accumulated data into the desired format
  const x = Object.entries(aggregatedData).map(([day, caloriesBurned]) => ({
    day,
    caloriesBurned
  }));

  // Step 3: Add missing days to the array with 0 burnedCalories
  daysArray.forEach(day => {
    const foundDay = x.find(d => d.day === day);
    if (!foundDay) {
      x.push({ day: day, caloriesBurned: 0 });
    }
  })

  // Step 4: Sort data
  const transformedData = x.sort(customSort);
  // console.log(transformedData);

  const totalCalories = transformedData.reduce((acc, day) => {
    return acc += day.caloriesBurned;
  }, 0)

  // console.log(totalCalories);



  return (
    <div className={styles['container']}>
      <div className={styles['header-div']}>
        <h1>SCHEDULE</h1>
      </div>

      <div className={styles['days-container']}>
        {daysArray.map((day, i) => (
          <button key={i} onClick={() => handleDayClick(day)} className={selectedDay === day ? styles['selected'] : styles['days-button']} >
            {capitalizeFirstLetter(day)}
          </button>
        ))}
        <button onClick={() => weeklySummary()} className={styles['week-summary-button']}>Week Summary</button>
      </div>

      {summary &&

        <div className={styles['table-container']}>
          <h1>Week Summary</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                {transformedData.map((day, i) => (
                  <th key={i}>{capitalizeFirstLetter(day.day)}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {transformedData.map((day, i) => (
                  <td key={i}>{day.caloriesBurned} kcal</td>
                ))}
                <td>{totalCalories} kcal </td>
              </tr>
            </tbody>
          </table>
          <div className={styles['pie-chart-div']} >
            <PieChart daysObject={transformedData} />
          </div>
        </div>
      }

      {!summary && dayInfo?.activities?.length > 0 && <div className={styles['informations-div']}>
        {dayInfo?.activities?.map((activity, i) => (
          <div key={i} className={styles['activity-div']}>
            <div>
              <h3>Activity Name</h3>
              <h2>{activity.activityName}</h2>
            </div>
            <div>
              <h3>Time</h3>
              <h2>{activity.duration}min</h2>
            </div>
            <div>
              <h3>Burned Calories</h3>
              <h2>{activity.caloriesBurned} Kcal</h2>
            </div>
            <div>
              <Link to='/activities'>
                <button className={`${styles['days-button']} ${styles['want-more-btn']}`}>Want More!</button>
              </Link>
            </div>
          </div>

        ))}
      </div>}

      {
        selectedDay && !dayInfo &&
        <div className={styles['lazy-man-div']}>
          <p>Nothing to display! Try to add some activities for this day</p>
          <img src={lazy_man} alt="" />
        </div>
      }

      {
        selectedDay &&
        <div className={styles['presentation-div']}>
          <img src={sport_beneficial} alt="" />
        </div>
      }
    </div>
  )
}



//! asta se va importa in `app.jsx` si se va adauga in array-ul de paths, unde dorim
//note APOI IL FOLOSIM MAI SUS cu `useLoaderData`
export async function loader() {
  const days = await getAllSelectedUserActivities()

  return days //! obligatoriu trebuie sa returneze ceva  
}

export default Schedule



