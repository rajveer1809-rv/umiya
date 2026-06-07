import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

export default function Services() {
  const servicesList = [
    {
      title: 'Residential Painting',
      desc: 'Complete interior and exterior painting services. We take care of everything: wall repair, dust-free prep sanding, premium masking, and applying two coats of luxury low-VOC emulsions.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      )
    },
    {
      title: 'Commercial Coatings',
      desc: 'Highly durable, abrasion-resistant coatings for retail stores, offices, warehouses, and hospitality complexes. Fast turnaround schedules to minimize disruptions to your business operations.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      )
    },
    {
      title: 'Color Consultation',
      desc: 'Work one-on-one with our certified colorists. We assess your space’s architectural style and lighting profile to draft custom mood boards, digital paint visualizations, and physical swatch catalogs.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
        </svg>
      )
    },
    {
      title: 'Decorative Texturing',
      desc: 'Expert application of Italian Venetian stucco, concrete overlays, micro-cement, gold-leaf gilding, and velvet textured plasters to construct high-end, artistic feature walls.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
        </svg>
      )
    },
    {
      title: 'Waterproofing & Sealants',
      desc: 'Keep moisture at bay with our hydrophobic primers and flexible elastomeric crack coatings. Ideal for safeguarding exteriors, parapet walls, wet areas, and coastal masonry against corrosion.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.26a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      )
    },
    {
      title: 'Custom Paint Tinting',
      desc: 'Bring a fabric swatch, a piece of wood, or a digital color code. Our advanced spectrophotometers analyze the shade and custom-tint our premium base emulsions to match it exactly.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l.75-1.268a1 1 0 00-.175-1.242l-2.586-2.586a1 1 0 00-1.242-.175l-1.268.75m10.14-10.14a4.5 4.5 0 116.364 6.364l-11.455 11.454a4.5 4.5 0 01-2.909 1.32l-3.251.362a.5.5 0 01-.553-.553l.362-3.251a4.5 4.5 0 011.32-2.91L16.243 4.517z"/>
        </svg>
      )
    }
  ]

  return (
    <>
      {/* Banner */}
      <section className="inner-page-banner">
        <div className="container-xl">
          <ScrollReveal>
            <h1>Painting & Color Services</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> Services
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="specialization-section" style={{ backgroundColor: '#FFFFFF', padding: '80px 0' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">Professional Services</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>How We Transform Your Spaces</h2>
            </div>
          </ScrollReveal>
          <div className="spec-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {servicesList.map((service, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} animation="fade-in-up">
                <div className="spec-card">
                  <div className="spec-icon">
                    {service.icon}
                  </div>
                  <h3 className="spec-card-title">{service.title}</h3>
                  <p className="spec-card-desc">{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="specialization-section" style={{ padding: '80px 0' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">Our Method</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>The Painting Process</h2>
            </div>
          </ScrollReveal>
          <div className="spec-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <ScrollReveal delay={0} animation="zoom-in">
              <div className="spec-card" style={{ backgroundColor: '#FFFFFF', padding: '30px' }}>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-gold-dark)', marginBottom: '15px' }}>01</div>
                <h3 className="spec-card-title">Consult & Inspect</h3>
                <p className="spec-card-desc">We survey the site, verify wall moisture levels, check for cracks, and align on color swatches and finishes.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} animation="zoom-in">
              <div className="spec-card" style={{ backgroundColor: '#FFFFFF', padding: '30px' }}>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-gold-dark)', marginBottom: '15px' }}>02</div>
                <h3 className="spec-card-title">Mask & Prep</h3>
                <p className="spec-card-desc">Furniture is moved and protected, floors are masked, cracks are filled, and walls are sanded to achieve a clean base.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} animation="zoom-in">
              <div className="spec-card" style={{ backgroundColor: '#FFFFFF', padding: '30px' }}>
                <div style={{ fontSize: '32px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-gold-dark)', marginBottom: '15px' }}>03</div>
                <h3 className="spec-card-title">Apply & Deliver</h3>
                <p className="spec-card-desc">We apply one coat of deep-penetration primer followed by two coats of premium luxury emulsion for a seamless finish.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-section" style={{ backgroundColor: '#FFFFFF', padding: '80px 0', textAlign: 'center' }}>
        <div className="container-xl" style={{ maxWidth: '700px' }}>
          <ScrollReveal animation="fade-in-up">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '20px' }}>
              Transform your property today
            </h2>
            <p className="about-text" style={{ marginBottom: '30px' }}>
              Book a site survey with our professional painters. We provide transparent estimates, paint calculations, and color advice to make your process smooth and stress-free.
            </p>
            <Link to="/contact" className="btn-solid-dark">Request an Estimate</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
