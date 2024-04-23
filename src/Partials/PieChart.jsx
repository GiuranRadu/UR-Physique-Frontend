import Chart from 'chart.js/auto'
import { useEffect, useRef } from 'react';


function PieChart({ daysObject }) {
  // console.log(daysObject);
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const days = daysObject.map(element => {
    return element.day
  });
  // console.log(days);
  const calories = daysObject.map(element => {
    return element.caloriesBurned
  });
  // console.log(calories);


  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }
    const myChartRef = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(myChartRef, {
      type: 'pie',

      data: {
        labels: days,
        datasets: [{
          label: 'Calories',
          data: calories,
          backgroundColor: [
            'rgb(255,99,132)',
            'rgb(54,162,235)',
            'rgb(96, 113, 201)',
            'rgb(255,205,86)',
            'rgb(221, 86, 255)',
            'rgb(120, 173, 115)',
            'rgb(86, 255, 159)',
          ]
        }],
        // hoverOffset: 4,
      },
      options: {
        borderColor: 'rgba(255, 255, 255, 0.979)',
        borderWidth: 2,
        radius: "90%",
        // backgroundColor : 'rgb(212, 32, 32)',
        // hoverBackgroundColor : 'rgba(203, 203, 203, 0.975)',
        // borderJoinStyle : 'miter',
        // circumference : 360,
        // cutout: "40%",
      },
    })


    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [calories, days])



  return (

    <canvas ref={chartRef} />

  )
}

export default PieChart
