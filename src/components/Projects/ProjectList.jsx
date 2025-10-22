import { useEffect, useState } from "react"
import { useApiRequest } from "../../hooks/useApiRequest"
import ProjectItem from "./ProjectItem"
import "./ProjectList.css"

export default function ProjectList() {

const {data, error , loading , request} = useApiRequest()
const [apps, setApps] = useState([])
useEffect(()=>{
  const fetchApps = async()=>{
  try{
    const result = await request('/api/admin/apps','GET')
    setApps(result?.apps)
  }catch(err){

  }
}
  fetchApps();
},[request])
  return (
    <div className="project-list">
      {!loading && apps && (apps?.map((project) => (
        <ProjectItem key={project.id} project={project} />
      )))}
    </div>
  )
}
