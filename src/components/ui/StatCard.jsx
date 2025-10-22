import { TrendingUp, TrendingDown } from "lucide-react"

export default function StatCard({ icon, value, label, trend, trendUp }) {
  return (
    <div className="stat-card">
      {icon}
      <div className="stat-content">
        <div className="stat-value-container">
          <div className="stat-value">{value.toLocaleString()}</div>
          <div className={`stat-trend ${trendUp ? "up" : "down"}`}>
            {trendUp ? <TrendingUp className="trend-icon" /> : <TrendingDown className="trend-icon" />}
            {trend}
          </div>
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )
}
