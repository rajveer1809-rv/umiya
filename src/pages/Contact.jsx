import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Color Consultation',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submit
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: 'Color Consultation', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      {/* Banner */}
      <section className="inner-page-banner">
        <div className="container-xl">
          <ScrollReveal>
            <h1>Contact Us</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> Contact Us
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container-xl">
          <div className="contact-grid">
            
            {/* Left Column: Info Block */}
            <ScrollReveal animation="fade-in-left">
              <div className="contact-info-block">
                <h3 className="contact-info-title">Consultation Offices</h3>
                
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div className="contact-method-detail">
                    <h4>Flagship Showroom</h4>
                    <p>GF-28 Centre Point, Opp. GIDC Police Station, Ankleshwar</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="contact-method-detail">
                    <h4>Phone Number</h4>
                    <p>+91 88661 17573</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="contact-method-detail">
                    <h4>Email Support</h4>
                    <p>umiyapaint@yahoo.co.in</p>
                  </div>
                </div>

                <div className="contact-method" style={{ marginBottom: 0 }}>
                  <div className="contact-method-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="contact-method-detail">
                    <h4>Working Hours</h4>
                    <p>Mon - Sat: 09:00 - 20:00<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Form */}
            <ScrollReveal animation="fade-in-right">
              <div className="contact-form-wrapper">
                <h3 className="contact-form-title">Send Us A Message</h3>
                
                {isSubmitted ? (
                  <div style={{ 
                    backgroundColor: 'var(--color-gold-light)', 
                    color: 'var(--color-gold-dark)', 
                    padding: '24px', 
                    borderRadius: '8px', 
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '15px'
                  }}>
                    Thank you! Your message has been sent successfully. One of our color consultants will contact you shortly.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          className="form-control" 
                          required 
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          className="form-control" 
                          required 
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        className="form-control" 
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select 
                        id="subject" 
                        name="subject" 
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="Color Consultation">Color Consultation</option>
                        <option value="Residential Painting">Residential Painting Estimate</option>
                        <option value="Commercial Inquiry">Commercial Inquiry</option>
                        <option value="Product Question">Product & shade formulation</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        className="form-control" 
                        rows={5} 
                        required
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-solid-dark" style={{ width: '100%', justifyContent: 'center' }}>
                      Send Message ➔
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  )
}
