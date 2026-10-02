import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Compass, ShieldCheck, MapPin, Calendar, Users, 
  ArrowRight, CheckCircle2, Award, Zap, PhoneCall, Star,
  Plane, Hotel, Car, Globe, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './FramerFeatureShowcase.css';

const FEATURES = [
  {
    id: 'itineraries',
    icon: Compass,
    tag: 'Dynamic Itineraries',
    title: 'Precision-crafted routes tailored to your rhythm',
    description: 'Every trip is customized by local specialists who know hidden trails, private museum hours, and sunset overlooks before the crowds arrive.',
    stats: [
      { label: 'Tailored Routes', val: '450+' },
      { label: 'Avg Guest Rating', val: '4.98 ★' },
      { label: 'Local Guides', val: '120+' }
    ],
    preview: {
      title: '7-Day Amalfi & Capri Private Voyage',
      location: 'Amalfi Coast, Italy',
      price: '$3,450 / person',
      tag: 'Curated by Marco Rossi',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',
      highlights: ['Private Riva boat charter', 'Cliffside Lemon Grove dinner', 'Skip-the-line Ravello access']
    }
  },
  {
    id: 'stays',
    icon: Hotel,
    tag: 'Verified Luxury Stays',
    title: 'Handpicked villas, boutique riads & eco-resorts',
    description: 'We personally inspect every stay for architectural distinction, acoustic tranquility, and immaculate concierge service.',
    stats: [
      { label: 'Boutique Stays', val: '800+' },
      { label: 'Verified Clean', val: '100%' },
      { label: 'Complimentary Upgrades', val: '84%' }
    ],
    preview: {
      title: 'Overwater Sunset Sanctuary',
      location: 'North Malé Atoll, Maldives',
      price: '$890 / night',
      tag: '5-Star Oceanfront',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85',
      highlights: ['Direct coral reef access', 'Personal butler service', 'Private infinity plunge pool']
    }
  },
  {
    id: 'transit',
    icon: Car,
    tag: 'First-Class Transit',
    title: 'Seamless executive chauffeur & yacht transfers',
    description: 'From airport tarmac pickups to private catamaran crossings, arrive refreshed without navigation stress or hidden meter surcharges.',
    stats: [
      { label: 'Fleet Vehicles', val: '320+' },
      { label: 'On-Time Arrival', val: '99.7%' },
      { label: 'Private Yacht Charters', val: '45' }
    ],
    preview: {
      title: 'Executive Chauffeur & Helicopter Transfer',
      location: 'Swiss Alps & Zurich, Switzerland',
      price: '$1,200 / transfer',
      tag: 'VIP Door-to-Door',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85',
      highlights: ['Mercedes Maybach & V-Class', 'Tarmac luggage transfer', 'Multilingual licensed chauffeur']
    }
  },
  {
    id: 'concierge',
    icon: PhoneCall,
    tag: '24/7 Human Concierge',
    title: 'A dedicated travel specialist in your pocket',
    description: 'Instant WhatsApp & in-app support. Flight delayed? Need a last-minute Michelin table? Our team handles it in minutes.',
    stats: [
      { label: 'Response Time', val: '< 2 min' },
      { label: 'Global Coverage', val: '42 Countries' },
      { label: 'Satisfaction', val: '99.4%' }
    ],
    preview: {
      title: 'VIP Dedicated Concierge Desk',
      location: 'Global Support & In-Destination Care',
      price: 'Included with all bookings',
      tag: 'Always Active',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      highlights: ['Real-time WhatsApp dispatch', 'Emergency rebooking guarantee', 'Local table reservations']
    }
  }
];

export default function FramerFeatureShowcase() {
  const [activeTab, setActiveTab] = useState(FEATURES[0].id);
  const current = FEATURES.find(f => f.id === activeTab) || FEATURES[0];

  return (
    <section className="framer-showcase-section">
      <div className="framer-showcase-container">
        
        {/* Top Header */}
        <div className="framer-header">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="framer-badge"
          >
            <Sparkles size={14} />
            <span>The TravelSphere Difference</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.05 }}
            className="framer-title"
          >
            Built for those who travel <em>with intention.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
            className="framer-subtitle"
          >
            Say goodbye to clunky booking portals and generic packages. Experience an intelligent, human-guided ecosystem.
          </motion.p>
        </div>

        {/* Spring Tab Switcher */}
        <div className="framer-tabs-nav">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`framer-tab-btn ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="framer-tab-active-bg"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <Icon size={17} className="framer-tab-icon" />
                <span className="framer-tab-text">{item.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="framer-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="framer-grid"
            >
              {/* Left Column: Explanations & Live Stats */}
              <div className="framer-info-col">
                <div className="framer-pill-tag">
                  <current.icon size={15} />
                  <span>{current.tag}</span>
                </div>

                <h3 className="framer-info-heading">{current.title}</h3>
                <p className="framer-info-desc">{current.description}</p>

                {/* Animated Stat Badges */}
                <div className="framer-stats-row">
                  {current.stats.map((st, i) => (
                    <motion.div 
                      key={st.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 400, damping: 25 }}
                      className="framer-stat-box"
                    >
                      <strong>{st.val}</strong>
                      <span>{st.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Highlights Checklist */}
                <div className="framer-highlights">
                  {current.preview.highlights.map((h, i) => (
                    <motion.div 
                      key={h}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="framer-highlight-item"
                    >
                      <CheckCircle2 size={16} className="framer-check-icon" />
                      <span>{h}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Action Button with spring physics */}
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="framer-cta-wrap"
                >
                  <Link to="/packages" className="framer-action-btn">
                    <span>Explore this collection</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>

              {/* Right Column: Live Interactive Glass Preview Card */}
              <div className="framer-preview-col">
                <motion.div 
                  className="framer-preview-card"
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                >
                  <div className="framer-card-media">
                    <img src={current.preview.image} alt={current.preview.title} />
                    <div className="framer-card-badge">{current.preview.tag}</div>
                    <div className="framer-card-price">{current.preview.price}</div>
                  </div>

                  <div className="framer-card-body">
                    <div className="framer-card-loc">
                      <MapPin size={14} />
                      <span>{current.preview.location}</span>
                    </div>
                    <h4 className="framer-card-title">{current.preview.title}</h4>
                    
                    <div className="framer-card-footer">
                      <div className="framer-rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <strong>4.99</strong>
                        <span>(128 reviews)</span>
                      </div>
                      <Link to="/packages" className="framer-card-view-btn">
                        View Trip <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* Floating Micro-Badge */}
                  <motion.div 
                    className="framer-floating-status"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  >
                    <div className="framer-live-pulse" />
                    <span>Instant Booking Protected</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
