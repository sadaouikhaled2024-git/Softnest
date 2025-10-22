import { Clock } from "lucide-react"

export default function ActivityLog({ activities }) {
  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div className="activity-log-item" key={activity.id}>
          <Clock className="activity-log-icon" />
          <div className="activity-log-content">
            <div className="activity-log-title">{activity.title}</div>
            <div className="activity-log-time">{activity.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
