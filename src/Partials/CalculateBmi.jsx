import styles from './CalculateBmi.module.css'
import gym_guy_pic from '../Assets/gym-guy.png'
import { useState } from 'react'

function CalculateBmi() {
  const [bmi, setBmi] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);

  function handleCalculateBMI() {
    if (weight && height) {
      const numericWeight = parseFloat(weight);
      const numericHeight = parseFloat(height);

      const calculatedBmi = calculateBMI(numericHeight, numericWeight).toFixed(1);
      setBmi(calculatedBmi);

      if (calculatedBmi <= 18.4) {
        setBmiWeight('Underweight');
      } else if (calculatedBmi > 18.4 && calculatedBmi <= 24.9) {
        setBmiWeight('Normal');
      } else if (calculatedBmi > 24.9 && calculatedBmi <= 29.9) {
        setBmiWeight('Overweight');
      } else {
        setBmiWeight('Obese');
      }
    }
  }

  function calculateBMI(height, weight) {
    return weight / (height * height / 10000);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['left-div']}>
        <img src={gym_guy_pic} alt="gym_guy" />
      </div>

      <div className={styles['right-div']}>
        <div className={styles['div1']}>
          <h1>Let`s calculate Your <span>BMI</span></h1>
          <p>Easily determine your body mass index with our accurate calculation tool.</p>
        </div>
        <div className={styles['div2']}>
          <input type="number" placeholder='Weight/ kg' onChange={(e) => setWeight(e.target.value)} />
          <input type="number" placeholder='Height/ cm' onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div className={styles['div3']}>
          <p>Your BMI is: {bmi && <span>{bmi}</span>}</p>
          <p>Your weight category is: {bmi && <span>{bmiWeight}</span>}</p>
        </div>
        <div className={styles['div4']}>
          <button onClick={handleCalculateBMI}>CALCULATE</button>
        </div>
      </div>
    </div>
  );
}

export default CalculateBmi;
