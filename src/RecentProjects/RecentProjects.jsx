import "./RecentProjects.css"

function RecentProjects() {
  const projects = [
    { id: 1, name: "Frontend Dashboard", language: "JavaScript", stars: 24, forks: 8, updated: "2 days ago" },
    { id: 2, name: "API Service", language: "Python", stars: 18, forks: 5, updated: "5 days ago" },
    { id: 3, name: "Mobile App", language: "React Native", stars: 32, forks: 12, updated: "1 week ago" },
    { id: 4, name: "Documentation", language: "Markdown", stars: 7, forks: 3, updated: "2 weeks ago" },
  ]

  return (
    <div className="recent-projects">
      <div className="section-header">
        <h2 className="section-title">Recent Projects</h2>
        <button className="view-all-button">View All</button>
      </div>
      <div className="projects-table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Language</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="project-name">{project.name}</td>
                <td>{project.language}</td>
                <td>{project.stars}</td>
                <td>{project.forks}</td>
                <td>{project.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentProjects
