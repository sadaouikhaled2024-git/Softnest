// components/ActivityTimeline.js
import React, { useEffect } from 'react';
import './ActivityTimeline.css';
import like from "../../assets/heart-add.svg"
import review from "../../assets/review.svg"
import save from "../../assets/save-add.svg"
import { useApiRequest } from '../../hooks/useApiRequest';
function ActivityTimeline() {
  const  {data , error, loading , request} = useApiRequest('http://localhost:3002')
  useEffect(()=>{
    request('/api/notifications','GET')
  },[request])
  const notifications = data?.notifications
  const getIconForType = (type) => {
    switch(type) {
      case 'like':
        return (
          <img src={like}/>
        );
      case 'archive':
        return (
          <img src={save}/>
        );
      case 'review':
        return (
          <img src={review}/>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="activity-timeline">
      <h3 className="timeline-header">{Date()}</h3>
      
      <div className="timeline">
        {!loading && notifications && notifications?.map((activity, index) => (
          <div key={activity.id} className="timeline-item">
            <div className="timeline-icon-container">
              <div className={`timeline-icon ${activity.type}`}>
                {getIconForType(activity.type)}
              </div>
              {index < notifications.length - 1 && <div className="timeline-line"></div>}
            </div>
            <div className="timeline-content">
              <h4 className="timeline-title">{activity.message}</h4>
            </div>
          </div>
        ))}
        
        {notifications?.length ==0 && <div className="timeline-item">
          <div className="timeline-icon-container">
            <div className="timeline-icon empty"></div> 
          </div>No Notifications for the moment 
        </div>}
      </div>
    </div>
  );
}

export default ActivityTimeline;