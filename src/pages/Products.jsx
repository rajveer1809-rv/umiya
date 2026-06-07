import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductImage from '../components/ProductImage'
import ScrollReveal from '../components/ScrollReveal'

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'All' || product.category === activeFilter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Banner */}
      <section className="inner-page-banner">
        <div className="container-xl">
          <ScrollReveal>
            <h1>Our Products & Accessories</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> Products
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="products-section" style={{ padding: '60px 0' }}>
        <div className="container-xl">
          
          {/* Search & Filter Bar */}
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
                      onClick={() => setActiveFilter(cat)}
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
                    backgroundColor: '#FAF8F5' 
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

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="shades-grid" key={`${activeFilter}-${searchQuery}`}>
              {filteredProducts.map((product, idx) => (
                <ScrollReveal key={product.id} animation="zoom-in" delay={idx * 0.03} duration={0.4}>
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
                          <h3 className="shade-name" style={{ fontSize: '16px', lineHeight: 1.3, margin: '4px 0 8px 0', minHeight: '42px' }}>
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
    </>
  )
}
