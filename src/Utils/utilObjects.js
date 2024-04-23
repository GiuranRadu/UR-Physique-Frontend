import nutrition_pic from '../Assets/small/nutrition.png'
import progress_pic from '../Assets/small/progress.png'
import schedule_pic from '../Assets/small/schedule.png'
import workout_pic from '../Assets/small/workout.png'


export const toastErrorObj = {
  style: {
    border: '1px solid #9d1621',
    padding: '16px',
    fontSize: '16px',
    color: '#9d1621',
  },
  iconTheme: {
    primary: '#9d1621',
    secondary: '#f3f3f3',
  }
}

export const toastSuccessObj = {
  style: {
    border: '1px solid #2c3e50',
    padding: '16px',
    fontSize: '16px',
    color: '#566573',
  },
  iconTheme: {
    primary: '#2c3e50',
    secondary: '#bdc3c7',
  }
}


export const progWorkoutNutr = [
  {
    name: 'PROGRESSION',
    info: 'Our team of experts will work with you to create a customized plan that helps you achieve success one step at a time.',
    image: progress_pic
  },
  {
    name: 'WORKOUT',
    info: 'With a variety of workouts to choose from, you will have everything you need to get into the best shape of your life.',
    image: workout_pic
  },
  {
    name: 'NUTRITIONS',
    info: 'Our team will work with you to create a personalized meal plan that helps you reach your specific health goals.',
    image: nutrition_pic
  },
  {
    name: 'SCHEDULE',
    info: 'Life can be busy, our schedule is flexible to your needs. Whether you prefer morning, afternoon, or evening sessions',
    image: schedule_pic
  },

]
