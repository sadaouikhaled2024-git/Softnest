import React, { useEffect, useState } from 'react';
import './MainContent.css';
import RepositoryCard from '../RepositoryCard/RepositoryCard';
import ActivityTimeline from '../ActivityTimeline/ActivityTimeline';
import PageLoader from '../loader/pageloader.jsx';
import { useApiRequest } from '../../hooks/useApiRequest.js';

function MainContent() {
  const {
    data: repositoriesData,
    error,
    loading,
    request,
  } = useApiRequest('http://localhost:3002');

  const [archivedRepos, setArchivedRepos] = useState([]);
  const [likedRepos, setLikedRepos] = useState([]);

  // Fetch liked and archived repositories
  useEffect(() => {
    const fetchData = async () => {
      const liked = await request('/api/users/liked-repositories', 'GET');
      const archived = await request('/api/users/archived-repositories', 'GET');

      if (liked) setLikedRepos(liked);
      if (archived) setArchivedRepos(archived);
    };

    fetchData();
  }, [request]);

  return (
    <div className="profile-main-content">

      {/* Liked Repositories Section */}
      <div className="profile-content-section">
        <h2 className="profile-section-title">Liked Repositories</h2>
        {!loading ? (
          likedRepos.length > 0 ? (
            <div className="repo-grid">
              {likedRepos.map(repo => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>
          ) : (
            <div className='no-archived-repositories'>No liked repositories</div>
          )
        ) : (
          <PageLoader casting={true} black={false} text={true} />
        )}
      </div>

      {/* Archived Repositories Section */}
      <div className="profile-content-section">
        <h2 className="profile-section-title">📦 Archived Repositories</h2>
        {!loading ? (
          archivedRepos.length > 0 ? (
            <div className="repo-grid">
              {archivedRepos.map(repo => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>
          ) : (
            <div className='no-archived-repositories'>Sorry, funtionality disabled at the moment</div>
          )
        ) : (
          <PageLoader casting={true} black={false} text={true} />
        )}
      </div>

      {/* Activity Timeline */}
      <ActivityTimeline />
    </div>
  );
}

export default MainContent;
