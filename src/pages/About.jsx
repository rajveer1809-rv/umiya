import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

export default function About() {
  const milestones = [
    {
      year: '2005',
      title: 'Company Foundation',
      desc: 'Umiya Hardware & Paints opens its doors in Ankleshwar, starting as a local supplier of building hardware, raw tools, and general wall primers.'
    },
    {
      year: '2010',
      title: 'Authorized Dealerships',
      desc: 'Partnered officially with national leaders (Asian Paints, Berger, Dulux) to supply depot-fresh paint batches directly to local builders and painting contractors.'
    },
    {
      year: '2016',
      title: 'Colourworld Tinting Hub',
      desc: 'Installed computerized tinting systems to offer custom color formulations, unlocking over 1,500+ shades for immediate delivery.'
    },
    {
      year: '2020',
      title: 'Industrial Coatings Expansion',
      desc: 'Expanded catalog to include heavy-duty protective primers, marine epoxies, and Italian polyurethane (PU) wood finishes for custom furniture makers.'
    },
    {
      year: '2025',
      title: '20 Years of Trust & Digital Service',
      desc: 'Celebrating two decades of paint excellence. Introduced virtual paint calculator systems and remote color consultations for remote client projects.'
    }
  ]

  const offerings = [
    {
      category: 'Wall Finishes',
      title: 'Wall Paints & Emulsions',
      desc: 'Premium interior and weather-proof exterior emulsions. Teflon stain-guards, high sheen velvet finishes, and long-life acrylics.',
      image: '/about_interior.png',
      link: '/products?filter=Interior Exterior Wall Paints'
    },
    {
      category: 'Wood & PU Coatings',
      title: 'Italian Polyurethane Finish',
      desc: 'Diamond-hard, non-yellowing acrylic and polyester clear coats designed to protect and enhance premium wooden veneers and paneling.',
      image: '/about_detail.png',
      link: '/products?filter=Wood Coating'
    },
    {
      category: 'Waterproofing',
      title: 'Structural Waterproofing',
      desc: 'Advanced integral cement waterproofers, high-build elastomeric roof sealants, and damp-proofing barriers to protect buildings.',
      image: '/images/products/dr-fixit-raincoat-select.png',
      link: '/products?filter=Water Proofing Materials'
    },
    {
      category: 'Applicators',
      title: 'Professional Brushes & Rollers',
      desc: 'Lint-free synthetic paint rollers, heavy-duty scraping blades, and blended bristle brushes for clean border cutting and edging.',
      image: '/images/products/asian-paints-trucare-interior-wall-roller.png',
      link: '/products?filter=Painting Tools Accessories'
    }
  ]

  const inspirations = [
    {
      title: 'Royal Breeze & Alabaster',
      desc: 'Living Room Inspiration',
      colors: ['#1E3E80', '#F7F6F0', '#EEDCBE', '#374151'],
      image: '/about_interior.png'
    },
    {
      title: 'Mint Whisper & Warm Sand',
      desc: 'Bedroom Concept Palette',
      colors: ['#C2E8D4', '#FDF6E2', '#EEDCBE', '#5C5449'],
      image: '/about_detail.png'
    },
    {
      title: 'Tuscan Glow & Alabaster',
      desc: 'Dining Area Palette',
      colors: ['#F9D189', '#F3A47C', '#F7F6F0', '#634427'],
      image: '/about_interior.png'
    },
    {
      title: 'Mahogany Elegance & Slate',
      desc: 'Premium Study & Wood Finish',
      colors: ['#8B422B', '#C59B6D', '#2C2B2C', '#FAF8F5'],
      image: '/about_detail.png'
    }
  ]

  const whyChooseUs = [
    {
      title: 'Depot-Fresh Direct Supply',
      desc: 'We supply paint batches thinned and shipped directly from national brand depots, ensuring peak chemical integrity and zero shelf degradation.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
      )
    },
    {
      title: 'Authorized Technical Consulting',
      desc: 'Struggling with concrete dampness, peeling paint, or wrong primer matches? Our consultants provide structural project recommendations for free.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      )
    },
    {
      title: 'Exact Color Customization',
      desc: 'Using high-resolution computerized tinting, we formulate shade fandecks instantly. Get matching batches with zero color variance.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
        </svg>
      )
    },
    {
      title: 'Contractor & DIY Friendly Kits',
      desc: 'We stock everything from drop tarps and masking tape to rollers and putty blades, providing builders and painters with a complete under-one-roof kit.',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l.75-1.268a1 1 0 00-.175-1.242l-2.586-2.586a1 1 0 00-1.242-.175l-1.268.75m10.14-10.14a4.5 4.5 0 116.364 6.364l-11.455 11.454a4.5 4.5 0 01-2.909 1.32l-3.251.362a.5.5 0 01-.553-.553l.362-3.251a4.5 4.5 0 011.32-2.91L16.243 4.517z"/>
        </svg>
      )
    }
  ]

  const brands = [
    {
      name: 'Asian Paints',
      class: 'brand-asian-paints-hover',
      logo: '/images/brands/aplogo.jfif'
    },
    {
      name: 'Berger Paints',
      class: 'brand-berger-hover',
      logo: '/images/brands/burgerlogo.jfif'
    },
    {
      name: 'Dulux',
      class: 'brand-dulux-hover',
      logo: '/images/brands/deluxlogo.png'
    },
    {
      name: 'Dr. Fixit',
      class: 'brand-drfixit-hover',
      logo: '/images/brands/drflogojfif.jfif'
    },
    {
      name: 'Birla White',
      class: 'brand-birla-white-hover',
      logo: '/images/brands/birlawhitelogo.jfif'
    },
    {
      name: 'British Paints',
      class: 'brand-british-paints-hover',
      logo: '/images/brands/britishpaint.png'
    },
    {
      name: 'Esdee Paints',
      class: 'brand-esdee-paints-hover',
      logo: '/images/brands/esdee.png'
    },
    {
      name: 'ICA Wood Coatings',
      class: 'brand-ica-hover',
      logo: '/images/brands/ica.png'
    }
  ]

  // Double list to make infinite slide seamless
  const extendedBrands = [...brands, ...brands]

  return (
    <>
      {/* 1. Hero Banner (with paint image background) */}
      <section 
        className="inner-page-banner banner-about"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(250, 248, 245, 0.7) 0%, rgba(250, 248, 245, 0.95) 100%), url('/page_banner_about.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid var(--border-light)',
          padding: '60px 0'
        }}
      >
        <div className="container-xl">
          <ScrollReveal animation="fade-in-up">
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '36px', marginBottom: '8px' }}>
              About Our Company
            </h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> About Us
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Company Introduction */}
      <section className="about-section" style={{ padding: '80px 0' }}>
        <div className="container-xl">
          <div className="about-grid" style={{ alignItems: 'center' }}>
            <ScrollReveal animation="fade-in-left">
              <div>
                <span className="about-company-tag">Who We Are</span>
                <h2 className="about-title" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px', lineHeight: 1.3 }}>
                  Ankleshwar’s Premier Coatings & Paint Consultant
                </h2>
                <p className="about-text" style={{ marginBottom: '16px', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  Established in 2005, Umiya Hardware & Paints has been supplying builders, painters, and homeowners across Ankleshwar, Bharuch, and the wider Gujarat industrial region with top-tier coatings.
                </p>
                <p className="about-text" style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  We are not just a supplier. We work as dedicated color and coatings consultants. Whether you need color tinting configurations, advice on resolving structural wall dampness, or custom polyurethane wood sealants, we help you pick the exact right formula for the job.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in-right">
              <div className="about-images-wrapper">
                <div className="about-frame-bg" style={{ width: '75%', height: '320px', left: '20px', top: '20px', backgroundColor: 'var(--color-gold-transparent)' }}></div>
                <img 
                  src="/about_interior.png" 
                  alt="Premium interior wall styling with Umiya paints" 
                  className="about-img-primary" 
                  style={{ width: '80%', height: '300px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', objectFit: 'cover' }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Timeline (2005 → 2025) */}
      <section className="about-timeline-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">Our History</span>
              <h2 className="section-title-centered" style={{ fontSize: '28px', fontWeight: 700 }}>Milestones & Expansion</h2>
            </div>
          </ScrollReveal>

          <div className="timeline-container">
            {milestones.map((milestone, idx) => (
              <div key={milestone.year} className="timeline-item">
                <ScrollReveal animation={idx % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}>
                  <div className="timeline-badge">{milestone.year}</div>
                  <div className="timeline-card">
                    <h3>{milestone.title}</h3>
                    <p>{milestone.desc}</p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What We Offer (4 image cards) */}
      <section className="offerings-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle-centered">Product Ranges</span>
              <h2 className="section-title-centered" style={{ fontSize: '28px', fontWeight: 700 }}>What We Offer</h2>
            </div>
          </ScrollReveal>

          <div className="offerings-grid">
            {offerings.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} animation="fade-in-up">
                <div className="offering-card">
                  <div className="offering-image-wrapper">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="offering-content">
                    <span className="offering-category-tag">{item.category}</span>
                    <h3 className="offering-title">{item.title}</h3>
                    <p className="offering-desc">{item.desc}</p>
                    <Link to={item.link} className="offering-link">
                      View Products ➔
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="why-choose-section">
        <div className="container-xl">
          <div className="why-grid">
            <ScrollReveal animation="fade-in-left">
              <div>
                <span className="about-company-tag" style={{ display: 'block', marginBottom: '10px' }}>Why Partner With Us</span>
                <h2 className="about-title" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.3 }}>
                  Supplying Authenticity & Scientific Coating Expertise
                </h2>
                <p className="about-text" style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '30px', lineHeight: 1.7 }}>
                  With over 20 years of hardware and coatings distribution experience in Ankleshwar, we understand that quality and consistency matter. We ensure that our customers get genuine factory batches thinned and calibrated to manufacturer guidelines.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <Link to="/contact" className="btn-solid-dark">Request Quote</Link>
                  <Link to="/products" className="btn-outline-gold">Browse Products</Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-right">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {whyChooseUs.map((item, idx) => (
                  <div key={idx} className="why-card">
                    <div className="why-card-icon">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="why-card-title">{item.title}</h3>
                      <p className="why-card-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. Color Inspiration Gallery */}
      <section className="inspiration-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle-centered">Trending Palette Swatches</span>
              <h2 className="section-title-centered" style={{ fontSize: '28px', fontWeight: 700 }}>Color Inspiration Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="inspiration-grid">
            {inspirations.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} animation="zoom-in">
                <div className="inspiration-card">
                  <div 
                    className="inspiration-visual" 
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="inspiration-swatches">
                    {item.colors.map((c, cIdx) => (
                      <span 
                        key={cIdx} 
                        className="inspiration-swatch" 
                        style={{ backgroundColor: c }}
                        title={c}
                      ></span>
                    ))}
                  </div>
                  <div className="inspiration-info">
                    <h3 className="inspiration-title">{item.title}</h3>
                    <span className="inspiration-desc">{item.desc}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Statistics */}
      <section className="stats-strip-section" style={{ backgroundColor: '#FAF8F5', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '50px 0' }}>
        <div className="container-xl">
          <ScrollReveal animation="fade-in-up">
            <div className="about-stats-grid" style={{ marginTop: 0, paddingTop: 0, border: 'none' }}>
              <div className="about-stat-item" style={{ textAlign: 'center' }}>
                <span className="about-stat-number" style={{ fontSize: '40px' }}>20+</span>
                <span className="about-stat-label">Years of trust</span>
              </div>
              <div className="about-stat-item" style={{ textAlign: 'center' }}>
                <span className="about-stat-number" style={{ fontSize: '40px' }}>1,500+</span>
                <span className="about-stat-label">Custom Shades tintable</span>
              </div>
              <div className="about-stat-item" style={{ textAlign: 'center' }}>
                <span className="about-stat-number" style={{ fontSize: '40px' }}>5,000+</span>
                <span className="about-stat-label">Projects Completed</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. Brand Logos Slider (Infinite Loop Marquee) */}
      <section className="brand-slider-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="brand-logos-container">
              <div className="brand-logos-track">
                {extendedBrands.map((brand, idx) => (
                  <div key={idx} className={`marquee-logo-text ${brand.class}`} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={brand.logo} alt={`${brand.name} logo`} className="marquee-brand-logo-img" />
                    <span>{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. Call To Action Section */}
      <section style={{ padding: '80px 0 100px 0' }}>
        <div className="container-xl" style={{ maxWidth: '900px' }}>
          <ScrollReveal animation="zoom-in">
            <div className="about-textured-cta">
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' }}>
                Ready to find the perfect shade?
              </h2>
              <p className="about-text" style={{ marginBottom: '30px', fontSize: '15px', maxWidth: '650px', lineHeight: 1.7 }}>
                Explore our massive collection of interior emulsions, weather-proof exteriors, textured glazes, and wood stains. Get a custom consultation with our color coordinators.
              </p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn-solid-dark" style={{ backgroundColor: '#FFFFFF', color: 'var(--text-main)' }}>Browse Catalog</Link>
                <Link to="/contact" className="btn-outline-gold" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>Contact Consultant</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
