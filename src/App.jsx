import { Routes, Route } from "react-router-dom";
import React from 'react';
import LoginPage from "./pages/loginpage/login.jsx";
import './App.css'
import Home from "./pages/home/home.jsx";

import Appstore from "./pages/Appstore/Appstore.jsx";
import Profile from "./pages/Main/Profile.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import AppPage from "./pages/AppPage/AppPage.jsx";
import RepositoryPage from "./pages/RepositoryPage/RepositoryPage.jsx";
import About from "./pages/About/About.jsx";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "./hooks/useApiRequest.js";
import { useEffect } from "react";
import UserProfile from "./pages/UserPage/UserPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ReviewPage from "./pages/Reviews/Reviews.jsx";
import './App.css'
function App() {
  const { data : userData, error, loading, request } = useApiRequest('http://localhost:3002');
  useEffect(()=>{
    request('/api/users/profile','GET')
  },[request])
  const user = userData?._json
  const adminUser =user && user.name === 'Khaled SADAOUI' && !loading ? user : null

  return (
    
      (<Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appstore" element={<Appstore />} />
        <Route path="/home/profile" element={<Profile/>}/>
        <Route path="/home" element={<Posts/>}/>
        <Route path="/appstore/app/:id" element={<AppPage/>}/>
        <Route path="/repositories/:repoid" element={<RepositoryPage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/user/:userid" element={<UserProfile/>}/>
        <Route path="/Dashboard" element={<Dashboard adminUser={adminUser} />}/>
        <Route path="/reviews" element={<ReviewPage/>}/>
    </Routes>  )  
  );
}

export default App;
