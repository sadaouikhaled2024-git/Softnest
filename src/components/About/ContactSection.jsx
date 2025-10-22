import { useApiRequest } from "../../hooks/useApiRequest"
import "./ContactSection.css"
import { useEffect, useState } from "react"
export default function ContactSection() {
  const { data, error, loading, request } = useApiRequest()



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const handleChange = (e)=>{
    const {name , value} = e.target
    setFormData(prev=>({...prev , [name]: value}))
  }
  console.log(formData)
  const handleSubmit = (e)=>{
    e.preventDefault();
    request('/sendemail','POST',formData)
    alert('Email sent!')
  }
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="contact-section-title">Get in Touch</h2>
          <p className="contact-description">
            Have questions about SoftNest? We'd love to hear from you. Reach out to our team and we'll get back to you as
            soon as possible.
          </p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-details">
                <h3 className="contact-method-title">Email Us</h3>
                <p className="contact-method-value">k_sadaoui@estin.dz</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-details">
                <h3 className="contact-method-title">Call Us</h3>
                <p className="contact-method-value">Don't call</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="contact-details">
                <h3 className="contact-method-title">Visit Us</h3>
                <p className="contact-method-value">ESTIN, Amizour, Béjaia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input name="name" value={formData.name} onChange={handleChange} type="text" id="name" className="form-input" placeholder="Your name" />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input name="email" value={formData.email} onChange={handleChange} type="email" id="email" className="form-input" placeholder="Your email" />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input name="subject" value={formData.subject} onChange={handleChange} type="text" id="subject" className="form-input" placeholder="Subject" />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea name="message" value={formData.message} onChange={handleChange} id="message" className="form-textarea" placeholder="Your message" rows="5"></textarea>
            </div>

            <button type="submit"  className="submit-button">
              Send Message
            </button>
          </form>
          {loading && (<>'sending...'</>)}
          {error && (
            <div className="error-message">
              {error.response ? (
                <p>Error: {error.response.data.message || error.message}</p>
              ) : (
                <p>An error occurred. Please try again later.</p>
              )}
            </div>)}
        </div>
      </div>
    </section>
  )
}
