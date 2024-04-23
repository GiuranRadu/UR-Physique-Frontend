import styles from './Testimonials.module.css'
import user1_pic from '../Assets/testimonials/user1.png'
import user2_pic from '../Assets/testimonials/user2.png'
import user3_pic from '../Assets/testimonials/user3.png'
import quotes_pic from '../Assets/testimonials/download.png'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState } from 'react';


const testimonials = [
  {
    name: 'Harry Potter',
    occupation: 'CEO of Hogwarts',
    testimonial: '“I have been a member of Gymate for the past 6 months and it has been an amazing experience. The trainers are knowledgeable and supportive, the equipment is top-notch, and the community of members is friendly and encouraging.”',
    picture: user1_pic
  },
  {
    name: 'Draco Malfoy',
    occupation: 'Student Manager',
    testimonial: '“Joining Gym Fusion was one of the best decisions I have made for my fitness journey. Over the past 6 months, I have found incredible support from the expert trainers who are always there to guide and motivate me. .”',
    picture: user2_pic
  },
  {
    name: 'Ronald Weasley',
    occupation: 'unemployed',
    testimonial: '“Being part of Fit Haven for the last 6 months has been nothing short of phenomenal. The trainers go above and beyond, offering not just expertise but genuine care for your progress.”',
    picture: user3_pic
  },
]

function Testimonials() {

  const [userNo, setUserNo] = useState(0)

  function handleUserTestimonial(param) {
    if (param === 'forward' && userNo < testimonials.length - 1) {
      setUserNo(userNo + 1)
    } else if (param === 'back' && userNo > 0) {
      setUserNo(userNo - 1)
    }
  }

  return (
    <div className={styles.container}>
      <h1>TESTIMONIALS</h1>
      <div className={styles['testimonials-div']}>
        <div className={styles['testimonial']}>
          <div className={styles['image-div']}>
            <img src={testimonials[userNo].picture} alt="img" />
          </div>
          <div className={styles['text-div']}>
            <img src={quotes_pic} alt="quotes" />
            <div className={styles['info-div']}>
              <p >{testimonials[userNo].testimonial}</p>
              <h1 >{testimonials[userNo].name}</h1>
              <h2 >{testimonials[userNo].occupation}</h2>
            </div>
            <div className={styles['buttons-div']}>
              <button onClick={() => handleUserTestimonial('back')}><FaArrowLeft /></button>
              <button onClick={() => handleUserTestimonial('forward')}><FaArrowRight /></button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Testimonials
