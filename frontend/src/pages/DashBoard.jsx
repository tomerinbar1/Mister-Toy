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
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 0, 0, 0.2)',
            'rgba(0, 255, 0, 0.2)',
            'rgba(0, 0, 255, 0.2)',
            'rgba(255, 255, 0, 0.2)',
            'rgba(255, 0, 255, 0.2)',
            'rgba(0, 255, 255, 0.2)',
            'rgba(128, 0, 0, 0.2)',
            'rgba(0, 128, 0, 0.2)',
            'rgba(0, 0, 128, 0.2)',
            'rgba(128, 128, 0, 0.2)',
            'rgba(128, 0, 128, 0.2)',
            'rgba(0, 128, 128, 0.2)',
            'rgba(255, 128, 0, 0.2)',
            'rgba(255, 0, 128, 0.2)',
            'rgba(128, 255, 0, 0.2)',
            'rgba(0, 255, 128, 0.2)',
            'rgba(128, 0, 255, 0.2)',
            'rgba(0, 128, 255, 0.2)',
            'rgba(255, 128, 128, 0.2)',
            'rgba(128, 255, 128, 0.2)',
            'rgba(128, 128, 255, 0.2)',
            'rgba(192, 192, 192, 0.2)',
            'rgba(128, 128, 128, 0.2)',
            'rgba(64, 64, 64, 0.2)',
            'rgba(255, 255, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 0, 0, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(255, 255, 0, 1)',
            'rgba(255, 0, 255, 1)',
            'rgba(0, 255, 255, 1)',
            'rgba(128, 0, 0, 1)',
            'rgba(0, 128, 0, 1)',
            'rgba(0, 0, 128, 1)',
            'rgba(128, 128, 0, 1)',
            'rgba(128, 0, 128, 1)',
            'rgba(0, 128, 128, 1)',
            'rgba(255, 128, 0, 1)',
            'rgba(255, 0, 128, 1)',
            'rgba(128, 255, 0, 1)',
            'rgba(0, 255, 128, 1)',
            'rgba(128, 0, 255, 1)',
            'rgba(0, 128, 255, 1)',
            'rgba(255, 128, 128, 1)',
            'rgba(128, 255, 128, 1)',
            'rgba(128, 128, 255, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(128, 128, 128, 1)',
            'rgba(64, 64, 64, 1)',
            'rgba(255, 255, 255, 1)',
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
