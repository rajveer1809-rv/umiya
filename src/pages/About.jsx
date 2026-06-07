import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

export default function About() {
  const pillars = [
    {
      title: 'Premium Quality',
      desc: 'Our paints are crafted with pure, top-grade acrylic resins and dense architectural pigments. This results in rich depth of color, one-coat coverage, and a surface that remains pristine under heavy scrubbing.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      )
    },
    {
      title: 'Sustainable Focus',
      desc: 'We design coatings that protect both your walls and your health. Every product is certified low-VOC or zero-VOC, heavy-metal free, and hypoallergenic — promoting healthy indoor air quality for children and pets.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
      )
    },
    {
      title: 'Artistic Formulation',
      desc: 'Color is a language of emotion. Our team of color consultants and chemists handcraft palettes inspired by natural landscapes, global architecture, and modern textures to bring your design dreams to life.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
        </svg>
      )
    }
  ]

  return (
    <>
      {/* Banner */}
      <section className="inner-page-banner">
        <div className="container-xl">
          <ScrollReveal animation="fade-in-up">
            <h1>About Our Company</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> About Us
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="about-section" style={{ padding: '80px 0 40px 0' }}>
        <div className="container-xl">
          <div className="about-grid">
            <ScrollReveal animation="fade-in-left">
              <div>
                <span className="about-company-tag">Our History</span>
                <h2 className="about-title" style={{ fontSize: '28px' }}>
                  A trusted name in paints & coatings since 2005.
                </h2>
                <p className="about-text" style={{ marginBottom: '20px' }}>
                  Established in 2005, Umiya Hardware & Paints has been serving Ankleshwar and surrounding industrial areas with top-tier paint solutions under one roof. Our focus has always been on delivering outstanding product quality and fostering long-term relationships with our clients, builders, and contractors.
                </p>
                <p className="about-text">
                  With over 20 years of experience in the coating industry, we provide reliable consulting for wrong product selection, shade matching issues, and budget constraints, helping you pick the perfect coatings for home, metal, or industrial application.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-in-right">
              <div className="about-images-wrapper">
                <div className="about-frame-bg" style={{ width: '75%', height: '320px', left: '20px', top: '20px' }}></div>
                <img 
                  src="/about_interior.png" 
                  alt="Beautiful painted living room showing high-quality finish" 
                  className="about-img-primary" 
                  style={{ width: '80%', height: '300px' }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="specialization-section" style={{ padding: '80px 0' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">What Guides Us</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Our Core Pillars</h2>
            </div>
          </ScrollReveal>
          <div className="spec-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {pillars.map((pillar, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} animation="fade-in-up">
                <div className="spec-card">
                  <div className="spec-icon">
                    {pillar.icon}
                  </div>
                  <h3 className="spec-card-title">{pillar.title}</h3>
                  <p className="spec-card-desc">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="about-section" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container-xl" style={{ maxWidth: '750px' }}>
          <ScrollReveal animation="zoom-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '20px' }}>
              Ready to find the perfect shade?
            </h2>
            <p className="about-text" style={{ marginBottom: '30px' }}>
              Our online catalog features over 150 designer paint shades. If you need assistance, our color consultants are available for a virtual consultation to design your custom palette.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <Link to="/products" className="btn-solid-dark">Browse Shades</Link>
              <Link to="/contact" className="btn-outline-gold">Contact Consultant</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
