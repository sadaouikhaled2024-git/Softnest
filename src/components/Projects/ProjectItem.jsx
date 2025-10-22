import "./ProjectItem.css"

export default function ProjectItem({ project }) {
  
  return (
    <div role="button"  className="project-item">
      <div className="project-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <div className="project-name">{project.name}</div>
      <div className="project-status">
        <span className={`status-badge ${project.status}`}>{project.status}</span>
      </div>
    </div>
  )
}
