import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Globe, User, LogOut, Menu, X } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { openCommandPalette, openTripStudio } from '../common/siteCommandCenterActions';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardPath = (role) => {
    switch (role) {
      case 'ADMIN':
      case 'ADMINISTRATOR':
        return '/admin-dashboard';
      case 'TRAVEL_AGENT':
        return '/agent-dashboard';
      case 'HOTEL_MANAGER':
        return '/hotel-dashboard';
      case 'TRANSPORT_PROVIDER':
        return '/transport-dashboard';
      case 'TOUR_GUIDE':
        return '/guide-dashboard';
      default:
        return '/user-dashboard';
    }
  };

  const dashboardUrl = isAuthenticated ? getDashboardPath(user?.role) : '/login';

  const navLinks = [
    { name: 'Home', path: '/' },
    ...(isAuthenticated ? [{ name: 'My Dashboard', path: dashboardUrl }] : []),
    { name: 'Destinations', path: '/destinations' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
          <span className="logo-icon">TS</span>
          <span className="logo-text">TravelSphere</span>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link 
                to={dashboardUrl} 
                className="user-profile-badge" 
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.35rem 0.75rem', borderRadius: '20px', transition: 'all 0.2s' }}
                title="Go to My Dashboard"
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>
                  {user?.name || 'User'}
                </span>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} style={{ gap: '0.3rem', color: '#ef4444' }}>
                <LogOut size={16} /> Logout
              </Button>
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </NavLink>
              <NavLink to="/register">
                <Button variant="primary" size="sm">Register</Button>
              </NavLink>
            </>
          )}
          <button className="nav-studio-btn" type="button" onClick={openTripStudio}><span className="nav-studio-dot" /> Trip Studio</button>
          
          <div className="navbar-icons">
            <button className="icon-btn" title="Language"><Globe size={20} /></button>
            <button 
              className="icon-btn" 
              title={isAuthenticated ? "My Dashboard" : "Account Login"}
              onClick={() => navigate(dashboardUrl)}
            >
              <User size={20} />
            </button>
          </div>
          <button className="mobile-menu-toggle" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {mobileOpen && <div className="mobile-nav-panel">
        <ul className="mobile-nav-links">
          {navLinks.map((link) => <li key={link.name}><NavLink to={link.path} onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{link.name}</NavLink></li>)}
        </ul>
        <div className="mobile-nav-secondary"><button type="button" onClick={() => { setMobileOpen(false); openTripStudio(); }}>Open Trip Studio</button><button type="button" onClick={() => { setMobileOpen(false); openCommandPalette(); }}>Search the site</button><NavLink to="/support" onClick={() => setMobileOpen(false)}>Support & FAQs</NavLink><NavLink to="/privacy" onClick={() => setMobileOpen(false)}>Privacy</NavLink><NavLink to="/terms" onClick={() => setMobileOpen(false)}>Terms</NavLink></div>
      </div>}
    </nav>
  );
};

export default Navbar;
