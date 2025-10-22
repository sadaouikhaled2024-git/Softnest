"use client"

import { useState } from "react"
import { Users, Package, PenToolIcon as Tool, LineChart, BarChart, PieChart } from "lucide-react"
import StatCard from "../ui/StatCard"
import ChartCard from "../ui/ChartCard"
import ActivityLog from "../ui/ActivityLog"

export default function DashboardOverview({ stats, recentActivities }) {
  const [period, setPeriod] = useState("month")

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div>
          <h2 className="content-title">Dashboard Overview</h2>
          <p className="content-subtitle">Your hawk-eye view of the kingdom:</p>
        </div>
        <div className="period-selector">
          <button className={`period-btn ${period === "week" ? "active" : ""}`} onClick={() => setPeriod("week")}>
            Week
          </button>
          <button className={`period-btn ${period === "month" ? "active" : ""}`} onClick={() => setPeriod("month")}>
            Month
          </button>
          <button className={`period-btn ${period === "year" ? "active" : ""}`} onClick={() => setPeriod("year")}>
            Year
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<Users className="stat-icon" />}
          value={stats.users}
          label="Total users 🧑‍💻"
          trend=""
          trendUp={true}
        />
        <StatCard
          icon={<Package className="stat-icon" />}
          value={stats.apps}
          label="Total apps posted 📦"
          trend=""
          trendUp={true}
        />
        <StatCard
          icon={<Tool className="stat-icon" />}
          value={stats.projects}
          label="Total active projects 🛠️"
          trend=""
          trendUp={false}
        />
      </div>

      <div className="charts-section">
        <h3 className="section-subtitle">Growth charts 📈</h3>
        <div className="charts-grid">
          <ChartCard title="User Growth" icon={<LineChart className="chart-icon" />} chartType="line" period={period} />
          <ChartCard
            title="App Submissions"
            icon={<BarChart className="chart-icon" />}
            chartType="bar"
            period={period}
          />
          <ChartCard
            title="Project Categories"
            icon={<PieChart className="chart-icon" />}
            chartType="donut"
            period={period}
          />
        </div>
      </div>
 
      
    </div>
  )
}
