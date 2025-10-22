import "./ProjectsHeader.css"

export default function ProjectsHeader() {
  return (
    <div className="projects-header">
      
      <div className="sort-dropdown">
        <button className="sort-button">
          Sort
          <svg
            className="dropdown-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  )
}
