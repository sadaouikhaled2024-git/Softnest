import "./HeroSection.css"
import PersonwithUi from '../../images/personwithui.png'
function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Explore</h1>
          <p className="hero-subtitle">Find our community's submissions</p>
          <button className="explore-button">
            Explore top projects
            <svg className="list-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="hero-image">
          <img
          style={{width : '400px'}}
            src={PersonwithUi}
            alt="Illustration of person with UI elements"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection

