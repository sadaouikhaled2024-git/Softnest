import TeamMember from "./TeamMember"
import "./TeamSection.css"
import yanis from '../../images/yanisouldchix.jpg'
import anis from '../../images/anisouaret.jpg'
import khaled from '../../images/khaled.jpg'
import zino from '../../images/zino.jpg'
import iles from '../../images/iles.jpg'
export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Anis Ouaret",
      role: "Project Leader",
      image: anis,
      bio: "ESTIN STUDENT",
    },
    {
      id: 5,
      name: "Yanis Laarbi Ould Chikh",
      role: "BackEnd dev team member",
      image: yanis,
      bio: "Waaaa laarvi",
    },
    {
      id: 2,
      name: "Khaled Sadaoui",
      role: "Head of frontEnd Dev Team",
      image: khaled,
      bio: "Works with React",
    },
    {
      id: 3,
      name: "Zineddine Mekhlouf",
      role: "Head of Design",
      image: zino,
      bio: "Works with PIGMA",
    },
    {
      id: 4,
      name: "Iles Aissou",
      role: "Head of backEnd Dev Team",
      image: iles,
      bio: "SUUUUUUUUU",
    },
    
  ]

  return (
    <section className="team-section">
      <h2 className="team-section-title">Meet Our Team</h2>
      <p className="team-section-desciption">
        We're a diverse team of developers, designers, and product thinkers passionate about building tools that improve
        the developer experience.
      </p>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <TeamMember key={member.id} member={member} />
        ))}
      </div>
    </section>
  )
}
