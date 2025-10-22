import SearchBar from "./SearchBar"
import ProjectsHeader from "./ProjectsHeader"
import ProjectList from "./ProjectList"
import "./ProjectsContent.css"
import AddAppForm from "./addAppForm"
export default function ProjectsContent() {
  
  return (
    <div className="projects-content">
      <SearchBar />
      <div className="projects-container">
        <ProjectsHeader />
        <ProjectList />
        <AddAppForm />
      </div>
    </div>
  )
}
