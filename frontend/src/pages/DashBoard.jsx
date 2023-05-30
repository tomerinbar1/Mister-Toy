import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { toyService } from '../services/toyService.js'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/toyActions.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export const DashBoard = () => {
  const labels = toyService.getLabels()
  const toys = useSelector(state => state.toyModule.toys)
  const [chartData,setChartData] = useState(null)

  useEffect(() => {
      loadToys()
  }, [])

  useEffect(() => {
    const data = toys.reduce((acc, toy) => {
      return toy.labels.reduce((ac, label) => {
        if (!acc[label]) acc[label] = 0
        acc[label]++
        return acc
      }, acc)
    }, {})
    setChartData(data)
  }, [])

  const getChartConfig = () => {
    if(!chartData) {
      return []
    }
    console.log(chartData);
    return {
      labels: labels,
      datasets: [
        {
          label: 'Number of Items',
          data: [...Object.values(chartData)],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        }
      ]
    }
  }

  return (
    chartData && (
      <>
        <div className="canvas-wrapper">
          <h1>Inventory</h1>
          <Doughnut data={getChartConfig()} />
        </div>
      </>
    )
  )
}
