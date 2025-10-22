import "./TeamMember.css"

export default function TeamMember({ member }) {
  return (
    <div className="team-member">
      <div className="member-image-container">
        <img src={member.image || "/placeholder.svg"} alt={member.name} className="member-image" />
      </div>
      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
        <p className="member-bio">{member.bio}</p>
      </div>
    </div>
  )
}
