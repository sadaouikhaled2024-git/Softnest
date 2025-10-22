import "./AboutHeroSection.css"
import logo from '../../assets/Logo-03.svg'
export default function AboutHeroSection() {
  return (
    <section className="about-hero-section">
      <div className="about-hero-content">
        <h1 className="about-hero-title">THE PLACE WHERE ESTIN STUDENTS NEST THEIR PROJECTS</h1>
        <p className="about-hero-description">
          SoftNest is a platform designed to showcase the projects of ESTIN students, providing a space for collaboration, learning, and innovation.   
        </p>
      </div>
      <div className="about-hero-image">
        <img src={logo} alt="DevHub Team" className="about-hero-img" />
      </div>
    </section>
  )
}
