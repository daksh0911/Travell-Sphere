import { useState, useMemo } from 'react';
import { 
  ArrowRight, Compass, Headphones, Heart, MapPin, Plane, ShieldCheck, 
  Sparkles, Star, Users, WandSparkles, Calendar, Search, 
  Check, X, ChevronRight, SlidersHorizontal, Eye, Shield, Award, Clock, Flame, AlertCircle, Send
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Reveal from './Reveal';
import SmartImage from '../../../components/common/SmartImage';
import { validateEmail, validateName, validatePhone, validateDate } from '../../../utils/validation';
import './Home.css';

const HERO_DESTINATIONS = [
  {
    id: 'ladakh',
    title: 'Ladakh High Himalayas',
    subtitle: 'Crisp mountain air & ancient monastery trails',
    location: 'Ladakh, India',
    season: 'Best in Summer · 18°C',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=92',
    tag: 'Mountain Adventure'
  },
  {
    id: 'amalfi',
    title: 'Amalfi Coastal Serenity',
    subtitle: 'Pastel cliffside villas overlooking sapphire seas',
    location: 'Amalfi Coast, Italy',
    season: 'Warm Sun · 24°C',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=92',
    tag: 'Romantic Escape'
  },
  {
    id: 'kyoto',
    title: 'Kyoto Zen & Sakura',
    subtitle: 'Bamboo groves, traditional tea rituals & peaceful shrines',
    location: 'Kyoto, Japan',
    season: 'Spring Blossom · 20°C',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=92',
    tag: 'Cultural Heritage'
  },
  {
    id: 'maldives',
    title: 'Maldives Lagoon Escape',
    subtitle: 'Private overwater bungalows & crystal turquoise waters',
    location: 'Baa Atoll, Maldives',
    season: 'Tropical Breeze · 29°C',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=92',
    tag: 'Tropical Haven'
  }
];

const CURATED_EXPERIENCES = [
  {
    id: 'santorini-retreat',
    title: 'Santorini Cliffside Villa & Catamaran Cruise',
    category: 'Coastal & Islands',
    location: 'Santorini, Greece',
    days: 6,
    nights: 5,
    price: 1980,
    oldPrice: 2400,
    rating: 4.9,
    reviews: 940,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=92',
    specs: ['Sea View Villa', 'Sunset Catamaran Tour', 'Local Wine Tasting', 'All Breakfasts Included'],
    tag: 'Bestseller'
  },
  {
    id: 'swiss-chalet',
    title: 'Swiss Alps Scenic Glacier & Chalet Journey',
    category: 'Mountain & Nature',
    location: 'Zermatt & Interlaken, Switzerland',
    days: 8,
    nights: 7,
    price: 2100,
    oldPrice: 2600,
    rating: 5.0,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1920&q=92',
    specs: ['First-Class Panoramic Rail', 'Cozy Alpine Chalet', 'Glacier Excursion', 'Private Mountain Guide'],
    tag: 'Editors Choice'
  },
  {
    id: 'bali-wellness',
    title: 'Bali Rainforest Wellness & Sacred Temple Trails',
    category: 'Wellness & Nature',
    location: 'Ubud, Bali, Indonesia',
    days: 5,
    nights: 4,
    price: 1120,
    oldPrice: 1400,
    rating: 4.8,
    reviews: 1520,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=92',
    specs: ['Jungle Pool Villa', 'Daily Organic Spa Rituals', 'Waterfall Trekking', 'Temple Passes'],
    tag: 'Great Value'
  },
  {
    id: 'maldives-bungalow',
    title: 'Maldives Overwater Lagoon Residence',
    category: 'Coastal & Islands',
    location: 'Maldives',
    days: 5,
    nights: 4,
    price: 1850,
    oldPrice: 2200,
    rating: 4.9,
    reviews: 1280,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=92',
    specs: ['Private Glass-Floor Villa', 'Dolphin Sunset Safari', 'All Inclusive Dining', 'Speedboat Transfer'],
    tag: 'Top Rated'
  },
  {
    id: 'rajasthan-heritage',
    title: 'Royal Rajasthan Palaces & Desert Starlit Camp',
    category: 'Culture & Heritage',
    location: 'Jaipur & Udaipur, India',
    days: 7,
    nights: 6,
    price: 1350,
    oldPrice: 1650,
    rating: 4.95,
    reviews: 780,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=92',
    specs: ['Heritage Palace Stays', 'Private Chauffeur Tour', 'Desert Safari by Sunset', 'Traditional Folk Dining'],
    tag: 'Authentic Experience'
  },
  {
    id: 'dubai-skyline',
    title: 'Dubai Luxury Desert Safari & Marina Cruise',
    category: 'City & Luxury',
    location: 'Dubai, UAE',
    days: 4,
    nights: 3,
    price: 1450,
    oldPrice: 1800,
    rating: 4.85,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c0?auto=format&fit=crop&w=1920&q=92',
    specs: ['5★ Marina Hotel', '4x4 Desert Dune Safari', 'Luxury Yacht Cruise', 'VIP Airport Transfer'],
    tag: 'Fast Getaway'
  }
];

const CATEGORIES = [
  'All Trips',
  'Coastal & Islands',
  'Mountain & Nature',
  'Wellness & Nature',
  'Culture & Heritage',
  'City & Luxury'
];

export default function Home() {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchDestination, setSearchDestination] = useState('');
  const [searchStyle, setSearchStyle] = useState('All Styles');
  const [searchGuests, setSearchGuests] = useState('2 Travellers');
  const [searchDate, setSearchDate] = useState('2026-10-18');
  const [selectedCategory, setSelectedCategory] = useState('All Trips');
  
  // Custom Trip Planner Modal
  const [modalItem, setModalItem] = useState(null);
  const [plannerForm, setPlannerForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-10-25',
    days: 7,
    guests: 2,
    specialRequests: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const activeHero = HERO_DESTINATIONS[heroIndex];

  const filteredTrips = useMemo(() => {
    return CURATED_EXPERIENCES.filter(item => {
      const matchCat = selectedCategory === 'All Trips' || item.category === selectedCategory;
      const matchSearch = !searchDestination || 
        `${item.title} ${item.location}`.toLowerCase().includes(searchDestination.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchDestination]);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchDestination.trim()) {
      localStorage.setItem('ts_destination_interest', searchDestination.trim());
      navigate(`/packages?search=${encodeURIComponent(searchDestination.trim())}`);
    } else {
      navigate('/packages');
    }
  };

  const handleOpenPlanner = (item) => {
    setModalItem(item);
    setPlannerForm({
      name: '',
      email: '',
      phone: '',
      date: '2026-10-25',
      days: item.days || 7,
      guests: 2,
      specialRequests: ''
    });
    setFormErrors({});
  };

  const validatePlanner = () => {
    const errors = {};
    const nameErr = validateName(plannerForm.name, 'Your name');
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(plannerForm.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(plannerForm.phone);
    if (phoneErr) errors.phone = phoneErr;

    const dateErr = validateDate(plannerForm.date, 'Departure date');
    if (dateErr) errors.date = dateErr;

    if (!plannerForm.days || plannerForm.days < 1) {
      errors.days = 'Duration must be at least 1 day.';
    }

    if (!plannerForm.guests || plannerForm.guests < 1) {
      errors.guests = 'Please specify at least 1 traveller.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlannerSubmit = (e) => {
    e.preventDefault();
    if (!validatePlanner()) return;

    const tripRequest = {
      id: `TRIP-${Date.now()}`,
      destination: modalItem.title,
      location: modalItem.location,
      travelerName: plannerForm.name,
      email: plannerForm.email,
      phone: plannerForm.phone,
      date: plannerForm.date,
      days: plannerForm.days,
      guests: plannerForm.guests,
      specialRequests: plannerForm.specialRequests,
      status: 'Specialist Assigned',
      submittedAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('ts_trip_requests') || '[]');
    localStorage.setItem('ts_trip_requests', JSON.stringify([tripRequest, ...existing]));

    setModalItem(null);
    setToastMessage(`Your trip inquiry for "${modalItem.title}" has been received! Our travel specialist will contact you at ${plannerForm.email}.`);
    setTimeout(() => setToastMessage(''), 7000);
  };

  return (
    <main className="new-home">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="luxury-toast">
          <Check size={18} className="toast-sparkle" />
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage('')}><X size={16} /></button>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="new-home-hero">
        <div className="hero-aurora aurora-one" />
        <div className="hero-aurora aurora-two" />
        <div className="hero-grid" />
        
        <nav className="hero-mini-nav">
          <span className="hero-kicker">
            <span className="pulse-dot" /> Live Concierge · 24/7 Travel Assistance
          </span>
          <span className="hero-metrics-pill">
            <Award size={13} /> Trusted by 18,000+ Travellers across 42 Countries
          </span>
        </nav>

        <div className="hero-layout">
          <div className="hero-copy">
            <Reveal direction="right">
              <span className="new-eyebrow">
                <Sparkles size={14} /> Plan Your Next Unforgettable Getaway
              </span>
            </Reveal>

            <Reveal direction="right" delay={90}>
              <h1>
                Discover the world<br />
                with handcrafted journeys<br />
                <em>made just for you.</em>
              </h1>
            </Reveal>

            <Reveal direction="right" delay={180}>
              <p className="hero-lede">
                Authentic local experiences, handpicked stays, and seamless transfers—planned with care by certified destination experts so you can travel stress-free.
              </p>
            </Reveal>

            <Reveal direction="right" delay={270}>
              <div className="hero-actions">
                <Link to="/packages" className="hero-primary">
                  <span>Explore Featured Trips</span>
                  <ArrowRight size={17} />
                </Link>
                <button 
                  type="button" 
                  className="hero-secondary"
                  onClick={() => handleOpenPlanner(CURATED_EXPERIENCES[0])}
                >
                  <WandSparkles size={16} />
                  <span>Customize a Trip</span>
                </button>
              </div>
            </Reveal>

            <Reveal direction="right" delay={360}>
              <div className="hero-proof">
                <div className="avatar-stack">
                  <span>JD</span>
                  <span>SA</span>
                  <span>MK</span>
                  <span>+</span>
                </div>
                <div>
                  <strong>Rated 4.9/5 by 18,000+ Happy Explorers</strong>
                  <small>
                    <Star size={12} fill="#38bdf8" color="#38bdf8" /> 
                    <span>Verified reviews from real vacationers</span>
                  </small>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Hero Spotlight Interactive Card */}
          <Reveal direction="left" delay={160} className="hero-orbit-wrap">
            <div className="hero-orbit-card">
              <div className="orbit-image">
                <SmartImage 
                  src={activeHero.image} 
                  alt={activeHero.title} 
                  priority 
                  sizes="(max-width: 900px) 92vw, 480px" 
                />
                <div className="orbit-image-label">
                  <MapPin size={13} /> 
                  <span>{activeHero.location}</span> 
                  <span className="sep">·</span> 
                  <Clock size={13} />
                  <span>{activeHero.season}</span>
                </div>
              </div>

              <div className="orbit-card-content">
                <div>
                  <small>{activeHero.tag}</small>
                  <h2>{activeHero.title}</h2>
                  <p className="orbit-subline">{activeHero.subtitle}</p>
                </div>
                <button 
                  type="button" 
                  className="round-arrow" 
                  onClick={() => handleOpenPlanner(CURATED_EXPERIENCES.find(s => s.location.includes(activeHero.location.split(',')[0])) || CURATED_EXPERIENCES[0])}
                  aria-label="Inquire this trip"
                >
                  <ArrowRight size={19} />
                </button>
              </div>

              {/* Destination selector tabs */}
              <div className="hero-spotlight-pills">
                {HERO_DESTINATIONS.map((item, idx) => (
                  <button 
                    key={item.id}
                    type="button"
                    className={`spotlight-pip ${idx === heroIndex ? 'active' : ''}`}
                    onClick={() => setHeroIndex(idx)}
                  >
                    <span>0{idx + 1}</span>
                    <small>{item.location.split(',')[0]}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="orbit-pill pill-top">
              <ShieldCheck size={16} />
              <span>
                100% Protected<br />
                <strong>Flexible Booking</strong>
              </span>
            </div>

            <div className="orbit-pill pill-bottom">
              <Compass size={16} />
              <span>
                Local Certified<br />
                <strong>Expert Guides</strong>
              </span>
            </div>
          </Reveal>
        </div>

        {/* INTERACTIVE SEARCH CONSOLE */}
        <form className="floating-sanctuary-search" onSubmit={handleHeroSearch}>
          <div className="search-segment">
            <label><MapPin size={15} /> Destination</label>
            <input 
              type="text" 
              placeholder="Where would you like to go? (e.g. Bali, Swiss Alps, Kyoto)"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
            />
          </div>

          <div className="search-divider" />

          <div className="search-segment">
            <label><Compass size={15} /> Travel Style</label>
            <select value={searchStyle} onChange={(e) => setSearchStyle(e.target.value)}>
              <option>All Styles</option>
              <option>Beach & Islands</option>
              <option>Mountain Adventure</option>
              <option>Culture & Heritage</option>
              <option>Wellness & Spa</option>
            </select>
          </div>

          <div className="search-divider" />

          <div className="search-segment">
            <label><Calendar size={15} /> Departure Date</label>
            <input 
              type="date" 
              value={searchDate} 
              onChange={(e) => setSearchDate(e.target.value)} 
            />
          </div>

          <div className="search-divider" />

          <div className="search-segment">
            <label><Users size={15} /> Travellers</label>
            <select value={searchGuests} onChange={(e) => setSearchGuests(e.target.value)}>
              <option>1 Traveller (Solo)</option>
              <option>2 Travellers (Couple)</option>
              <option>4 Travellers (Family / Group)</option>
              <option>6+ Travellers (Large Group)</option>
            </select>
          </div>

          <button type="submit" className="search-submit-btn">
            <Search size={16} />
            <span>Search Trips</span>
          </button>
        </form>
      </section>

      {/* CURATED TRIPS & PACKAGES SECTION */}
      <section className="new-home-section discovery-section" id="sanctuaries-grid">
        <Reveal>
          <div className="section-topline">
            <div>
              <span className="new-eyebrow dark">Featured Itineraries</span>
              <h2>Handcrafted Trips<br /><em>Loved by Travellers.</em></h2>
            </div>
            <Link to="/packages" className="section-link">
              <span>View all 50+ packages</span> 
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <div className="sanctuary-filter-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trip Cards Grid */}
        <div className="sanctuary-cards-grid">
          {filteredTrips.map((item, index) => (
            <Reveal key={item.id} delay={index * 80} className="sanctuary-card">
              <div className="card-image-wrap">
                <SmartImage 
                  src={item.image} 
                  alt={item.title} 
                  sizes="(max-width: 620px) 92vw, (max-width: 900px) 48vw, 32vw" 
                />
                <span className="card-luxury-tag">{item.tag}</span>
                <span className="card-price-pill">From ${item.price.toLocaleString()} <small>/ person</small></span>
              </div>

              <div className="sanctuary-card-content">
                <div className="card-top-meta">
                  <span className="card-location"><MapPin size={13} /> {item.location}</span>
                  <span className="card-rating"><Star size={13} fill="#fbbf24" color="#fbbf24" /> {item.rating} ({item.reviews})</span>
                </div>

                <h3>{item.title}</h3>

                <div className="card-spec-pills">
                  {item.specs.map(spec => (
                    <span key={spec} className="spec-pill">{spec}</span>
                  ))}
                </div>

                <div className="card-transit-notice">
                  <Clock size={13} /> {item.days} Days / {item.nights} Nights · All transfers included
                </div>

                <div className="card-action-row">
                  <button 
                    type="button"
                    className="card-inquire-btn"
                    onClick={() => handleOpenPlanner(item)}
                  >
                    <span>Book Trip</span>
                    <ArrowRight size={15} />
                  </button>
                  <Link to="/packages" className="card-details-btn">
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE TRAVELSPHERE */}
      <section className="signal-section">
        <div className="signal-glow" />
        <div className="new-home-section signal-inner">
          <Reveal direction="right">
            <span className="new-eyebrow">The TravelSphere Difference</span>
            <h2>Travel made effortless,<br /><em>from takeoff to touchdown.</em></h2>
            <p>We combine personalized vacation planning with trusted local operators so you enjoy every minute of your trip without worrying about logistics.</p>
            
            <div className="hero-actions" style={{ marginTop: '24px' }}>
              <Link to="/about" className="hero-primary">
                <span>Learn About Us</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/support" className="hero-secondary">
                <span>24/7 Support Desk</span>
              </Link>
            </div>
          </Reveal>

          <div className="transit-panel">
            <div className="transit-info" style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '20px' }}>What’s Always Included</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.2)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '1rem' }}>Guaranteed Hotel & Tour Confirmation</strong>
                    <small style={{ color: '#94a3b8' }}>Direct voucher issuance with 100% verified properties and licensed operators.</small>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Headphones size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '1rem' }}>Personal Trip Specialist</strong>
                    <small style={{ color: '#94a3b8' }}>A dedicated human concierge on WhatsApp and phone ready to assist anytime.</small>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Plane size={18} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#fff', fontSize: '1rem' }}>Hassle-Free Airport & City Transfers</strong>
                    <small style={{ color: '#94a3b8' }}>Punctual chauffeurs waiting for you with vehicle choices suited for your party.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE STEP HOW IT WORKS */}
      <section className="new-home-section journey-section">
        <Reveal>
          <div className="section-topline">
            <div>
              <span className="new-eyebrow dark">Simple 3-Step Process</span>
              <h2>How Your Dream Trip<br /><em>Comes Together.</em></h2>
            </div>
            <Link to="/support" className="section-link">
              <span>Have questions? Chat with us</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="journey-steps">
          <Reveal delay={100} className="journey-step">
            <span className="journey-number">01</span>
            <div>
              <h3>Choose or Customize</h3>
              <p>Browse our popular packages or tell us your dream destination, preferred dates, and party size.</p>
            </div>
            <ArrowRight className="journey-arrow" size={19} />
          </Reveal>

          <Reveal delay={200} className="journey-step">
            <span className="journey-number">02</span>
            <div>
              <h3>Specialist Consultation</h3>
              <p>Your dedicated travel specialist fine-tunes your itinerary, hotel options, and custom excursions.</p>
            </div>
            <ArrowRight className="journey-arrow" size={19} />
          </Reveal>

          <Reveal delay={300} className="journey-step">
            <span className="journey-number">03</span>
            <div>
              <h3>Pack & Enjoy</h3>
              <p>Receive your digital itinerary, vouchers, and 24/7 hotline. Enjoy an unforgettable vacation!</p>
            </div>
            <ArrowRight className="journey-arrow" size={19} />
          </Reveal>
        </div>
      </section>

      {/* TRIP PLANNER MODAL WITH FORM VALIDATION */}
      {modalItem && (
        <div className="modal-backdrop" onClick={() => setModalItem(null)}>
          <div className="luxury-customizer-modal" onClick={e => e.stopPropagation()}>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setModalItem(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="modal-header">
              <span className="modal-eyebrow">CUSTOMIZE & INQUIRE TRIP</span>
              <h2>{modalItem.title}</h2>
              <p><MapPin size={14} /> {modalItem.location} · {modalItem.category}</p>
            </div>

            <form onSubmit={handlePlannerSubmit} className="modal-customizer-body" noValidate>
              <div className="customizer-controls-grid">
                <div className="control-group">
                  <label>Full Name *</label>
                  <input 
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    value={plannerForm.name}
                    onChange={e => setPlannerForm({...plannerForm, name: e.target.value})}
                    style={{ borderColor: formErrors.name ? '#ef4444' : '' }}
                  />
                  {formErrors.name && (
                    <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <AlertCircle size={12} /> {formErrors.name}
                    </small>
                  )}
                </div>

                <div className="control-group">
                  <label>Email Address *</label>
                  <input 
                    type="email"
                    placeholder="sarah@example.com"
                    value={plannerForm.email}
                    onChange={e => setPlannerForm({...plannerForm, email: e.target.value})}
                    style={{ borderColor: formErrors.email ? '#ef4444' : '' }}
                  />
                  {formErrors.email && (
                    <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <AlertCircle size={12} /> {formErrors.email}
                    </small>
                  )}
                </div>
              </div>

              <div className="customizer-controls-grid">
                <div className="control-group">
                  <label>Phone / WhatsApp Number *</label>
                  <input 
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={plannerForm.phone}
                    onChange={e => setPlannerForm({...plannerForm, phone: e.target.value})}
                    style={{ borderColor: formErrors.phone ? '#ef4444' : '' }}
                  />
                  {formErrors.phone && (
                    <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <AlertCircle size={12} /> {formErrors.phone}
                    </small>
                  )}
                </div>

                <div className="control-group">
                  <label>Departure Date *</label>
                  <input 
                    type="date"
                    value={plannerForm.date}
                    onChange={e => setPlannerForm({...plannerForm, date: e.target.value})}
                    style={{ borderColor: formErrors.date ? '#ef4444' : '' }}
                  />
                  {formErrors.date && (
                    <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <AlertCircle size={12} /> {formErrors.date}
                    </small>
                  )}
                </div>
              </div>

              <div className="customizer-controls-grid">
                <div className="control-group">
                  <label>Trip Duration (Days)</label>
                  <input 
                    type="number"
                    min="1"
                    max="60"
                    value={plannerForm.days}
                    onChange={e => setPlannerForm({...plannerForm, days: parseInt(e.target.value) || 1})}
                  />
                </div>

                <div className="control-group">
                  <label>Number of Travellers</label>
                  <input 
                    type="number"
                    min="1"
                    max="30"
                    value={plannerForm.guests}
                    onChange={e => setPlannerForm({...plannerForm, guests: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>

              <div className="control-group">
                <label>Special Requests / Preferences (Optional)</label>
                <textarea 
                  rows="3"
                  placeholder="Tell us if you want room upgrades, specific activities, dietary preferences, or private tours..."
                  value={plannerForm.specialRequests}
                  onChange={e => setPlannerForm({...plannerForm, specialRequests: e.target.value})}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', font: 'inherit' }}
                />
              </div>

              <div className="pricing-summary-bar">
                <div>
                  <small>Estimated Starting Cost</small>
                  <strong>${(modalItem.price * plannerForm.guests).toLocaleString()}</strong>
                </div>
                <button type="submit" className="hero-primary">
                  <Send size={16} />
                  <span>Submit Trip Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="new-home-footer">
        <div className="new-home-section footer-inner">
          <div>
            <Link to="/" className="footer-brand">
              <span>TS</span> TravelSphere
            </Link>
            <p>Your trusted companion for unforgettable global journeys.</p>
          </div>
          <div className="footer-proof">
            <Users size={17} />
            <span>
              <strong>18,000+ Travellers</strong>
              <small>Joined across 42 countries</small>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
