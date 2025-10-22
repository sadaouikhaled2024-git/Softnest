"use client"
import { useState,useEffect } from "react"
import "./Navbar.css"
import logo from '../../assets/logo_transparent.png'
import { useNavigate } from "react-router-dom"
import { useApiRequest } from "../../hooks/useApiRequest"
function Navbar() {
  const navigate  = useNavigate()
  const handleNavigate = (to)=>{
    navigate(to)
  }
    const { data : userData, error, loading, request } = useApiRequest('http://localhost:3002');
    useEffect(()=>{
      request('/api/users/profile','GET')
    },[request])
    const user = userData
    console.log(user)
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button onClick={()=>handleNavigate('/')} className="logo">
          <img src={logo} className="logo"/>
        </button>
        <div className="search-bar">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search repositories" />
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-links">
          <div
            className="nav-item"
            role="button"
            onClick={()=>handleNavigate('/home')}
          >
            <span>EXPLORE</span>
            
          </div>

          <div
            className="nav-item"
            role="button"
            onClick={()=>handleNavigate('/reviews')}
          >
            <span>REVIEWS</span>
            
          </div>

          <div className="nav-item"
          role="button"
          onClick={()=>handleNavigate('/appstore')}
          
          >
            <span>APPSTORE</span>
          </div>

          <div className="nav-item"
          role="button"
          onClick={()=>handleNavigate('/about')}>
            <span>ABOUT US</span>
          </div>
        </div>
          {
            user && !loading && user.firstName === 'Khaled' && (
              <div className="nav-item"
          role="button"
          onClick={()=>handleNavigate('/Dashboard')}>
            <span>DASHBOARD</span>
          </div>
            )
          }
        <div className="user-controls">
          <svg
            className="bell-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <button onClick={()=> handleNavigate('/home/profile')} className="avatar">
            <img className="navbar-avatar" src={user?.photoUrl}/>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

