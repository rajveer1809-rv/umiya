import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container-xl top-bar-container">
          <div className="top-bar-left">
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087-1.831-.497-9.16-.497-9.16-.497s-7.33 0-9.16.497c-1.016.272-1.815 1.071-2.087 2.087-.497 1.831-.497 5.717-.497 5.717s0 3.886.497 5.717c.272 1.016 1.071 1.815 2.087 2.087 1.83 4.97 9.16.497 9.16.497s7.329 0 9.16-.497c1.016-.272 1.815-1.071 2.087-2.087.497-1.831.497-5.717.497-5.717s0-3.886-.497-5.717zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="top-bar-right">
            <div className="top-bar-info">
              <span>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                umiyapaint@yahoo.co.in
              </span>
              <span>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Mon - Sat: 09:00 - 20:00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="container-xl nav-container">
          <NavLink to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo-removebg-preview.png" alt="UMIYA Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          </NavLink>

          <nav>
            <ul className="nav-menu">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            {/* Search Button */}
            <button className="nav-action-btn" aria-label="Search">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

          </div>
        </div>
      </header>
    </>
  )
}
