import React, { useEffect, useState } from "react";
import "./AllReviews.css";
import teacherIcon from '../../assets/teacher-rating.svg'
import { useApiRequest } from "../../hooks/useApiRequest";
import { useNavigate } from "react-router-dom";


const AllReviews = () => {
const [reviews, setReviews] = useState()
const {data , error , loading , request }= useApiRequest()
const navigate = useNavigate()
const fetchReviews = async()=>{
    try{
        const result = await request('/api/repositories/reviews','GET')
        setReviews(result)
    } catch (err)
    {
        console.error('failed to fetch reviews', err)
    }
}
useEffect(()=>{
    fetchReviews()
},[])
  return (
    <div className="reviews-container">
      <h2 className="page-title">✨ All Repository Reviews</h2>
      {reviews?.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <div role="button" onClick={()=>navigate(`/repositories/${review.repository_id}`)} className="repo-name">{review.repository_name}</div>
            <span className="review-rating">
                <img className="teacherIcon" src={teacherIcon}/>
                 {review.rating}</span>
          </div>
          <div className="review-body">
            <p className="review-comment">"{review.comment}"</p>
          </div>
          <div className="review-footer">
            <span className="teacher-name">By the teacher : 
               <div className="teacher-name-button" role="button" onClick={()=>navigate(`/user/${review.teacher_id}`)}> {review.teacher_name}</div>
                </span>
            <span className="review-date">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllReviews;
