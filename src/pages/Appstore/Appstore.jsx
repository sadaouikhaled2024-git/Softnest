"use client"

import { useState, useEffect } from "react"
import Navbar from '../../components/navbar/Navbar.jsx'
import HeroSection from "../../components/HeroSection/HeroSection"
import Sidebar from "../../components/Sidebar/Sidebar"
import AppGrid from "../../components/AppGrid/AppGrid"
import Footer from "../../components/Footer/Footer"
import "./Appstore.css"
import { useNavigate } from "react-router-dom"
import { useApiRequest } from "../../hooks/useApiRequest.js"
import { useDebounce } from "../../hooks/useDebounce.js"

function Appstore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Best Match");
  const navigate = useNavigate();
  const handleNavigate = (to) => {
    navigate(to);
  };

 const {data, error , loading , request} = useApiRequest()
  const [apps, setApps] = useState([])
  useEffect(()=>{
    const fetchApps = async()=>{
    try{
      const result = await request('/api/apps','GET')
      setApps(result?.apps)
    }catch(err){
  
    }}
    fetchApps()
  },[request])

  // Debounced search query to improve performance
 

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
 const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const handleSortChange = (option) => {
    setSortOption(option);
  };
  const filteredApps = apps?.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      app.author?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      app.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }) || [];


  return (
    <div className="app-container">
      <Navbar />

      <main className="app-main-content">
        <HeroSection />

        <div className="app-content-section">
          <div className="content-layout">
            
            

            <div className="main-area">
              <div className="search-sort-container appstore">
                <div className="search-container appstore">
                  <input
                    type="text"
                    placeholder="Search for apps"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="search-input appstore"
                  />
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
                </div>

                <div className="sort-dropdown appstore">
                  <button
                    className="sort-button appstore"
                    onClick={() => document.getElementById("sort-options").classList.toggle("show")}
                  >
                    Sort: {sortOption}
                    <svg
                      className="chevron-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div id="sort-options" className="sort-options appstore">
                    <div className="sort-option appstore" onClick={() => handleSortChange("Best Match")}>
                      Best Match
                    </div>
                    <div className="sort-option appstore" onClick={() => handleSortChange("Most Popular")}>
                      Most Popular
                    </div>
                    <div className="sort-option appstore" onClick={() => handleSortChange("Newest")}>
                      Newest
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="section-title">Apps</h2>

              <AppGrid
                apps={filteredApps}
                loading={loading}
              />

              
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Appstore


