import { useNavigate } from "react-router-dom"
import "./AppCard.css"

function AppCard({id, name, author, description, recommended, rating,iconUrl }) {
  const Navigate = useNavigate();
  const truncatedDescription =
    description?.length > 100 ? description.substring(0, 100) + "..." : description;
const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            className="star-icon filled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="star-icon half-filled"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
          >
            <defs>
              <linearGradient id="halfGradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="url(#halfGradient)"
              stroke="currentColor"
              strokeWidth="1"
            ></polygon>
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="star-icon empty"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      }
    }
    return stars
  }
  return (
    
    <div className="app-card">
        <img
      className="app-icon"
      loading="lazy"
      src={iconUrl ||"data:image/png;base64,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"}
      alt={`${name} logo`}
    />
      <div className="app-info">
        <div className="app-name-container">
          <h3 role="button" onClick={()=> Navigate(`/appstore/app/${id}`)} className="app-name">{name}</h3>
          <svg
            className="check-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="16 12 12 16 8 12"></polyline>
            <line x1="12" y1="8" x2="12" y2="16"></line>
          </svg>
        </div>
        <p className="app-author">By {author}</p>
        <p className="app-description">{truncatedDescription}</p>
        <div className="app-badges">
          {<span className="recommended-badge">{'Uploaded by ' + recommended}</span>}
          {rating && <span className="rating-badge">{renderStars(rating)}</span>}
        </div>
      </div>
    </div>
  )
}

export default AppCard

