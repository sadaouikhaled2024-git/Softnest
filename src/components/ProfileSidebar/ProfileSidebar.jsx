import React, { useEffect } from 'react';
import './ProfileSidebar.css';
import temp from '../../images/profile_temp.png'
import { useApiRequest } from '../../hooks/useApiRequest';
import PageLoader from '../loader/pageloader';

function ProfileSidebar() {
  const {data , error , loading , request} = useApiRequest('http://localhost:3002')

  useEffect(()=>{
    request('/api/users/profile', 'GET')
  },[request])

  const user = data

  const [imgLoading, setImgLoading] = React.useState(true);

  console.log('user is :' + user)
  return (
    <div className="profile-sidebar">
      <div className="profile-avatar-container">
        {imgLoading && <PageLoader casting={true } />}
        <img 
          src={user?.photoUrl} 
          alt="Khaled SADAOUI" 
          className="profile-avatar" 
          style={imgLoading ? { } : {}}
          onLoad={() => setImgLoading(false)}
          onError={() => setImgLoading(false)}
        />
      </div>
      
      {(!loading && user) && (
        <><h1 className="profile-name">{user.firstName + ' ' + user.lastName}</h1>

      <div className="profile-bio">
        {user.bio}
      </div>
      <div className="profile-identifier">{user.id}</div>
      <div className="profile-email">{user.email}</div>
      <div className="profile-email">{'Role : ' + user.role}</div></>)}
    </div>
  );
}

export default ProfileSidebar;