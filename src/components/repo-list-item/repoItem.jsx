import "./repoItem.css";
import rating from '../../assets/teacher-rating.svg'
import { useNavigate } from "react-router-dom";

export default function RepositoryItem({ repository }) {
    const navigate = useNavigate()
  return (
    <div className="repo-item">
      <div className="repo-header">
        <div className="repo-title">
          <div role="button" onClick={()=>navigate(`/repositories/${repository.id}`)} className="repo-name">{repository.name}</div>
          <span className="repo-privacy">{repository.isPublic ? 'Public' : 'Private'}</span>
        </div>
        <div className="repo-stats">
          <div className="repo-rating">
            <img src={rating} className="rating-icon fire"></img>
            <span className="rating-value">{repository.rate + '/10'}</span>
          </div>
          <div className="repo-likes">
          <div className="stars-count">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill={repository.isLiked ? '#8A2BE2' : 'none'} stroke={repository.isLiked ? '#8A2BE2' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span></span>
          </div>
            <span className="likes-value">{repository.stars}</span>
          </div>
        </div>
      </div>
      <p className="repo-description">{repository.description}</p>
      <div className="repo-footer">
        <div className="repo-language">
          <span className="language-icon"></span>
          <span className="language-name">Programming language : {repository.language}</span>
        </div>
        <span className="repo-updated">{repository.isPublic ? 'Public' : 'Private'}</span>
      </div>
    </div>
  )
}
