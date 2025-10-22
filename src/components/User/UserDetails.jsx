import "./UserDetails.css"
import { useApiRequest } from "../../hooks/useApiRequest"
import { useEffect, useState } from "react"
import RepositoryCard from "../RepositoryCard/RepositoryCard"
import UserStats from "./UserStats"

export default function UserDetails({ userId }) {
  const { data, error, loading, request } = useApiRequest()
  const [repos, setRepos] = useState([])
  const [user ,setUser] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await request(`/api/users/user/${userId}`, "GET") // charge `user`
        const userRepos = await request(`/api/repositories/user/${userId}`, "GET") // charge `repos`
        if (userRepos) setRepos(userRepos)
        if (fetchedUser) setUser(fetchedUser)
      } catch (e) {
        console.error("Error fetching user data", e)
      }
    }

    fetchData()
  }, [request]) // dépend de l'ID du user
  function getTotalStars(repositories) {
    return repositories.reduce((total, repo) => total + (repo.stars || 0), 0)
  }
  return (
    <div className="user-details-container">
      <div className="user-profile-header">
        <div className="user-avatar-container">
          <img
            src={user?.photoUrl}
            alt="Profile"
            width={256}
            height={256}
            className="avatar-image"
          />
        </div>
        <div className="user-info">
          <h1 className="user-name">{user?.firstName + " " + user?.lastName}</h1>
          <p className="user-username">Role : {user?.role}</p>
          <p className="user-followers">119 Followers · 87 Following</p>
          <p className="user-bio">{user?.bio}</p>

          <div className="user-meta">
            <div className="user-location">
              <svg className="meta-icon" /* ... */></svg>
              <span>Bikini Bottom</span>
            </div>
            <div className="user-email">
              <svg className="meta-icon" /* ... */></svg>
              <span>{user?.email}</span>
            </div>
            <div className="user-website">
              <svg className="meta-icon" /* ... */></svg>
              <a
                href={user?.githubLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user?.githubLink || "No link found"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="user-content-grid">
        
        <div className="main-content-area">
          <UserStats totalRepos={repos?.length} totalStars={getTotalStars(repos)}/>
        </div>
        
      </div>
      <div style={{paddingLeft: 15}} className="user-name">Repositories by {user?.firstName}</div>
      <div className="content-wrapper" style={{padding: 16, flexWrap: 'wrap' , justifyContent:'center' , gap: 50}} >
          {repos?.map((repo, index) => (
            <RepositoryCard  key={repo.id || index} repository={repo} />
          ))}
        </div>
    </div>
  )
}
