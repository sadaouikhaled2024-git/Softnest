import React, { useEffect, useState } from "react";
import "./AboutSection.css";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useNavigate } from "react-router-dom";
import archived from '../../assets/archived.svg';

export default function AboutSection({ repositoryInfo, onUpdateRepositoryInfo }) {
  const { data, error, loading, request } = useApiRequest();
  const [description, setDescription] = useState(repositoryInfo.description || "");
  const [githubLink, setGithubLink] = useState(repositoryInfo.githubLink || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({})
  const navigate = useNavigate();
  const handleArchiveRepository = async () => {
    const updatedInfo = {
      ...repositoryInfo,
      isArchived: !repositoryInfo.isArchived, // Inverse l'état actuel d'archivage
    };
  
    try {
      await request(`/api/repositories/${repositoryInfo.id}`, 'PUT', updatedInfo);
      alert(repositoryInfo.isArchived ? "Repository unarchived!" : "Repository archived!");
      onUpdateRepositoryInfo && onUpdateRepositoryInfo(updatedInfo); // Mise à jour de l'état local
    } catch (error) {
      console.error("Erreur lors de l'archivage du repository:", error);
      alert("Error archiving repository. Please try again.");
    }
  };
  const handleDeleteRepository = async () => {
    if (window.confirm("Are you sure you want to delete this repository? This action cannot be undone.")) {
      try {
        await request(`/api/repositories/${repositoryInfo.id}`, 'DELETE');
        alert("Repository deleted!");
         // Redirection vers la liste des repositories après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression du repository:", error);
        alert("Error deleting repository. Please try again.");
      }finally {
      navigate('/repositories');
      }
    }
  };
  
  // Function to handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const review = { comment: reviewComment, rating: reviewRating };
      await request(`/api/repositories/${repositoryInfo.id}/review`, 'POST', review);
      alert("Review submitted!");
      setShowReviewPopup(false);
      setReviewComment("");
      setReviewRating(5);
      fetchReviews(); // Reload reviews after submitting
    } catch (err) {
      console.error("Erreur lors de l'envoi de la review:", err);
    }
  };

  // Fetch reviews for this repository
  const fetchReviews = async () => {
    try {
      const result = await request(`/api/repositories/repositories/${repositoryInfo.id}/reviews`, 'GET');
      setReviews(result);
    } catch (err) {
      console.error("Erreur lors de la récupération des reviews:", err);
    }
  };
  const fetchUser = async()=>{
    try{
      const result = await request('/api/users/profile','GET')
      setUser(result)
    }catch (err){
      console.error("Erreur lors de la récupération d'utilisateur:", err);
    }
  }
  useEffect(() => {
    fetchUser()
    fetchReviews();
  }, [request, repositoryInfo.id]);

  const allowChange = user?.id === repositoryInfo?.ownerId;
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedInfo = {
      name: repositoryInfo.name,
      description,
      isPublic: repositoryInfo.isPublic,
      language: repositoryInfo.language,
      githubLink,
    };

    try {
      await request(`/api/repositories/${repositoryInfo.id}`, 'PUT', updatedInfo);
      alert('Information Updated!');
      onUpdateRepositoryInfo && onUpdateRepositoryInfo(updatedInfo);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };

  return (
    <div className="about-section">
      <h2 className="about-title">About</h2>

      {isEditing && allowChange ? (
        <form onSubmit={handleUpdate}>
          <div className="input-container">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              cols="50"
            />
          </div>
          <div className="input-container">
            <label htmlFor="githubLink">GitHub Link:</label>
            <input
              id="githubLink"
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
          <div className="controls">
            <button type="submit" className="repo-info-update-button">Update</button>
            <button type="button" onClick={() => setIsEditing(false)} className="repo-info-cancel-button">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <p className="about-description">{description}</p>
          <p className="github-link">
            GitHub link:{" "}
            <a href={githubLink} className="github-link link">{githubLink || "No links provided"}</a>
          </p>
          <div className="divider"></div>

          <div className="languages-section">
            <div className="languages-header">
              <svg
                className="language-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
              <span className="languages-stats-header">Programming languages</span>
            </div>

            <div className="language-list">
              <div className="language-item">{repositoryInfo.language}</div>
            </div>
          </div>

          {allowChange && (
            <>
              <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
              <button onClick={handleDeleteRepository} className="delete-repo-button">Delete Repository</button>
              
            </>
          )}

          {user?.role === "teacher" && (
            <button onClick={() => setShowReviewPopup(true)} className="repo-review-btn">Leave a Review</button>
          )}

          {/* Reviews Section */}
          <div className="reviews-section">
            <h3 className="reviews-title">Reviews</h3>
            {reviews?.length > 0 ? (
              reviews?.map((review) => (
                <div key={review.id} className="review-card">
                  <p><strong>{review.teacher_name}</strong> (Rating: {review.rating})</p>
                  <p>{review.comment}</p>
                  <p><small>Posted on {new Date(review.created_at).toLocaleDateString()}</small></p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* Review Modal Popup */}
          {showReviewPopup && (
            <div className="review-modal-overlay">
              <div className="review-modal-box">
                <h3 className="review-modal-title">Leave a Review</h3>
                <form onSubmit={handleSubmitReview} className="review-modal-form">
                  <label>
                    Comment:
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Rating:
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      required
                    />
                  </label>
                  <div className="review-modal-actions">
                    <button type="submit" className="review-submit-btn">Submit</button>
                    <button type="button" className="review-cancel-btn" onClick={() => setShowReviewPopup(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
