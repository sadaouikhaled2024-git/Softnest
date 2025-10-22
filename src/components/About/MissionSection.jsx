import "./MissionSection.css"

export default function MissionSection() {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <div className="mission-content">
          <h2 className="mission-section-title">Our Mission</h2>
          <p className="mission-text">
            We're on a mission to make collaboration seamless for developers everywhere. We believe in breaking down
            barriers between developers and helping teams build faster together.
          </p>
        </div>

        <div className="values-container">
          <div className="value-card">
            <div className="value-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="value-title">Excellence</h3>
            <p className="value-description">
              We strive for excellence in everything we do, from code quality to customer support.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="value-title">Community</h3>
            <p className="value-description">
              We believe in the power of community and work to foster an inclusive environment for all developers.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 className="value-title">Innovation</h3>
            <p className="value-description">
              We constantly push the boundaries of what's possible to create better tools for developers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
