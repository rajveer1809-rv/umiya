import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  const [projectTab, setProjectTab] = useState('All')
  const [isHomeVideoPlaying, setIsHomeVideoPlaying] = useState(false)
  const [videoSlideIndex, setVideoSlideIndex] = useState(0)
  const [isVideoPaused, setIsVideoPaused] = useState(false)

  const videoSlides = [
    {
      image: '/projects/modern_villa_facade.png',
      title: 'Modern Villa Facade',
      desc: 'Finished with Premium UV-Stable Weather-Guard Emulsion'
    },
    {
      image: '/projects/corporate_main_lobby.png',
      title: 'Corporate Main Lobby',
      desc: 'Completed with Satin-Soft Sheen Luxury Interior Emulsion'
    },
    {
      image: '/projects/showroom_glass_facade.png',
      title: 'Commercial Showroom Facade',
      desc: 'Finished with Impact-Resistant Structural Coatings'
    },
    {
      image: '/projects/ankleshwar_gidc_warehouse.png',
      title: 'Ankleshwar GIDC Warehouse',
      desc: 'Industrial Corrosion-Resistant Roof Protective Seals'
    },
    {
      image: '/projects/heavy_plant_pipeline.png',
      title: 'Industrial Heavy Plant Pipeline',
      desc: 'Coated with Chemical-Proof Protective Primers & Topcoats'
    }
  ]

  useEffect(() => {
    if (!isHomeVideoPlaying || isVideoPaused) return

    const timer = setInterval(() => {
      setVideoSlideIndex((prev) => (prev + 1) % videoSlides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [isHomeVideoPlaying, isVideoPaused])

  // Before & After Interactive States
  const [beforeAfterTab, setBeforeAfterTab] = useState('Exterior Facades')
  const [sliderPosition, setSliderPosition] = useState(50)
  const widgetRef = useRef(null)
  const [widgetWidth, setWidgetWidth] = useState(500)

  // Measure before/after widget size
  useEffect(() => {
    const handleResize = () => {
      if (widgetRef.current) {
        setWidgetWidth(widgetRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [beforeAfterTab])

  // Before & After Data Mapping
  const beforeAfterData = {
    'Exterior Facades': {
      before: '/gallery/exterior_facades_before.png',
      after: '/gallery/exterior_facades_after.png',
      title: 'Modern Villa Facade Treatment',
      desc: 'Deep structural restoration followed by 2 coats of UV-stable, anti-algal elastomeric weather protection shields.'
    },
    'Epoxy Flooring': {
      before: '/gallery/epoxy_flooring_before.png',
      after: '/gallery/epoxy_flooring_after.png',
      title: 'Heavy-Duty GIDC Warehouse Floor',
      desc: 'Converting dusty, cracked concrete surfaces into chemical-resistant, dust-free seamless epoxy protective coatings.'
    },
    'Office Interiors': {
      before: '/gallery/office_interiors_before.png',
      after: '/gallery/office_interiors_after.png',
      title: 'Corporate Main Lobby Renovation',
      desc: 'Applying premium, soft-sheen luxury emulsions and designer texture glazes to turn dull workspaces into artistic environments.'
    },
    'Warehouse Coatings': {
      before: '/gallery/warehouse_coatings_before.png',
      after: '/gallery/warehouse_coatings_after.png',
      title: 'Anti-Corrosive Pipe & Surface Coatings',
      desc: 'Corroded factory piping and concrete surfaces treated with zinc chromate primers and protective aliphatic polyurethane layers.'
    }
  }

  const currentBA = beforeAfterData[beforeAfterTab]

  // Hover/touch interaction handler for Before/After Slider
  const handleBAInteraction = (clientX, container) => {
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e) => {
    handleBAInteraction(e.clientX, e.currentTarget)
  }

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleBAInteraction(e.touches[0].clientX, e.currentTarget)
    }
  }

  // 2. "Where We Work" Interactive Hotspot States
  const [activeHotspot, setActiveHotspot] = useState('Villa')

  const hotspotsData = {
    'Villa': {
      title: 'Luxury Residential Villa',
      solution: 'Weather Guard & Luxury Interior Emulsions',
      desc: 'Complete moisture diagnostics, efflorescence resistance, and computerized Colourworld shade formulations for architectural elegance.',
      system: 'Asian Paints Royale + Apex Ultima Weather Guard',
      warranty: '7-Year Film Warranty',
      top: '25%', left: '16.5%'
    },
    'Office': {
      title: 'Corporate Office Spaces',
      solution: 'Lustre Sheen & Designer Textures',
      desc: 'Clean corporate vibes using Crystal Reflective Technology and washable texture glazes that resist high-traffic burnishing.',
      system: 'Berger Silk Glamor + Spatulato Textures',
      warranty: '5-Year Durability',
      top: '46%', left: '50%'
    },
    'Warehouse': {
      title: 'Industrial GIDC Warehouses',
      solution: 'Anti-Rust & Heavy Floor Epoxies',
      desc: 'Anti-corrosive primer systems for structural steels and high-build epoxy flooring that eliminates concrete dust residue.',
      system: 'PPG Asian Paints High-Build Epoxy Primer & Topcoat',
      warranty: '10-Year Protection',
      top: '73%', left: '76.5%'
    },
    'Showroom': {
      title: 'Retail Showrooms',
      solution: 'High-Gloss Enamels & Soft Sheen Finishes',
      desc: 'Spectacular reflective finishes on metal grilles, custom wood veneers, and glass framing trim.',
      system: 'Berger Luxol High Gloss + Imperia PU Finish',
      warranty: 'Premium Aesthetics',
      top: '74%', left: '19%'
    },
    'Factory': {
      title: 'Manufacturing Plants',
      solution: 'Chemical & Heat Resistant Protection',
      desc: 'Shielding pipes, heat exchangers, and storage units against high temperature, acids, and friction.',
      system: 'Apcothane Polyurethane + Zinc Oxide Primers',
      warranty: 'Industrial Grade',
      top: '24%', left: '75.5%'
    }
  }

  // 3. Signature Projects Wall Bento Grid Configuration
  const bentoProjects = [
    {
      id: 1,
      image: '/projects/modern_villa_facade.png',
      title: 'Luxury Villa Facade',
      cat: 'Residential',
      tags: ['Residential', 'Exterior'],
      location: 'Ankleshwar Chowk',
      value: '₹8.5 Lakhs',
      area: '14,000 sq.ft',
      system: 'Apex Ultima DPUR',
      layoutClass: 'bento-wide-tall'
    },
    {
      id: 2,
      image: '/projects/veneer_furniture_coating.png',
      title: 'Veneer Furniture Coating',
      cat: 'Residential',
      tags: ['Residential', 'Interior'],
      location: 'Valia Road Residency',
      value: '₹3.2 Lakhs',
      area: '3,500 sq.ft',
      system: 'Berger Imperia PU',
      layoutClass: 'bento-standard'
    },
    {
      id: 3,
      image: '/projects/showroom_glass_facade.png',
      title: 'Retail Showroom Facade',
      cat: 'Commercial',
      tags: ['Commercial', 'Exterior'],
      location: 'Centre Point Mall',
      value: '₹12.8 Lakhs',
      area: '18,000 sq.ft',
      system: 'Aliphatic PU Coating',
      layoutClass: 'bento-standard'
    },
    {
      id: 4,
      image: '/projects/corporate_main_lobby.png',
      title: 'Corporate Main Lobby',
      cat: 'Commercial',
      tags: ['Commercial', 'Interior'],
      location: 'GIDC Office Park',
      value: '₹6.4 Lakhs',
      area: '8,500 sq.ft',
      system: 'Royale Play Stucco',
      layoutClass: 'bento-wide'
    },
    {
      id: 5,
      image: '/projects/heavy_plant_pipeline.png',
      title: 'Industrial Pipeline Shielding',
      cat: 'Industrial',
      tags: ['Industrial', 'Exterior'],
      location: 'ONGC Plant Ankleshwar',
      value: '₹45 Lakhs',
      area: '45,000 sq.ft',
      system: 'Apcothane PU System',
      layoutClass: 'bento-standard'
    },
    {
      id: 6,
      image: '/projects/ankleshwar_gidc_warehouse.png',
      title: 'GIDC Logistics Floor',
      cat: 'Industrial',
      tags: ['Industrial', 'Interior'],
      location: 'Warehouse Block D',
      value: '₹22 Lakhs',
      area: '62,000 sq.ft',
      system: 'PPG High-Build Epoxy',
      layoutClass: 'bento-wide'
    }
  ]

  const filteredBentoProjects = projectTab === 'All'
    ? bentoProjects
    : bentoProjects.filter(p => p.cat === projectTab || p.tags.includes(projectTab))

  // 5. Surface Protection Journey Timeline
  const journeySteps = [
    {
      num: '01',
      title: 'Surface Analysis',
      desc: 'Measuring moisture metrics, mapping wall undulations, and assessing concrete tensile strength.'
    },
    {
      num: '02',
      title: 'Primer Sealing',
      desc: 'Applying deep-penetration binders to lock down dust and neutralize structural cement salts.'
    },
    {
      num: '03',
      title: 'Protective System',
      desc: 'Laying flexible elastomeric damp proof sheets or high-build chemical-resistant epoxy coats.'
    },
    {
      num: '04',
      title: 'Decorative Finish',
      desc: 'Applying computerized tinted emulsions or hand-tool textured Italian stucco glazes.'
    },
    {
      num: '05',
      title: 'Long-Term Protection',
      desc: 'Adhesion testing, visual sign-off, and delivery of warranties for paint film durability.'
    }
  ]

  // 6. Explore By Space Cards
  const exploreSpaces = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      title: 'Living Rooms',
      desc: 'Washable luxury emulsions',
      link: '/products'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9M3 16h18" />
          <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4H3z" />
        </svg>
      ),
      title: 'Premium Bedrooms',
      desc: 'Velvet soft sheen finishes',
      link: '/products'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="15" y2="17" />
        </svg>
      ),
      title: 'Office Interiors',
      desc: 'Clean corporate color vibes',
      link: '/products'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <rect x="9" y="9" width="6" height="13" />
        </svg>
      ),
      title: 'Commercial Spaces',
      desc: 'Impact-resistant floors',
      link: '/products'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 21H2V9l5 4 5-4 5 4 5-4v12z" />
          <path d="M17 21V13M7 21v-4" />
        </svg>
      ),
      title: 'Industrial Plants',
      desc: 'Anti-corrosive shields',
      link: '/products'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </svg>
      ),
      title: 'Warehouses',
      desc: 'Dust-free epoxy flooring',
      link: '/products'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M12 22V12" />
        </svg>
      ),
      title: 'Exterior Buildings',
      desc: 'UV-stable weather guards',
      link: '/products'
    }
  ]

  // 7. Luxury Materials Showcase Data
  const materialsShowcase = [
    { title: 'Luxury Emulsions', desc: 'Rich, soft-sheen paint films with Teflon surface stain protection.', brand: 'Royale Luxury Emulsion' },
    { title: 'Weather Guards', desc: 'UV-stable silicone coatings resisting tropical monsoon algae and micro-cracks.', brand: 'Apex Ultima DPUR' },
    { title: 'PU Finishes', desc: 'Italian wood veneer protections with diamond-hard scratch and heat resistance.', brand: 'Berger Imperia PU' },
    { title: 'Epoxy Systems', desc: 'Seamless floor coatings engineered for heavy machinery and GIDC plants.', brand: 'PPG High Build Epoxy' },
    { title: 'Decorative Textures', desc: 'Special effects glazes replicating natural rock, comb, or krinkle finishes.', brand: 'Royale Play Designer' }
  ]

  // 9. Live Coating Visualizer States
  const [visualizerSpace, setVisualizerSpace] = useState('Living Room')
  const [selectedColor, setSelectedColor] = useState('#1E2D42') // Default Deep Navy matching mockup

  const visualizerColors = [
    { name: 'Warm Cream', hex: '#FAF8F5', isLight: true },
    { name: 'Luxury Gold', hex: '#BF8C4C', isLight: false },
    { name: 'Deep Navy', hex: '#1E2D42', isLight: false },
    { name: 'Slate Gray', hex: '#8F9B9C', isLight: true },
    { name: 'Terracotta', hex: '#A85A42', isLight: false }
  ]

  const renderVisualizerSuite = () => {
    const hexColor = selectedColor

    if (visualizerSpace === 'Wood Planks') {
      return (
        <svg viewBox="0 0 800 500" className="room-visualizer-svg" style={{ width: '100%', height: '100%', display: 'block', borderRadius: 'var(--radius-md)' }}>
          <defs>
            <filter id="soft-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.3" />
            </filter>
            <linearGradient id="plank-reflection" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Stacked planks with beveled edges and lighting sheen */}
          <g stroke="#000000" strokeWidth="0.5" filter="url(#soft-shadow)">
            {[0, 100, 200, 300, 400].map((yOffset, i) => (
              <g key={i}>
                <rect y={yOffset} width="800" height="96" fill={hexColor} style={{ transition: 'fill 0.4s ease' }} />
                {/* Plank reflection & shading */}
                <rect y={yOffset} width="800" height="96" fill="url(#plank-reflection)" style={{ mixBlendMode: 'overlay' }} />
              </g>
            ))}
          </g>
          
          {/* Wood Grain Overlay */}
          <g opacity="0.12" stroke="#000000" strokeWidth="1.8" fill="none" pointerEvents="none">
            {[0, 100, 200, 300, 400].map((yOffset, i) => (
              <g key={i} transform={`translate(0, ${yOffset})`}>
                <line x1="0" y1="96" x2="800" y2="96" stroke="#000000" strokeWidth="1.5" />
                <path d={`M 10 ${20+i*2} Q 220 ${10+i} 440 ${28+i} T 790 ${16+i}`} />
                <path d={`M 0 ${40-i} Q 360 ${45+i} 620 ${30-i} T 800 ${35+i}`} />
                <path d={`M 50 ${78+i} A 30 10 0 0 0 110 ${78+i} A 30 10 0 0 0 50 ${78+i} Z`} />
              </g>
            ))}
          </g>
        </svg>
      )
    }

    if (visualizerSpace === 'Bedroom') {
      return (
        <svg viewBox="0 0 800 500" className="room-visualizer-svg" style={{ width: '100%', height: '100%', display: 'block', borderRadius: 'var(--radius-md)' }}>
          <defs>
            <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.25" />
            </filter>
            <linearGradient id="wall-shading" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
              <stop offset="20%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="80%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="ceiling-ao" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="right-corner-ao" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id="contact-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#0F172A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.0" />
            </radialGradient>
            <radialGradient id="lamp-glow-left" cx="110" cy="210" r="160">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.0" />
            </radialGradient>
            <radialGradient id="lamp-glow-right" cx="690" cy="210" r="160">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#FEF08A" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.0" />
            </radialGradient>
            <linearGradient id="lamp-cone-left" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="cove-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFEBD6" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#FFEBD6" stopOpacity="0.5" />
              <stop offset="65%" stopColor="#FFEBD6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFEBD6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="bedroom-carpet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5F5F4" />
              <stop offset="100%" stopColor="#E7E5E4" />
            </linearGradient>
          </defs>

          {/* Wall Background (Painted with hexColor) */}
          <rect width="800" height="320" fill={hexColor} style={{ transition: 'fill 0.4s ease' }} />
          

          
          {/* LED Cove Lighting Glow */}
          <rect y="15" width="800" height="100" fill="url(#cove-glow)" style={{ mixBlendMode: 'screen' }} />
          
          {/* Wall ambient shading */}
          <rect width="800" height="320" fill="url(#wall-shading)" style={{ mixBlendMode: 'multiply' }} />
          
          {/* Crown Molding */}
          <rect width="800" height="15" fill="#FAF8F5" />
          <rect y="15" width="800" height="5" fill="url(#ceiling-ao)" style={{ mixBlendMode: 'multiply' }} />
          
          {/* Left and Right corners */}
          <rect width="40" height="320" fill="url(#right-corner-ao)" style={{ mixBlendMode: 'multiply', transform: 'scaleX(-1)', transformOrigin: '20px 0' }} />
          <rect x="760" width="40" height="320" fill="url(#right-corner-ao)" style={{ mixBlendMode: 'multiply' }} />
          
          {/* Skirting Board */}
          <rect y="310" width="800" height="10" fill="#FAF8F5" />
          <line x1="0" y1="310" x2="800" y2="310" stroke="#E2E8F0" strokeWidth="1" />

          {/* Floor */}
          <rect y="320" width="800" height="180" fill="url(#bedroom-carpet)" />
          <rect y="320" width="800" height="15" fill="url(#ceiling-ao)" style={{ mixBlendMode: 'multiply', transform: 'scaleY(-1)', transformOrigin: '0 327.5px' }} />

          {/* Bed Wall Cast Shadow */}
          <image href="/images/luxury_bed.png" x="175" y="160" width="450" height="270" filter="url(#cast-shadow-filter)" transform="translate(0, 15)" style={{ mixBlendMode: 'multiply' }} />
          {/* Bed Contact Shadow */}
          <ellipse cx="400" cy="425" rx="220" ry="10" fill="url(#contact-shadow)" opacity="0.85" />
          {/* Bed Headboard, Mattress & Blanket */}
          <image href="/images/luxury_bed.png" x="175" y="160" width="450" height="270" filter="url(#soft-shadow)" />


        </svg>
      )
    }

    // Default: Living Room (mockup match)
    return (
      <svg viewBox="0 0 800 500" className="room-visualizer-svg" style={{ width: '100%', height: '100%', display: 'block', borderRadius: 'var(--radius-md)' }}>
        <defs>
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.25" />
          </filter>
          <linearGradient id="wall-shading" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="20%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="80%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="dark-wood-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E1C0C" />
            <stop offset="50%" stopColor="#1C0F05" />
            <stop offset="100%" stopColor="#0F0802" />
          </linearGradient>
          <radialGradient id="contact-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#0F172A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.0" />
          </radialGradient>
          <radialGradient id="wall-light-falloff" cx="130" cy="150" r="700">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </radialGradient>
          <linearGradient id="light-beam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.2" />
            <stop offset="45%" stopColor="#FFFBEB" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFBEB" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="right-corner-ao" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ceiling-ao" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="cove-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFEBD6" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#FFEBD6" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#FFEBD6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFEBD6" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="lamp-glow-right" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEBD6" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#FFEBD6" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#FFEBD6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFEBD6" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* 1. Wall Background (painted with hexColor) */}
        <rect width="800" height="345" fill={hexColor} style={{ transition: 'fill 0.4s ease' }} />
        {/* Wall light falloff overlay */}
        <rect width="800" height="345" fill="url(#wall-light-falloff)" style={{ mixBlendMode: 'multiply' }} />
        
        {/* Cove Lighting LED Glow */}
        <rect y="15" width="800" height="120" fill="url(#cove-glow)" style={{ mixBlendMode: 'screen' }} />
        
        {/* Ceiling ambient shadow */}
        <rect width="800" height="40" fill="url(#ceiling-ao)" style={{ mixBlendMode: 'multiply' }} />
        {/* Right corner shadow */}
        <rect x="750" width="50" height="345" fill="url(#right-corner-ao)" style={{ mixBlendMode: 'multiply' }} />

        {/* Crown Molding */}
        <rect width="800" height="15" fill="#FAF8F5" />
        <rect y="15" width="800" height="5" fill="url(#ceiling-ao)" style={{ mixBlendMode: 'multiply' }} />

        {/* 2. Patio Window on the far Left */}
        <image href="/images/modern_window.png" x="0" y="15" width="140" height="330" filter="url(#soft-shadow)" />
        {/* Window light beam overlay */}
        <polygon points="120,100 800,320 800,500 250,500" fill="url(#light-beam)" style={{ mixBlendMode: 'screen', pointerEvents: 'none' }} />

        {/* Skirting Board */}
        <rect y="335" width="800" height="10" fill="#FAF8F5" />
        <line x1="0" y1="335" x2="800" y2="335" stroke="#E2E8F0" strokeWidth="1" />

        {/* 3. White Floor */}
        <rect y="345" width="800" height="155" fill="#FFFFFF" />
        {/* Subtle modern panel lines on white floor */}
        <g stroke="#E2E8F0" strokeWidth="0.5" opacity="0.3">
          <line x1="0" y1="345" x2="800" y2="345" />
          <line x1="0" y1="375" x2="800" y2="375" />
          <line x1="0" y1="410" x2="800" y2="410" />
          <line x1="0" y1="450" x2="800" y2="450" />
          {/* Vertical perspective lines */}
          <line x1="80" y1="345" x2="20" y2="500" />
          <line x1="220" y1="345" x2="160" y2="500" />
          <line x1="360" y1="345" x2="330" y2="500" />
          <line x1="500" y1="345" x2="510" y2="500" />
          <line x1="640" y1="345" x2="680" y2="500" />
          <line x1="780" y1="345" x2="840" y2="500" />
        </g>
        {/* Floor ambient occlusion near skirting */}
        <rect y="345" width="800" height="25" fill="url(#ceiling-ao)" style={{ mixBlendMode: 'multiply', transform: 'scaleY(-1)', transformOrigin: '0 357.5px' }} />
        
        {/* 4. Textured Rug */}
        <ellipse cx="400" cy="445" rx="270" ry="50" fill="#94A3B8" opacity="0.3" filter="url(#soft-shadow)" />
        <ellipse cx="400" cy="445" rx="265" ry="45" fill="#E2E8F0" />
        <ellipse cx="400" cy="445" rx="255" ry="40" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5,4" />

        {/* 5. Sofa Wall Cast Shadow */}
        <image href="/images/luxury_sofa.png" x="85" y="162.5" width="630" height="337.5" filter="url(#cast-shadow-filter)" transform="translate(18, 10)" style={{ mixBlendMode: 'multiply' }} />
        {/* Sofa Floor Contact Shadow */}
        <ellipse cx="400" cy="495" rx="300" ry="12" fill="url(#contact-shadow)" opacity="0.85" />
        {/* Sofa Image */}
        <image href="/images/luxury_sofa.png" x="85" y="162.5" width="630" height="337.5" filter="url(#soft-shadow)" />
      </svg>
    )
  }

  // 10. Client Logo Marquee Data with Names and Original Image Logos
  const marqueeBrands = [
    {
      name: 'Asian Paints',
      class: 'brand-asian-paints-hover',
      logo: '/images/brands/aplogo.jfif'
    },
    {
      name: 'Berger',
      class: 'brand-berger-hover',
      logo: '/images/brands/burgerlogo.jfif'
    },
    {
      name: 'Dulux',
      class: 'brand-dulux-hover',
      logo: '/images/brands/deluxlogo.png'
    },
    {
      name: 'Dr Fixit',
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
  const extendedBrandsList = [...marqueeBrands, ...marqueeBrands]

  // Brands We Deal In Section Data
  const brandsWeDealIn = [
    { name: 'Asian Paints', logo: '/images/brands/aplogo.jfif', badge: 'Platinum Dealer' },
    { name: 'Berger Paints', logo: '/images/brands/burgerlogo.jfif', badge: 'Authorized Partner' },
    { name: 'Dulux', logo: '/images/brands/deluxlogo.png', badge: 'Certified Retailer' },
    { name: 'Dr. Fixit', logo: '/images/brands/drflogojfif.jfif', badge: 'Waterproofing Hub' },
    { name: 'Birla White', logo: '/images/brands/birlawhitelogo.jfif', badge: 'Putty Depot' },
    { name: 'British Paints', logo: '/images/brands/britishpaint.png', badge: 'Direct Supplier' },
    { name: 'Esdee Paints', logo: '/images/brands/esdee.png', badge: 'Industrial Depot' },
    { name: 'ICA Wood Coatings', logo: '/images/brands/ica.png', badge: 'Italian Premium Finishes' }
  ]

  // 12. Why Choose Us Premium Metrics
  const premiumWhyChooseUs = [
    { title: 'Site Assessment', desc: 'Moisture diagnostics and substrate strength testing prior to paint coating specification.' },
    { title: 'Technical Expertise', desc: 'Engineering exact layer thickness (DFT) suitable for GIDC chemical plants and coastal climates.' },
    { title: 'Quality Products', desc: 'Direct-depot sourcing of authentic batches with genuine safety data sheets.' },
    { title: 'Professional Application', desc: 'Application guidance matching exact dilution ratios and curing times for maximum lifetime.' },
    { title: 'Warranty Support', desc: 'Full manufacturer-backed film warranties up to 7-10 years on premium coating lines.' }
  ]

  // 15. Success Stories (Case Study style)
  const caseStudies = [
    {
      title: 'GIDC Warehouse Floor Restoration',
      challenge: 'Porous concrete causing massive dust residue, interfering with cleanroom components packaging.',
      solution: 'Slab moisture diagnostic followed by structural crack repair and 2 coats of high-build PPG chemical epoxy flooring.',
      result: '100% dust-free, high-load seamless flooring cured in 72 hours, with anti-static certifications.',
      image: '/projects/ankleshwar_gidc_warehouse.png'
    },
    {
      title: 'Ankleshwar Villa External Treatment',
      challenge: 'Frequent heavy monsoons causing water seepage, resulting in paint peeling and salt dampness on interiors.',
      solution: 'Stripping old layers, applying Dr. Fixit waterproofing sealing membrane, and top coating with Apex Ultima DPUR.',
      result: 'Absolute damp defense with a self-cleaning surface film backed by a 7-year performance warranty.',
      image: '/projects/modern_villa_facade.png'
    }
  ]
  const [activeCaseIndex, setActiveCaseIndex] = useState(0)

  // Hero Section Dynamic Text Slideshow Data
  const slides = [
    {
      tagline: 'Premium Surface & Coatings Depot',
      headline: 'Surfaces That Last.<br />Spaces That Inspire.',
      subheadline: 'Residential, Commercial & Industrial Coating Solutions. Sourcing directly from authorized brand depots in Ankleshwar since 2005.',
      primaryBtnText: 'View Projects',
      primaryBtnLink: '#projects-section',
      secondaryBtnText: 'Book Site Inspection',
      secondaryBtnLink: '/contact?subject=Request Site Visit'
    },
    {
      tagline: 'Premium Brands & Tech Tinting',
      headline: 'Vibrant Spaces.<br />Precision Colors.',
      subheadline: 'Computerized shade combinations matching 1,500+ colors from Asian Paints, Berger, and Dulux.',
      primaryBtnText: 'View Shades',
      primaryBtnLink: '/products',
      secondaryBtnText: 'Locate Store',
      secondaryBtnLink: '/contact'
    },
    {
      tagline: 'Structural & Moisture Shields',
      headline: 'Dampness Defended.<br />Epoxy Engineered.',
      subheadline: 'High-build epoxy coatings and elastomeric water shields to safeguard regional warehouses and homes.',
      primaryBtnText: 'Waterproofing Care',
      primaryBtnLink: '/services#waterproofing-systems',
      secondaryBtnText: 'Ask Our Experts',
      secondaryBtnLink: '/contact'
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <>
      {/* LOCAL BUSINESS SCHEMA FOR SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Umiya Hardware & Paints",
            "image": "https://umiya-paints.com/logo-removebg-preview.png",
            "telephone": "+918866117573",
            "email": "umiyapaint@yahoo.co.in",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "GF-28 Centre Point, Opp. GIDC Police Station",
              "addressLocality": "Ankleshwar",
              "addressRegion": "Gujarat",
              "postalCode": "393002",
              "addressCountry": "IN"
            },
            "url": "https://umiya-paints.com",
            "priceRange": "$$",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
              ],
              "opens": "09:00",
              "closes": "20:00"
            }
          })
        }}
      />

      {/* 1. HERO SECTION WITH DYNAMIC SLIDESHOW & SLOW ZOOM */}
      <section 
        className="home-hero-cinematic zoom-effect" 
        style={{ backgroundImage: `url('/home_hero.png')` }}
      >
        <div className="home-hero-overlay"></div>
        <div className="container-xl home-hero-container">
          <div className="home-hero-content">
            <ScrollReveal>
              <div key={currentSlide} className="home-hero-slide-content">
                <span className="home-hero-tagline">{slides[currentSlide].tagline}</span>
                <h1 className="home-hero-headline" dangerouslySetInnerHTML={{ __html: slides[currentSlide].headline }}></h1>
                <p className="home-hero-subheadline">
                  {slides[currentSlide].subheadline}
                </p>
                
                <div className="home-hero-buttons">
                  {slides[currentSlide].primaryBtnLink.startsWith('#') ? (
                    <a href={slides[currentSlide].primaryBtnLink} className="btn-solid-gold">
                      {slides[currentSlide].primaryBtnText}
                    </a>
                  ) : (
                    <Link to={slides[currentSlide].primaryBtnLink} className="btn-solid-gold">
                      {slides[currentSlide].primaryBtnText}
                    </Link>
                  )}
                  <Link to={slides[currentSlide].secondaryBtnLink} className="btn-outline-white">
                    {slides[currentSlide].secondaryBtnText}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Dynamic Slide Indicators */}
        <div className="home-hero-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`home-hero-indicator-dot ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. "WHERE WE WORK" INTERACTIVE SECTION (LIGHT) */}
      <section className="hotspots-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered">Interactive Environments</span>
              <h2 className="section-title-centered">Where We Work</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '10px auto 0 auto', fontSize: '14px' }}>
                Click hotspots on our blueprint architectural layout to reveal custom surface protection systems.
              </p>
            </div>
          </ScrollReveal>

          <div className="hotspots-grid-layout">
            <ScrollReveal animation="fade-in-left">
              <div className="hotspots-interactive-map">
                {/* stylized blueprint building layout background */}
                <div className="blueprint-map-frame">
                  <svg
                    viewBox="0 0 800 500"
                    width="100%"
                    height="100%"
                    className="blueprint-svg"
                    style={{ display: 'block' }}
                  >
                    <defs>
                      {/* Blueprint grid pattern */}
                      <pattern id="blueprintGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(191, 140, 76, 0.08)" strokeWidth="1" />
                      </pattern>

                      {/* Glass gradients */}
                      <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.35" />
                      </linearGradient>
                      <linearGradient id="activeGlassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
                      </linearGradient>

                      {/* Wood slats gradient */}
                      <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#BF8C4C" />
                        <stop offset="50%" stopColor="#A27238" />
                        <stop offset="100%" stopColor="#BF8C4C" />
                      </linearGradient>

                      {/* Pool water gradient */}
                      <linearGradient id="poolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#0284C7" />
                      </linearGradient>

                      {/* Retail interior glow */}
                      <radialGradient id="spotlightGlow" cx="50%" cy="0%" r="90%">
                        <stop offset="0%" stopColor="#FDE047" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Master Plan grid background */}
                    <rect width="800" height="500" fill="url(#blueprintGrid)" />

                    {/* Zone dividers */}
                    <line x1="300" y1="0" x2="300" y2="500" stroke="rgba(191, 140, 76, 0.12)" strokeWidth="1.5" strokeDasharray="5,5" />
                    <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(191, 140, 76, 0.12)" strokeWidth="1.5" strokeDasharray="5,5" />
                    <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(191, 140, 76, 0.12)" strokeWidth="1.5" strokeDasharray="5,5" />

                    {/* Zone Labeling */}
                    <text x="15" y="25" className="zone-label">ZONE 01 // RESIDENTIAL</text>
                    <text x="15" y="275" className="zone-label">ZONE 02 // PREMIUM RETAIL</text>
                    <text x="315" y="25" className="zone-label">ZONE 03 // CORPORATE</text>
                    <text x="515" y="25" className="zone-label">ZONE 04 // HEAVY INDUSTRY</text>
                    <text x="515" y="275" className="zone-label">ZONE 05 // LOGISTICS DEPOT</text>

                    {/* 1. VILLA GROUP */}
                    <g
                      className={`building-group villa-group ${activeHotspot === 'Villa' ? 'active' : ''}`}
                      onClick={() => setActiveHotspot('Villa')}
                    >
                      {/* Pool */}
                      <ellipse cx="140" cy="195" rx="50" ry="10" fill="url(#poolGradient)" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="90" y1="195" x2="190" y2="195" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2,2" />
                      
                      {/* Tree/Landscaping */}
                      <path d="M 45,185 L 45,195" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 45,185 Q 30,165 45,150 Q 60,135 70,150 Q 80,165 70,185 Z" fill="#E2EAD4" stroke="var(--color-navy)" strokeWidth="1.5" />

                      {/* Main Ground Volume */}
                      <rect x="85" y="120" width="130" height="65" rx="3" className="main-structure" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="2" />
                      {/* Garage Door */}
                      <rect x="165" y="130" width="40" height="55" className="accent-fill" fill="#FAF8F5" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="165" y1="141" x2="205" y2="141" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="165" y1="152" x2="205" y2="152" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="165" y1="163" x2="205" y2="163" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="165" y1="174" x2="205" y2="174" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Upper Cantilever Volume */}
                      <rect x="65" y="70" width="110" height="50" rx="3" className="main-structure" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="2" />
                      {/* Wood Accent Siding */}
                      <rect x="175" y="70" width="30" height="50" fill="url(#woodGradient)" stroke="var(--color-navy)" strokeWidth="1.5" />
                      
                      {/* Windows */}
                      <rect x="75" y="80" width="45" height="25" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="78" y1="85" x2="98" y2="100" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />

                      <rect x="95" y="130" width="60" height="55" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="100" y1="135" x2="135" y2="170" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />

                      {/* Balcony Railing */}
                      <rect x="175" y="120" width="30" height="25" fill="rgba(191,140,76,0.15)" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="175" y1="132" x2="205" y2="132" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Pergola Roof Structure */}
                      <line x1="75" y1="55" x2="165" y2="55" stroke="var(--color-navy)" strokeWidth="2" />
                      <line x1="85" y1="55" x2="85" y2="70" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="110" y1="55" x2="110" y2="70" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="135" y1="55" x2="135" y2="70" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="160" y1="55" x2="160" y2="70" stroke="var(--color-navy)" strokeWidth="1.5" />

                      {/* Louver ticks */}
                      <line x1="95" y1="50" x2="100" y2="55" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="120" y1="50" x2="125" y2="55" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="145" y1="50" x2="150" y2="55" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Text Label */}
                      <text x="140" y="225" textAnchor="middle" className="building-label">LUXURY VILLA</text>
                    </g>


                    {/* 2. SHOWROOM GROUP */}
                    <g
                      className={`building-group showroom-group ${activeHotspot === 'Showroom' ? 'active' : ''}`}
                      onClick={() => setActiveHotspot('Showroom')}
                    >
                      {/* Plant and planter */}
                      <rect x="225" y="405" width="20" height="25" className="accent-fill" fill="#FAF8F5" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <circle cx="235" cy="395" r="10" fill="#E2EAD4" stroke="var(--color-navy)" strokeWidth="1" />
                      <circle cx="230" cy="388" r="7" fill="#E2EAD4" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Main Storefront Body */}
                      <rect x="70" y="325" width="150" height="105" rx="4" className="main-structure" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="2" />
                      
                      {/* Signage Fascia */}
                      <rect x="70" y="325" width="150" height="25" fill="#1E293B" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <text x="145" y="341" textAnchor="middle" fill="var(--color-gold)" fontSize="8" fontWeight="800" letterSpacing="1.5">UMIYA GALLERY</text>
                      
                      {/* Storefront Glass Facade */}
                      <rect x="80" y="350" width="130" height="70" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1.5" />

                      {/* Spotlight Glow cones */}
                      <polygon points="110,350 90,420 130,420" fill="url(#spotlightGlow)" opacity="0.35" style={{ pointerEvents: 'none' }} />
                      <polygon points="180,350 160,420 200,420" fill="url(#spotlightGlow)" opacity="0.35" style={{ pointerEvents: 'none' }} />

                      {/* Inside Displays */}
                      <rect x="100" y="390" width="20" height="30" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="1" />
                      <circle cx="110" cy="382" r="5" fill="var(--color-gold)" opacity="0.75" />
                      
                      <rect x="170" y="390" width="20" height="30" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="1" />
                      <polygon points="180,375 175,385 185,385" fill="var(--color-gold)" opacity="0.75" />

                      {/* Glass Entrance Double Doors */}
                      <rect x="130" y="360" width="30" height="60" fill="none" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="145" y1="360" x2="145" y2="420" stroke="var(--color-navy)" strokeWidth="1" />
                      <circle cx="142" cy="390" r="1.5" fill="var(--color-gold)" />
                      <circle cx="148" cy="390" r="1.5" fill="var(--color-gold)" />

                      {/* Front Canopy */}
                      <polygon points="60,325 230,312 230,325 60,325" fill="#1E293B" stroke="var(--color-gold)" strokeWidth="1.5" />
                      <line x1="230" y1="325" x2="220" y2="430" stroke="var(--color-navy)" strokeWidth="1.5" />

                      <text x="145" y="450" textAnchor="middle" className="building-label">RETAIL SHOWROOM</text>
                    </g>


                    {/* 3. CORPORATE OFFICE TOWER GROUP */}
                    <g
                      className={`building-group office-group ${activeHotspot === 'Office' ? 'active' : ''}`}
                      onClick={() => setActiveHotspot('Office')}
                    >
                      {/* Main Skyscraper body */}
                      <rect x="335" y="65" width="130" height="365" rx="5" className="main-structure" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="2.5" />
                      
                      {/* Slanted architectural crown */}
                      <path d="M 335,65 L 400,25 L 465,65 Z" fill="#1E293B" stroke="var(--color-navy)" strokeWidth="2" />
                      {/* Crown inner truss work */}
                      <line x1="400" y1="25" x2="400" y2="65" stroke="var(--color-gold)" strokeWidth="1.5" />
                      <line x1="335" y1="65" x2="400" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <line x1="465" y1="65" x2="400" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                      {/* Glass Columns */}
                      <rect x="345" y="75" width="22" height="345" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <rect x="373" y="75" width="22" height="345" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <rect x="405" y="75" width="22" height="345" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <rect x="433" y="75" width="22" height="345" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Horizontal window divider lines */}
                      <line x1="345" y1="105" x2="455" y2="105" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="135" x2="455" y2="135" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="165" x2="455" y2="165" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="195" x2="455" y2="195" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="225" x2="455" y2="225" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="255" x2="455" y2="255" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="285" x2="455" y2="285" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="315" x2="455" y2="315" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="345" x2="455" y2="345" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="375" x2="455" y2="375" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="345" y1="405" x2="455" y2="405" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Sky Garden cutout on the side */}
                      <rect x="415" y="195" width="48" height="60" className="accent-fill" fill="#F8F6F0" stroke="var(--color-navy)" strokeWidth="1.5" />
                      {/* Garden Plants */}
                      <path d="M 425,230 Q 420,215 430,210 Q 440,205 445,215 Q 455,220 450,230 Z" fill="#E2EAD4" stroke="var(--color-navy)" strokeWidth="1" />
                      <rect x="415" y="230" width="48" height="25" fill="rgba(191,140,76,0.2)" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="415" y1="240" x2="463" y2="240" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Brand Logo Shield on Facade */}
                      <polygon points="400,90 410,98 400,106 390,98" fill="none" stroke="var(--color-gold)" strokeWidth="2" />
                      <circle cx="400" cy="98" r="3" fill="var(--color-gold)" />

                      {/* Entrance Lobby Canopy */}
                      <rect x="350" y="380" width="100" height="50" rx="2" fill="none" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="350" y1="395" x2="450" y2="395" stroke="var(--color-gold)" strokeWidth="1.5" />
                      
                      {/* Entrance doors */}
                      <rect x="385" y="395" width="30" height="35" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="400" y1="395" x2="400" y2="430" stroke="var(--color-navy)" strokeWidth="1" />

                      <text x="400" y="455" textAnchor="middle" className="building-label">CORPORATE OFFICE</text>
                    </g>


                    {/* 4. HEAVY INDUSTRY FACTORY GROUP */}
                    <g
                      className={`building-group factory-group ${activeHotspot === 'Factory' ? 'active' : ''}`}
                      onClick={() => setActiveHotspot('Factory')}
                    >
                      {/* Vents/Tanks Background */}
                      <rect x="670" y="90" width="45" height="90" rx="3" className="main-structure" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="2" />
                      <path d="M 670,90 Q 692.5,70 715,90 Z" fill="#1E293B" stroke="var(--color-navy)" strokeWidth="1.5" />
                      {/* Ladder on tank */}
                      <line x1="705" y1="90" x2="705" y2="180" stroke="var(--color-navy)" strokeWidth="1" strokeDasharray="3,3" />
                      
                      {/* External pipes */}
                      <path d="M 625,140 L 670,140" fill="none" stroke="var(--color-gold)" strokeWidth="4.5" strokeLinecap="round" />
                      <path d="M 600,165 L 600,175 L 670,175" fill="none" stroke="var(--color-navy)" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Main Sawtooth Factory building */}
                      <path
                        d="M 520,180 L 520,115 L 555,85 L 555,115 L 590,85 L 590,115 L 625,85 L 625,115 L 660,115 L 660,180 Z"
                        className="main-structure"
                        fill="#FFFFFF"
                        stroke="var(--color-navy)"
                        strokeWidth="2"
                      />

                      {/* Sawtooth Windows */}
                      <polygon points="522,112 552,87 552,112" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <polygon points="557,112 587,87 587,112" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <polygon points="592,112 622,87 622,112" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Silos / Chimney stack */}
                      <rect x="635" y="45" width="12" height="70" className="main-structure" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="2" />
                      <rect x="635" y="45" width="12" height="6" fill="var(--color-gold)" />
                      <rect x="635" y="55" width="12" height="4" fill="var(--color-navy)" />

                      <rect x="650" y="60" width="8" height="55" className="main-structure" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="1.5" />
                      
                      {/* Smoke loops */}
                      <path d="M 641,38 C 635,25 645,20 640,10 C 648,5 642,-2 646,-8" fill="none" stroke="rgba(191,140,76,0.35)" strokeWidth="1.5" strokeDasharray="3,3" />

                      {/* Industrial cargo entry door */}
                      <rect x="535" y="145" width="35" height="35" className="accent-fill" fill="#F8F6F0" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="535" y1="155" x2="570" y2="155" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="165" x2="570" y2="165" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="552.5" y1="145" x2="552.5" y2="180" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Standard windows */}
                      <rect x="585" y="130" width="20" height="15" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <rect x="615" y="130" width="20" height="15" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />

                      <text x="590" y="225" textAnchor="middle" className="building-label">MANUFACTURING PLANT</text>
                    </g>


                    {/* 5. LOGISTICS WAREHOUSE GROUP */}
                    <g
                      className={`building-group warehouse-group ${activeHotspot === 'Warehouse' ? 'active' : ''}`}
                      onClick={() => setActiveHotspot('Warehouse')}
                    >
                      {/* Main Gabled structure */}
                      <polygon
                        points="520,345 610,305 700,345 700,425 520,425"
                        className="main-structure"
                        fill="#FFFFFF"
                        stroke="var(--color-navy)"
                        strokeWidth="2"
                      />

                      {/* Corrugated facade vertical texture lines */}
                      <line x1="530" y1="350" x2="530" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <line x1="550" y1="340" x2="550" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <line x1="570" y1="330" x2="570" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <line x1="590" y1="320" x2="590" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <line x1="610" y1="310" x2="610" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <line x1="630" y1="320" x2="630" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <line x1="650" y1="330" x2="650" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <line x1="670" y1="340" x2="670" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
                      <line x1="690" y1="350" x2="690" y2="425" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

                      {/* Loading Docks */}
                      {/* Dock 1 */}
                      <rect x="535" y="375" width="45" height="50" rx="1" className="accent-fill" fill="#F1ECE4" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="535" y1="380" x2="580" y2="380" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="385" x2="580" y2="385" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="390" x2="580" y2="390" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="395" x2="580" y2="395" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="400" x2="580" y2="400" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="405" x2="580" y2="405" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="410" x2="580" y2="410" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="415" x2="580" y2="415" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="535" y1="420" x2="580" y2="420" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Dock 2 */}
                      <rect x="595" y="375" width="45" height="50" rx="1" className="accent-fill" fill="#F1ECE4" stroke="var(--color-navy)" strokeWidth="1.5" />
                      <line x1="595" y1="380" x2="640" y2="380" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="595" y1="385" x2="640" y2="385" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="595" y1="390" x2="640" y2="390" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="595" y1="395" x2="640" y2="395" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="595" y1="400" x2="640" y2="400" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="595" y1="405" x2="640" y2="405" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="595" y1="410" x2="640" y2="410" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="595" y1="415" x2="640" y2="415" stroke="var(--color-navy)" strokeWidth="1" />
                      <line x1="595" y1="420" x2="640" y2="420" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Dock Buffers */}
                      <rect x="532" y="372" width="51" height="53" rx="1" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
                      <rect x="592" y="372" width="51" height="53" rx="1" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />

                      {/* Small clerestory windows under roof */}
                      <rect x="540" y="350" width="10" height="10" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <rect x="560" y="342" width="10" height="10" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <rect x="630" y="342" width="10" height="10" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                      <rect x="650" y="350" width="10" height="10" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />

                      {/* Truck container parked */}
                      <g className="delivery-truck">
                        {/* Trailer */}
                        <rect x="460" y="378" width="60" height="42" rx="1" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="1.5" />
                        <line x1="465" y1="378" x2="465" y2="420" stroke="var(--color-gold)" strokeWidth="3" />
                        <text x="492" y="402" textAnchor="middle" fill="var(--color-navy)" fontSize="6" fontWeight="700" letterSpacing="0.5">UMIYA</text>
                        {/* Cab */}
                        <rect x="435" y="393" width="25" height="27" rx="2" fill="#FFFFFF" stroke="var(--color-navy)" strokeWidth="1.5" />
                        <rect x="438" y="397" width="12" height="10" className="window-glass" fill="url(#glassGradient)" stroke="var(--color-navy)" strokeWidth="1" />
                        {/* Wheels */}
                        <circle cx="450" cy="423" r="6" fill="#1E293B" stroke="var(--color-navy)" strokeWidth="1.5" />
                        <circle cx="450" cy="423" r="2" fill="#FFFFFF" />
                        <circle cx="478" cy="423" r="6" fill="#1E293B" stroke="var(--color-navy)" strokeWidth="1.5" />
                        <circle cx="478" cy="423" r="2" fill="#FFFFFF" />
                        <circle cx="503" cy="423" r="6" fill="#1E293B" stroke="var(--color-navy)" strokeWidth="1.5" />
                        <circle cx="503" cy="423" r="2" fill="#FFFFFF" />
                      </g>

                      <text x="610" y="450" textAnchor="middle" className="building-label">LOGISTICS WAREHOUSE</text>
                    </g>
                  </svg>

                  {Object.keys(hotspotsData).map((key) => {
                    const data = hotspotsData[key]
                    return (
                      <button
                        key={key}
                        className={`hotspot-node ${activeHotspot === key ? 'active' : ''}`}
                        style={{ top: data.top, left: data.left }}
                        onClick={() => setActiveHotspot(key)}
                        aria-label={`Select ${data.title}`}
                      >
                        <span className="hotspot-pulse"></span>
                        <span className="hotspot-num">{key[0]}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-right">
              <div className="hotspots-details-panel">
                <span className="hotspot-panel-badge">Hotspot Details</span>
                <h3 className="hotspot-panel-title">{hotspotsData[activeHotspot].title}</h3>
                <div className="hotspot-panel-solution-box">
                  <strong>Recommended Solution:</strong>
                  <p>{hotspotsData[activeHotspot].solution}</p>
                </div>
                <p className="hotspot-panel-desc">{hotspotsData[activeHotspot].desc}</p>
                <div className="hotspot-panel-meta">
                  <div>
                    <strong>System Used:</strong>
                    <p>{hotspotsData[activeHotspot].system}</p>
                  </div>
                  <div>
                    <strong>Warranty:</strong>
                    <p>{hotspotsData[activeHotspot].warranty}</p>
                  </div>
                </div>
                <Link to="/contact?subject=Where We Work Inquiry" className="btn-solid-gold" style={{ marginTop: '20px' }}>
                  Inquire Solution ➔
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Brand name banner shifted under interactive image and details box */}
          <div className="home-brand-marquee-container" style={{ marginTop: '60px', paddingTop: '45px', borderTop: '1px solid var(--border-light)' }}>
            <div className="marquee-frame">
              <div className="marquee-track">
                {extendedBrandsList.map((brand, idx) => (
                  <div key={idx} className={`marquee-logo-text ${brand.class}`} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={brand.logo} alt={`${brand.name} logo`} className="marquee-brand-logo-img" />
                    <span>{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE PROJECTS WALL - MASONRY BENTO GRID (DARK) */}
      <section id="projects-section" className="bento-projects-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle-centered" style={{ color: 'var(--color-gold)' }}>Portfolio Showroom</span>
              <h2 className="section-title-centered" style={{ color: '#FFFFFF' }}>Signature Projects Wall</h2>
            </div>
          </ScrollReveal>

          {/* Project Tabs */}
          <ScrollReveal animation="fade-in-up">
            <div className="home-projects-tabs" style={{ marginBottom: '50px' }}>
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
          </ScrollReveal>

          {/* Bento Projects Wall */}
          <div className="bento-wall" key={projectTab}>
            {filteredBentoProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 0.05} animation="zoom-in">
                <div className={`bento-card-wrapper ${project.layoutClass}`}>
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="bento-card-overlay">
                    <div>
                      <span className="bento-card-cat">{project.cat}</span>
                      <h3 className="bento-card-title">{project.title}</h3>
                    </div>
                    {/* Hover statistics detail */}
                    <div className="bento-card-hover-details">
                      <div className="bento-stat-row">
                        <span>Project Value:</span>
                        <strong>{project.value}</strong>
                      </div>
                      <div className="bento-stat-row">
                        <span>Area Covered:</span>
                        <strong>{project.area}</strong>
                      </div>
                      <div className="bento-stat-row">
                        <span>Coating System:</span>
                        <strong>{project.system}</strong>
                      </div>
                      <div className="bento-stat-row">
                        <span>Location:</span>
                        <strong>{project.location}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEFORE / AFTER TRANSFORMATION SLIDER (LIGHT) */}
      <section className="ba-section">
        <div className="container-xl">
          <div className="ba-grid">
            <ScrollReveal animation="fade-in-left">
              <div className="ba-info-box">
                <span className="section-subtitle-centered" style={{ textAlign: 'left' }}>Visual Verification</span>
                <h2 className="section-title-centered" style={{ textAlign: 'left', fontSize: '36px', marginBottom: '20px' }}>
                  Surface Transformations
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '30px', lineHeight: 1.7 }}>
                  Glide your mouse or touch swipe over the image slider to see raw weathered areas transform into premium protective coatings.
                </p>
                <div className="ba-tab-list">
                  {Object.keys(beforeAfterData).map((tab) => (
                    <button
                      key={tab}
                      className={`ba-tab-btn ${beforeAfterTab === tab ? 'active' : ''}`}
                      onClick={() => setBeforeAfterTab(tab)}
                    >
                      <span className="ba-tab-title">{tab}</span>
                      <span className="ba-tab-arrow">➔</span>
                    </button>
                  ))}
                </div>
                <p className="ba-desc">
                  <strong>Description: </strong>{currentBA.desc}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-right">
              <div 
                ref={widgetRef}
                className="ba-widget"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                <img src={currentBA.after} className="ba-img-after" alt="After treatment" loading="lazy" />
                <div 
                  className="ba-before-wrapper" 
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={currentBA.before} 
                    className="ba-img-before" 
                    style={{ width: widgetWidth }}
                    alt="Before treatment" 
                    loading="lazy"
                  />
                </div>
                <div 
                  className="ba-divider" 
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="ba-divider-handle">
                    <span className="ba-divider-arrow">◀</span>
                    <span className="ba-divider-arrow">▶</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. SURFACE PROTECTION JOURNEY TIMELINE (DARK/CHARCOAL) */}
      <section className="journey-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered" style={{ color: 'var(--color-gold)' }}>Application Method</span>
              <h2 className="section-title-centered" style={{ color: '#FFFFFF' }}>Surface Protection Journey</h2>
            </div>
          </ScrollReveal>

          <div className="journey-flow-wrapper">
            <div className="journey-line"></div>
            <div className="journey-grid">
              {journeySteps.map((step, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.08} animation="fade-in-up">
                  <div className="journey-card">
                    <div className="journey-num-box">
                      <span className="journey-num">{step.num}</span>
                    </div>
                    <h3 className="journey-title">{step.title}</h3>
                    <p className="journey-desc">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. "EXPLORE BY SPACE" (LIGHT) */}
      <section className="explore-spaces-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered">Design Matrix</span>
              <h2 className="section-title-centered">Explore By Space</h2>
            </div>
          </ScrollReveal>

          <div className="explore-spaces-grid">
            {exploreSpaces.map((space, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05} animation="zoom-in">
                <Link to={space.link} className="explore-space-card">
                  <span className="explore-space-icon">{space.icon}</span>
                  <h3 className="explore-space-title">{space.title}</h3>
                  <p className="explore-space-desc">{space.desc}</p>
                  <span className="explore-space-link">View catalog ➔</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LUXURY MATERIALS SHOWCASE (LIGHT) */}
      <section className="materials-showcase-section" style={{ backgroundColor: 'var(--bg-main)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered">Quality Catalogue</span>
              <h2 className="section-title-centered">Luxury Materials Showcase</h2>
            </div>
          </ScrollReveal>

          <div className="materials-horizontal-scroll">
            {materialsShowcase.map((mat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} animation="zoom-in">
                <div className="material-showcase-card">
                  <div className="material-badge">{mat.brand}</div>
                  <h3 className="material-title">{mat.title}</h3>
                  <p className="material-desc">{mat.desc}</p>
                  <Link to="/products" className="material-action-btn">
                    View Specifications ➔
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROJECT IMPACT COUNTER (DARK) */}
      <section className="impact-counter-section">
        <div className="container-xl">
          <div className="impact-counter-grid">
            <ScrollReveal animation="zoom-in" delay={0.1}>
              <div className="impact-counter-card">
                <div className="impact-counter-num">12 Million+</div>
                <div className="impact-counter-label">Sq. Ft. Protected</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={0.2}>
              <div className="impact-counter-card">
                <div className="impact-counter-num">5,000+</div>
                <div className="impact-counter-label">Projects Delivered</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={0.3}>
              <div className="impact-counter-card">
                <div className="impact-counter-num">20+</div>
                <div className="impact-counter-label">Years Experience</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={0.4}>
              <div className="impact-counter-card">
                <div className="impact-counter-num">1,000+</div>
                <div className="impact-counter-label">Satisfied Clients</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 9. COATING COLOR VISUALIZER (CHARCOAL) */}
      <section className="visualizer-section">
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

            {/* Cast Silhouette Shadow Filter for Photorealistic Overlays */}
            <filter id="cast-shadow-filter">
              <feColorMatrix type="matrix" values="0 0 0 0 0
                                                   0 0 0 0 0
                                                   0 0 0 0 0
                                                   0 0 0 0.42 0" />
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>
        </svg>

        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered" style={{ color: 'var(--color-gold)' }}>Interactive Studio</span>
              <h2 className="section-title-centered" style={{ color: '#FFFFFF' }}>Coating Color Visualizer</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '10px auto 0 auto', fontSize: '14px' }}>
                Select a space and tap color swatches below to dynamically test paint shades live in our simulation.
              </p>
            </div>
          </ScrollReveal>

          <div className="visualizer-container-grid">
            <ScrollReveal animation="fade-in-left">
              <div className="visualizer-mockup-frame" style={{ position: 'relative', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <div className="visualizer-image-box" style={{ background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                  {renderVisualizerSuite()}
                  
                  {selectedColor && (
                    <div className="shade-active-indicator" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', backgroundColor: 'var(--bg-main)', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', padding: '14px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span 
                          style={{ 
                            width: '16px', 
                            height: '16px', 
                            borderRadius: '50%', 
                            backgroundColor: selectedColor,
                            border: '1.5px solid rgba(15,23,42,0.15)'
                          }}
                        ></span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-display)' }}>
                          {visualizerColors.find(c => c.hex === selectedColor)?.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#BF8C4C', fontFamily: 'monospace' }}>
                        {selectedColor.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-right">
              <div className="visualizer-controls-panel" style={{ backgroundColor: 'transparent', border: 'none', padding: '0' }}>
                <h3 className="visualizer-panel-title" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', paddingBottom: '12px', marginBottom: '24px' }}>Visualizer Suite</h3>
                
                <div className="visualizer-space-selector" style={{ marginBottom: '24px' }}>
                  <strong style={{ fontSize: '11px', color: '#BF8C4C', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>1. Choose Environment:</strong>
                  <div className="visualizer-space-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Living Room', 'Bedroom', 'Wood Planks'].map((space) => {
                      const isActive = visualizerSpace === space;
                      return (
                        <button
                          key={space}
                          className={`visualizer-space-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setVisualizerSpace(space)}
                          style={{ 
                            fontSize: '13px', 
                            padding: '12px 20px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            width: '100%',
                            textAlign: 'left',
                            backgroundColor: isActive ? '#BF8C4C' : 'rgba(24, 18, 12, 0.45)',
                            borderColor: isActive ? '#BF8C4C' : 'rgba(255, 255, 255, 0.12)',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {isActive && <span style={{ color: '#FFE082', fontSize: '10px' }}>◆</span>}
                          {space === 'Living Room' && '🛋️'}
                          {space === 'Bedroom' && '🛏️'}
                          {space === 'Wood Planks' && '🪵'}
                          <span style={{ flexGrow: 1 }}>{space}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="visualizer-color-swatches-box" style={{ marginBottom: '24px' }}>
                  <strong style={{ fontSize: '11px', color: '#BF8C4C', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>2. Select Shade Color:</strong>
                  <div className="visualizer-swatches" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    {visualizerColors.map((color) => {
                      const isActive = selectedColor === color.hex;
                      return (
                        <button
                          key={color.name}
                          className={`visualizer-swatch-dot ${isActive ? 'active' : ''}`}
                          style={{ 
                            backgroundColor: color.hex,
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            border: isActive ? '3px solid #FFFFFF' : '2px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: isActive ? '0 0 0 2px #BF8C4C' : 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => setSelectedColor(color.hex)}
                          title={color.name}
                        >
                          {isActive && (
                            <span 
                              className="swatch-check"
                              style={{ 
                                color: color.isLight ? '#0F172A' : '#FFFFFF',
                                fontWeight: 'bold',
                                fontSize: '12px'
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="visualizer-active-shade-name" style={{ marginTop: '16px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)', display: 'block', letterSpacing: '1.5px', marginBottom: '4px', fontWeight: 600 }}>Active Color</span>
                    <strong style={{ fontSize: '18px', color: '#FFFFFF', letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                      {visualizerColors.find(c => c.hex === selectedColor)?.name} ({selectedColor.toUpperCase()})
                    </strong>
                  </div>
                </div>

                <div className="visualizer-note" style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '11px', lineHeight: '1.6', marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '15px' }}>
                  <p>Note: Digital color renders may vary slightly from real dried paint swatches. We highly recommend booking a physical site assessment for exact Colourworld matches.</p>
                </div>

                {(() => {
                  const activeColor = visualizerColors.find(c => c.hex === selectedColor) || visualizerColors[0];
                  return (
                    <Link 
                      to={`/contact?subject=Color Visualizer Choice (${visualizerSpace})&shade=${encodeURIComponent(activeColor.name)}`} 
                      className="btn-solid-gold visualizer-submit-btn" 
                      style={{ 
                        marginTop: '24px', 
                        width: '100%', 
                        display: 'block',
                        textAlign: 'center',
                        padding: '14px 28px',
                        backgroundColor: '#BF8C4C',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(191, 140, 76, 0.3)'
                      }}
                    >
                      Request Shade Swatch Sample
                    </Link>
                  );
                })()}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Brands We Deal In Section */}
      <section className="home-brands-deal-in-section" style={{ padding: '120px 0', backgroundColor: 'var(--bg-gold-light-alternate)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered">Authorized Depot Partner</span>
              <h2 className="section-title-centered">Brands We Deal In</h2>
            </div>
          </ScrollReveal>

          <div className="home-brands-deal-in-grid">
            {brandsWeDealIn.map((brand, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05} animation="zoom-in">
                <div className="home-brand-deal-card">
                  <img src={brand.logo} alt={`${brand.name} logo`} className="home-brand-deal-logo" />
                  <h3 className="home-brand-deal-name">{brand.name}</h3>
                  <span className="home-brand-deal-badge">{brand.badge}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. INDUSTRY & SECTOR SOLUTIONS (LIGHT) */}
      <section className="sectors-section" style={{ padding: '120px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered">Market Sectors</span>
              <h2 className="section-title-centered">Industry Coating Solutions</h2>
            </div>
          </ScrollReveal>

          <div className="sectors-grid">
            <ScrollReveal animation="zoom-in" delay={0.1}>
              <div className="sector-card">
                <span className="sector-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <h3 className="sector-title">Residential</h3>
                <p className="sector-desc">Premium interior paints, damp proof waterproofing courses, and high-quality exterior emulsions for custom villas.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={0.2}>
              <div className="sector-card">
                <span className="sector-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h6M9 11h6M9 15h6" />
                  </svg>
                </span>
                <h3 className="sector-title">Hospitality</h3>
                <p className="sector-desc">Lustre designer textures, velvet-sheen interior coatings, and luxury veneers finish for hotels and restaurants.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={0.3}>
              <div className="sector-card">
                <span className="sector-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 22V12h4v10" />
                    <path d="M2 22V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v18H2z" />
                  </svg>
                </span>
                <h3 className="sector-title">Commercial</h3>
                <p className="sector-desc">Impact-resistant coatings, corporate office flat emulsions, and high-reflectivity glass-facade framing primers.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={0.4}>
              <div className="sector-card">
                <span className="sector-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 21h20M19 21V11l-4 3-4-3-4 3-5-4v12h17z" />
                    <path d="M19 11h2v3h-2z" />
                  </svg>
                </span>
                <h3 className="sector-title">Industrial</h3>
                <p className="sector-desc">Anti-corrosive chemical coatings, rust protection zinc oxide primers, and safety pipe paints matching GIDC norms.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={0.5}>
              <div className="sector-card">
                <span className="sector-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </span>
                <h3 className="sector-title">Warehousing</h3>
                <p className="sector-desc">Heavy-duty seamless dust-free epoxy floorings resisting high rubber friction and structural forklift loads.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={0.6}>
              <div className="sector-card">
                <span className="sector-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                </span>
                <h3 className="sector-title">Educational</h3>
                <p className="sector-desc">Eco-safe, low-odor, zero-VOC interior wall emulsions ensuring healthy classroom air for schools and colleges.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 12. WHY PREMIUM CLIENTS CHOOSE US (LIGHT) */}
      <section className="why-premium-section" style={{ padding: '120px 0', backgroundColor: 'var(--bg-main)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered">
              <span className="section-subtitle-centered">The Umiya Edge</span>
              <h2 className="section-title-centered">Why Premium Clients Choose Us</h2>
            </div>
          </ScrollReveal>

          <div className="premium-why-grid">
            {premiumWhyChooseUs.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05} animation="fade-in-up">
                <div className="premium-why-card">
                  <span className="premium-why-num">0{idx + 1}</span>
                  <h3 className="premium-why-title">{item.title}</h3>
                  <p className="premium-why-desc">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 13. VIDEO PROJECT SHOWCASE (DARK/CHARCOAL) */}
      <section className="video-showcase-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered" style={{ color: 'var(--color-gold)' }}>Visual Proof</span>
              <h2 className="section-title-centered" style={{ color: '#FFFFFF' }}>Video Project Showcase</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '10px auto 0 auto', fontSize: '14px' }}>
                Drone walkthroughs, project walkthroughs, and installation process. Seeing is believing.
              </p>
            </div>
          </ScrollReveal>

          <div className="video-showcase-grid-wrapper">
            <ScrollReveal animation="zoom-in">
              <div 
                className="video-player-frame" 
                onClick={() => setIsHomeVideoPlaying(true)}
              >
                {isHomeVideoPlaying ? (
                  <div 
                    className="local-video-slideshow"
                    style={{ backgroundImage: `url(${videoSlides[videoSlideIndex].image})` }}
                  >
                    {/* Top Bar: Title & Close Button */}
                    <div className="local-video-topbar">
                      <div className="local-video-badge">
                        <span>
                          Project Showcase Video ({videoSlideIndex + 1}/{videoSlides.length})
                        </span>
                      </div>
                      <button 
                        className="local-video-close"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsHomeVideoPlaying(false);
                          setVideoSlideIndex(0);
                        }}
                        title="Close Player"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Dark Vignette Bottom Overlay */}
                    <div className="local-video-bottom-overlay" />

                    {/* Bottom Info & Controls */}
                    <div className="local-video-bottom-container">
                      {/* Active Slide Info */}
                      <div>
                        <h3 className="local-video-title">
                          {videoSlides[videoSlideIndex].title}
                        </h3>
                        <p className="local-video-desc">
                          {videoSlides[videoSlideIndex].desc}
                        </p>
                      </div>

                      {/* Video Player Controls Strip */}
                      <div className="local-video-controls-strip">
                        {/* Playback Controls */}
                        <div className="local-video-btn-group">
                          {/* Prev Button */}
                          <button 
                            className="local-video-nav-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoSlideIndex((prev) => (prev - 1 + videoSlides.length) % videoSlides.length);
                            }}
                            title="Previous Project"
                          >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                          </button>

                          {/* Play / Pause Toggle Button */}
                          <button 
                            className="local-video-toggle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsVideoPaused(!isVideoPaused);
                            }}
                            title={isVideoPaused ? "Play" : "Pause"}
                          >
                            {isVideoPaused ? (
                              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '2px' }}>
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            ) : (
                              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                              </svg>
                            )}
                          </button>

                          {/* Next Button */}
                          <button 
                            className="local-video-nav-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoSlideIndex((prev) => (prev + 1) % videoSlides.length);
                            }}
                            title="Next Project"
                          >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                          </button>
                        </div>

                        {/* Slide Indicators / Dots */}
                        <div className="local-video-dots-wrapper">
                          {videoSlides.map((_, idx) => (
                            <span 
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setVideoSlideIndex(idx);
                              }}
                              className={`local-video-dot ${videoSlideIndex === idx ? 'active' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Progress Bar (Animated) */}
                    <div 
                      className="local-video-progress-bar"
                      style={{
                        width: isVideoPaused ? `${((videoSlideIndex + 1) / videoSlides.length) * 100}%` : '0%',
                        animation: isVideoPaused ? 'none' : 'slideshowProgress 3.5s linear infinite',
                        transition: isVideoPaused ? 'width 0.3s ease-out' : 'none'
                      }} 
                    />
                  </div>
                ) : (
                  <>
                    <div className="video-play-overlay">
                      <div className="video-play-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="video-play-text">Watch Drone Walkthrough (0:45)</span>
                    </div>
                    <img src="/projects/modern_villa_facade.png" alt="Video Showcase Cover" className="video-poster-img" loading="lazy" />
                  </>
                )}
              </div>
            </ScrollReveal>

            <div className="video-showcase-info-cards">
              <div className="video-info-card">
                <span className="video-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="2" />
                    <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
                    <path d="M4.5 4.5l3.5 3.5M16 16l3.5 3.5M4.5 19.5l3.5-3.5M16 8l3.5-3.5" />
                  </svg>
                </span>
                <h4>Drone Project Footage</h4>
                <p>High-altitude aerial views tracking our large-scale warehouse roof coat applications and structural paint uniformity.</p>
              </div>
              <div className="video-info-card">
                <span className="video-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </span>
                <h4>Site Walkthroughs</h4>
                <p>Interior and exterior video tours showing dry-film thickness inspection, color accuracy, and seamless wall textures.</p>
              </div>
              <div className="video-info-card">
                <span className="video-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </span>
                <h4>Coating Process</h4>
                <p>Step-by-step video capturing substrate preparation, primer adhesion layers, and ultimate weather-guard application.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. SUCCESS STORIES / CASE STUDY WALKTHROUGH (CHARCOAL/DARK) */}
      <section className="case-studies-section">
        <div className="container-xl">
          <ScrollReveal>
            <div className="section-header-centered" style={{ marginBottom: '50px' }}>
              <span className="section-subtitle-centered" style={{ color: 'var(--color-gold)' }}>Case Studies</span>
              <h2 className="section-title-centered">Premium Success Stories</h2>
            </div>
          </ScrollReveal>

          <div className="case-studies-container">
            <div className="case-studies-selector-tabs">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  className={`case-study-tab-btn ${activeCaseIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveCaseIndex(idx)}
                >
                  {cs.title}
                </button>
              ))}
            </div>

            <div className="case-study-detail-card">
              <ScrollReveal key={activeCaseIndex} animation="zoom-in" duration={0.4}>
                <div className="case-study-grid-inner">
                  <div className="case-study-info">
                    <span className="case-study-badge">Project Audit</span>
                    <h3 className="case-study-title">{caseStudies[activeCaseIndex].title}</h3>
                    
                    <div className="case-study-block">
                      <strong>Challenge:</strong>
                      <p>{caseStudies[activeCaseIndex].challenge}</p>
                    </div>

                    <div className="case-study-block">
                      <strong>Solution:</strong>
                      <p>{caseStudies[activeCaseIndex].solution}</p>
                    </div>

                    <div className="case-study-block">
                      <strong>Result:</strong>
                      <p>{caseStudies[activeCaseIndex].result}</p>
                    </div>
                  </div>
                  <div className="case-study-image-box">
                    <img src={caseStudies[activeCaseIndex].image} alt={caseStudies[activeCaseIndex].title} loading="lazy" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FLOATING CONSULTATION WIDGET */}
      <div className="floating-consultation-card">
        <span className="floating-consult-badge">Help Selecting?</span>
        <p className="floating-consult-desc">Get professional guidance on paints and coatings.</p>
        <Link to="/contact?subject=Floating Widget Consultation" className="floating-consult-btn">
          Book Free consultation ➔
        </Link>
      </div>

      {/* 16. PREMIUM CTA (DARK NAVY) */}
      <section 
        className="home-contact-cta-section" 
        style={{ backgroundImage: `url('/page_banner.png')` }}
      >
        <div className="home-contact-cta-overlay"></div>
        <div className="container-xl home-contact-cta-container">
          <ScrollReveal animation="fade-in-up">
            <h2 className="home-contact-cta-title">Let's Build Something Exceptional.</h2>
            <p className="home-contact-cta-desc" style={{ maxWidth: '700px', margin: '0 auto 40px auto' }}>
              Speak directly with our coatings technical engineers. We offer surface diagnostics, moisture level verification, and custom specifications.
            </p>
            
            <div className="home-contact-cta-buttons" style={{ marginBottom: '50px' }}>
              <Link to="/contact?subject=Request Site Visit" className="btn-solid-gold">Schedule Site Visit</Link>
              <Link to="/contact?subject=Get Quote" className="btn-outline-white">Get Quote</Link>
            </div>

            {/* Quick Contact info */}
            <div className="cta-quick-contacts">
              <a href="tel:+918866117573" className="cta-contact-item">
                <span className="cta-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>+91 88661 17573</span>
              </a>
              <a href="https://wa.me/918866117573" target="_blank" rel="noopener noreferrer" className="cta-contact-item">
                <span className="cta-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <span>WhatsApp Expert</span>
              </a>
              <a href="mailto:umiyapaint@yahoo.co.in" className="cta-contact-item">
                <span className="cta-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span>umiyapaint@yahoo.co.in</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. MOBILE STICKY ACTION BAR */}
      <div className="mobile-action-bar">
        <a href="tel:+918866117573" className="mobile-action-btn call">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span>Call Store</span>
        </a>
        <a href="https://wa.me/918866117573" target="_blank" rel="noopener noreferrer" className="mobile-action-btn whatsapp">
          <span>WhatsApp</span>
        </a>
        <Link to="/contact?subject=Request Quote" className="mobile-action-btn quote">
          <span>Get Quote</span>
        </Link>
      </div>
    </>
  )
}
