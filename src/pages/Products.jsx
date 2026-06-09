import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import ProductImage from '../components/ProductImage'
import ScrollReveal from '../components/ScrollReveal'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || 'All'
  const [searchQuery, setSearchQuery] = useState('')

  const handleFilterChange = (cat) => {
    const newParams = new URLSearchParams(searchParams)
    if (cat === 'All') {
      newParams.delete('filter')
    } else {
      newParams.set('filter', cat)
    }
    setSearchParams(newParams)
  }

  const handleCategoryClick = (catKey) => {
    handleFilterChange(catKey)
    const element = document.getElementById('catalog-filters-scroll')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const categoryMap = {
    'Decorative Enamels For Home': 'Enamels',
    'Wall Putty': 'Putty',
    'Texture Designer Paints': 'Textures',
    'Painting Tools Accessories': 'Tools & Accs',
    'Interior Exterior Wall Paints': 'Wall Paints',
    'Wood Coating': 'Wood Coatings',
    'Water Proofing Materials': 'Waterproofing',
    'Idustrial Paints': 'Industrial'
  }

  const categories = ['All', ...Object.keys(categoryMap)]

  // Category Grid configuration with custom SVGs
  const categoryGridItems = [
    {
      key: 'Interior Exterior Wall Paints',
      title: 'Wall Paints',
      subtitle: 'Luxury Emulsions',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      key: 'Decorative Enamels For Home',
      title: 'Decorative Enamels',
      subtitle: 'Oil Paints & Sheens',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      key: 'Wood Coating',
      title: 'Wood Coatings',
      subtitle: 'Italian PU & Sealers',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      key: 'Water Proofing Materials',
      title: 'Waterproofing',
      subtitle: 'Moisture Sealing Solutions',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.26a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      key: 'Texture Designer Paints',
      title: 'Design Textures',
      subtitle: 'Venetian Plasters & Play',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      key: 'Wall Putty',
      title: 'Wall Putty & Primers',
      subtitle: 'Flat Base Sealers',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      key: 'Painting Tools Accessories',
      title: 'Application Tools',
      subtitle: 'Brushes, Rollers & Trays',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      key: 'Idustrial Paints',
      title: 'Industrial Coatings',
      subtitle: 'Anti-Rust Steel Epoxies',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.548 2.2a2 2 0 01-1.96 1.414H9.663a2 2 0 01-1.96-1.414l-.548-2.2A2 2 0 005.195 15.4l-2.387.478a2 2 0 00-.586 3.414l1.39 1.39a8 8 0 005.122 1.024h6.532a8 8 0 005.122-1.024l1.39-1.39a2 2 0 00-.586-3.414zM12 3c-1.2 0-3.6 1.8-3.6 4.8 0 2 1.6 3.6 3.6 3.6s3.6-1.6 3.6-3.6C15.6 4.8 13.2 3 12 3z" />
        </svg>
      )
    }
  ]

  // Curated featured products filter
  const featuredProductIds = [
    'asianpaintsroyaleluxuryemulsion',
    'berger-paints-imperia-luxury-polyurethane-pu',
    'dr-fixit-raincoat-select'
  ]
  const featuredProductsList = products.filter(p => featuredProductIds.includes(p.id))

  // Brands list
  const brandList = [
    { name: 'Asian Paints', type: 'Platinum Dealer', logo: '/images/brands/aplogo.jfif' },
    { name: 'Berger Paints', type: 'Authorized Partner', logo: '/images/brands/burgerlogo.jfif' },
    { name: 'Dulux', type: 'Certified Retailer', logo: '/images/brands/deluxlogo.png' },
    { name: 'Dr. Fixit', type: 'Waterproofing Hub', logo: '/images/brands/drflogojfif.jfif' },
    { name: 'Birla White', type: 'Putty Depot', logo: '/images/brands/birlawhitelogo.jfif' },
    { name: 'British Paints', type: 'Direct Supplier', logo: '/images/brands/britishpaint.png' },
    { name: 'Esdee Paints', type: 'Industrial Depot', logo: '/images/brands/esdee.png' },
    { name: 'ICA Wood Coatings', type: 'Italian Premium Finishes', logo: '/images/brands/ica.png' }
  ]

  // Gallery items matching available project/gallery assets
  const galleryItems = [
    {
      image: '/gallery/modern_living_rooms.png',
      title: 'Modern Living Room',
      subtitle: 'Finished with Royale Luxury Emulsion'
    },
    {
      image: '/projects/veneer_furniture_coating.png',
      title: 'Polished Timber veneer',
      subtitle: 'Finished with Imperia Polyurethane PU'
    },
    {
      image: '/projects/modern_villa_facade.png',
      title: 'External Damp Protection',
      subtitle: 'Waterproofed with Dr. Fixit Membrane systems'
    },
    {
      image: '/projects/heavy_plant_pipeline.png',
      title: 'Industrial Heavy Machinery',
      subtitle: 'Coated with High Build Epoxy Primers'
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'All' || product.category === activeFilter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* 1. Product Page Hero */}
      <section className="inner-page-banner banner-products">
        <div className="container-xl">
          <ScrollReveal>
            <h1>Our Products & Accessories</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> Products
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Category Grid */}
      <section className="prod-category-grid-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">Departments</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Shop Paint & Protection Categories</h2>
            </div>
          </ScrollReveal>

          <div className="prod-category-grid">
            {categoryGridItems.map((item, idx) => (
              <ScrollReveal key={item.key} delay={idx * 0.05} animation="fade-in-up">
                <div 
                  className="prod-category-card" 
                  onClick={() => handleCategoryClick(item.key)}
                >
                  <div className="prod-category-icon">{item.icon}</div>
                  <h3 className="prod-category-title">{item.title}</h3>
                  <span className="prod-category-subtitle">{item.subtitle}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="prod-featured-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">Top Recommendations</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Featured Flagship Products</h2>
            </div>
          </ScrollReveal>

          <div className="prod-featured-grid">
            {featuredProductsList.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.1} animation="zoom-in">
                <div className="prod-featured-card">
                  <div className="prod-featured-image-wrapper">
                    <span className="prod-featured-badge">Bestseller</span>
                    <ProductImage 
                      id={product.id} 
                      name={product.name} 
                      category={product.category} 
                    />
                  </div>
                  <div className="prod-featured-info">
                    <span className="prod-featured-category">{product.brand}</span>
                    <h3 className="prod-featured-title">{product.name}</h3>
                    <p className="prod-featured-desc">{product.shortDescription}</p>
                    <Link to={`/products/${product.id}`} className="btn-solid-dark" style={{ textAlign: 'center', width: '100%', padding: '12px' }}>
                      View Specifications
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brands */}
      <section className="prod-brands-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle-centered">Official Dealerships</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Direct Brand Supplies</h2>
            </div>
          </ScrollReveal>

          <div className="prod-brands-grid">
            {brandList.map((brand, idx) => (
              <ScrollReveal key={brand.name} delay={idx * 0.04} animation="fade-in-up">
                <div className="prod-brand-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '24px 15px' }}>
                  <div style={{ height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`} 
                      style={{ maxHeight: '100%', maxWidth: '120px', objectFit: 'contain', transition: 'transform 0.3s ease' }} 
                      className="prod-brand-logo-img"
                    />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '15px' }}>{brand.name}</div>
                    <div style={{ color: 'var(--color-gold-dark)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px', fontWeight: 600 }}>{brand.type}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Product Gallery */}
      <section className="prod-gallery-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">Visual Inspiration</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Perfect Surfaces Achieved</h2>
            </div>
          </ScrollReveal>

          <div className="prod-gallery-grid">
            {galleryItems.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} animation="zoom-in">
                <div className="prod-gallery-item">
                  <img src={item.image} alt={item.title} />
                  <div className="prod-gallery-overlay">
                    <h4>{item.title}</h4>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Filters */}
      <section id="catalog-filters-scroll" className="prod-filters-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle-centered">Product Finder</span>
              <h2 className="section-title-centered" style={{ fontSize: '26px' }}>Browse & Filter Catalog</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '20px', 
              marginBottom: '40px',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '24px'
            }}>
              
              {/* Filter Buttons */}
              <ul className="filter-nav" style={{ margin: 0, padding: 0, justifyContent: 'flex-start', flexWrap: 'wrap', gap: '15px 24px' }}>
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                      onClick={() => handleFilterChange(cat)}
                      style={{ fontSize: '12px' }}
                    >
                      {cat === 'All' ? 'All Products' : (categoryMap[cat] || cat)}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Search Input */}
              <div style={{ position: 'relative', maxWidth: '300px', width: '100%' }}>
                <input 
                  type="text" 
                  placeholder="Search products, brands, types..." 
                  className="form-control"
                  style={{ 
                    padding: '10px 16px 10px 40px', 
                    borderRadius: '24px', 
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF' 
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span style={{ 
                  position: 'absolute', 
                  left: '14px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-muted)' 
                }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </span>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Product Cards */}
      <section className="products-section" style={{ padding: '0 0 80px 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container-xl" style={{ paddingTop: '50px' }}>
          {filteredProducts.length > 0 ? (
            <div className="shades-grid" key={`${activeFilter}-${searchQuery}`}>
              {filteredProducts.map((product, idx) => (
                <ScrollReveal key={product.id} animation="zoom-in" delay={idx * 0.03} duration={0.4}>
                  <div className="shade-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Link to={`/products/${product.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div className="shade-swatch-wrapper" style={{ height: '220px', backgroundColor: '#FFFFFF' }}>
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
                          <span className="shade-category">{categoryMap[product.category] || product.category}</span>
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
          ) : (
            <ScrollReveal>
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: '16px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <h3>No Products Found</h3>
                <p style={{ marginTop: '8px' }}>Try searching for another product name, brand, or category.</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* 8. Call To Action (CTA) */}
      <section className="about-section" style={{ backgroundColor: '#FFFFFF', padding: '100px 0', textAlign: 'center', borderTop: '1px solid var(--border-light)' }}>
        <div className="container-xl" style={{ maxWidth: '800px' }}>
          <ScrollReveal animation="fade-in-up">
            <span className="section-subtitle-centered" style={{ display: 'inline-block', marginBottom: '15px' }}>Custom Paint Services</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600, marginBottom: '20px', lineHeight: '1.3' }}>
              Unsure about quantity or color choices?
            </h2>
            <p className="about-text" style={{ marginBottom: '35px', fontSize: '15.5px', color: 'var(--text-muted)' }}>
              Click into any product details page to use our interactive paint calculator, or arrange a personalized technical site inspection with our expert tinting consultants in Ankleshwar.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-solid-dark">Request an Estimate</Link>
              <Link to="/services" className="btn-outline-dark">Our Painting Process</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
