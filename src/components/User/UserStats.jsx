import "./UserStats.css"

export default function UserStats({totalRepos, totalStars}) {
  return (
    <div className="user-stats-container">
      <h2 className="stats-title">Activity Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalRepos}</span>
            <span className="stat-label">Repositories</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">119</span>
            <span className="stat-label">Rating score</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-value">{totalStars}</span>
            <span className="stat-label">Stars</span>
          </div>
        </div>

        
      </div>

      
    </div>
  )
}
