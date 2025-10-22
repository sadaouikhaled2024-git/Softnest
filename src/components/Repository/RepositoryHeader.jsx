import { useNavigate } from "react-router-dom"
import "./RepositoryHeader.css"

export default function RepositoryHeader({ownerId, devName, projectName}) {
  const navigate = useNavigate()
  return (
    <div className="repository-header animated-fadein">
      <div className="repository-owner">
        <svg
          className="avatar-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <div
          role="button"
          onClick={()=>navigate(`/user/${ownerId}`)}
          className="developer-name animated-hover"
        >
          {devName}
        </div>
        <span className="separator">/</span>
        <span className="project-name">{projectName}</span>
      </div>
    </div>
  )
}
