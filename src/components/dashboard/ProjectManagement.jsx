import { useState, useEffect } from "react";
import { Search, Filter, Star, Edit, Trash } from "lucide-react";
import Modal from "../ui/Modal";
import { useApiRequest } from "../../hooks/useApiRequest";

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  
  const { data: repos, error, loading, request } = useApiRequest();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
  try {
    const response = await request("/api/repositories", 'GET');
    if (response?.repositories) {
      setProjects(response.repositories);
    } else {
      setProjects([]);
    }
  } catch (err) {
    console.error("Error fetching projects:", err);
  }
};

    fetchProjects();
  }, [request]);

  // Filter projects based on search term and category filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === "all" || project.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle feature project
  const handleFeatureProject = async(projectId) => {
    try {
  const response = await request(`/api/admin/repositories/${projectId}/certify`, 'PATCH');
  console.log("Certify response:", response);
} catch (err) {
  console.error("Error certifying project:", err);
}
    setProjects(
      projects.map((project) => (project.id === projectId ? { ...project, isCertified: !project.isCertified } : project))
    );
  };

  // Handle edit project
  const handleEditProject = (project) => {
    setCurrentProject(project);
    setShowEditModal(true);
  };

  // Handle delete project
  const handleDeleteProject = (project) => {
    setCurrentProject(project);
    setShowDeleteModal(true);
  };

  // Save edited project
  const saveEditedProject = (editedProject) => {
    setProjects(projects.map((project) => (project.id === editedProject.id ? editedProject : project)));
    setShowEditModal(false);
  };

  // Confirm delete project
  const confirmDeleteProject = async () => {
    try {
      // Make a DELETE request to the server to delete the project from the database
      await request(`/api/repositories/${currentProject.id}`, 'DELETE');

      // If successful, update the local state to remove the project from the list
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== currentProject.id)
      );
      setShowDeleteModal(false); // Close the delete modal
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="dashboard-content">
      <h2 className="content-title">Project/Post Management</h2>
      <p className="content-subtitle">Keeping the nest clean:</p>

      <div className="project-management-tools">
        <div className="search-filter-bar">
          <div className="search-container wide-search">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="project-list">
          <div className="project-list-header">
            <div className="project-col">Project</div>
            <div className="author-col">ID</div>
            <div className="date-col">Date</div>
            <div className="actions-col">Actions</div>
          </div>

          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : error ? (
            <div className="error">Error fetching projects: {error.message}</div>
          ) : filteredProjects.length === 0 ? (
            <div className="no-results">No projects found</div>
          ) : (
            filteredProjects.map((project) => (
              <div className="project-list-item" key={project.id}>
                <div className="project-col">
                  <div className="project-icon">P</div>
                  <div className="project-info">
                    <div className="project-name">
                      {project.name}
                      {project.isCertified && <span className="featured-badge">Certified</span>}
                    </div>
                    <div className="project-description">{project.description}</div>
                  </div>
                </div>
                <div className="author-col">{project.id}</div>
                <div className="date-col">{project.createdAt}</div>
                <div className="actions-col">
              
                  <button className="action-btn feature" title="Delete" onClick={() => handleFeatureProject(project.id)}>
                    <Star className="action-btn-icon" color="#fff" />
                  </button>
                  <button className="action-btn delete" title="Delete" onClick={() => handleDeleteProject(project)}>
                    <Trash className="action-btn-icon" color="#fff" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Project Modal */}
      {showEditModal && (
        <Modal title="Edit Project" onClose={() => setShowEditModal(false)}>
          <div className="modal-form">
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                className="modal-input"
                value={currentProject.name}
                onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="modal-textarea"
                rows="3"
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                className="modal-input"
                value={currentProject.author}
                onChange={(e) => setCurrentProject({ ...currentProject, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="modal-select"
                value={currentProject.category}
                onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
              >
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="Desktop">Desktop</option>
              </select>
            </div>
            <div className="form-group">
              <label>Featured</label>
              <div className="toggle-container">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={currentProject.featured}
                  onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                />
                <label htmlFor="featured-toggle" className="toggle-label"></label>
                <span>{currentProject.featured ? "Yes" : "No"}</span>
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={() => saveEditedProject(currentProject)}>
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Project Modal */}
      {showDeleteModal && (
        <Modal title="Delete Project" onClose={() => setShowDeleteModal(false)}>
          <div className="delete-confirmation">
            <p>Are you sure you want to delete project "{currentProject.name}"?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDeleteProject}>
                Delete Project
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
