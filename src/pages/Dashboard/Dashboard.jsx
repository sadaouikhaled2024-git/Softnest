"use client"

import { useEffect, useState } from "react"

import TopNavigation from "../../components/dashboard/TopNavigation"
import DashboardTabs from "../../components/dashboard/DashboardTabs"
import DashboardOverview from "../../components/dashboard/DashboardOverview"
import UserManagement from "../../components/dashboard/UserManagement"
import AppManagement from "../../components/dashboard/AppManagement"
import ProjectManagement from "../../components/dashboard/ProjectManagement"

import "./Dashboard.css"
import Navbar from "../../components/navbar/Navbar"
import { useApiRequest } from "../../hooks/useApiRequest"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [Users, setUsers] = useState([])
  const [apps, setApps] = useState([])
  const [repositories, setRepositories] = useState([])
  const {data ,error, loading ,request} = useApiRequest()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedUsers, fetchedApps, fetchedRepos] = await Promise.all([
          request('/api/admin/users'),
          request('/api/admin/apps'),
          request('/api/repositories'),
        ])
  
        if (fetchedUsers) setUsers(fetchedUsers)
        if (fetchedApps) setApps(fetchedApps)
        if (fetchedRepos) setRepositories(fetchedRepos)
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      }
    }
  
    fetchData()
  }, [request])
  const stats = {
      users: Users?.pagination?.totalCount || 0,
      apps: apps?.apps?.length || 0,
      projects: repositories?.repositories?.length || 0,
  }

  const recentActivities = [
    { id: 1, title: "New user registered", time: "2 minutes ago" },
    { id: 2, title: "App submission approved", time: "15 minutes ago" },
    { id: 3, title: "Project featured", time: "1 hour ago" },
    { id: 4, title: "Support ticket resolved", time: "3 hours ago" },
  ]

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview stats={stats} recentActivities={recentActivities} />
      case "users":
        return <UserManagement />
      case "apps":
        return <AppManagement />
      case "projects":
        return <ProjectManagement />

      default:
        return <DashboardOverview stats={stats} recentActivities={recentActivities} />
    }
  }

  return (
    <div className="github-interface">
      <div className={`main-content ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>
        <Navbar/>
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content-area">{renderTabContent()}</div>
      </div>
    </div>
  )
}
