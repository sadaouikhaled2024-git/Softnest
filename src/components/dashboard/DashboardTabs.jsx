"use client"

import { LineChart, Users, Package, PenToolIcon as Tool, Settings, Shield, MessageSquare } from "lucide-react"

export default function DashboardTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard Overview", icon: LineChart },
    { id: "users", label: "User Management", icon: Users },
    { id: "apps", label: "App Management", icon: Package },
    { id: "projects", label: "Project Management", icon: Tool },

  ]

  return (
    <div className="dashboard-tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon className="tab-icon" />
            {tab.label}
          </div>
        )
      })}
    </div>
  )
}
