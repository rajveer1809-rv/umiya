import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductImage from '../components/ProductImage'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentSlide, setCurrentSlide] = useState(0)

  // Slideshow data using real product slugs as destinations
  const slides = [
    {
      subtitle: 'Premium Wall Finishes',
      title: 'Asian Paints Royale Luxury Emulsion',
      desc: 'The gold standard of interior paints, equipped with genuine Teflon® Surface Protector for unmatched stain shield and velvety soft sheen.',
      image: '/hero.png',
      link: '/products/asianpaintsroyaleluxuryemulsion'
    },
    {
      subtitle: 'Extreme Weather Protection',
      title: 'Asian Paints Apex Ultima Coatings',
      desc: 'An ultra-durable, high-performance exterior wall finish with Dirt Pick-Up Resistance and advanced silicone protection.',
      image: '/about_interior.png',
      link: '/products/asianpaintsapexultima'
    },
    {
      subtitle: 'Italian Wood Elegance',
      title: 'Berger Imperia Luxury Polyurethane',
      desc: 'Top-tier polyurethane sealer and coatings designed to form a diamond-hard, flexible, non-yellowing armor for premium furniture.',
      image: '/about_detail.png',
      link: '/products/berger-paints-imperia-luxury-polyurethane-pu'
    }
  ]

  // Auto slide effect
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 7000)

    return () => clearInterval(slideTimer)
  }, [slides.length])

  // Get 8 featured products for homepage signature grid
  const featuredProductIds = [
    'asianpaintsroyaleluxuryemulsion',
    'asianpaintsapexultima',
    'berger-paints-silk-glamor',
    'berger-paints-luxol-high-gloss-enamel',
    'dulux-velvet-touch',
    'dr-fixit-raincoat-select',
    'birla-white-wallcare-putty',
    'asian-paints-trucare-interior-wall-roller'
  ]

  const homepageProducts = products.filter(p => featuredProductIds.includes(p.id))

  const categoryMap = {
    'Interior Exterior Wall Paints': 'Wall Paints',
    'Texture Designer Paints': 'Textures',
    'Decorative Enamels For Home': 'Enamels',
    'Wood Coating': 'Wood Coatings',
    'Wall Putty': 'Putty',
    'Painting Tools Accessories': 'Tools'
  }

  const categories = ['All', 'Interior Exterior Wall Paints', 'Texture Designer Paints', 'Decorative Enamels For Home', 'Painting Tools Accessories']

  const filteredProducts = activeFilter === 'All'
    ? homepageProducts
    : homepageProducts.filter(p => p.category === activeFilter)

  return (
    <>
      {/* Hero Section */}
      <section className="hero-slider">
        <div className="container-xl">
          <div className="hero-slide" key={currentSlide}>
            <div className="hero-content">
              <span className="hero-subtitle">{slides[currentSlide].subtitle}</span>
              <h1 className="hero-title">{slides[currentSlide].title}</h1>
              <p className="hero-description">{slides[currentSlide].desc}</p>
              <Link to={slides[currentSlide].link} className="btn-luxury">
                Explore Product ➔
              </Link>
            </div>
            <div className="hero-image-wrapper">
              <div className="hero-circle-bg"></div>
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title} 
                className="hero-img" 
              />
            </div>
          </div>
          {/* Slider pagination dots */}
          <div className="slider-pagination">
            {slides.map((_, index) => (
              <span 
                key={index} 
                className={`pagination-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="features-row">
        <div className="container-xl">
          <div className="features-grid">
            <ScrollReveal delay={0}>
              <div className="feature-col">
                <div className="feature-icon-wrapper">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-5.614M18 12a6 6 0 11-12 0 6 6 0 0112 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Expert Consultation</h4>
                  <p className="feature-desc">Connect with paint experts for personalized shade selection.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="feature-col">
                <div className="feature-icon-wrapper">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.361.633-.361.806 0l2.3 4.66 5.138.746c.403.059.564.558.273.843l-3.717 3.623.877 5.116a.488.488 0 01-.708.514L12 16.447l-4.592 2.414a.488.488 0 01-.708-.514l.877-5.116-3.717-3.623c-.291-.285-.13-.784.273-.843l5.138-.746 2.3-4.66z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Premium Finish</h4>
                  <p className="feature-desc">Durable, rich pigments that resist scrubbing and fading.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="feature-col">
                <div className="feature-icon-wrapper">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Eco-Friendly</h4>
                  <p className="feature-desc">Low VOC formulas, safe for your family and environment.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="feature-col">
                <div className="feature-icon-wrapper">
                  <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l.75-1.268a1 1 0 00-.175-1.242l-2.586-2.586a1 1 0 00-1.242-.175l-1.268.75m10.14-10.14a4.5 4.5 0 116.364 6.364l-11.455 11.454a4.5 4.5 0 01-2.909 1.32l-3.251.362a.5.5 0 01-.553-.553l.362-3.251a4.5 4.5 0 011.32-2.91L16.243 4.517z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Color Matching</h4>
                  <p className="feature-desc">Get the exact shade you want with our precise matching tools.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container-xl">
          <div className="about-grid">
            <ScrollReveal animation="fade-in-left">
              <div className="about-images-wrapper">
                <div className="about-frame-bg"></div>
                <img 
                  src="/about_interior.png" 
                  alt="Painter applying green paint to textured wall" 
                  className="about-img-primary" 
                />
                <img 
                  src="/about_detail.png" 
                  alt="Flat lay of paint tins and color swatches" 
                  className="about-img-secondary" 
                />
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-in-right">
              <div>
                <span className="about-company-tag">About Our Company</span>
                <h2 className="about-title">Trusted paints & coatings partner since 2005</h2>
                <p className="about-text">
                  Established in 2005, Umiya Hardware & Paints has been a reliable, trusted name in decorative and industrial coatings in Ankleshwar. With over 20 years of experience, we focus on providing expert product guidance, competitive pricing, and genuine materials. We solve color shade selection, matching problems, and wrong product selections under one roof.
                </p>
                <Link to="/about" className="btn-solid-dark">
                  About Us
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="specialization-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered">What We Do Best</span>
              <h2 className="section-title-centered">Exquisite Paint Solutions</h2>
            </div>
          </ScrollReveal>
          <div className="spec-grid">
            <ScrollReveal delay={0}>
              <div className="spec-card">
                <div className="spec-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                </div>
                <h3 className="spec-card-title">Interior Elegance</h3>
                <p className="spec-card-desc">Luxury washable emulsions in matte, satin, and gloss for exquisite room vibes.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="spec-card">
                <div className="spec-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                  </svg>
                </div>
                <h3 className="spec-card-title">Weather-Shield Exterior</h3>
                <p className="spec-card-desc">Elastomeric exterior paints providing UV protection and extreme rain resistance.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="spec-card">
                <div className="spec-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                  </svg>
                </div>
                <h3 className="spec-card-title">Eco-Clean Green</h3>
                <p className="spec-card-desc">Low VOC and allergy-free coatings certified for babies' nurseries and healthcare spaces.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="spec-card">
                <div className="spec-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                </div>
                <h3 className="spec-card-title">Luxury Textures</h3>
                <p className="spec-card-desc">Italian stucco, sandblasted metallic finishes, and soft velvet concrete overlays.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Products (Interactive Swatches replacement) */}
      <section className="products-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered">Stylish & Simple</span>
              <h2 className="section-title-centered">Featured Products</h2>
            </div>
          </ScrollReveal>

          {/* Filter Navigation */}
          <ScrollReveal delay={0.1}>
            <ul className="filter-nav">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {cat === 'All' ? 'All Featured' : (categoryMap[cat] || cat)}
                  </button>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Shades Grid with key trigger */}
          <div className="shades-grid" key={activeFilter}>
            {filteredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} animation="zoom-in" delay={idx * 0.05} duration={0.4}>
                <div className="shade-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/products/${product.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="shade-swatch-wrapper" style={{ height: '200px', backgroundColor: '#F8F6F1' }}>
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
                        <h3 className="shade-name" style={{ fontSize: '15px', lineHeight: 1.3, minHeight: '38px', margin: '4px 0' }}>
                          {product.name}
                        </h3>
                      </div>
                      <div className="shade-code-price" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '10px' }}>
                        <span className="shade-code">{product.brand}</span>
                        <span className="shade-price" style={{ color: 'var(--color-gold-dark)', fontSize: '12px' }}>View ➔</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="shades-cta">
              <Link to="/products" className="btn-outline-gold">
                View All Products
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blogs & Guides */}
      <section className="blog-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered">Color Inspiration</span>
              <h2 className="section-title-centered">Latest Paint Blogs</h2>
            </div>
          </ScrollReveal>
          <div className="blog-grid">
            <ScrollReveal delay={0}>
              <div className="blog-card">
                <div className="blog-img-wrapper" style={{ backgroundColor: '#D6CFC4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: '#6A6357', fontSize: '18px', fontWeight: 600 }}>Palette Selection Guide</div>
                </div>
                <div className="blog-info">
                  <span className="blog-date">June 5, 2026</span>
                  <h3 className="blog-title">
                    <a href="#">How to Choose the Perfect Accent Wall Color</a>
                  </h3>
                  <p className="blog-excerpt">
                    Discover how light orientation affects paint shades and how to create a high-contrast focal wall in your dining room.
                  </p>
                  <a href="#" className="blog-readmore">Read Article ➔</a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="blog-card">
                <div className="blog-img-wrapper" style={{ backgroundColor: '#CED7CD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: '#556A55', fontSize: '18px', fontWeight: 600 }}>Healthy Living Spaces</div>
                </div>
                <div className="blog-info">
                  <span className="blog-date">May 28, 2026</span>
                  <h3 className="blog-title">
                    <a href="#">The Health Benefits of Zero-VOC Eco Paints</a>
                  </h3>
                  <p className="blog-excerpt">
                    Why air quality matters in bedrooms and nurseries. Learn how low VOC paints protect your family from allergen triggers.
                  </p>
                  <a href="#" className="blog-readmore">Read Article ➔</a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="blog-card">
                <div className="blog-img-wrapper" style={{ backgroundColor: '#DECED4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: '#7E636E', fontSize: '18px', fontWeight: 600 }}>Seasonal Decor Trends</div>
                </div>
                <div className="blog-info">
                  <span className="blog-date">May 15, 2026</span>
                  <h3 className="blog-title">
                    <a href="#">5 Trending Color Palettes for Modern Interiors</a>
                  </h3>
                  <p className="blog-excerpt">
                    Explore how warm clay, deep forest green, and soft sandy beige are redefining contemporary European home styles.
                  </p>
                  <a href="#" className="blog-readmore">Read Article ➔</a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
