
import RepositoryHeader from "./RepositoryHeader"
import RepositoryList from "./RepositoryList"
import "./RepositoryContent.css"
import { useApiRequest } from "../../hooks/useApiRequest"
import { useEffect } from "react"
export default function RepositoryContent({repository, loading}) {
console.log('repositoy data' + repository)
const {data :user, error , loading : apiloading , request} = useApiRequest("http://localhost:3002")
    useEffect(()=>{
        request(`/api/users/profile`,'GET');
    },[request])
  return (
    <div className="repository-content">
      {repository && <RepositoryHeader ownerId={repository.ownerId} devName={repository.ownerName} projectName={repository.name}/>}
      {repository && <RepositoryList ownerId={repository.ownerId} user={user} repoId={repository.id} loading={loading} />}
      
    </div>
  )
}
