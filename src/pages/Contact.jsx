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

  const contactCards = [
    {
      title: 'Our Showroom',
      desc: 'GF-28 Centre Point, Opp. GIDC Police Station, Ankleshwar, Gujarat',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      )
    },
    {
      title: 'Call Support',
      desc: '+91 88661 17573',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      )
    },
    {
      title: 'Email Address',
      desc: 'umiyapaint@yahoo.co.in / inquiry@umiya.com',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      )
    },
    {
      title: 'Working Hours',
      desc: 'Mon - Sat: 09:00 - 20:00 (Sunday Closed)',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      )
    }
  ]

  const helperServices = [
    {
      title: 'Shade Formulation',
      desc: 'Mix custom shades instantly. Wetint color paints using electronic Colourworld dispensers.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.05 15.11a2 2 0 00-1.022.547l-1.39 1.39a2 2 0 00.586 3.414l5.122 1.024a8 8 0 005.122-1.024l5.122-1.024a2 2 0 00.586-3.414l-1.39-1.39zM12 2a5 5 0 00-5 5v3a5 5 0 0010 0V7a5 5 0 00-5-5z"/>
        </svg>
      )
    },
    {
      title: 'Dampness Analysis',
      desc: 'Struggling with wall damping or flaking? Our waterproofing engineers inspect leaking sources.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.548 2.2a2 2 0 01-1.96 1.414H9.663a2 2 0 01-1.96-1.414l-.548-2.2A2 2 0 005.195 15.4l-2.387.478a2 2 0 00-.586 3.414l1.39 1.39a8 8 0 005.122 1.024h6.532a8 8 0 005.122-1.024l1.39-1.39a2 2 0 00-.586-3.414zM12 3c-1.2 0-3.6 1.8-3.6 4.8 0 2 1.6 3.6 3.6 3.6s3.6-1.6 3.6-3.6C15.6 4.8 13.2 3 12 3z"/>
        </svg>
      )
    },
    {
      title: 'Contractor Toolkits',
      desc: 'We package custom paint brushes, felt rollers, masking tape, and dust scrapers under one roof.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.77.77M9.53 16.122l.75-1.268a1 1 0 00-.175-1.242l-2.586-2.586a1 1 0 00-1.242-.175l-1.268.75"/>
        </svg>
      )
    },
    {
      title: 'Bulk Depot Estimates',
      desc: 'Request factory-direct estimates for high-volume commercial projects with freight matching.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 2v-6m-9-9h18a2 2 0 012 2v18a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z"/>
        </svg>
      )
    }
  ]

  const galleryPhotos = [
    { title: 'Paint Display Shelves', category: 'Decorative Paints', image: '/about_interior.png' },
    { title: 'Tinting Dispenser Lab', category: 'Color Matching', image: '/about_detail.png' },
    { title: 'Depot Stock Warehouse', category: 'Bulk Deliveries', image: '/hero.png' },
    { title: 'Applicator & Brushes Shelf', category: 'Tools Accessories', image: '/images/products/asian-paints-trucare-interior-wall-roller.png' }
  ]

  return (
    <>
      {/* 1. Contact Page Hero Banner */}
      <section className="inner-page-banner banner-contact">
        <div className="container-xl">
          <ScrollReveal>
            <h1>Contact Us</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> Contact Us
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Contact Cards */}
      <section className="contact-cards-section">
        <div className="container-xl">
          <div className="contact-cards-grid">
            {contactCards.map((card, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} animation="fade-in-up">
                <div className="contact-card-item">
                  <div className="contact-card-icon">
                    {card.icon}
                  </div>
                  <h3 className="contact-card-title">{card.title}</h3>
                  <p className="contact-card-desc">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Form + Store Image */}
      <section className="contact-form-section">
        <div className="container-xl">
          <div className="contact-form-grid">
            
            {/* Form Column */}
            <ScrollReveal animation="fade-in-left">
              <div className="contact-form-wrapper" style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 className="contact-form-title" style={{ fontSize: '22px', fontWeight: 600, marginBottom: '24px' }}>Send Us A Message</h3>
                
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
                    <div className="form-group-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Full Name</label>
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
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Email Address</label>
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

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label htmlFor="phone" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        className="form-control" 
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label htmlFor="subject" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Subject / Consultation Type</label>
                      <select 
                        id="subject" 
                        name="subject" 
                        className="form-control"
                        value={formData.subject}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      >
                        <option value="Color Consultation">Color Consultation</option>
                        <option value="Waterproofing Estimate">Waterproofing / Dampness Estimate</option>
                        <option value="Bulk Supply Inquiry">Bulk Store / Contractor Supply</option>
                        <option value="Product Formulation">Product & Tinting formulation</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '24px' }}>
                      <label htmlFor="message" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Message Details</label>
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

                    <button type="submit" className="btn-solid-dark" style={{ width: '100%', justifyContent: 'center', padding: '16px 24px', fontSize: '14px', fontWeight: 600 }}>
                      Send Message ➔
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Store Image Column */}
            <ScrollReveal animation="fade-in-right">
              <div className="store-image-wrapper">
                <img src="/about_interior.png" alt="Umiya Hardware & Paints Showroom" />
                <div className="store-image-overlay">
                  <h4>Umiya Showroom</h4>
                  <p>GF-28 Centre Point, Opp. GIDC Police Station, Ankleshwar. Drop in to test our coatings catalog, inspect wood panel stains, and consult paint color coordinators.</p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 4. Services We Help With */}
      <section className="contact-services-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">What We Do</span>
              <h2 className="section-title-centered" style={{ fontSize: '28px', fontWeight: 700 }}>Services We Help With</h2>
            </div>
          </ScrollReveal>

          <div className="contact-services-grid">
            {helperServices.map((service, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} animation="fade-in-up">
                <div className="contact-service-card">
                  <div className="contact-service-icon">
                    {service.icon}
                  </div>
                  <h3 className="contact-service-title">{service.title}</h3>
                  <p className="contact-service-desc">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Store Gallery */}
      <section className="store-gallery-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle-centered">Umiya Store Tour</span>
              <h2 className="section-title-centered" style={{ fontSize: '28px', fontWeight: 700 }}>Store Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="store-gallery-grid">
            {galleryPhotos.map((photo, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} animation="zoom-in">
                <div className="gallery-photo-wrapper">
                  <img src={photo.image} alt={photo.title} />
                  <div className="gallery-photo-overlay">
                    <div style={{ textAlign: 'center', padding: '15px' }}>
                      <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '4px' }}>
                        {photo.category}
                      </span>
                      <span>{photo.title}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Google Map */}
      <section className="contact-map-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle-centered">Find Us</span>
              <h2 className="section-title-centered" style={{ fontSize: '28px', fontWeight: 700 }}>Visit Our Location</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up">
            <div className="map-card-wrapper">
              <iframe 
                title="Google Map: Centre Point Ankleshwar GIDC"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.353344603953!2d72.99961601490214!3d21.785834985593888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8849b29cb25%3A0xe03203960303e0e!2sCentre%20Point%2C%20Ankleshwar%20GIDC%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Call-To-Action */}
      <section style={{ padding: '0 0 100px 0' }}>
        <div className="container-xl" style={{ maxWidth: '900px' }}>
          <ScrollReveal animation="zoom-in">
            <div className="about-textured-cta" style={{ backgroundImage: "linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(17, 17, 17, 0.95) 100%), url('/page_banner_contact.png')" }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' }}>
                Looking for Immediate Coating Advice?
              </h2>
              <p className="about-text" style={{ marginBottom: '30px', fontSize: '15px', maxWidth: '650px', lineHeight: 1.7 }}>
                Chat directly with our showroom executives via WhatsApp or send us an email. We verify batch numbers and supply paint directly to your site.
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a 
                  href="https://wa.me/918866117573?text=Hi%2C%20I%20have%20an%20inquiry%20regarding%20paints%20and%20coatings." 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-solid-dark" 
                  style={{ backgroundColor: '#25D366', color: '#FFFFFF', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style={{ marginTop: '2px' }}>
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.1 1.87 11.75 1.87 6.31 1.87 1.88 6.29 1.876 11.737c-.001 1.637.498 3.23 1.446 4.82L2.39 21.02l4.257-1.866zm12.355-6.233c-.328-.164-1.942-.96-2.242-1.07-.3-.11-.518-.164-.736.164-.218.327-.844 1.07-1.034 1.289-.19.217-.38.245-.708.081-.328-.163-1.385-.51-2.638-1.627-.975-.87-1.633-1.946-1.824-2.274-.19-.328-.02-.505.143-.668.148-.147.328-.382.492-.573.164-.19.218-.328.328-.546.11-.218.055-.41-.027-.573-.082-.164-.736-1.775-1.01-2.43-.267-.64-.535-.55-.736-.56-.19-.01-.409-.01-.627-.01-.218 0-.573.082-.873.41-.3.327-1.145 1.12-1.145 2.73 0 1.61 1.173 3.166 1.336 3.385.164.218 2.3 3.515 5.578 4.93.78.337 1.39.539 1.86.688.784.249 1.497.214 2.06.13.629-.094 1.942-.793 2.215-1.558.272-.765.272-1.42.19-1.557-.081-.137-.272-.218-.6-.382z"/>
                  </svg>
                  Connect on WhatsApp
                </a>
                <Link to="/products" className="btn-outline-gold" style={{ borderColor: 'var(--text-main)', color: 'var(--text-main)' }}>Browse Products</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
