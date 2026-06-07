import { Link } from 'react-router-dom'

export default function Footer() {
  const instagramSwatches = [
    { color: '#5C6E58', label: 'Sage' },
    { color: '#C88A66', label: 'Clay' },
    { color: '#D2B48C', label: 'Sand' },
    { color: '#2F4F4F', label: 'Teal' },
    { color: '#D4AF37', label: 'Gold' },
    { color: '#4A6B82', label: 'Ocean' },
  ]

  return (
    <footer className="site-footer">
      <div className="container-xl">
        <div className="footer-grid">
          {/* Company Column */}
          <div>
            <h3 className="footer-col-title">Our Company</h3>
            <ul className="footer-menu">
              <li><Link to="/about">About Umiya</Link></li>
              <li><Link to="/services">Painting Services</Link></li>
              <li><a href="#">Eco-Friendly Mission</a></li>
              <li><a href="#">Career Opportunities</a></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="footer-col-title">Color Guide</h3>
            <ul className="footer-menu">
              <li><a href="#">Paint Calculator</a></li>
              <li><a href="#">Interior Ideas</a></li>
              <li><a href="#">Exterior Durability</a></li>
              <li><a href="#">VOC & Safety Info</a></li>
              <li><a href="#">Warranty Details</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="footer-col-title">Get In Touch</h3>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </span>
              <p>GF-28 Centre Point, Opp. GIDC Police Station, Ankleshwar</p>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </span>
              <p>+91 88661 17573</p>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <p>umiyapaint@yahoo.co.in</p>
            </div>
          </div>

          {/* Instagram Swatches Column */}
          <div>
            <h3 className="footer-col-title">Color Inspiration</h3>
            <div className="instagram-feed">
              {instagramSwatches.map((swatch, idx) => (
                <div 
                  key={idx} 
                  className="instagram-item" 
                  style={{ backgroundColor: swatch.color }}
                  title={`${swatch.label} shade`}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 600,
                    background: 'rgba(0,0,0,0.15)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }} className="swatch-overlay">
                    {swatch.label}
                  </div>
                  <style dangerouslySetInnerHTML={{__html: `
                    .instagram-item:hover .swatch-overlay {
                      opacity: 1 !important;
                    }
                  `}}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo-removebg-preview.png" alt="UMIYA Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p className="footer-copyright">
            © 2026 Umiya. All rights reserved. Premium paint solutions & colors.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">F</a>
            <a href="#" aria-label="Twitter">T</a>
            <a href="#" aria-label="Instagram">I</a>
            <a href="#" aria-label="Pinterest">P</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
