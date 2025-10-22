import { useNavigate } from "react-router-dom"
import "./TrendingDevelopers.css"
import { useApiRequest } from "../../hooks/useApiRequest"
import { useEffect } from "react"




const TrendingDevelopers = () => {
  const {data , error , loading , request} = useApiRequest()
useEffect(()=>{
  request('/api/repositories','GET')
},[request])
const repositories = data?.repositories
  const navigate = useNavigate()
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Trending repositories</h3>
      </div>
      <div className="card-content no-padding">
        <div className="dev-list">
          {repositories?.slice(0,5).map((repo, index) => (
            <div key={index} className="dev-item">
              
              <div className="dev-info">
                <div role="button" onClick={()=> navigate(`/repositories/${repo.id}`)} className="dev-name">{repo.name}</div>
                <div className="dev-username">{}</div>
                {repo.description && (
                  <div className="dev-project">
                    
                    <span>{repo.description}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrendingDevelopers

