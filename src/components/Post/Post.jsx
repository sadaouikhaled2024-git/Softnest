import "./Post.css"
import temp from '../../images/post_temp.png'
import teacher from '../../assets/teacher-rating.svg'
import updated from '../../assets/updated.svg'
import { useNavigate } from "react-router-dom"
import { useApiRequest } from "../../hooks/useApiRequest"
import { useEffect, useState } from "react"
import heart from '../../assets/Heart.svg'
import heartfull from'../../assets/heart-full.svg'
const Post = ({ postInfo }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const { data: postDetails, error, loading, request } = useApiRequest();

  const fetchPostDetails = async () => {
    await request(`/api/repositories/${postInfo.id}`);
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postInfo.id]);

  useEffect(() => {
    if (postDetails) {
      setIsLiked(postDetails.isLiked);
    }
  }, [postDetails]);

  const handleLike = async () => {
    await request(`/api/repositories/${postInfo.id}/like`, "POST");
    fetchPostDetails(); // re-fetch after liking
  };

  return (
    <div className="post-card">
      <img
        role="button"
        onClick={() => navigate(`/repositories/${postInfo.id}`)}
        className="post-image"
        src={temp}
      />
      <div className="post-content">
        <div className="post-meta">
          <span>Based on your public repository contributions</span>
        </div>

        <div className="post-info">
          <div
            role="button"
            onClick={() => navigate(`/repositories/${postInfo.id}`)}
            className="post-name"
          >
            <span className="post-user">{postDetails?.ownerName}</span>
            <span className="post-separator">/</span>
            <span className="post-project">{postDetails?.name}</span>
          </div>

          <div className="post-likes">
            <span>{postDetails?.stars}</span>
            <div role="button" onClick={handleLike}>
              <img
                className="post-like"
                src={postDetails?.isLiked ? heartfull : heart}
              />
            </div>
          </div>
        </div>

        <div className="post-stats">
          <div className="post-stat-group">
            <div className="post-stat">
              <div className="post-stat-dot">
                
              </div>
              {postDetails?.isCertified && <div className="featured-badge">Certified</div>}
            </div>
            <div className="post-stat">
              <div className="post-stat-dot"></div>
              <span>Programming Language: {postDetails?.language}</span>
            </div>
          </div>
          <div className="post-rating">
            
            <span>rating  </span>
            <span className="rating-value">{postDetails?.rate}</span><img src={teacher} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post
