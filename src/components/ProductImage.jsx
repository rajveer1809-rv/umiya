import { useState } from 'react'

export default function ProductImage({ id, name, category, className }) {
  const [imgSrc, setImgSrc] = useState(`/images/products/${id}.png`)
  const [tryJpg, setTryJpg] = useState(false)
  const [fallback, setFallback] = useState(false)

  const handleImgError = () => {
    if (!tryJpg) {
      // If .png fails, try .jpg next
      setImgSrc(`/images/products/${id}.jpg`)
      setTryJpg(true)
    } else if (!fallback) {
      // If .jpg fails, try .webp next
      setImgSrc(`/images/products/${id}.webp`)
      setFallback(true)
    } else {
      // Fallback to stylized SVG placeholder
      setImgSrc(null)
    }
  }

  if (!imgSrc) {
    // A beautiful styled gradient container that represents the product type
    const getCategoryStyles = () => {
      switch (category) {
        case 'Interior Exterior Wall Paints':
          return { bg: 'linear-gradient(135deg, #DEE9FA, #C4DDFC)', text: '#2C5E8A' }
        case 'Wood Coating':
          return { bg: 'linear-gradient(135deg, #F9EDE1, #F1D4BA)', text: '#8A582C' }
        case 'Texture Designer Paints':
          return { bg: 'linear-gradient(135deg, #F6E1F9, #E6BAF1)', text: '#7C2C8A' }
        case 'Painting Tools Accessories':
          return { bg: 'linear-gradient(135deg, #E6F7ED, #C0EDD0)', text: '#2C8A51' }
        case 'Water Proofing Materials':
          return { bg: 'linear-gradient(135deg, #E1F8F9, #BAF1F3)', text: '#2C888A' }
        case 'Decorative Enamels For Home':
          return { bg: 'linear-gradient(135deg, #FEF7DF, #FCE8AA)', text: '#8A6E2C' }
        default:
          return { bg: 'linear-gradient(135deg, #F2EFE9, #DFDAD0)', text: '#666666' }
      }
    }

    const styles = getCategoryStyles()
    
    return (
      <div 
        className={className} 
        style={{ 
          background: styles.bg, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '24px',
          color: styles.text,
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          minHeight: '200px',
          position: 'relative'
        }}
      >
        {/* Paint Can / Bucket SVG outline */}
        <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" style={{ marginBottom: '10px', opacity: 0.75 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a7 7 0 00-14 0v2m11-2a1 1 0 100-2 1 1 0 000 2zM7 9a1 1 0 100-2 1 1 0 000 2z"/>
        </svg>
        <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', opacity: 0.8 }}>
          {category}
        </span>
        <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '6px', lineHeight: 1.25 }}>
          {name}
        </div>
      </div>
    )
  }

  return (
    <img 
      src={imgSrc} 
      alt={name} 
      className={className} 
      onError={handleImgError} 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}
