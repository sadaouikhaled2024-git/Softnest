
import React from 'react';

import Navbar from '../../components/navbar/Navbar';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';

import Footer from '../../components/Footer/Footer';

import TrendingDevelopers from '../TrendingDevelopers/TrendingDevelopers';
import MainContent from '../../components/MainContent/MainContent';


function Projects() {
  return (
    <>
      <Navbar />
      <div className="posts-container">
        <ProfileSidebar />
        <MainContent/>
        </div>
        
      <Footer />
    </>
  );
}

export default Projects;