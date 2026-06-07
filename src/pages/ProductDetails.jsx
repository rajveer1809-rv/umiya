import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductImage from '../components/ProductImage'
import ScrollReveal from '../components/ScrollReveal'

// Lightweight helper function to convert product markdown content to structured HTML
function parseMarkdown(markdownText) {
  if (!markdownText) return ''
  
  // 1. Replace horizontal rules: ---
  let html = markdownText.replace(/^---$/gm, '<hr class="details-divider" />')
  
  // 2. Replace bullet items: * **Title** Text or * Text
  html = html.replace(/^\*\s+\*\*(.*?)\*\*$/gm, '</ul><h4 class="specs-bullet-title">$1</h4><ul class="specs-list">')
  html = html.replace(/^\*\s+(.*)$/gm, '<li>$1</li>')
  
  // 3. Replace bold text: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // 4. Replace blockquotes: > Text
  html = html.replace(/^>\s+(.*)$/gm, '<blockquote class="details-quote">$1</blockquote>')
  
  // 5. Replace tables:
  const tableRegex = /\|([^|]+)\|([^|]+)\|\r?\n\|(?:\s*:?---*:?\s*)\|(?:\s*:?---*:?\s*)\|\r?\n((?:\|[^|]+\|[^|]+\|\r?\n?)*)/g
  html = html.replace(tableRegex, (match, header1, header2, rows) => {
    const tableHeader = `<thead><tr><th>${header1.trim()}</th><th>${header2.trim()}</th></tr></thead>`
    const tableRows = rows.split('\n')
      .map(row => {
        const cols = row.split('|').filter(c => c.trim())
        if (cols.length < 2) return ''
        return `<tr><td>${cols[0].trim()}</td><td>${cols[1].trim()}</td></tr>`
      })
      .join('')
    return `<div class="table-responsive"><table class="specs-table">${tableHeader}<tbody>${tableRows}</tbody></table></div>`
  })

  // 6. Replace headings: ## Heading or ### Heading
  html = html.replace(/^##\s+(.*)$/gm, '<h3 class="details-section-title">$1</h3>')
  html = html.replace(/^###\s+(.*)$/gm, '<h4 class="details-section-subtitle">$1</h4>')
  
  // 7. Replace paragraphs
  const paragraphs = html.split(/\n\n+/)
  html = paragraphs.map(p => {
    const trimmed = p.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('<div') || trimmed.startsWith('<table') || trimmed.startsWith('<block') || trimmed.startsWith('<hr')) {
      return trimmed
    }
    return `<p class="details-p">${trimmed.replace(/\n/g, '<br />')}</p>`
  }).join('\n')

  return html
}

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id || p.slug === id)

  const [selectedSize, setSelectedSize] = useState('1 Litre')

  if (!product) {
    return (
      <section className="page-section" style={{ textAlign: 'center', padding: '100px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>Product Not Found</h2>
        <p className="section-text" style={{ margin: '0 auto 30px auto' }}>
          The product code or slug you requested is not in our current catalog.
        </p>
        <Link to="/products" className="btn-solid-dark">Back to Products</Link>
      </section>
    )
  }

  // Sizing list defaults for paint tins/brushes
  const isTool = product.category === 'Painting Tools Accessories'
  const sizes = isTool ? ['Standard Size'] : ['500ml', '1 Litre', '4 Litre', '10 Litre', '20 Litre']



  return (
    <>
      {/* Banner */}
      <section className="inner-page-banner">
        <div className="container-xl">
          <ScrollReveal>
            <h1>Product Details</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> <Link to="/products">Products</Link> <span>/</span> {product.name}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Details Section */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '40px 0 80px 0' }}>
        <div className="container-xl">
          <div className="product-details-grid" style={{ gridTemplateColumns: '1fr 1.1fr', gap: '50px', alignItems: 'flex-start' }}>
            
            {/* Left Column: Visual Swatch / Image fallback */}
            <ScrollReveal animation="fade-in-left">
              <div className="product-gallery">
                <div 
                  className="product-main-swatch" 
                  style={{ height: 'auto', minHeight: '350px', backgroundColor: '#FAF8F5', overflow: 'hidden' }}
                >
                  <ProductImage 
                    id={product.id} 
                    name={product.name} 
                    category={product.category}
                  />
                </div>
                <div style={{ marginTop: '24px', backgroundColor: '#FAF8F5', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                    Authenticity Guarantee
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    This is a genuine product manufactured by <strong>{product.brand}</strong>. Umiya is an authorized distributor supplying freshly thinned batches directly from paint depots.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Information & Options */}
            <ScrollReveal animation="fade-in-right">
              <div>
                <span className="product-meta-category">{product.brand} — {product.category}</span>
                <h2 className="product-detail-name" style={{ fontSize: '28px', lineHeight: 1.25, margin: '8px 0 16px 0' }}>
                  {product.name}
                </h2>
                
                <div className="product-detail-price-row" style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                  <span className="product-detail-price" style={{ color: 'var(--color-gold-dark)', fontSize: '24px' }}>
                    Authorized Distribution
                  </span>
                </div>

                <p className="product-description-text" style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 500, marginBottom: '24px' }}>
                  {product.shortDescription}
                </p>

                {/* Sizing options if not accessory tools */}
                {!isTool && (
                  <div className="product-shades-options" style={{ marginBottom: '24px' }}>
                    <h4 className="product-option-title">Select Volume</h4>
                    <div className="finish-options-list" style={{ flexWrap: 'wrap', gap: '10px' }}>
                      {sizes.map(s => (
                        <button 
                          key={s}
                          className={`finish-badge ${selectedSize === s ? 'active' : ''}`}
                          onClick={() => setSelectedSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inquiry CTA */}
                <div style={{ marginTop: '30px' }}>
                  <Link 
                    to="/contact" 
                    className="btn-solid-dark" 
                    style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', textAlign: 'center' }}
                  >
                    Request Quote / Inquiry ➔
                  </Link>
                </div>

                {/* Content details (parsed markdown) */}
                <div 
                  className="product-specs-markdown" 
                  style={{ marginTop: '40px', borderTop: '1px solid var(--border-light)', paddingTop: '30px' }}
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(product.content) }}
                ></div>

              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  )
}
