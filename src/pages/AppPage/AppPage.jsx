import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import AppCard from "../../components/AppCard/AppCard";
import PageLoader from "../../components/loader/pageloader";
import Sidebar from "../../components/Sidebar/Sidebar";
import './AppPage.css';

const AppPage = () => {
  let { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [newRating, setNewRating] = useState("");
const [newComment, setNewComment] = useState("");

const {data, error , loading , request} = useApiRequest()
  const [app, setApp] = useState({})
  useEffect(()=>{
    const fetchApps = async()=>{
    try{
      const result = await request(`/api/apps/${id}`,'GET')
      setApp(result)
    }catch(err){
  
    }}
    fetchApps()
  },[request])
const handleInstall = () => {
  const downloadUrl = `http://localhost:3002/api/apps/${id}/download`;
  window.open(downloadUrl, '_blank');
};
  const truncatedDescription =
    app?.description?.length > 300 ? app?.description.substring(0, 300) + "..." : app?.description;

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

    return stars;
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        {loading && <PageLoader casting={true} black={true} text={true}/>}

        {!loading && (error) && <div className="error">{error || "Invalid app ID"}</div>}

        {!loading && (
          <div className="app-detail-content">
            <div className="app-detail-layout">
              <div className="app-detail-main">
                {/* App Header */}
                <div className="app-header">
                  <img src={app?.photoUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAADNzc1hYWHk5OQtLS3b29tEREQpKSkmJib7+/vy8vIODg7r6+vV1dX09PQhISFoaGhYWFgRERGcnJytra21tbUICAg+Pj6AgIDCwsIYGBiJiYmGhoZtbW2kpKRQUFA5OTmUlJS9vb0cHBydnZ0yMjLsnM0HAAAHT0lEQVR4nO2d7XbqKhCGS/1KlGg0rdHGXW3l7Pu/xCMJWLUhDAQU2fP8aNfSQHglEJgZ4OUFQRAEQRAEQRAEQRAEQRDEA9n49dGMM1/iZsdtQmBQ4HW2JNvjzLm+jxX09pSRtLIodlkaXb76cKpvPYIXNKkITQpTfTylYdWP1s70zVP4bWnCKv7XqhZNn+5k7kbgzuCelFW8EklhU4nmEsnOgb7pxOSOOVeWm7WoXhymfQUOr0tbbgZdLE/wf50X9WRzUdFVQvKeL4/hZXtarrPev5gDptl6KUqUnNT2kzil5Nyg9gtXRXTAYs+LROsuMO/zs/M22Eh00aTdshN1yIpDv0zqEUrlqFt2ynx0aocszXP7n38uH9C/7sdILlhsaFkVhBFiWwHyRf/XablcshG9RGqXfC275DBrkLOQlWA3gJMziRDboEQ2pJFN4g+ROLxe9BI5pLSZacjpkvNCuUWUcmWeMpMveveFcspelNN8ZHMUKUMaybSxEOU8GqfcirGoh0K5RYxRt8YJkz7d8D0RL7XEOKH1431vZIdhma4MYbrUzZTa1cW4STbxUii3CCPE2DDZa5Ns4KVMbhk0RX01TIYKAwIVKkCFAXEHhdlQAfQV1S8Dzwpn76ucKMkPe52BYLY/dGWwetdaGLwqnAJ8Gtuu2cliq89gpxlX+VR4hPlC1aP3tT7xaeSomRl5VPgGdYX+UWTwB5S6Ssl/j1F4Egh1LLZP3gBPaE3aLdGbwiNJ4a7e95YM3qGJiyTtelB9KZxeCExG7VyU8ne/n118q0gv7ZnVSaK6u/GlcEdY41qcvCr789nrQWr4/PXlp/zq0JHBRzM1KlmhNmp6UjiT5dPY4s695fDmi6H8QmMnkbY0ovwZPCl8hwn8kfh28/mb+LythV6x113oSaGwFwNsAIP2Kye6ZnB7pdLm60mhGGkBjOnStXDzsfgU4BQR7oVc9b0fhbIjBLilpiLW4bo3NbB0ySavGob7USj6CZCRctNce20pEpauDSQD8da57askXhWCnFqttjATWx4qRIXtoEJUeAEq1IIKUWE7tcIyVzm5I1FYpkXkdZiyKuo6LHnwZtQKkyot4u5pGCmSJ1FIrfvSIn8OhfU6DSuFtHiWdkhtFOa0Sp5G4akWLdphmlL2HE+pZU9TN9+oFSbRKySoEKrwOa2JJhZh2lZA8RPRYC3C0qoPyFbUlsKqD4goFEW5s1X/RTgGD/qcRJTy183HX/WnxW+/ovGtPCmUPi9tlLSMiP+++fy7eUpLrW9HuueUfjzfHlKNRClQ5SGlOvfV2dt/bw/pTyDFYK7sLabjJa+m9owGUuLnWJ3BfCBvo47F96VQrnMgfHHwpBWxYrdoq8IfNzdlhKoyuFiErI6s8hZtAopnEtXU2ohkUwat/O5oDP4ihmARTTXtPeanPqFEFVXlVyE4pkkh0EBi54IYn5F7wKgmdbzGXp+Y0x2v4TX6MgPUwkA1nuQMB/oMPjVxtJ4jaIdvnbtKfH136asz+P7qymDypsvgLlHQYwXawgmGvTLASHYFqDAgUKECVBgQqFABKgwIVKgAFQYEKlRgorDf1KArgxBWWMY+P4x+jh+9nSZ6W1v09lK4zZsobd7wfVwfYPOG+C0uBCj8Fs0VYfotYL6nT+mVUPmeePxjmL6ns/9Qs35Q7munXmGp2aTr3Bju7T8E+4ClxHYfMGB936N8wI78+JDd0h7kx48+FiP+eJrgYqKq6OPa8sgV5oTFrZAmVu1QEQbTEJbCIrVSWEf6PIPCZUn4HiQWTymX+BQKSX1kiE07PEl8CoWnmihGlustnkLhIK94YFXUfWl95kvUCimLW6GYvMSskEavsIheYfRP6ePnh6hQCypEhe2gQlR4wVMrjHi/tvj33It/38R/YO9LZ/uXat1zj9q/NP49aF92Msxg8uF/H2FSdkRjeNwLOpU7svveC5qwtKPTjWA/b5Inj1lh+X2vPdlZ8isK4D4K77Wvfpl2CozgbARSPuxshH/gfIuX+M8oaYj7nJkAQIUKUGFAoEIF8SuM/wzL+M8hjf8s2X/gPOD4z3SO/1zu+M9WlzZf8xZ8X0QplfbiDuRCCfVxYCEgp+AA98JvpDEQ4Fp4GNIpAnLz/aLphilJw+1sFoz0eqlxW2E5Cnno9lcITC3T80eg4EaUTZi1OJMC7RvSjtCyHtuwENvivCLCmtmjMzwQkqeB9qhNL1r0nADxcXueNm7qfUiP6uLsdCtAa6fUZKffiMm1qst1FsJkapqtl+SHCrpzg4Ls2r1EJwNvLJfyTyeba09C2VPg6Rfr3BXCIQUjvN9moO1Mz0xcPFUA38Q11KyQDXxlT5EUsP1azzjqAOeJ/lZXlBYSGR+eFFCHZEPi7iW2Hulvd4lFLVZcHEvhexCQkVv7w8dKf8sLDGuxylmZ5izNE5BDkrOymk10MjtuTZ9WXyTbIyDczI5s/PpoYBsPIQiCIAiCIAiCIAiCIAiCmPI//7R5xc55KH8AAAAASUVORK5CYII='} className="app-icon-large"></img>
                  <div className="app-header-info">
                    <h1 className="app-title">{app?.name}</h1>
                    <p className="app-developer">{app?.developer}</p>
                    <div className="app-category-badge">{app?.category}</div>
                    <div className="app-rating-container">
                      <div className="app-rating-stars">{renderStars(app?.averageRating)}</div>
                      <span className="app-rating-value">{app?.averageRating}</span>
                      <span className="app-reviews-count">({app?.userReviews?.length} reviews)</span>
                    </div>
                  </div>
                  <div className="app-header-actions">
                    <button onClick={handleInstall} className="install-button">Install</button>
                  </div>
                </div>

                {/* App Tabs */}
                <div className="app-tabs">
                  <button
                    className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews
                  </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="overview-tab">
                      <div className="app-description">
                        <h2 className="section-title">About this app</h2>
                        <p className="description-text">
                          {showAllDescription ? app?.description : truncatedDescription}
                        </p>
                        {app?.description?.length > 300 && (
                          <button className="read-more-button" onClick={() => setShowAllDescription(!showAllDescription)}>
                            {showAllDescription ? "Read less" : "Read more"}
                          </button>
                        )}
                      </div>
                      <div className="app-info-grid">
                        <div className="info-item">
                          <h3 className="info-title">Updated on</h3>
                          <p className="info-value">{app?.createdAt?.slice(0,10)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === "reviews" && (
                    <div className="reviews-tab">
                      <div className="reviews-summary">
                        <div className="rating-large">
                          <span className="rating-number">{app?.rating}</span>
                          <div className="rating-stars-large">{renderStars(app?.averageRating)}</div>
                          <span className="total-reviews">{app?.reviewCount} reviews</span>
                        </div>
                        <div className="rating-bars">
                          {/* Rating Bars */}
                        </div>
                      </div>

                      <div className="user-reviews">
                        <h2 className="section-title">User Reviews</h2>
                        {app?.userReviews?.map((review) => (
                          <div key={review.id} className="review-item">
                            <div className="review-header">
                              <div className="reviewer-avatar">{review.user.charAt(0)}</div>
                              <div className="reviewer-info">
                                <div className="reviewer-name">{review.user}</div>
                                <div className="review-meta">
                                  <div className="review-rating">{renderStars(review.rating)}</div>
                                  <div className="review-date">{review.date}</div>
                                </div>
                              </div>
                            </div>
                            <p className="review-comment">{review.comment}</p>
                          </div>
                        ))}
                        <button className="load-more-button">Load more reviews</button>
                      </div>
                      <div className="submit-review">
  <h3 className="section-title">Leave a Review</h3>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const body = {
        rating: Number(newRating),
        comment: newComment,
      };

      try {
        await request(`/api/apps/${id}/review`, "POST", body);
        setNewRating(0);
        setNewComment("");
        // Re-fetch app data to include new review
        const result = await request(`/api/apps/${id}`, "GET");
        setApp(result);
      } catch (err) {
        console.error("Review submission failed", err);
      }
    }}
  >
    <div className="form-group">
      <label>Rating</label>
      <select value={newRating} onChange={(e) => setNewRating(e.target.value)} required>
        <option value="">Select a rating</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Star{n > 1 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label>Comment</label>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Share your thoughts..."
        required
      ></textarea>
    </div>
    <button type="submit" className="submit-review-button">
      Submit Review
    </button>
  </form>
</div>

                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AppPage;
