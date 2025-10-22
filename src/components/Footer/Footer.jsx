import "./Footer.css"
import logo from '../../assets/logo.svg'
import estin from '../../images/Estin.png'
import vercel from '../../assets/Vercel-dark.svg'
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
              src={logo}
              style={{width: 50}}
              />
            </div>
            <span className="footer-brand-name">SoftNest</span>
          </div>

          <div className="footer-links">
            <ul className="footer-link-list">
              <li>
                <a href="#" className="footer-link">
                  Home page
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Inspirations
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <ul className="footer-link-list">
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  FAQS
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Inspiration
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contacts
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-powered">
            <p className="powered-text">POWERED BY</p>
            <div className="powered-logos">
              <div className="powered-logo">
                <img src={estin} alt="ESTIN logo" />
              </div>
              <div className="powered-logo">
                <img src={vercel} alt="Vercel logo" />
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            Droits d'auteur 2025, Developped By Kabylie Boys, Vive Le MAK, Vive Tagrawa,Vive Ferhat Mehenni!, ESTIN
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 16.64C16.18 17.1 15.55 17.32 14.86 17.32C14.14 17.32 13.54 17.1 13.06 16.64C12.58 16.18 12.34 15.55 12.34 14.86C12.34 14.14 12.58 13.54 13.06 13.06C13.54 12.58 14.14 12.34 14.86 12.34C15.55 12.34 16.18 12.58 16.64 13.06C17.1 13.54 17.32 14.14 17.32 14.86C17.32 15.55 17.1 16.18 16.64 16.64ZM16.64 10.94C16.18 11.4 15.55 11.62 14.86 11.62C14.14 11.62 13.54 11.4 13.06 10.94C12.58 10.48 12.34 9.85 12.34 9.16C12.34 8.44 12.58 7.84 13.06 7.36C13.54 6.88 14.14 6.64 14.86 6.64C15.55 6.64 16.18 6.88 16.64 7.36C17.1 7.84 17.32 8.44 17.32 9.16C17.32 9.85 17.1 10.48 16.64 10.94ZM10.94 16.64C10.48 17.1 9.85 17.32 9.16 17.32C8.44 17.32 7.84 17.1 7.36 16.64C6.88 16.18 6.64 15.55 6.64 14.86C6.64 14.14 6.88 13.54 7.36 13.06C7.84 12.58 8.44 12.34 9.16 12.34C9.85 12.34 10.48 12.58 10.94 13.06C11.4 13.54 11.62 14.14 11.62 14.86C11.62 15.55 11.4 16.18 10.94 16.64ZM10.94 10.94C10.48 11.4 9.85 11.62 9.16 11.62C8.44 11.62 7.84 11.4 7.36 10.94C6.88 10.48 6.64 9.85 6.64 9.16C6.64 8.44 6.88 7.84 7.36 7.36C7.84 6.88 8.44 6.64 9.16 6.64C9.85 6.64 10.48 6.88 10.94 7.36C11.4 7.84 11.62 8.44 11.62 9.16C11.62 9.85 11.4 10.48 10.94 10.94Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

