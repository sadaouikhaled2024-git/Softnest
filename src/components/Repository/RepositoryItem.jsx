import "./RepositoryItem.css"

export default function RepositoryItem({ repository }) {
  return (
    <div className="repository-item">
      <div className="repository-name">{repository.name}</div>
      <div className="repository-message">{repository.message}</div>
      <div className="repository-time">{repository.timeAgo}</div>
    </div>
  )
}
