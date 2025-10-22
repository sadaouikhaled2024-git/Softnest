"use client"
import { useEffect, useState } from "react"
import { Search, Filter, CheckCircle, XCircle, Edit, Trash } from "lucide-react"
import Modal from "../ui/Modal"
import { useApiRequest } from "../../hooks/useApiRequest"
import { useNavigate } from "react-router-dom"

export default function AppManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentApp, setCurrentApp] = useState(null)
  const [apps, setApps] = useState([])

  const { data, error, loading, request } = useApiRequest()
  const navigate = useNavigate()
  // Fetch apps on mount
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const result = await request("/api/admin/apps", "GET")
        setApps(result?.apps || [])
      } catch (err) {
        console.error("Failed to fetch apps:", err)
      }
    }
    fetchApps()
  }, [request])

  // Filter apps based on search term and status filter
  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.developer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Update app status (approve/reject)
  const updateApp = async (appId, updates) => {
    try {
      await request(`/api/admin/apps/${appId}/${updates.action}`, "PATCH", updates)
      setApps((prevApps) =>
        prevApps.map((app) => (app.id === appId ? { ...app, ...updates } : app))
      )
    } catch (err) {
      console.error("Failed to update app:", err)
    }
  }

  const handleApproveApp = (appId) => {
    updateApp(appId, { action: "approve", status: "Approved" })
  }

  const handleRejectApp = (appId) => {
    updateApp(appId, { action: "reject", status: "Rejected" })
  }

  // Edit app
  const handleEditApp = (app) => {
    setCurrentApp(app)
    setShowEditModal(true)
  }

  const saveEditedApp = (editedApp) => {
    updateApp(editedApp.id, editedApp)
    setShowEditModal(false)
  }

  // Delete app
  const deleteApp = async (appId) => {
    try {
      await request(`/api/admin/apps/${appId}`, "DELETE")
      setApps((prevApps) => prevApps.filter((app) => app.id !== appId))
    } catch (err) {
      console.error("Failed to delete app:", err)
    }
  }

  const confirmDeleteApp = () => {
    deleteApp(currentApp.id)
    setShowDeleteModal(false)
  }

  return (
    <div className="dashboard-content">
      <h2 className="content-title">App Management</h2>
      <p className="content-subtitle">SoftNest is an app store at heart, right?</p>

      <div className="app-management-tools">
        <div className="search-filter-bar">
          <div className="search-container wide-search">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search apps..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <button className="filter-btn">
              <Filter className="btn-icon" />
              Filter: {filterStatus === "all" ? "All Status" : filterStatus}
            </button>
            <div className="filter-dropdown-content">
              <div className="filter-option" onClick={() => setFilterStatus("all")}>
                All Status
              </div>
              <div className="filter-option" onClick={() => setFilterStatus("Approved")}>
                Approved
              </div>
              <div className="filter-option" onClick={() => setFilterStatus("Pending")}>
                Pending
              </div>
              <div className="filter-option" onClick={() => setFilterStatus("Rejected")}>
                Rejected
              </div>
            </div>
          </div>
        </div>

        <div className="app-list">
          <div className="app-list-header">
            <div className="app-col">App</div>
            <div className="status-col">Status</div>
            <div className="actions-col">Approved ?</div>
          </div>

          {filteredApps?.map((app) => (
            <div  className="app-list-item" key={app.id}>
              <div className="app-col">
                <img className="app-icon" src="data:image/png;base64,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"/>
                <div className="app-info">
                  <div className="app-name">{app.name}</div>
                  <div className="app-developer">{app.developer}</div>
                </div>
              </div>
              <div className="status-col">
                <span style={{color :app?.is_approved ? 'green' : 'orange',textAlign: 'left' }} className={`status ${app?.is_approved}`}>{app?.is_approved ? 'Approved' : 'Rejected or Not Approved yet'}</span>
              </div>
              <div className="actions-col">
                <button
                  className="action-btn"
                  title="Approve"
                  onClick={() => handleApproveApp(app.id)}
                  disabled={app.status === "Approved"}
                >
                  <CheckCircle className="action-btn-icon" color="#fff" />
                </button>
                <button
                  className="action-btn"
                  title="Reject"
                  onClick={() => handleRejectApp(app.id)}
                  disabled={app.status === "Rejected"}
                >
                  <XCircle className="action-btn-icon" color="#fff" />
                </button>
                <button className="action-btn" title="Edit" onClick={() => handleEditApp(app)}>
                  <Edit className="action-btn-icon" color="#fff"/>
                </button>
                <button className="action-btn delete" title="Delete" onClick={() => {
  setCurrentApp(app)
  setShowDeleteModal(true)
}}>
                  <Trash className="action-btn-icon" color="#fff"/>
                </button>
              </div>
            </div>
          ))}

          {filteredApps.length === 0 && <div className="no-results">No apps found</div>}
        </div>
      </div>

      {/* Edit App Modal */}
      {showEditModal && (
        <Modal title="Edit App" onClose={() => setShowEditModal(false)}>
          <div className="modal-form">
            <div className="form-group">
              <label>App Name</label>
              <input
                type="text"
                className="modal-input"
                value={currentApp.name}
                onChange={(e) => setCurrentApp({ ...currentApp, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Developer</label>
              <input
                type="text"
                className="modal-input"
                value={currentApp.developer}
                onChange={(e) => setCurrentApp({ ...currentApp, developer: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Version</label>
              <input
                type="text"
                className="modal-input"
                value={currentApp.version}
                onChange={(e) => setCurrentApp({ ...currentApp, version: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="modal-select"
                value={currentApp.status}
                onChange={(e) => setCurrentApp({ ...currentApp, status: e.target.value })}
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={() => saveEditedApp(currentApp)}>
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete App Modal */}
      {showDeleteModal && (
        <Modal title="Delete App" onClose={() => setShowDeleteModal(false)}>
          <div className="delete-confirmation">
            <p>Are you sure you want to delete app "{currentApp.name}"?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDeleteApp}>
                Delete App
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
