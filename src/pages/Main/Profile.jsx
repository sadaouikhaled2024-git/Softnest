
import React, { act } from 'react';
import './Profile.css';
import Navbar from '../../components/navbar/Navbar';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import MainContent from '../../components/MainContent/MainContent';
import Footer from '../../components/Footer/Footer';
import Tabs from '../../components/Tabs/Tabs';
import { useState, useEffect } from 'react';
import { useApiRequest } from '../../hooks/useApiRequest';
import RepoList from '../../components/repo-list/repo-list';
import ProjectsContent from '../../components/Projects/ProjectsContent';
import SettingsContent from '../../components/Settings/SettingsContent';
function Profile() {
  const [activeTab, setActiveTab] = useState('general');

    return (
    <div style={{backgroundColor : '#10161D'}}>
      <Navbar />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={activeTab != 'settings' ?"main-container" : 'main-container center'}>
        {activeTab != 'settings' && <ProfileSidebar />}
        {activeTab == 'general' &&
        <MainContent />
        }
        {
          activeTab == 'repositories' && <RepoList repositories={''}/>
        }
        {
          activeTab == 'projects' && <ProjectsContent/>
        }
        {
          activeTab == 'settings' && <SettingsContent/>
        }
      </div>
      <Footer />
    </div>
  );
}

export default Profile;