"use client"

import { useEffect, useState } from "react"
import { Search, Filter, Edit, LogOut, Trash } from "lucide-react"
import Modal from "../ui/Modal"
import { useApiRequest } from "../../hooks/useApiRequest"
import { useNavigate } from "react-router-dom"

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  const { data, error, loading, request } = useApiRequest()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await request("/api/admin/users", "GET")
      if (response?.users) {
        const formattedUsers = response.users.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
          signupDate: new Date(user.createdAt).toISOString().split("T")[0],
        }))
        setUsers(formattedUsers)
      }
    }

    fetchUsers()
  }, [request])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === "all" || user.role === filterRole

    return matchesSearch && matchesRole
  })

  const handleEditUser = (user) => {
    setCurrentUser(user)
    setShowEditModal(true)
  }

  const handleDeleteUser = (user) => {
    setCurrentUser(user)
    setShowDeleteModal(true)
  }

  const handleForceLogout = (userId) => {
    alert(`User ${userId} has been logged out`)
  }

  const saveEditedUser = async (editedUser) => {
    try {
      const [firstName, ...lastNameParts] = editedUser.name.split(" ")
      const lastName = lastNameParts.join(" ")
      await request(`/api/admin/users/${editedUser.id}`, "PUT", {
        firstName,
        lastName,
        email: editedUser.email,
        role: editedUser.role.toLowerCase(),
      })
      setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)))
      setShowEditModal(false)
    } catch (err) {
      console.error("Failed to edit user:", err)
    }
  }

  const confirmDeleteUser = async () => {
    try {
      await request(`/api/admin/users/${currentUser.id}`, "DELETE")
      setUsers(users.filter((user) => user.id !== currentUser.id))
      setShowDeleteModal(false)
    } catch (err) {
      console.error("Failed to delete user:", err)
    }
  }
  return (
    <div className="dashboard-content">
      <h2 className="content-title">User Management</h2>
      <p className="content-subtitle">The spine of every empire:</p>

      <div className="user-management-tools">
        <div className="search-filter-bar">
          <div className="search-container wide-search">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <button className="filter-btn">
              <Filter className="btn-icon" />
              Filter: {filterRole === "all" ? "All Roles" : filterRole}
            </button>
            <div className="filter-dropdown-content">
              {["all", "Admin", "Moderator", "User", "Teacher", "Student"].map((role) => (
                <div key={role} className="filter-option" onClick={() => setFilterRole(role)}>
                  {role === "all" ? "All Roles" : role}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="user-list">
          <div className="user-list-header">
            <div className="user-col">User</div>
            <div className="role-col">Role</div>
            <div className="date-col">Signup Date</div>
            <div className="actions-col">Actions</div>
          </div>

          {filteredUsers.map((user) => (
            <div role="button" onClick={()=>navigate(`/user/${user.id}`)} className="user-list-item" key={user.id}>
              <div className="user-col">
                <div className="user-avatar-small">{user?.name?.slice(0, 2)}</div>
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
              </div>
              <div className="role-col">{user.role}</div>
              <div className="date-col">{user.signupDate}</div>
              <div className="actions-col">
                <button className="action-btn" title="Edit User" onClick={() => handleEditUser(user)}>
                  <Edit className="action-btn-icon" color="#fff" />
                </button>
                <button className="action-btn" title="Force Logout" onClick={() => handleForceLogout(user.id)}>
                  <LogOut className="action-btn-icon" color="#fff"/>
                </button>
                <button className="action-btn delete" title="Delete User" onClick={() => handleDeleteUser(user)}>
                  <Trash className="action-btn-icon" color="#fff"/>
                </button>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && <div className="no-results">No users found</div>}
        </div>
      </div>

      {/* Modals... inchangés */}

      {showEditModal && (
        <Modal title="Edit User" onClose={() => setShowEditModal(false)}>
          <div className="modal-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="modal-input"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="modal-input"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                className="modal-select"
                value={currentUser.role}
                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={() => saveEditedUser(currentUser)}>
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal title="Delete User" onClose={() => setShowDeleteModal(false)}>
          <div className="delete-confirmation">
            <p>Are you sure you want to delete user "{currentUser.name}"?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDeleteUser}>
                Delete User
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
