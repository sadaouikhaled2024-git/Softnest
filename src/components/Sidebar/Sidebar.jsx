"use client"

import { useState } from "react"
import "./Sidebar.css"

function Sidebar({ selectedCategory, onCategoryChange }) {
  const [showFilters, setShowFilters] = useState(false)

  const types = ["Desktop Apps", "Website", "Mobile Apps"]
  const categories = ["Educational", "Games", "Social media", "Sports", "AI", "Professional", "Start-Ups"]

  return (
    <div className="sidebar-app">
      <div className="sidebar-section-app">
        <h3 className="sidebar-title-app">Types</h3>
        <ul className="sidebar-list-app">
          {types.map((type) => (
            <li
              key={type}
              className={`sidebar-item-app ${selectedCategory === type ? "active" : ""}`}
              onClick={() => onCategoryChange(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section-app">
        <h3 className="sidebar-title-app">Categories</h3>
        <ul className="sidebar-list-app">
          {categories.map((category) => (
            <li
              key={category}
              className={`sidebar-item-app ${selectedCategory === category ? "active" : ""}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="filters-section">
        <button className="filters-button" onClick={() => setShowFilters(!showFilters)}>
          Filters
          <svg
            className={`chevron-icon ${showFilters ? "rotate" : ""}`}
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

        {showFilters && (
          <div className="filters-content">
            <div className="filter-group">
              <h4 className="filter-title">Rating</h4>
              <label className="filter-checkbox">
                <input type="checkbox" /> 5 stars
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> 4+ stars
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> 3+ stars
              </label>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Status</h4>
              <label className="filter-checkbox">
                <input type="checkbox" /> Recommended
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> New
              </label>
              <label className="filter-checkbox">
                <input type="checkbox" /> Popular
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar

