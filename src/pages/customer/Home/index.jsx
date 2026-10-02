import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Compass, ShieldCheck, MapPin, Calendar, 
  Users, Sparkles, Star, Heart, CheckCircle2, ChevronRight,
  Plane, Hotel, Car, Globe2, Award, Headphones, Sliders,
  TrendingUp, Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FramerFeatureShowcase from '../../../components/home/FramerFeatureShowcase';
import './Home.css';

const HERO_DESTINATIONS = [
  {
    id: 'amalfi',
    name: 'Amalfi Coast, Italy',
    tagline: 'Cliffside villas & sapphire waters',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
    price: '$2,850',
    days: '7 Days',
    rating: '4.98'
  },
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    tagline: 'Ancient shrines & bamboo forests',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
    price: '$3,200',
    days: '8 Days',
    rating: '4.99'
  },
  {
    id: 'maldives',
    name: 'North Malé, Maldives',
    tagline: 'Private overwater sanctuaries',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85',
    price: '$4,100',
    days: '6 Days',
    rating: '5.00'
  },
  {
    id: 'swiss',
    name: 'Zermatt, Switzerland',
    tagline: 'Matterhorn peaks & alpine chalets',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85',
    price: '$3,800',
    days: '7 Days',
    rating: '4.97'
  }
];

const CURATED_PACKAGES = [
  {
    id: 'pkg-1',
    title: 'Santorini Sunset & Wine Estate Escape',
    location: 'Santorini, Greece',
    duration: '5 Days / 4 Nights',
    price: 2450,
    rating: 4.96,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    category: 'Coastal Luxury',
    included: ['Private Catamaran Sunset Cruise', 'Cliffside Cave Suite', 'Sommelier Vineyard Tour']
  },
  {
    id: 'pkg-2',
    title: 'Bali Rainforest & Ubud Wellness Retreat',
    location: 'Ubud & Uluwatu, Bali',
    duration: '7 Days / 6 Nights',
    price: 1950,
    rating: 4.99,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    category: 'Wellness',
    included: ['Private Villa with Infinity Pool', 'Holistic Spa Treatments', 'Chauffeur & Guide']
  },
  {
    id: 'pkg-3',
    title: 'Patagonia Glaciers & Eco-Lodge Expedition',
    location: 'Torres del Paine, Chile',
    duration: '9 Days / 8 Nights',
    price: 4600,
    rating: 4.98,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80',
    category: 'Adventure Luxe',
    included: ['Fjord Catamaran Excursions', 'Luxury Geo-Dome Lodge', 'Certified Trek Master']
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchTab, setSearchTab] = useState('tours');
  const [searchDest, setSearchDest] = useState('');
  const [searchGuests, setSearchGuests] = useState('2 Guests');
  const [searchMonth, setSearchMonth] = useState('Flexible');
  const [likedTrips, setLikedTrips] = useState({});

  const activeHero = HERO_DESTINATIONS[heroIndex];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTab === 'tours') navigate(`/packages?q=${encodeURIComponent(searchDest)}`);
    else if (searchTab === 'hotels') navigate(`/hotels?q=${encodeURIComponent(searchDest)}`);
    else navigate(`/vehicles?q=${encodeURIComponent(searchDest)}`);
  };

  const toggleLike = (id) => {
    setLikedTrips(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="framer-home">
      
      {/* HERO SECTION */}
      <section className="framer-hero">
        <div className="hero-bg-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHero.id}
              className="hero-bg-image"
              style={{ backgroundImage: `url(${activeHero.image})` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </AnimatePresence>
          <div className="hero-bg-overlay" />
        </div>

        <div className="hero-content-wrap">
          {/* Top Pill */}
          <motion.div 
            className="hero-top-pill"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.1 }}
          >
            <Sparkles size={14} className="hero-sparkle" />
            <span>Curated Journeys For Modern Explorers</span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
          >
            Travel beyond ordinary.<br />
            <em>Designed around you.</em>
          </motion.h1>

          <motion.p 
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.3 }}
          >
            Handpicked villas, custom private itineraries, executive transit, and certified guides across 42 countries.
          </motion.p>

          {/* Interactive Search Console with Framer Tab Motion */}
          <motion.div 
            className="hero-search-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28, delay: 0.4 }}
          >
            <div className="hero-search-tabs">
              {[
                { id: 'tours', label: 'Curated Tours', icon: Compass },
                { id: 'hotels', label: 'Luxury Stays', icon: Hotel },
                { id: 'transit', label: 'Transit & Chauffeur', icon: Car }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = searchTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSearchTab(tab.id)}
                    className={`search-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSearchTab"
                        className="search-tab-indicator"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <form className="hero-search-form" onSubmit={handleSearch}>
              <div className="search-input-field">
                <label><MapPin size={14} /> Destination</label>
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  value={searchDest}
                  onChange={e => setSearchDest(e.target.value)}
                />
              </div>

              <div className="search-input-field">
                <label><Calendar size={14} /> When</label>
                <select value={searchMonth} onChange={e => setSearchMonth(e.target.value)}>
                  <option>Flexible Dates</option>
                  <option>This Weekend</option>
                  <option>Next Month</option>
                  <option>Spring 2026</option>
                  <option>Summer 2026</option>
                </select>
              </div>

              <div className="search-input-field">
                <label><Users size={14} /> Travellers</label>
                <select value={searchGuests} onChange={e => setSearchGuests(e.target.value)}>
                  <option>1 Solo Explorer</option>
                  <option>2 Guests (Couple)</option>
                  <option>Small Group (3-5)</option>
                  <option>Family / Large (6+)</option>
                </select>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="search-submit-btn"
              >
                <span>Search Trips</span>
                <ArrowRight size={17} />
              </motion.button>
            </form>
          </motion.div>

          {/* Hero Destination Carousel Switcher */}
          <div className="hero-dest-switcher">
            <span className="dest-switcher-label">Featured Collections:</span>
            <div className="dest-switcher-pills">
              {HERO_DESTINATIONS.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setHeroIndex(i)}
                  className={`dest-pill ${heroIndex === i ? 'active' : ''}`}
                >
                  <span className="dest-pill-dot" />
                  <span>{d.name.split(',')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Bottom Floating Stats */}
        <div className="hero-bottom-bar">
          <div className="hero-bar-stat">
            <strong>42+</strong>
            <span>Countries Curated</span>
          </div>
          <div className="hero-bar-divider" />
          <div className="hero-bar-stat">
            <strong>18,000+</strong>
            <span>Happy Travellers</span>
          </div>
          <div className="hero-bar-divider" />
          <div className="hero-bar-stat">
            <strong>4.98 ★</strong>
            <span>Verified Experience Rating</span>
          </div>
          <div className="hero-bar-divider" />
          <div className="hero-bar-stat">
            <strong>24/7</strong>
            <span>Human Concierge Desk</span>
          </div>
        </div>
      </section>

      {/* FRAMER FEATURE SHOWCASE (Spring physics & liquid tabs) */}
      <FramerFeatureShowcase />

      {/* CURATED TRIPS SECTION */}
      <section className="curated-section">
        <div className="curated-container">
          <div className="curated-header">
            <div>
              <div className="curated-badge">
                <Award size={14} />
                <span>Handpicked Itineraries</span>
              </div>
              <h2 className="curated-title">Signature <em>Escapes</em></h2>
            </div>
            <Link to="/packages" className="curated-view-all">
              <span>View all 48 packages</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="curated-grid">
            {CURATED_PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                className="curated-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 350, damping: 25, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="curated-card-media">
                  <img src={pkg.image} alt={pkg.title} />
                  <span className="curated-card-tag">{pkg.category}</span>
                  <button 
                    type="button"
                    onClick={() => toggleLike(pkg.id)}
                    className={`curated-card-like ${likedTrips[pkg.id] ? 'liked' : ''}`}
                    aria-label="Save trip"
                  >
                    <Heart size={16} fill={likedTrips[pkg.id] ? '#ef4444' : 'none'} color={likedTrips[pkg.id] ? '#ef4444' : '#ffffff'} />
                  </button>
                  <div className="curated-card-duration">
                    <Clock size={13} />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <div className="curated-card-content">
                  <div className="curated-card-meta">
                    <span className="curated-card-loc">
                      <MapPin size={13} /> {pkg.location}
                    </span>
                    <span className="curated-card-rating">
                      <Star size={13} fill="#f59e0b" color="#f59e0b" /> {pkg.rating} ({pkg.reviews})
                    </span>
                  </div>

                  <h3 className="curated-card-title">{pkg.title}</h3>

                  <div className="curated-card-inclusions">
                    {pkg.included.map((inc, j) => (
                      <span key={j} className="inclusion-chip">
                        <CheckCircle2 size={12} /> {inc}
                      </span>
                    ))}
                  </div>

                  <div className="curated-card-foot">
                    <div className="curated-price-box">
                      <small>From</small>
                      <strong>${pkg.price.toLocaleString()}</strong>
                      <span>/ person</span>
                    </div>

                    <Link to="/packages" className="curated-book-btn">
                      <span>Reserve</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRAVELSPHERE ASSURANCE STRIP */}
      <section className="assurance-section">
        <div className="assurance-container">
          <div className="assurance-grid">
            <div className="assurance-card">
              <div className="assurance-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h4>100% Verified Partners</h4>
              <p>Every hotel, driver, and guide is vetted for strict safety, licensing, and 5-star service standards.</p>
            </div>

            <div className="assurance-card">
              <div className="assurance-icon-box">
                <Headphones size={24} />
              </div>
              <h4>Direct Human Specialist</h4>
              <p>No automated phone loops. Message your dedicated travel advisor anytime on WhatsApp or phone.</p>
            </div>

            <div className="assurance-card">
              <div className="assurance-icon-box">
                <Award size={24} />
              </div>
              <h4>Best Rate & Upgrade Match</h4>
              <p>Enjoy exclusive room upgrades, complimentary breakfasts, and early check-ins through our agency tier.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="framer-cta-section">
        <div className="framer-cta-container">
          <motion.div 
            className="framer-cta-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="cta-left">
              <span className="cta-pill">Ready for your escape?</span>
              <h2>Let’s craft your next <em>unforgettable story.</em></h2>
              <p>Speak with our senior journey planners or explore tailored packages ready for booking today.</p>
              <div className="cta-actions">
                <Link to="/packages" className="cta-btn-primary">
                  Explore Curated Tours <ArrowRight size={17} />
                </Link>
                <Link to="/support" className="cta-btn-secondary">
                  Talk to a Specialist
                </Link>
              </div>
            </div>

            <div className="cta-right">
              <div className="cta-stat-circle">
                <strong>42+</strong>
                <span>Destinations Open</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
