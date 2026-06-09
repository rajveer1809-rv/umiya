import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-xl">
        <div className="footer-grid">
          
          {/* Column 1: Company Description */}
          <div>
            <h3 className="footer-col-title">Umiya Paints</h3>
            <p style={{ color: '#B0B0B0', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '20px' }}>
              Authorized dealership in Ankleshwar since 2005, supplying certified premium wall paints, industrial coatings, waterproofing materials, and application accessories.
            </p>
            <div className="footer-socials" style={{ justifyContent: 'flex-start', gap: '12px' }}>
              <a href="#" aria-label="Facebook">F</a>
              <a href="#" aria-label="Twitter">T</a>
              <a href="#" aria-label="Instagram">I</a>
            </div>
          </div>

          {/* Column 2: Quick Links (Active Routes Only) */}
          <div>
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/products">Paint Catalog</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="footer-col-title">Get In Touch</h3>
            <div className="footer-contact-item" style={{ marginBottom: '15px' }}>
              <span className="footer-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </span>
              <p style={{ fontSize: '13.5px', color: '#B0B0B0', margin: 0 }}>
                GF-28 Centre Point, Opp. GIDC Police Station, Ankleshwar, Gujarat
              </p>
            </div>
            <div className="footer-contact-item" style={{ marginBottom: '15px' }}>
              <span className="footer-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </span>
              <p style={{ fontSize: '13.5px', color: '#B0B0B0', margin: 0 }}>
                +91 88661 17573
              </p>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <p style={{ fontSize: '13.5px', color: '#B0B0B0', margin: 0 }}>
                umiyapaint@yahoo.co.in
              </p>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo-removebg-preview.png" alt="UMIYA Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p className="footer-copyright">
            © 2026 Umiya. All rights reserved. Premium paint solutions & coatings.
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
