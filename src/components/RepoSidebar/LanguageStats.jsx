import "./LanguageStats.css"

export default function LanguageStats() {
  return (
    <div className="language-stats">
      <div className="stats-bar">
        <div className="stats-segment html" style={{ width: "75%" }}></div>
        <div className="stats-segment css" style={{ width: "20%" }}></div>
        <div className="stats-segment js" style={{ width: "5%" }}></div>
      </div>

      <div className="stats-legend">
        <div className="legend-item">
          <span className="legend-color html"></span>
          <span className="legend-label">HTML</span>
          <span className="legend-value">75%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color css"></span>
          <span className="legend-label">CSS</span>
          <span className="legend-value">20%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color js"></span>
          <span className="legend-label">Java scrpt</span>
          <span className="legend-value">20%</span>
        </div>
      </div>
    </div>
  )
}
