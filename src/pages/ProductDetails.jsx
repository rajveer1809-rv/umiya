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

function getProductSections(content) {
  if (!content) return []
  const parts = content.split(/\n---/g)
  
  const sections = []
  
  parts.forEach((part, index) => {
    const trimmed = part.trim()
    if (!trimmed) return
    
    // Find the title (first line starting with ##)
    const titleMatch = trimmed.match(/^##\s+(.*)$/m)
    let title
    let body = trimmed
    
    if (titleMatch) {
      title = titleMatch[1]
      // Remove the header line from body
      body = trimmed.replace(/^##\s+.*$/m, '').trim()
    } else {
      if (index === 0) {
        title = 'Overview'
      } else {
        // Fallback for title if no header exists
        title = `Details ${index}`
      }
    }
    
    sections.push({
      title: title,
      id: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      content: body
    })
  })
  
  return sections
}

const getShadesForCategory = (category) => {
  switch (category) {
    case 'Wood Coating':
      return [
        { name: 'Natural Oak', code: 'WC-01', hex: '#C59B6D', family: 'Light Wood' },
        { name: 'Warm Teak', code: 'WC-02', hex: '#A86F3E', family: 'Medium Wood' },
        { name: 'Rich Walnut', code: 'WC-03', hex: '#634427', family: 'Dark Wood' },
        { name: 'Classic Mahogany', code: 'WC-04', hex: '#8B422B', family: 'Dark Wood' },
        { name: 'Dark Charcoal', code: 'WC-05', hex: '#2C2B2C', family: 'Tones' },
        { name: 'Clear Gloss', code: 'WC-06', hex: '#F7F4EF', family: 'Clears' }
      ]
    case 'Water Proofing Materials':
      return [
        { name: 'Standard White', code: 'WP-10', hex: '#FFFFFF', family: 'Base' },
        { name: 'Slate Grey', code: 'WP-11', hex: '#8C92AC', family: 'Base' },
        { name: 'Terracotta Red', code: 'WP-12', hex: '#C35237', family: 'Colors' },
        { name: 'Coal Black', code: 'WP-13', hex: '#1C1C1F', family: 'Colors' }
      ]
    case 'Painting Tools Accessories':
      return [] // No shades for tools
    default: // Paints, Enamels, Textures
      return [
        { name: 'Pure Alabaster', code: 'AP-1011', hex: '#F7F6F0', family: 'Whites' },
        { name: 'Warm Cream', code: 'AP-1082', hex: '#FDF6E2', family: 'Whites' },
        { name: 'Soft Sand', code: 'AP-2104', hex: '#EEDCBE', family: 'Neutrals' },
        { name: 'Tuscan Sun', code: 'AP-2024', hex: '#F9D189', family: 'Warm' },
        { name: 'Apricot Glow', code: 'AP-1143', hex: '#F3A47C', family: 'Warm' },
        { name: 'Crimson Sunset', code: 'AP-6120', hex: '#B82832', family: 'Warm' },
        { name: 'Muted Rose', code: 'AP-5112', hex: '#E4B4C1', family: 'Pastels' },
        { name: 'Lavender Mist', code: 'AP-5240', hex: '#D7D5E8', family: 'Pastels' },
        { name: 'Royal Blue', code: 'AP-7402', hex: '#1E3E80', family: 'Cool' },
        { name: 'Ocean Wave', code: 'AP-7110', hex: '#4A90E2', family: 'Cool' },
        { name: 'Mint Breeze', code: 'AP-3030', hex: '#C2E8D4', family: 'Pastels' },
        { name: 'Forest Moss', code: 'AP-4890', hex: '#1F5342', family: 'Cool' },
        { name: 'Charcoal Slate', code: 'AP-9090', hex: '#374151', family: 'Neutrals' },
        { name: 'Urban Bronze', code: 'AP-8840', hex: '#5C5449', family: 'Neutrals' }
      ]
  }
}

const getBrandClass = (brand) => {
  if (!brand) return 'brand-default'
  const clean = brand.toLowerCase().replace(/\s+/g, '-')
  return `brand-${clean}`
}

const getDefaultVisualizerOption = (category) => {
  if (category === 'Wood Coating') return 'cabinet'
  if (category === 'Texture Designer Paints') return 'linen'
  return 'living-room'
}

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id || p.slug === id)

  const [selectedSize, setSelectedSize] = useState('1 Litre')
  const [activeView, setActiveView] = useState('product') // 'product' or 'visualizer'
  const [customShade, setCustomShade] = useState(null)
  const [shadesFilter, setShadesFilter] = useState('All')
  const [activeTab, setActiveTab] = useState(0)

  // Sub-option for active visualizer scene / texture / model
  const [visualizerOption, setVisualizerOption] = useState(() => 
    product ? getDefaultVisualizerOption(product.category) : 'living-room'
  )

  // Calculator states
  const [wallArea, setWallArea] = useState(250)
  const [numCoats, setNumCoats] = useState(2)

  // Track prev id to reset states on product change
  const [prevId, setPrevId] = useState(id)

  const shades = product ? getShadesForCategory(product.category) : []
  const hasShades = shades.length > 0
  const selectedShade = customShade || (shades.length > 0 ? shades[0] : null)

  // Inline state reset when URL parameter id changes (React recommended pattern)
  if (id !== prevId) {
    setPrevId(id)
    setCustomShade(null)
    setSelectedSize(product && product.category === 'Painting Tools Accessories' ? 'Standard Size' : '1 Litre')
    setActiveView('product')
    setActiveTab(0)
    setShadesFilter('All')
    if (product) {
      setVisualizerOption(getDefaultVisualizerOption(product.category))
    }
  }

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

  const isTool = product.category === 'Painting Tools Accessories'
  const sizes = isTool ? ['Standard Size'] : ['500ml', '1 Litre', '4 Litre', '10 Litre', '20 Litre']

  // Filter shades
  const filteredShades = shades.filter(s => shadesFilter === 'All' || s.family === shadesFilter)
  const shadeFamilies = ['All', ...new Set(shades.map(s => s.family))]

  const sections = getProductSections(product.content)

  const calculateLitres = () => {
    let coveragePerLitre = 120 // Default 1 coat coverage
    
    if (product.category === 'Interior Exterior Wall Paints') {
      if (product.name.toLowerCase().includes('apex') || product.name.toLowerCase().includes('exterior')) {
        coveragePerLitre = 120
      } else {
        coveragePerLitre = 280 // Interior premium emulsion
      }
    } else if (product.category === 'Wall Putty') {
      coveragePerLitre = 130
    } else if (product.category === 'Texture Designer Paints') {
      coveragePerLitre = 100
    } else if (product.category === 'Decorative Enamels For Home' || product.category === 'Idustrial Paints' || product.category === 'Industrial Paints') {
      coveragePerLitre = 180
    } else if (product.category === 'Wood Coating') {
      coveragePerLitre = 100
    } else if (product.category === 'Water Proofing Materials') {
      coveragePerLitre = 50 // Thick coat waterproofing
    }

    const absoluteCoverage = coveragePerLitre / numCoats
    return Math.max(0.1, (wallArea / absoluteCoverage)).toFixed(1)
  }

  const litresNeeded = calculateLitres()

  const getPackagingRecommendation = (totalLitres, selectedSize) => {
    if (isTool) return "Accessories sold per pack or unit."
    
    // Parse size
    let sizeMultiplier
    if (selectedSize.includes('ml')) {
      sizeMultiplier = parseFloat(selectedSize) / 1000
    } else {
      sizeMultiplier = parseFloat(selectedSize)
    }

    const packs = Math.ceil(totalLitres / sizeMultiplier)
    return `We recommend ordering ${packs} × ${selectedSize} pack(s).`
  }

  // Renders the visualizer SVG based on the product category and sub-options selected
  const renderVisualizer = () => {
    const hexColor = selectedShade ? selectedShade.hex : '#F7F6F0'

    if (product.category === 'Wood Coating') {
      if (visualizerOption === 'planks') {
        return (
          <svg viewBox="0 0 400 280" className="room-visualizer-svg" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}>
            {/* Stacked planks */}
            <g stroke="#000000" strokeWidth="0.5">
              <rect y="0" width="400" height="56" fill={hexColor} opacity="0.95" style={{ transition: 'fill 0.4s ease' }} />
              <rect y="56" width="400" height="56" fill={hexColor} opacity="0.88" style={{ transition: 'fill 0.4s ease' }} />
              <rect y="112" width="400" height="56" fill={hexColor} opacity="1.0" style={{ transition: 'fill 0.4s ease' }} />
              <rect y="168" width="400" height="56" fill={hexColor} opacity="0.91" style={{ transition: 'fill 0.4s ease' }} />
              <rect y="224" width="400" height="56" fill={hexColor} opacity="0.96" style={{ transition: 'fill 0.4s ease' }} />
            </g>
            
            {/* Wood Grain Overlay */}
            <g opacity="0.2" stroke="#000000" strokeWidth="1.2" fill="none" pointerEvents="none">
              {/* Plank division lines */}
              <line x1="0" y1="56" x2="400" y2="56" stroke="#000000" strokeWidth="1" />
              <line x1="0" y1="112" x2="400" y2="112" stroke="#000000" strokeWidth="1" />
              <line x1="0" y1="168" x2="400" y2="168" stroke="#000000" strokeWidth="1" />
              <line x1="0" y1="224" x2="400" y2="224" stroke="#000000" strokeWidth="1" />

              {/* Board 1 Grain */}
              <path d="M 10 20 Q 120 12 240 25 T 390 18" />
              <path d="M 0 35 Q 160 42 320 28 T 400 32" />
              
              {/* Board 2 Grain */}
              <path d="M 50 78 A 20 6 0 0 0 90 78 A 20 6 0 0 0 50 78 Z" />
              <path d="M 0 68 Q 110 85 220 62 T 400 75" />
              <path d="M 10 92 Q 180 82 290 98 T 390 90" />
              
              {/* Board 3 Grain */}
              <path d="M 0 135 C 100 125, 200 145, 400 130" />
              <path d="M 20 152 Q 130 162 250 148 T 380 155" />
              
              {/* Board 4 Grain */}
              <path d="M 280 196 A 12 5 0 0 1 304 196 A 12 5 0 0 1 280 196 Z" />
              <path d="M 0 185 Q 140 178 270 192 T 400 182" />
              <path d="M 15 212 C 100 205, 210 220, 395 208" />
              
              {/* Board 5 Grain */}
              <path d="M 0 248 Q 160 255 310 242 T 400 250" />
              <path d="M 5 265 C 120 260, 240 272, 390 262" />
            </g>
          </svg>
        )
      } else {
        return (
          <svg viewBox="0 0 400 280" className="room-visualizer-svg" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}>
            {/* Wall Background */}
            <rect width="400" height="210" fill="#F3F4F6" />
            
            {/* Floor */}
            <rect y="210" width="400" height="70" fill="#E5E7EB" />
            <line x1="0" y1="210" x2="400" y2="210" stroke="#D1D5DB" strokeWidth="2" />

            {/* Cabinet Body */}
            <rect x="80" y="70" width="240" height="140" rx="8" fill={hexColor} style={{ transition: 'fill 0.4s ease' }} />
            
            {/* Cabinet wood grain overlay */}
            <g opacity="0.22" stroke="#000000" strokeWidth="1" fill="none" pointerEvents="none">
              <line x1="160" y1="70" x2="160" y2="210" stroke="#000000" strokeWidth="1.5" />
              <line x1="240" y1="70" x2="240" y2="210" stroke="#000000" strokeWidth="1.5" />
              
              <path d="M 85 90 C 120 85, 200 95, 315 90" />
              <path d="M 85 105 C 150 110, 220 98, 315 102" />
              <path d="M 85 130 C 110 125, 150 135, 180 130 C 220 125, 280 135, 315 128" />
              <path d="M 85 155 C 140 150, 190 160, 315 152" />
              <path d="M 85 175 C 130 178, 220 170, 315 174" />
              <path d="M 85 195 C 150 190, 240 200, 315 192" />
              
              <path d="M 120 115 A 8 4 0 1 0 136 115 A 8 4 0 1 0 120 115 Z" />
              <path d="M 270 145 A 10 5 0 1 0 290 145 A 10 5 0 1 0 270 145 Z" />
            </g>

            {/* Legs */}
            <line x1="110" y1="210" x2="100" y2="235" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
            <line x1="290" y1="210" x2="300" y2="235" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
            <line x1="150" y1="210" x2="150" y2="225" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
            <line x1="250" y1="210" x2="250" y2="225" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />

            {/* Knobs handles */}
            <circle cx="145" cy="140" r="4" fill="#D97706" />
            <circle cx="175" cy="140" r="4" fill="#D97706" />
            <circle cx="225" cy="140" r="4" fill="#D97706" />
            <circle cx="255" cy="140" r="4" fill="#D97706" />

            {/* Plant pot on sideboard */}
            <rect x="250" y="45" width="20" height="25" rx="2" fill="#E5E7EB" />
            <path d="M 260 45 Q 240 25 245 15" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            <path d="M 260 45 Q 275 20 268 12" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      }
    } else if (product.category === 'Texture Designer Paints') {
      return (
        <svg viewBox="0 0 400 280" className="room-visualizer-svg" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}>
          {/* Base Wall Rect */}
          <rect width="400" height="200" fill={hexColor} style={{ transition: 'fill 0.4s ease' }} />
          
          {/* Texture Overlays depending on option */}
          {visualizerOption === 'stucco' && (
            <rect width="400" height="200" fill={hexColor} filter="url(#global-stucco-filt)" style={{ transition: 'fill 0.4s ease' }} />
          )}
          
          {visualizerOption === 'linen' && (
            <rect width="400" height="200" fill="url(#global-linen-pat)" />
          )}
          
          {visualizerOption === 'metallic' && (
            <rect width="400" height="200" fill="url(#global-metal-grad)" style={{ mixBlendMode: 'overlay' }} />
          )}

          {/* Floor */}
          <rect y="200" width="400" height="80" fill="#EBE4D8" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="#D3C9BC" strokeWidth="2" />
          
          {/* Skirting board */}
          <rect y="190" width="400" height="10" fill="#FBF9F6" />
          <line x1="0" y1="190" x2="400" y2="190" stroke="#E6DFD3" strokeWidth="1" />

          {/* Sofa overlay in front of textured wall */}
          <rect x="120" y="150" width="160" height="50" rx="8" fill="#4B5563" />
          <rect x="130" y="175" width="65" height="20" rx="4" fill="#374151" />
          <rect x="205" y="175" width="65" height="20" rx="4" fill="#374151" />
          <rect x="110" y="165" width="15" height="30" rx="6" fill="#1F2937" />
          <rect x="275" y="165" width="15" height="30" rx="6" fill="#1F2937" />
          
          <path d="M 140 175 L 150 155 L 160 175 Z" fill="#D97706" />
          <path d="M 260 175 L 250 155 L 240 175 Z" fill="#059669" />

          {/* Plant */}
          <rect x="35" y="185" width="16" height="25" rx="2" fill="#78350F" />
          <path d="M 43 185 Q 30 160 20 170 C 25 178 37 182 43 185 Z" fill="#166534" />
          <path d="M 43 185 Q 56 165 66 175 C 60 182 50 185 43 185 Z" fill="#166534" />
        </svg>
      )
    } else {
      // Wall Paints, Enamels, Waterproofing, etc.
      if (visualizerOption === 'bedroom') {
        return (
          <svg viewBox="0 0 400 280" className="room-visualizer-svg" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}>
            {/* Wall */}
            <rect width="400" height="180" fill={hexColor} style={{ transition: 'fill 0.4s ease' }} />
            
            {/* Floor */}
            <rect y="180" width="400" height="100" fill="#E5E7EB" />
            <line x1="0" y1="180" x2="400" y2="180" stroke="#D1D5DB" strokeWidth="2" />

            {/* Headboard */}
            <rect x="80" y="120" width="240" height="80" rx="4" fill="#374151" />
            
            {/* Bed Mattress & Blanket */}
            <rect x="90" y="160" width="220" height="70" rx="4" fill="#FFFFFF" stroke="#E5E7EB" />
            <rect x="90" y="180" width="220" height="50" rx="2" fill="#93C5FD" />

            {/* Pillows */}
            <rect x="110" y="145" width="50" height="25" rx="3" fill="#F3F4F6" stroke="#E5E7EB" />
            <rect x="240" y="145" width="50" height="25" rx="3" fill="#F3F4F6" stroke="#E5E7EB" />

            {/* Nightstands */}
            <rect x="30" y="150" width="40" height="40" rx="2" fill="#8B5A2B" />
            <circle cx="50" cy="170" r="3" fill="#1F2937" />
            <rect x="330" y="150" width="40" height="40" rx="2" fill="#8B5A2B" />
            <circle cx="350" cy="170" r="3" fill="#1F2937" />
            
            {/* Lamps */}
            <rect x="45" y="140" width="10" height="10" fill="#4B5563" />
            <path d="M 40 140 L 60 140 L 55 125 L 45 125 Z" fill="#FBBF24" />
            <rect x="345" y="140" width="10" height="10" fill="#4B5563" />
            <path d="M 340 140 L 360 140 L 355 125 L 345 125 Z" fill="#FBBF24" />

            {/* Picture frame above bed */}
            <rect x="160" y="30" width="80" height="50" fill="#FAF8F5" stroke="#1F2937" strokeWidth="2" />
            <circle cx="200" cy="55" r="10" fill="#F59E0B" />
          </svg>
        )
      } else {
        // Living room scene (default)
        return (
          <svg viewBox="0 0 400 280" className="room-visualizer-svg" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}>
            {/* Wall Background */}
            <rect width="400" height="200" fill={hexColor} style={{ transition: 'fill 0.4s ease' }} />
            
            {/* Floor */}
            <rect y="200" width="400" height="80" fill="#EBE4D8" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#D3C9BC" strokeWidth="2" />
            
            {/* Skirting board */}
            <rect y="190" width="400" height="10" fill="#FBF9F6" />
            <line x1="0" y1="190" x2="400" y2="190" stroke="#E6DFD3" strokeWidth="1" />

            {/* Window */}
            <rect x="20" y="30" width="80" height="110" fill="#E0F2FE" opacity="0.8" stroke="#FBF9F6" strokeWidth="4" />
            <line x1="60" y1="30" x2="60" y2="140" stroke="#FBF9F6" strokeWidth="2" />
            <line x1="20" y1="85" x2="100" y2="85" stroke="#FBF9F6" strokeWidth="2" />
            
            {/* Wall Art Frame */}
            <rect x="290" y="40" width="60" height="80" fill="#FAF8F5" stroke="#232323" strokeWidth="3" />
            {/* Inner Art */}
            <circle cx="320" cy="75" r="15" fill="#F59E0B" />
            <path d="M 295 105 Q 310 95 320 105 T 345 105" fill="none" stroke="#0284C7" strokeWidth="2" />

            {/* Sofa */}
            <rect x="120" y="150" width="160" height="50" rx="8" fill="#52525B" />
            <rect x="130" y="175" width="65" height="20" rx="4" fill="#3F3F46" />
            <rect x="205" y="175" width="65" height="20" rx="4" fill="#3F3F46" />
            <rect x="110" y="165" width="15" height="30" rx="6" fill="#27272A" />
            <rect x="275" y="165" width="15" height="30" rx="6" fill="#27272A" />
            
            {/* Accent Pillows */}
            <path d="M 140 175 L 150 155 L 160 175 Z" fill="#F43F5E" />
            <path d="M 260 175 L 250 155 L 240 175 Z" fill="#10B981" />
            
            {/* Legs */}
            <line x1="130" y1="200" x2="125" y2="215" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
            <line x1="270" y1="200" x2="275" y2="215" stroke="#18181B" strokeWidth="4" strokeLinecap="round" />
            
            {/* Rug */}
            <ellipse cx="200" cy="225" rx="90" ry="15" fill="#E4E4E7" opacity="0.6" />

            {/* Plant */}
            <rect x="30" y="185" width="20" height="30" rx="3" fill="#D97706" />
            <path d="M 40 185 Q 25 155 15 165 C 20 175 35 180 40 185 Z" fill="#15803D" />
            <path d="M 40 185 Q 40 145 50 150 C 45 165 42 175 40 185 Z" fill="#166534" />
            <path d="M 40 185 Q 55 160 65 170 C 58 178 48 182 40 185 Z" fill="#15803D" />
          </svg>
        )
      }
    }
  }

  return (
    <>
      {/* Global SVG Definitions for patterns and filters */}
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
        <defs>
          {/* Linen Texture Pattern */}
          <pattern id="global-linen-pat" width="8" height="8" patternUnits="userSpaceOnUse">
            <line x1="0" y1="4" x2="8" y2="4" stroke="#000000" strokeWidth="0.8" opacity="0.12" />
            <line x1="4" y1="0" x2="4" y2="8" stroke="#000000" strokeWidth="0.8" opacity="0.12" />
            <line x1="0" y1="1" x2="8" y2="1" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />
            <line x1="1" y1="0" x2="1" y2="8" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />
          </pattern>
          
          {/* Stucco Fractal Noise Filter */}
          <filter id="global-stucco-filt" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.16 0" />
            <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
          </filter>

          {/* Metallic Sheen Linear Gradient */}
          <linearGradient id="global-metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="25%" stopColor="#000000" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="75%" stopColor="#000000" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Banner */}
      <section className="inner-page-banner banner-products">
        <div className="container-xl">
          <ScrollReveal>
            <h1>Product Details</h1>
            <div className="breadcrumbs">
              <Link to="/">Home</Link> <span>/</span> <Link to="/products">Products</Link> <span>/</span> {product.name}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main product container */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '60px 0 100px 0' }}>
        <div className="container-xl">
          <div className="details-grid-wrapper">
            
            {/* Left Column: Visualizers */}
            <div className="gallery-visualizer-container">
              
              {/* Product Visualizer Toggle */}
              {hasShades && (
                <ScrollReveal animation="fade-in-up">
                  <div className="visualizer-toggle-bar">
                    <button 
                      className={`visualizer-toggle-btn ${activeView === 'product' ? 'active' : ''}`}
                      onClick={() => setActiveView('product')}
                    >
                      📷 Product Image
                    </button>
                    <button 
                      className={`visualizer-toggle-btn ${activeView === 'visualizer' ? 'active' : ''}`}
                      onClick={() => setActiveView('visualizer')}
                    >
                      🎨 Interactive Room Wall
                    </button>
                  </div>
                </ScrollReveal>
              )}

              {/* Primary Canvas */}
              <ScrollReveal animation="fade-in-up">
                {activeView === 'product' ? (
                  <div className="product-image-canvas">
                    <ProductImage 
                      id={product.id} 
                      name={product.name} 
                      category={product.category}
                      style={{ maxHeight: '360px', width: 'auto', objectFit: 'contain' }}
                    />
                    
                    {/* Active Shade indicator overlays on image */}
                    {selectedShade && (
                      <div className="shade-active-indicator">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span 
                            style={{ 
                              width: '16px', 
                              height: '16px', 
                              borderRadius: '50%', 
                              backgroundColor: selectedShade.hex,
                              border: '1px solid #CCC'
                            }}
                          ></span>
                          <span style={{ fontSize: '12px', fontWeight: 600 }}>{selectedShade.name}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{selectedShade.code}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="room-visualizer-panel">
                    {renderVisualizer()}
                    
                    {selectedShade && (
                      <div className="shade-active-indicator">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span 
                            style={{ 
                              width: '16px', 
                              height: '16px', 
                              borderRadius: '50%', 
                              backgroundColor: selectedShade.hex,
                              border: '1px solid #CCC'
                            }}
                          ></span>
                          <span style={{ fontSize: '12px', fontWeight: 600 }}>
                            {selectedShade.name} ({product.category === 'Wood Coating' ? 'Wood Stain' : 'Active Paint'})
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{selectedShade.code}</span>
                      </div>
                    )}
                  </div>
                )}
              </ScrollReveal>

              {/* Visualizer Option Selectors */}
              {activeView === 'visualizer' && (
                <ScrollReveal animation="fade-in-up">
                  <div className="visualizer-options-bar">
                    {product.category === 'Wood Coating' && (
                      <>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center' }}>Model:</span>
                        <button 
                          className={`visualizer-option-btn ${visualizerOption === 'cabinet' ? 'active' : ''}`}
                          onClick={() => setVisualizerOption('cabinet')}
                        >
                          🗄️ Sideboard Cabinet
                        </button>
                        <button 
                          className={`visualizer-option-btn ${visualizerOption === 'planks' ? 'active' : ''}`}
                          onClick={() => setVisualizerOption('planks')}
                        >
                          🪵 Wood Planks
                        </button>
                      </>
                    )}
                    
                    {product.category === 'Texture Designer Paints' && (
                      <>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center' }}>Texture:</span>
                        <button 
                          className={`visualizer-option-btn ${visualizerOption === 'linen' ? 'active' : ''}`}
                          onClick={() => setVisualizerOption('linen')}
                        >
                          🕸️ Linen Weave
                        </button>
                        <button 
                          className={`visualizer-option-btn ${visualizerOption === 'stucco' ? 'active' : ''}`}
                          onClick={() => setVisualizerOption('stucco')}
                        >
                          🛕 Stucco Spatula
                        </button>
                        <button 
                          className={`visualizer-option-btn ${visualizerOption === 'metallic' ? 'active' : ''}`}
                          onClick={() => setVisualizerOption('metallic')}
                        >
                          🌟 Metallic Sheen
                        </button>
                      </>
                    )}
                    
                    {product.category !== 'Wood Coating' && product.category !== 'Texture Designer Paints' && (
                      <>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center' }}>Scene:</span>
                        <button 
                          className={`visualizer-option-btn ${visualizerOption === 'living-room' ? 'active' : ''}`}
                          onClick={() => setVisualizerOption('living-room')}
                        >
                          🛋️ Living Room
                        </button>
                        <button 
                          className={`visualizer-option-btn ${visualizerOption === 'bedroom' ? 'active' : ''}`}
                          onClick={() => setVisualizerOption('bedroom')}
                        >
                          🛏️ Bedroom
                        </button>
                      </>
                    )}
                  </div>
                </ScrollReveal>
              )}

              {/* Color Shade Explorer Panel */}
              {hasShades && (
                <ScrollReveal animation="fade-in-up">
                  <div className="color-shades-explorer">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>Explore Color Shades</h4>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Select a shade to preview on the canvas</p>
                      </div>
                      
                      {/* Brand themed accent */}
                      <span className="shade-count-badge" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-gold-dark)', padding: '2px 8px', backgroundColor: 'var(--color-gold-transparent)', borderRadius: '4px' }}>
                        {shades.length} Shades Available
                      </span>
                    </div>

                    {/* Filter navigation */}
                    {shadeFamilies.length > 2 && (
                      <div className="shades-filter-nav">
                        {shadeFamilies.map(fam => (
                          <button
                            key={fam}
                            className={`shades-filter-btn ${shadesFilter === fam ? 'active' : ''}`}
                            onClick={() => setShadesFilter(fam)}
                          >
                            {fam}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Swatches Grid */}
                    <div className="shades-swatches-grid">
                      {filteredShades.map(shade => (
                        <div 
                          key={shade.code}
                          className={`shade-swatch-card ${selectedShade?.code === shade.code ? 'active' : ''}`}
                          onClick={() => {
                            setCustomShade(shade)
                            // If they select a shade, we also switch to room visualizer for immediate effect
                            setActiveView('visualizer')
                          }}
                        >
                          <div 
                            className="shade-swatch-circle" 
                            style={{ backgroundColor: shade.hex }}
                          >
                            {selectedShade?.code === shade.code && (
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M17 5L8 14L3 9" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className="shade-swatch-name">{shade.name}</span>
                          <span className="shade-swatch-code">{shade.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

            </div>

            {/* Right Column: Info, Specs, Calculator */}
            <div className="product-details-content-right">
              <ScrollReveal animation="fade-in-up">
                
                {/* Brand Tag badge */}
                <span className={`brand-badge-tag ${getBrandClass(product.brand)}`}>
                  {product.brand}
                </span>

                {/* Rating display */}
                <div className="rating-stars-container">
                  <div style={{ display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="rating-star-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="rating-star-text">4.9 / 5 (Authorized Dealer Rating)</span>
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 16px 0', fontFamily: 'var(--font-display)', color: 'var(--text-main)', lineHeight: 1.2 }}>
                  {product.name}
                </h2>

                <div className="product-detail-price-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 20px 0', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                  <span className="product-detail-price" style={{ color: 'var(--color-gold-dark)', fontSize: '20px', fontWeight: 600 }}>
                    Authorized Distribution
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', borderLeft: '1px solid var(--border-color)', paddingLeft: '12px' }}>
                    Fresh Depot Batches
                  </span>
                </div>

                <p className="product-description-text" style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 500, margin: '0 0 30px 0', lineHeight: 1.6 }}>
                  {product.shortDescription}
                </p>

                {/* Sizing Section */}
                <div className="product-shades-options" style={{ marginBottom: '24px' }}>
                  <h4 className="product-option-title" style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>
                    {isTool ? 'Pack size' : 'Select Volume / Packaging'}
                  </h4>
                  <div className="finish-options-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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

                {/* Dynamic Paint Calculator - for paints, coatings, waterproofing, putties */}
                {!isTool && (
                  <div className="paint-calculator-card">
                    <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      🧮 Smart Coverage Calculator
                    </h4>
                    
                    <div className="calc-input-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <label className="calc-label" style={{ margin: 0 }}>Wall / Surface Area</label>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{wallArea} sq. ft.</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="2000" 
                        step="50"
                        value={wallArea} 
                        onChange={(e) => setWallArea(parseInt(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--color-gold-dark)', cursor: 'pointer' }}
                      />
                    </div>

                    <div className="calc-input-group">
                      <label className="calc-label">Number of Coats</label>
                      <div className="calc-btn-group">
                        <button 
                          className={`calc-toggle-btn ${numCoats === 1 ? 'active' : ''}`}
                          onClick={() => setNumCoats(1)}
                        >
                          1 Coat (Touch-up / Primer)
                        </button>
                        <button 
                          className={`calc-toggle-btn ${numCoats === 2 ? 'active' : ''}`}
                          onClick={() => setNumCoats(2)}
                        >
                          2 Coats (Standard Finish)
                        </button>
                      </div>
                    </div>

                    <div className="calc-result-display">
                      <div className="calc-result-number">{litresNeeded} Litres</div>
                      <div className="calc-result-text">
                        Estimated Paint Required
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px dashed var(--border-color)', paddingTop: '8px' }}>
                        {getPackagingRecommendation(parseFloat(litresNeeded), selectedSize)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Call to Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                  <Link 
                    to="/contact" 
                    className="btn-solid-dark" 
                    style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', textAlign: 'center', padding: '16px 24px', fontSize: '14px', fontWeight: 600 }}
                  >
                    Send Official Inquiry / Get Quote ➔
                  </Link>

                  {/* Add WhatsApp CTA to direct chat with a professional */}
                  <a 
                    href={`https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}.%20Selected%20size%3A%20${selectedSize}.`}
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-whatsapp-inquiry"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.897 14.1 1.87 11.75 1.87 6.31 1.87 1.88 6.29 1.876 11.737c-.001 1.637.498 3.23 1.446 4.82L2.39 21.02l4.257-1.866zm12.355-6.233c-.328-.164-1.942-.96-2.242-1.07-.3-.11-.518-.164-.736.164-.218.327-.844 1.07-1.034 1.289-.19.217-.38.245-.708.081-.328-.163-1.385-.51-2.638-1.627-.975-.87-1.633-1.946-1.824-2.274-.19-.328-.02-.505.143-.668.148-.147.328-.382.492-.573.164-.19.218-.328.328-.546.11-.218.055-.41-.027-.573-.082-.164-.736-1.775-1.01-2.43-.267-.64-.535-.55-.736-.56-.19-.01-.409-.01-.627-.01-.218 0-.573.082-.873.41-.3.327-1.145 1.12-1.145 2.73 0 1.61 1.173 3.166 1.336 3.385.164.218 2.3 3.515 5.578 4.93.78.337 1.39.539 1.86.688.784.249 1.497.214 2.06.13.629-.094 1.942-.793 2.215-1.558.272-.765.272-1.42.19-1.557-.081-.137-.272-.218-.6-.382z"/>
                    </svg>
                    Chat with Product Expert
                  </a>
                </div>

                {/* Guarantee Assurances Card */}
                <div className="assurances-grid">
                  <div className="assurance-item">
                    <span className="assurance-icon">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </span>
                    <div>
                      <div className="assurance-text-title">100% Genuine Paint</div>
                      <div className="assurance-text-desc">Direct factory supply from brand depots.</div>
                    </div>
                  </div>

                  <div className="assurance-item">
                    <span className="assurance-icon">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </span>
                    <div>
                      <div className="assurance-text-title">Fresh Batch Guarantee</div>
                      <div className="assurance-text-desc">Supplied directly from fresh paint runs.</div>
                    </div>
                  </div>
                </div>

              </ScrollReveal>
            </div>

          </div>

          {/* Section: Tabbed Content Details */}
          {sections.length > 0 && (
            <ScrollReveal animation="fade-in-up">
              <div className="product-specs-tabs">
                
                {/* Tab buttons */}
                <ul className="tab-nav-list">
                  {sections.map((sec, idx) => (
                    <li key={sec.id}>
                      <button 
                        className={`tab-nav-btn ${activeTab === idx ? 'active' : ''}`}
                        onClick={() => setActiveTab(idx)}
                      >
                        {sec.title}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Tab contents */}
                <div className="tab-content-panel" key={activeTab}>
                  <div 
                    className="product-specs-markdown" 
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(sections[activeTab].content) }}
                  ></div>
                </div>

              </div>
            </ScrollReveal>
          )}

        </div>
      </section>
    </>
  )
}
