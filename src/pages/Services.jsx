import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

export default function Services() {
  const serviceCardsData = [
    {
      title: 'Decorative Paints',
      desc: 'Beautify home interiors and exteriors with premium emulsion ranges, computerized shade tinting, and Italian Venetian plasters.',
      anchorId: 'decorative-paints',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Industrial Coatings',
      desc: 'Secure steel fabrications, plants, and concrete flooring with corrosion-resistant epoxy primers and chemical-proof topcoats.',
      anchorId: 'industrial-coatings',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Waterproofing Systems',
      desc: 'Protect building foundations, damp-prone exterior walls, and concrete roofs using advanced elastomeric and integral sealers.',
      anchorId: 'waterproofing-systems',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.26a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Wood Finishes',
      desc: 'Highlight wood veneers and custom furniture using polyurethane (PU) sealers, wood stains, and scratch-resistant varnishes.',
      anchorId: 'wood-finishes',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    }
  ]

  const detailedServices = [
    {
      id: 'decorative-paints',
      tag: 'Beautify & Protect',
      title: 'Decorative Paints & Emulsions',
      desc: 'Transform your living spaces with our premium range of architectural paints. We offer authorized direct supply of top national paint brands, providing options that range from ultra-smooth luxury interior emulsions with advanced washability to tough, weather-defending exterior guards.',
      image: '/images/products/asian-paints-royale-play-designer-finish.png',
      link: '/products?filter=Interior Exterior Wall Paints',
      linkText: 'Explore Wall Paints',
      isReversed: false,
      overlayTitle: 'Luxury Wall Coatings',
      overlaySubtitle: 'Super-scrub, low-VOC emulsions',
      colors: ['#FAF8F5', '#EEDCBE', '#E6C29E', '#7A8B99'],
      features: [
        {
          title: 'Luxury Interior Emulsions',
          detail: 'High-sheen, dirt-resistant paint with Teflon protection for easy-to-clean walls.'
        },
        {
          title: 'Weatherproof Exterior Shields',
          detail: 'UV-stable, dust-repellent elastomeric paints that resist rain, cracks, and algae growth.'
        },
        {
          title: 'Venetian Stucco & Textures',
          detail: 'Designer plasters, velvet accents, and concrete-finish overlays for statement walls.'
        },
        {
          title: 'Colourworld Computerized Tinting',
          detail: 'Custom blend paint bases into 1,500+ precise shades instantly at our Ankleshwar showroom.'
        }
      ]
    },
    {
      id: 'industrial-coatings',
      tag: 'Heavy-Duty Engineering',
      title: 'Industrial & Protective Coatings',
      desc: 'Safeguard your metallic assets and concrete floors from aggressive environments. Our industrial coating solutions are formulated to offer superior resistance to corrosion, heavy impact, chemical exposure, and intense wear.',
      image: '/images/products/ppg-asian-paints-high-build-epoxy-primer.png',
      link: '/products?filter=Idustrial Paints',
      linkText: 'Explore Industrial Coatings',
      isReversed: true,
      overlayTitle: 'Corrosion Defense',
      overlaySubtitle: 'Anticorrosive primers & epoxy finishes',
      colors: ['#5C6D70', '#A3B18A', '#283618', '#1F2937'],
      features: [
        {
          title: 'High-Build Epoxy Primers',
          detail: 'High-solid formulations ensuring excellent chemical adhesion on steel and carbon metal alloys.'
        },
        {
          title: 'Aliphatic Polyurethane (PU) Topcoats',
          detail: 'UV-stable gloss retention finishes ideal for heavy machinery, external piping, and structures.'
        },
        {
          title: 'Seamless Floor Epoxy Systems',
          detail: 'Impact-resistant, dust-free self-leveling floors for factories, chemical zones, and garages.'
        },
        {
          title: 'Fast-Drying Synthetic Enamels',
          detail: 'Cost-effective high-gloss protective coatings to speed up warehouse fabrication cycles.'
        }
      ]
    },
    {
      id: 'waterproofing-systems',
      tag: 'Structural Sealing',
      title: 'Advanced Waterproofing Solutions',
      desc: 'Water ingress can decay concrete structures and ruin interior paintwork. We stock state-of-the-art hydrophobic primers, roof membranes, and damp-proofing barriers to secure your buildings from basement to roof.',
      image: '/images/products/dr-fixit-raincoat-select.png',
      link: '/products?filter=Water Proofing Materials',
      linkText: 'Explore Waterproofing',
      isReversed: false,
      overlayTitle: 'Moisture Barricade',
      overlaySubtitle: 'Integral compounds & elastomeric coats',
      colors: ['#0A58CA', '#0D6EFD', '#E9F5FF', '#343A40'],
      features: [
        {
          title: 'Integral Waterproofing Admixtures',
          detail: 'Liquid compounds mixed into cement to seal capillary pores during concreting and plastering.'
        },
        {
          title: 'Elastomeric Roof Sealants',
          detail: 'High-build flexible membranes with crack-bridging properties that reflect heat and seal roofs.'
        },
        {
          title: 'Damp-Proofing Course (DPC) Barriers',
          detail: 'Masonry coatings that block capillary moisture rising from foundations into interior walls.'
        },
        {
          title: 'Wet-Area Waterproofing Systems',
          detail: 'Specialized basecoats designed for bathrooms, kitchens, balconies, and internal water tanks.'
        }
      ]
    },
    {
      id: 'wood-finishes',
      tag: 'Natural Grain Enhancement',
      title: 'Premium Wood Finishes & PU Stains',
      desc: 'Highlight and shield the organic beauty of wooden furniture, paneling, and veneers. Our high-solid polyurethane coatings and sanding sealers offer diamond-hard resistance against daily scratches, heat, and moisture.',
      image: '/images/products/ica-premium-wood-coating.png',
      link: '/products?filter=Wood Coating',
      linkText: 'Explore Wood Coatings',
      isReversed: true,
      overlayTitle: 'Fine Timber Protection',
      overlaySubtitle: 'PU varnishes & transparent sealers',
      colors: ['#8B5A2B', '#CD853F', '#FAF0E6', '#2C2B2C'],
      features: [
        {
          title: 'Single & Two-Pack Polyurethane (PU)',
          detail: 'Italian-grade interior and exterior clear coats that protect timber panels from yellowing.'
        },
        {
          title: 'High-Build Sanding Sealers',
          detail: 'Rapid-fill coats that level open wood pores to create a perfectly flat, glass-like surface.'
        },
        {
          title: 'Rich Wood Stains & Dyes',
          detail: 'UV-resistant translucent pigments that enrich wood grain textures with deep natural tones.'
        },
        {
          title: 'Melamine & Classic Varnishes',
          detail: 'Classic budget-friendly protective clear topcoats designed for wood doors and window panels.'
        }
      ]
    }
  ]

  const processSteps = [
    {
      num: '01',
      title: 'Technical Site Consultation',
      desc: 'Our specialists visit your property to measure surface moisture, check for plaster cracks, perform quantity estimates, and assist with shade selections using digital visualizers.'
    },
    {
      num: '02',
      title: 'Dust-Free Preparation',
      desc: 'Furniture is fully masked, and walls are prepared through dust-free mechanical sanding. Crack fillers, high-adhesion wall putty, and primer sealers are applied to build a flat, clean base.'
    },
    {
      num: '03',
      title: 'Precision Painting & Handover',
      desc: 'We apply two coats of premium luxury emulsions or industrial coatings with professional applicator rollers. Following a comprehensive quality inspect check, we deliver a clean, spot-free space.'
    }
  ]

  const statistics = [
    { number: '20+', label: 'Years of Paint Experience' },
    { number: '1,500+', label: 'Custom Tinted Shades' },
    { number: '5,000+', label: 'Satisfied Spaces Delivered' },
    { number: '100%', label: 'Authorized Paint Dealer' }
  ]

  return (
    <>
      {/* 1. Service Hero */}
      <section className="inner-page-banner banner-services">
        <div className="container-xl">
          <ScrollReveal>
            <h1>Our Painting & Coating Services</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> Services
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Service Cards */}
      <section className="services-overview-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">What We Do</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Professional Finishing Solutions</h2>
            </div>
          </ScrollReveal>
          
          <div className="spec-grid">
            {serviceCardsData.map((card, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} animation="fade-in-up">
                <div className="spec-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="spec-icon" style={{ color: 'var(--color-gold-dark)', marginBottom: '20px' }}>
                    {card.icon}
                  </div>
                  <h3 className="spec-card-title" style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>{card.title}</h3>
                  <p className="spec-card-desc" style={{ fontSize: '13px', color: 'var(--text-muted)', flexGrow: 1 }}>{card.desc}</p>
                  <a href={`#${card.anchorId}`} className="text-link" style={{ marginTop: '15px', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 600, color: 'var(--color-gold-dark)' }}>
                    Learn More
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3, 4, 5, 6. Detailed Sections */}
      {detailedServices.map((service) => (
        <section key={service.id} id={service.id} className="services-detail-section">
          <div className="container-xl">
            <div className={`services-detail-grid ${service.isReversed ? 'reverse' : ''}`}>
              
              {/* Content Block */}
              <div className="services-detail-content">
                <ScrollReveal animation={service.isReversed ? 'fade-in-left' : 'fade-in-right'}>
                  <span className="services-detail-tag">{service.tag}</span>
                  <h2 className="services-detail-title">{service.title}</h2>
                  <p className="services-detail-desc">{service.desc}</p>
                  
                  <ul className="services-features-list">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="services-feature-item">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginTop: '2px' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="services-feature-text">
                          <strong>{feat.title}</strong>
                          <span>{feat.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link to={service.link} className="btn-solid-dark" style={{ alignSelf: 'flex-start' }}>
                    {service.linkText}
                  </Link>
                </ScrollReveal>
              </div>

              {/* Visual Showcase Block */}
              <div className="services-visual-showcase">
                <ScrollReveal animation="zoom-in" delay={0.1}>
                  <div className="services-visual-wrapper">
                    <img src={service.image} alt={service.title} className="services-visual-img" />
                    
                    <div className="services-visual-overlay">
                      <div className="services-visual-overlay-info">
                        <h4>{service.overlayTitle}</h4>
                        <p>{service.overlaySubtitle}</p>
                        
                        <div className="services-visual-swatches">
                          {service.colors.map((color, cIdx) => (
                            <span 
                              key={cIdx} 
                              className="services-visual-swatch" 
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#FFFFFF' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ margin: 'auto' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* 7. Process Section */}
      <section className="process-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '60px' }}>
              <span className="section-subtitle-centered">Our Method</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>The Consultation & Application Process</h2>
            </div>
          </ScrollReveal>

          <div className="process-steps-grid">
            {processSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} animation="zoom-in">
                <div className="process-step-card">
                  <div className="process-step-number">{step.num}</div>
                  <h3 className="process-step-title">{step.title}</h3>
                  <p className="process-step-desc">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Statistics Section */}
      <section className="services-stats-section">
        <div className="container-xl">
          <div className="services-stats-grid">
            {statistics.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} animation="fade-in-up">
                <div className="services-stat-item">
                  <div className="services-stat-number">{stat.number}</div>
                  <div className="services-stat-label">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA Section */}
      <section className="about-section" style={{ backgroundColor: '#FFFFFF', padding: '100px 0', textAlign: 'center' }}>
        <div className="container-xl" style={{ maxWidth: '800px' }}>
          <ScrollReveal animation="fade-in-up">
            <span className="section-subtitle-centered" style={{ display: 'inline-block', marginBottom: '15px' }}>Start Your Project</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600, marginBottom: '20px', lineHeight: '1.3' }}>
              Transform your property with expert authorized paint systems
            </h2>
            <p className="about-text" style={{ marginBottom: '35px', fontSize: '15.5px', color: 'var(--text-muted)' }}>
              Get in touch with our team in Ankleshwar for technical quantity estimates, digital shade suggestions, or authorized commercial site assessments.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-solid-dark">Request a Free Estimate</Link>
              <Link to="/products" className="btn-outline-dark">Browse Paint Catalog</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
