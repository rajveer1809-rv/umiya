import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductImage from '../components/ProductImage'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  const [featuredCategory, setFeaturedCategory] = useState('Interior Paints')
  const [projectTab, setProjectTab] = useState('All')
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  // Floating statistics for Hero
  const heroStats = [
    { num: '20+', label: 'Years Experience' },
    { num: '5,000+', label: 'Customers Served' },
    { num: '100+', label: 'Premium Products' },
    { num: '1,000+', label: 'Projects Supported' }
  ]

  // Plain typography statistics for Impact Numbers section
  const impactNumbers = [
    { num: '20+', label: 'Years Experience' },
    { num: '5,000+', label: 'Happy Customers' },
    { num: '100+', label: 'Products' },
    { num: '1,000+', label: 'Projects' }
  ]

  // Expertise data (Service 1 to 4)
  const expertiseItems = [
    {
      tag: 'Architectural Elegance',
      title: 'Decorative Paints',
      desc: 'Enhance your residential and commercial environments with luxury interior emulsions, dust-resistant weather guards, and computerized Colourworld shade formulations matching over 1,500+ colors.',
      image: '/images/products/asian-paints-royale-play-designer-finish.png',
      link: '/services#decorative-paints',
      isReversed: false
    },
    {
      tag: 'Heavy-Duty Defense',
      title: 'Industrial Coatings',
      desc: 'Shield factory piping, warehouse steel fabrications, and assembly machinery against corrosion and abrasive friction using high-build epoxy primers and aliphatic polyurethane topcoats.',
      image: '/images/products/ppg-asian-paints-high-build-epoxy-primer.png',
      link: '/services#industrial-coatings',
      isReversed: true
    },
    {
      tag: 'Moisture Protection',
      title: 'Waterproofing Solutions',
      desc: 'Stop concrete dampness, ceiling drips, and efflorescence salt peeling. We stock specialized integral admixtures, damp-proof courses, and high-build elastomeric roof sealants.',
      image: '/images/products/dr-fixit-raincoat-select.png',
      link: '/services#waterproofing-systems',
      isReversed: false
    },
    {
      tag: 'Premium Wood Safeguards',
      title: 'Wood Finishes',
      desc: 'Protect custom furniture and grain veneers from stains, heat, and moisture with Italian-grade single and two-pack polyurethane (PU) sealers and UV-resistant stains.',
      image: '/images/products/ica-premium-wood-coating.png',
      link: '/services#wood-finishes',
      isReversed: true
    }
  ]

  // Masonry gallery configurations
  const galleryItems = [
    {
      image: '/about_interior.png',
      title: 'Modern Living Rooms',
      desc: 'Washable luxury emulsions',
      layoutClass: 'wide-3 tall'
    },
    {
      image: '/about_detail.png',
      title: 'Premium Bedrooms',
      desc: 'Velvet soft sheen finishes',
      layoutClass: 'wide-3'
    },
    {
      image: '/page_banner_services.png',
      title: 'Office Interiors',
      desc: 'Clean corporate color vibes',
      layoutClass: 'wide-2 tall'
    },
    {
      image: '/page_banner.png',
      title: 'Commercial Spaces',
      desc: 'Impact-resistant floor epoxies',
      layoutClass: 'wide-2 tall'
    },
    {
      image: '/page_banner_about.png',
      title: 'Exterior Buildings',
      desc: 'UV-stable silicone weather guards',
      layoutClass: 'wide-2'
    }
  ]

  // Brand logs slider placeholders
  const marqueeBrands = [
    'Asian Paints', 'Berger', 'Nerolac', 'Indigo', 'JSW', 'Dr Fixit', 'Birla White', 'ICA Wood Coatings'
  ]
  // Double array to make animation marquee seamless
  const extendedBrandsList = [...marqueeBrands, ...marqueeBrands]

  // Dynamic filter handler for Section 6
  const getFeaturedProducts = (category) => {
    switch (category) {
      case 'Interior Paints':
        return products.filter(p => p.id === 'asianpaintsroyaleluxuryemulsion' || p.id === 'berger-paints-silk-glamor' || p.id === 'dulux-velvet-touch')
      case 'Exterior Paints':
        return products.filter(p => p.id === 'asianpaintsapexultima' || p.id === 'dr-fixit-raincoat-select')
      case 'Industrial Coatings':
        return products.filter(p => p.category === 'Idustrial Paints')
      case 'Waterproofing Products':
        return products.filter(p => p.category === 'Water Proofing Materials' && p.id !== 'dr-fixit-waterproofing-application-rollers')
      case 'Wood Finishes':
        return products.filter(p => p.category === 'Wood Coating')
      case 'Primers':
        return products.filter(p => p.id === 'asian-paints-decoprime-wall-primer' || p.id === 'birla-white-wallcare-putty')
      default:
        return products.slice(0, 3)
    }
  }

  const activeFeaturedProducts = getFeaturedProducts(featuredCategory)

  // Project showcase categories
  const projectGallery = [
    {
      image: '/about_interior.png',
      title: 'Modern Villa Facade',
      desc: 'Finished with Apex Ultima Weather Guard',
      cat: 'Residential'
    },
    {
      image: '/about_detail.png',
      title: 'Veneer Furniture Coating',
      desc: 'Sealed with Berger Imperia PU Finish',
      cat: 'Residential'
    },
    {
      image: '/page_banner.png',
      title: 'Showroom Glass Facade',
      desc: 'Fitted with architectural primers',
      cat: 'Commercial'
    },
    {
      image: '/page_banner_services.png',
      title: 'Corporate Main Lobby',
      desc: 'Decorated with Royale Play Stucco plaster',
      cat: 'Commercial'
    },
    {
      image: '/page_banner_contact.png',
      title: 'Heavy Plant Pipeline',
      desc: 'Coated with high-build chemical epoxies',
      cat: 'Industrial'
    },
    {
      image: '/page_banner_about.png',
      title: 'Ankleshwar GIDC Warehouse',
      desc: 'Anti-corrosive primer and dust-free flooring',
      cat: 'Industrial'
    }
  ]

  const filteredProjects = projectTab === 'All'
    ? projectGallery
    : projectGallery.filter(proj => proj.cat === projectTab)

  // Why choose us items
  const whyChooseUsData = [
    {
      title: '20+ Years Experience',
      desc: 'Delivering authorized paint batches and hardware supplies across Ankleshwar since 2005.',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Premium Product Range',
      desc: 'Stocking only certified brands: Asian Paints, Berger, Dulux, Dr. Fixit, and Birla White.',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: 'Expert Guidance',
      desc: 'Free site inspection, moisture diagnostics, and computerized color fandeck formulations.',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Reliable Supply',
      desc: 'Direct depot logistics matching bulk demands for infrastructure and builders.',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 10-4 0 2 2 0 004 0z" />
        </svg>
      )
    },
    {
      title: 'Industrial Expertise',
      desc: 'Specialized chemical-resistant floor epoxies and primers for factories and workshops.',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.548 2.2a2 2 0 01-1.96 1.414H9.663a2 2 0 01-1.96-1.414l-.548-2.2A2 2 0 005.195 15.4l-2.387.478a2 2 0 00-.586 3.414l1.39 1.39a8 8 0 005.122 1.024h6.532a8 8 0 005.122-1.024l1.39-1.39a2 2 0 00-.586-3.414zM12 3c-1.2 0-3.6 1.8-3.6 4.8 0 2 1.6 3.6 3.6 3.6s3.6-1.6 3.6-3.6C15.6 4.8 13.2 3 12 3z" />
        </svg>
      )
    },
    {
      title: 'Customer Satisfaction',
      desc: 'Proudly supporting contractors, builders, and Ankleshwar homeowners with top-tier paint values.',
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    }
  ]

  // Testimonials Carousel data
  const testimonials = [
    {
      quote: "Umiya Hardware & Paints has been our primary coatings supplier for all our industrial projects in Ankleshwar GIDC. Their direct-depot supply guarantees chemical authenticity every time.",
      author: "Rajesh Patel",
      role: "Industrial Infrastructure Contractor"
    },
    {
      quote: "The digital color consultation and computerized tinting machine matched my living room swatches perfectly. Zero color variation between batches. Outstanding service!",
      author: "Meera Shah",
      role: "Ankleshwar Homeowner"
    },
    {
      quote: "Their waterproofing guidance saved our commercial basement from persistent monsoon water seepage. Dr. Fixit Damp Proof systems worked exactly as recommended.",
      author: "Amit Desai",
      role: "Commercial Property Builder"
    }
  ]

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      {/* 1. HERO SECTION */}
      <section 
        className="home-hero-cinematic" 
        style={{ backgroundImage: `url('/home_hero.png')` }}
      >
        <div className="home-hero-overlay"></div>
        <div className="container-xl home-hero-container">
          <div className="home-hero-content">
            <ScrollReveal>
              <span className="home-hero-tagline">Authorized Paint & Coating Depot</span>
              <h1 className="home-hero-headline">Building Colors.<br />Building Trust.</h1>
              <p className="home-hero-subheadline">
                Premium Paints, Industrial Coatings, Waterproofing Solutions & Hardware Since 2005.
              </p>
              
              <div className="home-hero-buttons">
                <Link to="/products" className="btn-luxury">Explore Products</Link>
                <Link to="/contact" className="btn-outline-gold" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'white' }}>Get Consultation</Link>
              </div>

              {/* Floating stats inside hero */}
              <div className="home-hero-stats-strip">
                {heroStats.map((stat, idx) => (
                  <div key={idx} className="home-hero-stat-item">
                    <span className="home-hero-stat-num">{stat.num}</span>
                    <span className="home-hero-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. COMPANY STORY */}
      <section className="home-story-section">
        <div className="container-xl">
          <div className="home-story-grid">
            <ScrollReveal animation="fade-in-left">
              <div className="home-story-image-frame">
                <img src="/about_interior.png" alt="Showroom interior layout" />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-right">
              <div>
                <span className="about-company-tag" style={{ marginBottom: '15px', display: 'inline-block' }}>Established in 2005</span>
                <h2 className="about-title" style={{ fontSize: '36px', marginBottom: '24px', lineHeight: '1.25' }}>
                  About Umiya Hardware & Paints
                </h2>
                <p className="about-text" style={{ marginBottom: '20px' }}>
                  For over two decades, Umiya Hardware & Paints has been a trusted supplier of architectural emulsions, heavy-duty industrial finishes, and structural waterproofing barriers in Ankleshwar.
                </p>
                <p className="about-text" style={{ marginBottom: '35px' }}>
                  We build strong, long-term relationships with regional painting contractors, builders, industrial safety managers, and homeowners. By sourcing directly from authorized paint brand depots, we guarantee chemical shelf-freshness and color integrity.
                </p>
                <Link to="/about" className="btn-solid-dark">Read More</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. IMPACT NUMBERS */}
      <section className="home-impact-section">
        <div className="container-xl">
          <div className="home-impact-grid">
            {impactNumbers.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} animation="zoom-in">
                <div>
                  <div className="home-impact-number">{stat.num}</div>
                  <div className="home-impact-label">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR EXPERTISE */}
      <section className="home-expertise-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">Umiya Coating Range</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Our Specialty Expertise</h2>
            </div>
          </ScrollReveal>

          <div className="home-expertise-grid">
            {expertiseItems.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} animation="zoom-in">
                <div className="home-expertise-card">
                  <div className="home-expertise-img-box">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="home-expertise-info">
                    <span className="home-expertise-tag">{item.tag}</span>
                    <h3 className="home-expertise-title">{item.title}</h3>
                    <p className="home-expertise-desc">{item.desc}</p>
                    <Link to={item.link} className="home-expertise-link">
                      Learn More ➔
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COLOR INSPIRATION GALLERY */}
      <section className="home-gallery-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '60px' }}>
              <span className="section-subtitle-centered">Design Swatches</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Color Inspiration Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="home-gallery-grid">
            {galleryItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`home-gallery-card ${item.layoutClass}`}
              >
                <img src={item.image} alt={item.title} />
                <div className="home-gallery-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS */}
      <section className="home-featured-products-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle-centered">Top Choices</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Featured Products</h2>
            </div>
          </ScrollReveal>

          {/* Interactive Switcher */}
          <ScrollReveal animation="fade-in-up">
            <div className="home-featured-switcher">
              {['Interior Paints', 'Exterior Paints', 'Industrial Coatings', 'Waterproofing Products', 'Wood Finishes', 'Primers'].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${featuredCategory === cat ? 'active' : ''}`}
                  onClick={() => setFeaturedCategory(cat)}
                  style={{ fontSize: '12.5px' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Slider Layout displaying products matching the active category */}
          <div className="home-featured-grid-wrapper">
            <div className="shades-grid" key={featuredCategory}>
              {activeFeaturedProducts.map((product, idx) => (
                <ScrollReveal key={product.id} animation="zoom-in" delay={idx * 0.05} duration={0.4}>
                  <div className="shade-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Link to={`/products/${product.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div className="shade-swatch-wrapper" style={{ height: '220px', backgroundColor: '#F8F6F1' }}>
                        <ProductImage 
                          id={product.id} 
                          name={product.name} 
                          category={product.category} 
                          className="shade-swatch"
                        />
                        <span className="shade-finish-badge">{product.brand}</span>
                      </div>
                      <div className="shade-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <span className="shade-category">{product.category}</span>
                          <h3 className="shade-name" style={{ fontSize: '15px', lineHeight: 1.3, margin: '4px 0 8px 0', minHeight: '42px' }}>
                            {product.name}
                          </h3>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '12px' }}>
                            {product.shortDescription}
                          </p>
                        </div>
                        <div className="shade-code-price" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: 'auto' }}>
                          <span className="shade-code" style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: 600 }}>
                            {product.brand} Quality
                          </span>
                          <span className="shade-price" style={{ color: 'var(--color-gold-dark)', fontSize: '13px', fontWeight: 600 }}>
                            View details ➔
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/products" className="btn-outline-dark">View Entire Catalog</Link>
          </div>
        </div>
      </section>

      {/* 7. TRUSTED BRANDS */}
      <section className="home-brands-section">
        <div className="container-xl">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>Authorized Dealerships</span>
            </div>
          </ScrollReveal>
          
          <div className="home-brands-marquee">
            <div className="home-brands-track">
              {extendedBrandsList.map((brand, idx) => (
                <div key={idx} className="home-brand-logo-text">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. PROJECT SHOWCASE */}
      <section className="home-projects-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '30px' }}>
              <span className="section-subtitle-centered">Our Portfolio</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Project Showcase</h2>
            </div>
          </ScrollReveal>

          {/* Project Tabs */}
          <div className="home-projects-tabs">
            {['All', 'Residential', 'Commercial', 'Industrial'].map(tab => (
              <button
                key={tab}
                className={`home-projects-tab-btn ${projectTab === tab ? 'active' : ''}`}
                onClick={() => setProjectTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Full-width category project grid */}
          <div className="home-projects-grid" key={projectTab}>
            {filteredProjects.map((project, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05} animation="zoom-in">
                <div className="home-project-card">
                  <img src={project.image} alt={project.title} />
                  <div className="home-project-overlay">
                    <h4>{project.title}</h4>
                    <p>{project.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US */}
      <section className="home-why-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '60px' }}>
              <span className="section-subtitle-centered">The Umiya Edge</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Why Choose Us</h2>
            </div>
          </ScrollReveal>

          <div className="home-why-grid">
            {whyChooseUsData.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} animation="fade-in-up">
                <div className="home-why-card">
                  <div className="home-why-icon-box">{item.icon}</div>
                  <h3 className="home-why-title">{item.title}</h3>
                  <p className="home-why-desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="home-testimonials-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '60px' }}>
              <span className="section-subtitle-centered">Customer Testimonials</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Client Reviews</h2>
            </div>
          </ScrollReveal>

          <div className="home-testimonials-container">
            <ScrollReveal key={testimonialIndex} animation="zoom-in" duration={0.4}>
              <div className="home-testimonial-card">
                <div className="home-testimonial-stars">★★★★★</div>
                <p className="home-testimonial-text">
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <div className="home-testimonial-user">
                  {testimonials[testimonialIndex].author}
                </div>
                <div className="home-testimonial-role">
                  {testimonials[testimonialIndex].role}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="home-testimonials-nav">
            <button className="home-testimonials-btn" onClick={prevTestimonial} aria-label="Previous testimonial">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="home-testimonials-btn" onClick={nextTestimonial} aria-label="Next testimonial">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 11. CONTACT CTA */}
      <section 
        className="home-contact-cta-section" 
        style={{ backgroundImage: `url('/page_banner.png')` }}
      >
        <div className="home-contact-cta-overlay"></div>
        <div className="container-xl home-contact-cta-container">
          <ScrollReveal animation="fade-in-up">
            <h2 className="home-contact-cta-title">Ready To Transform Your Space?</h2>
            <p className="home-contact-cta-desc">
              Speak with our experts for paint, coating and waterproofing solutions.
            </p>
            <div className="home-contact-cta-buttons">
              <Link to="/contact" className="btn-luxury">Contact Us</Link>
              <Link to="/contact?subject=Request Quote" className="btn-outline-gold" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'white' }}>Request Quote</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
