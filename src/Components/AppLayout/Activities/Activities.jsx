import { addActivity, sportsIncludedInSubscription } from "../../../services/apiActivities";
import { Link, useLoaderData } from "react-router-dom";
import styles from './Activities.module.css'
import { useContext, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import { convertMinutesToHours } from '../../../Utils/utilFunctions'
import { AuthContext } from "../../../Contexts/AuthContext";
import ActivitiesGrid from "./ActivitiesGrid/ActivitiesGrid";
import toast, { Toaster } from 'react-hot-toast';
import { toastSuccessObj } from '../../../Utils/utilObjects'
import ConfirmDialog from '../../../Partials/ConfirmDialog';



const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

function Activities() {
  const activities = useLoaderData()

  const { isLoggedIn } = useContext(AuthContext);

  const [sport, setSport] = useState('')
  const [day, setDay] = useState('')
  const [slide, setSlide] = useState(0)
  const [timeToPractice, setTimeToPractice] = useState(0)
  const [selectedSport, setSelectedSport] = useState(null)
  console.log(selectedSport);
  const calories = Math.floor(selectedSport?.burnedCaloriesPerHour / 60 * timeToPractice)


  function handleSlide(direction) {
    const maxIndex = selectedSport.pictures.length - 1;
    if (direction === 'right') {
      if (slide >= maxIndex) {
        setSlide(0)
      } else {
        setSlide(slide + 1)
      }
    }
    if (direction === 'left') {
      if (slide < 1) {
        setSlide(maxIndex)
      } else {
        setSlide(slide - 1)
      }
    }
  }

  function handleTime(param) {
    if (param === "plus" && timeToPractice < 180) {
      setTimeToPractice(timeToPractice + 10);
    } else if (param === "minus" && timeToPractice > 0) {
      setTimeToPractice(timeToPractice - 10);
    }
  }

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })
  function finishAndSelectBtn() {
    setConfirmDialog({
      isOpen: true,
      title: 'Add activity?',
      subtitle: "You can see it in schedule section",
      onConfirm: sendToDatabase
    })
  }
  function sendToDatabase() {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    addActivity(isLoggedIn._id, selectedSport._id, selectedSport.name, calories, timeToPractice, day)
    setDay('')
    setSlide(0)
    setTimeToPractice(0)
    toast.success('Activity Added', toastSuccessObj);
  }

  function handleSelectSport(value) {
    setSport(value); // Update the state of sport
    setSelectedSport(activities.find(sportItem => sportItem.name === value)); //! `value`
    setDay('');
    setTimeToPractice(0);
    console.log(value);
  }

  return (
    <>
      <Toaster position="bottom-right" />
      {
        activities.length > 0 &&

        <div className={styles['container1']}>
          {selectedSport && <button className={styles['fixed-back-button']} onClick={() => setSelectedSport(null)}>Back</button>}
          <select className={`${styles['fixed-select']} ${styles['select-class']}`} onChange={(e) => handleSelectSport(e.target.value)} value={sport}>
            <option value="" disabled>Select a Sport</option>
            {activities.map((act) => (
              <option key={act._id} value={act.name}>{act.name}</option>
            ))}
          </select>
          {
            selectedSport ?
              <div className={styles['selected-sport-div']}>
                <h1>{selectedSport.name} <span>(Average  Kcal burned /1h : {selectedSport.burnedCaloriesPerHour}Kcal )</span></h1>

                {/* //* CAROUSEL */}
                <div className={styles['carousel']}>
                  <BsArrowLeftCircleFill className={`${styles.arrow} ${styles['arrow-left']}`} onClick={() => handleSlide('left')} />
                  {selectedSport.pictures.map((image, i) => (
                    <img
                      src={image}
                      key={i}
                      className={slide === i ? styles.slide : `${styles.slide} ${styles['slide-hidden']}`}
                    />

                  ))}
                  <BsArrowRightCircleFill className={`${styles.arrow} ${styles['arrow-right']}`} onClick={() => handleSlide('right')} />
                </div>
                {/* //* CAROUSEL */}
                <div className={styles['choose-day-and-duration-div']}>
                  <div>
                    <p className={styles['calories-burned']}>Choose a practice day</p>
                    <select className={styles['select-class']} name="day" id="day" value={day} onChange={(e) => setDay(e.target.value)}>
                      <option value="" disabled>Select a Day</option>

                      {days.map((day, i) => (
                        <option key={i}>{day}</option>
                      ))}
                    </select>
                  </div>                

                  <div >
                    <p className={styles['calories-burned']}>Choose for how long ?</p>
                    <div className={styles['time-div']}>
                      <button onClick={() => handleTime("minus")}>-</button>
                      <p>{convertMinutesToHours(timeToPractice)}</p>
                      <button onClick={() => handleTime("plus")}>+</button>
                    </div>
                  </div>

                  {calories > 0 && <div>
                    <p className={styles['calories-burned']}>You can burn around {calories} kcal</p>
                    {day && <button className={styles['finish-and-select']} onClick={() => finishAndSelectBtn()}>Finish & Select</button>}
                  </div>}
                </div>
              </div> :
              (<ActivitiesGrid activities={activities} handleSelectSport={handleSelectSport} />)}
        </div>
      }
      {
        activities.length === 0 &&
        <div className={styles['container2']}>
          <p>To have access to this page, you need to subscribe first!  </p>
          <p>Go to the Pricing section, or click here ➡️ <Link to='/pricing'>Subscribe</Link></p>
        </div>
      }
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

    </>
  )
}


//! asta se va importa in `app.jsx` si se va adauga in array-ul de paths, unde dorim
//note APOI IL FOLOSIM MAI SUS cu `useLoaderData`
export async function loader() {

  const activities = await sportsIncludedInSubscription();
  return activities
}

export default Activities
