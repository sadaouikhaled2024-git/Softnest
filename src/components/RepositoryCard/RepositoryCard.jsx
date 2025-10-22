// components/RepositoryCard.js
import React from 'react';
import './RepositoryCard.css';
import { useNavigate } from 'react-router-dom';

function RepositoryCard({ repository }) {
  const navigate = useNavigate()
  const getLanguageColor = (lang) => {
    switch(lang.toLowerCase()) {
      case 'python':
        return '#3572A5';
      case 'javascript':
        return '#f1e05a';
      default:
        return '#8b949e';
    }
  };
  
  return (
    <div className="repository-card">
      <div className="repo-header">
        <div role='button' onClick={()=>navigate(`/repositories/${repository.id}`)} className="repo-title">
          <svg className="repo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3h18v18H3zM13 3v18M3 13h18"></path>
          </svg>
          <span role='button' className="repo-name">{repository.name}</span>
        </div>
        <div className={`repo-visibility ${repository.isPublic ? 'public' : 'private'}`}>
          {repository.isPublic ? 'Public' : 'Private'}
        </div>
        <div className="bookmark-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill={repository.isArchived ? 'blue' : 'none'} stroke={repository.isArchived ? 'blue': 'currentcolor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </div>
      <p className="repo-description">{repository.description}</p>
      <div className="repo-footer">
        <div className="language-indicator">
          <span 
            className="language-color" 
            style={{ backgroundColor: getLanguageColor(repository.language) }}
          ></span>
          <span className="language-name">{repository.language}</span>
        </div>
        <div className="stars-count">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill={repository.isLiked ? '#8A2BE2' : 'none'} stroke={repository.isLiked ? '#8A2BE2' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{repository.stars}</span>
        </div>
      </div>
    </div>
  );
}

export default RepositoryCard;