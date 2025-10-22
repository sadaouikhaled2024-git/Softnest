"use client"

import { useState } from "react"
import { Bell, ChevronDown, Plus, Search } from "lucide-react"

export default function TopNavigation({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showPlusMenu, setShowPlusMenu] = useState(false)

  const notifications = [
    { id: 1, text: "New pull request", time: "5 minutes ago" },
    { id: 2, text: "Your PR was approved", time: "1 hour ago" },
    { id: 3, text: "Issue assigned to you", time: "3 hours ago" },
  ]

  return (
    <div className="top-nav">
      <div className="nav-left">
        <div className="logo" onClick={toggleSidebar}>
          ⬢
        </div>
        <div className="search-container nav-search">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search repositories"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="nav-item dropdown-container">
          EXPLORE
          <ChevronDown className="icon-small" />
          <div className="dropdown-menu">
            <div className="dropdown-item">Explore repositories</div>
            <div className="dropdown-item">Trending</div>
            <div className="dropdown-item">Collections</div>
            <div className="dropdown-item">Events</div>
            <div className="dropdown-item">GitHub Sponsors</div>
          </div>
        </div>
        <div className="nav-item dropdown-container">
          REVIEWS
          <ChevronDown className="icon-small" />
          <div className="dropdown-menu">
            <div className="dropdown-item">Your pull requests</div>
            <div className="dropdown-item">Assigned to you</div>
            <div className="dropdown-item">Mentioned</div>
            <div className="dropdown-item">Review requests</div>
          </div>
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-item">CODESPACES</div>
        <div className="nav-item">EXPLORE</div>
        <div className="nav-actions">
          <div className="notification-container">
            <Bell className="action-icon" onClick={() => setShowNotifications(!showNotifications)} />
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                </div>
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div className="notification-item" key={notification.id}>
                      <div className="notification-text">{notification.text}</div>
                      <div className="notification-time">{notification.time}</div>
                    </div>
                  ))}
                </div>
                <div className="notification-footer">
                  <a href="#">View all notifications</a>
                </div>
              </div>
            )}
          </div>
          <div className="plus-container">
            <Plus className="action-icon" onClick={() => setShowPlusMenu(!showPlusMenu)} />
            {showPlusMenu && (
              <div className="plus-dropdown">
                <div className="dropdown-item">New repository</div>
                <div className="dropdown-item">Import repository</div>
                <div className="dropdown-item">New gist</div>
                <div className="dropdown-item">New organization</div>
                <div className="dropdown-item">New project</div>
              </div>
            )}
          </div>
          <div className="user-avatar" onClick={() => setShowUserMenu(!showUserMenu)}>
            {showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="dropdown-item">Your profile</div>
                <div className="dropdown-item">Your repositories</div>
                <div className="dropdown-item">Your projects</div>
                <div className="dropdown-item">Your stars</div>
                <div className="dropdown-item">Your gists</div>
                <div className="divider"></div>
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item">Sign out</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
