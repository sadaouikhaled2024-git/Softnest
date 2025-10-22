
import React, { useEffect } from 'react';
import './Posts.css';
import Navbar from '../../components/navbar/Navbar';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';

import Footer from '../../components/Footer/Footer';
import Post from '../../components/Post/Post';
import TrendingDevelopers from '../TrendingDevelopers/TrendingDevelopers';
import { useApiRequest } from '../../hooks/useApiRequest';

function Posts() {
  const {data , error , loading , request} = useApiRequest('http://localhost:3002')
  useEffect(()=>{
    request('/api/repositories','GET')
  },[request])
  const repositories = data?.repositories
  return (
    <>
      <Navbar />
      <div className="posts-container">
        <ProfileSidebar />
        <div className='posts'>
            {repositories?.map((repo)=><Post postInfo={repo}/>)}
            
        </div>
        <div className='posts-left'>
          <TrendingDevelopers/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Posts;