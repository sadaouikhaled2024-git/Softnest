"use client"

import { useState } from "react"

export default function ChartCard({ title, icon, chartType, period }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Generate random data based on chart type and period
  const generateChartData = () => {
    if (chartType === "line" || chartType === "bar") {
      let labels = []
      let data = []

      if (period === "week") {
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      } else if (period === "month") {
        labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
      } else if (period === "year") {
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }

      data = labels.map(() => Math.floor(Math.random() * 100))

      return { labels, data }
    } else if (chartType === "donut") {
      return {
        labels: ["Web Apps", "Mobile Apps", "Desktop Apps", "Games", "Other"],
        data: [30, 25, 20, 15, 10],
      }
    }
  }

  const { labels, data } = generateChartData()

  const renderChart = () => {
    if (chartType === "line") {
      return (
        <div className="chart-container">
          <div className="chart-line">
            {data.map((value, index) => (
              <div key={index} className="chart-line-point" style={{ height: `${value}%` }}>
                <div className="tooltip">{value}</div>
              </div>
            ))}
          </div>
          <div className="chart-labels">
            {labels.map((label, index) => (
              <div key={index} className="chart-label">
                {label}
              </div>
            ))}
          </div>
        </div>
      )
    } else if (chartType === "bar") {
      return (
        <div className="chart-container">
          <div className="chart-bars">
            {data.map((value, index) => (
              <div key={index} className="chart-bar-container">
                <div className="chart-bar" style={{ height: `${value}%` }}>
                  <div className="tooltip">{value}</div>
                </div>
                <div className="chart-label">{labels[index]}</div>
              </div>
            ))}
          </div>
        </div>
      )
    } else if (chartType === "donut") {
      // Simplified donut chart for better display
      return (
        <div className="chart-container">
          <div className="donut-legend">
            {labels.map((label, index) => (
              <div key={index} className="legend-item">
                <div className={`legend-color legend-color-${index}`}></div>
                <div className="legend-label">
                  {label}: {data[index]}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className={`chart-card ${isFullscreen ? "fullscreen" : ""}`}>
      <div className="chart-header">
        <h4>{title}</h4>
        <div className="chart-actions">
          {icon}
          <button className="fullscreen-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>
      </div>
      {renderChart()}
    </div>
  )
}
