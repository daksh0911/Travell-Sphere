import { useState, useMemo } from 'react';
import { 
  ArrowRight, Compass, Headphones, Heart, MapPin, Plane, ShieldCheck, 
  Sparkles, Star, Users, WandSparkles, Calendar, Search, Anchor, 
  Check, X, ChevronRight, SlidersHorizontal, Eye, Shield, Award, Clock, Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import SmartImage from '../../../components/common/SmartImage';
import './Home.css';

const HERO_SPOTLIGHTS = [
  {
    id: 'ladakh',
    title: 'High altitude, low noise.',
    subtitle: 'The Tibetan Plateau & Nubra Valley',
    location: 'Ladakh, Himalayas',
    time: '04:36 PM · 3,500m Alt',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=92',
    accent: '#d4af37',
    tag: 'Alpine Sanctuary'
  },
  {
    id: 'amalfi',
    title: 'Cliffside serenity over sapphire waters.',
    subtitle: 'Private Villa Pergola & Positano',
    location: 'Amalfi Coast, Italy',
    time: '06:15 PM · Mediterranean Dusk',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=92',
    accent: '#38bdf8',
    tag: 'Coastal Masterpiece'
  },
  {
    id: 'kyoto',
    title: 'Bamboo mist, tea rituals & stillness.',
    subtitle: 'Arashiyama Ryokan Estate',
    location: 'Kyoto, Japan',
    time: '07:45 AM · Zen Morning',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=92',
    accent: '#10b981',
    tag: 'Heritage Sanctuary'
  },
  {
    id: 'maldives',
    title: 'Infinite horizon, sovereign isolation.',
    subtitle: 'Baa Atoll Private Overwater Estate',
    location: 'Maldives',
    time: '01:20 PM · Turquoise Lagoon',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=92',
    accent: '#f2ca50',
    tag: 'Private Atoll'
  }
];

const SANCTUARIES = [
  {
    id: 'sardinia',
    title: 'Villa Smeralda & Private Peninsula',
    category: 'Cliffside Villas',
    location: 'Porto Cervo, Sardinia',
    price: 14500,
    rating: 5.0,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=92',
    specs: ['Master King Suite', 'Private Helipad', 'Sea-facing Infinity Pool', '24/7 Butler & Michelin Chef'],
    transit: 'Gulfstream G650 Charter Available',
    tag: 'Rare Access'
  },
  {
    id: 'zermatt',
    title: 'The Obsidian Pavilion & Thermal Springs',
    category: 'Alpine Chalets',
    location: 'Zermatt, Swiss Alps',
    price: 18200,
    rating: 4.99,
    reviews: 52,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1920&q=92',
    specs: ['4 Grand Suites', 'Private Ski-In / Ski-Out', 'Subterranean Onsen', 'Sommelier & Chauffeur'],
    transit: 'AgustaWestland Helicopter Transfer',
    tag: 'Winter Sovereign'
  },
  {
    id: 'java',
    title: 'Amanjiwo Royal Borobudur Estate',
    category: 'Desert & Cultural Citadels',
    location: 'Central Java, Indonesia',
    price: 9800,
    rating: 5.0,
    reviews: 29,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=92',
    specs: ['Private Walled Compound', '40m Emerald Lap Pool', 'Resident Historian', 'Temple Sunrise Access'],
    transit: 'Private Chauffeur Fleet Included',
    tag: 'Heritage Honor'
  },
  {
    id: 'maldives-atoll',
    title: 'The Nautilus Sovereign Ocean Residence',
    category: 'Private Atolls',
    location: 'Baa Atoll, Maldives',
    price: 16800,
    rating: 5.0,
    reviews: 44,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=92',
    specs: ['Private Lagoon Pier', 'Glass Floor Ocean Salon', 'Dedicated Yacht Tender', 'Reef Biologist Guide'],
    transit: 'Private Seaplane Direct Transfer',
    tag: 'Ultra Exclusive'
  },
  {
    id: 'superyacht-amalfi',
    title: 'M/Y Celestia 62m Sovereign Cruiser',
    category: 'Superyacht Moored Suites',
    location: 'Capri & Amalfi Coast',
    price: 22000,
    rating: 5.0,
    reviews: 19,
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1920&q=92',
    specs: ['6 Luxury State Rooms', 'Submarine Bay & Jet Skis', 'On-Deck Jacuzzi Cinema', 'Michelin Trained Crew'],
    transit: 'Helipad Onboard Equipped',
    tag: 'Superyacht Charter'
  },
  {
    id: 'rajasthan-palace',
    title: 'Sujan Jawai Desert Camp & Citadel',
    category: 'Desert & Cultural Citadels',
    location: 'Rajasthan, India',
    price: 8400,
    rating: 4.95,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=92',
    specs: ['Royal Tented Palace', 'Private Leopard Tracking 4x4', 'Starlit Desert Dining', 'Royal Concierge Guard'],
    transit: 'Private Jet Landing Strip',
    tag: 'Wilderness Grandeur'
  }
];

const SANCTUARY_CATEGORIES = [
  'All Sanctuaries',
  'Cliffside Villas',
  'Alpine Chalets',
  'Private Atolls',
  'Superyacht Moored Suites',
  'Desert & Cultural Citadels'
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchDestination, setSearchDestination] = useState('');
  const [searchStyle, setSearchStyle] = useState('All Styles');
  const [searchGuests, setSearchGuests] = useState('2 Guests · Suite');
  const [selectedCategory, setSelectedCategory] = useState('All Sanctuaries');
  const [transitTab, setTransitTab] = useState('aviation');
  
  // Interactive Customizer / Booking Modal
  const [modalItem, setModalItem] = useState(null);
  const [modalDays, setModalDays] = useState(7);
  const [modalGuests, setModalGuests] = useState(2);
  const [addOnHelicopter, setAddOnHelicopter] = useState(true);
  const [addOnChef, setAddOnChef] = useState(true);
  const [addOnSommelier, setAddOnSommelier] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const activeHero = HERO_SPOTLIGHTS[heroIndex];

  const filteredSanctuaries = useMemo(() => {
    return SANCTUARIES.filter(item => {
      const matchCat = selectedCategory === 'All Sanctuaries' || item.category === selectedCategory;
      const matchSearch = !searchDestination || 
        `${item.title} ${item.location}`.toLowerCase().includes(searchDestination.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchDestination]);

  // Live Price Calculator in Modal
  const estimatedPrice = useMemo(() => {
    if (!modalItem) return 0;
    let base = modalItem.price * modalDays * (modalGuests / 2);
    if (addOnHelicopter) base += 4500;
    if (addOnChef) base += 2200 * modalDays;
    if (addOnSommelier) base += 1400 * modalDays;
    return base;
  }, [modalItem, modalDays, modalGuests, addOnHelicopter, addOnChef, addOnSommelier]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      id: `SOVEREIGN-${Date.now()}`,
      sanctuary: modalItem.title,
      location: modalItem.location,
      days: modalDays,
      guests: modalGuests,
      totalEstimate: estimatedPrice,
      addOns: {
        helicopter: addOnHelicopter,
        chef: addOnChef,
        sommelier: addOnSommelier
      },
      status: 'Confirmed with Escrow'
    };
    const prev = JSON.parse(localStorage.getItem('ts_sovereign_bookings') || '[]');
    localStorage.setItem('ts_sovereign_bookings', JSON.stringify([requestData, ...prev]));
    setModalItem(null);
    setToastMessage(`Sovereign reservation inquiry dispatched for ${modalItem.title}. Dedicated concierge assigned.`);
    setTimeout(() => setToastMessage(''), 6000);
  };

  return (
    <main className="new-home">
      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="luxury-toast">
          <Sparkles size={18} className="toast-sparkle" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')}><X size={16} /></button>
        </div>
      )}

      {/* HERO SECTION WITH ATMOSPHERIC AURORA & DYNAMIC SWITCHER */}
      <section className="new-home-hero">
        <div className="hero-aurora aurora-one" />
        <div className="hero-aurora aurora-two" />
        <div className="hero-grid" />
        
        <nav className="hero-mini-nav">
          <span className="hero-kicker">
            <span className="pulse-dot" /> Sovereign Concierge Live · 24/7 White-Glove Care
          </span>
          <span className="hero-metrics-pill">
            <Award size={13} /> Forbes & Condé Nast Gold List Verified · 42 Countries
          </span>
        </nav>

        <div className="hero-layout">
          <div className="hero-copy">
            <Reveal direction="right">
              <span className="new-eyebrow">
                <Sparkles size={14} /> The Obsidian Sanctuary Collection
              </span>
            </Reveal>

            <Reveal direction="right" delay={90}>
              <h1>
                Transcendent escapes<br />
                curated for the<br />
                <em>sovereign voyager.</em>
              </h1>
            </Reveal>

            <Reveal direction="right" delay={180}>
              <p className="hero-lede">
                Secluded architectural masterworks, private island atolls, and bespoke aviation pairings—crafted around your rhythm with discreet concierge precision.
              </p>
            </Reveal>

            <Reveal direction="right" delay={270}>
              <div className="hero-actions">
                <Link to="/packages" className="hero-primary">
                  <span>Explore Sanctuaries</span>
                  <ArrowRight size={17} />
                </Link>
                <button 
                  type="button" 
                  className="hero-secondary"
                  onClick={() => setModalItem(SANCTUARIES[0])}
                >
                  <WandSparkles size={16} />
                  <span>Custom Itinerary Studio</span>
                </button>
              </div>
            </Reveal>

            <Reveal direction="right" delay={360}>
              <div className="hero-proof">
                <div className="avatar-stack">
                  <span>AW</span>
                  <span>MK</span>
                  <span>JN</span>
                  <span>+</span>
                </div>
                <div>
                  <strong>Trusted by 18,000+ Connoisseur Travellers</strong>
                  <small>
                    <Star size={12} fill="#d4af37" color="#d4af37" /> 
                    <span>5.0 Perfection score across private stays</span>
                  </small>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Interactive Hero Orbit Card with Spotlight Switcher */}
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
                  <span>{activeHero.time}</span>
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
                  onClick={() => setModalItem(SANCTUARIES.find(s => s.location.includes(activeHero.location.split(',')[0])) || SANCTUARIES[0])}
                  aria-label="Inquire this sanctuary"
                >
                  <ArrowRight size={19} />
                </button>
              </div>

              {/* Interactive Spotlight Switcher Tabs */}
              <div className="hero-spotlight-pills">
                {HERO_SPOTLIGHTS.map((item, idx) => (
                  <button 
                    key={item.id}
                    type="button"
                    className={`spotlight-pip ${idx === heroIndex ? 'active' : ''}`}
                    onClick={() => setHeroIndex(idx)}
                    title={item.location}
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
                100% Escrow<br />
                <strong>Protected Booking</strong>
              </span>
            </div>

            <div className="orbit-pill pill-bottom">
              <Flame size={16} />
              <span>
                Private Fleet<br />
                <strong>Direct Transit</strong>
              </span>
            </div>
          </Reveal>
        </div>

        {/* FLOATING LUXURY TRIP SEARCH BAR (APPLE-LEVEL POLISH) */}
        <div className="floating-sanctuary-search">
          <div className="search-segment">
            <label><MapPin size={15} /> Destination or Sanctuary</label>
            <input 
              type="text" 
              placeholder="Amalfi, Kyoto, Zermatt..."
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
            />
          </div>

          <div className="search-divider" />

          <div className="search-segment">
            <label><Compass size={15} /> Sanctuary Style</label>
            <select value={searchStyle} onChange={(e) => setSearchStyle(e.target.value)}>
              <option>All Styles</option>
              <option>Private Island Villa</option>
              <option>Alpine Chalet</option>
              <option>Cliffside Estate</option>
              <option>Superyacht Suite</option>
            </select>
          </div>

          <div className="search-divider" />

          <div className="search-segment">
            <label><Calendar size={15} /> Preferred Dates</label>
            <input type="date" defaultValue="2026-10-18" />
          </div>

          <div className="search-divider" />

          <div className="search-segment">
            <label><Users size={15} /> Party & Transit</label>
            <select value={searchGuests} onChange={(e) => setSearchGuests(e.target.value)}>
              <option>2 Guests · Sovereign Suite</option>
              <option>4 Guests · Grand Wing</option>
              <option>8 Guests · Full Estate Buyout</option>
              <option>2 Guests · Gulfstream Jet Pair</option>
            </select>
          </div>

          <button 
            type="button" 
            className="search-submit-btn"
            onClick={() => {
              const el = document.getElementById('sanctuaries-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Search size={16} />
            <span>Search Escapes</span>
          </button>
        </div>
      </section>

      {/* CURATED SANCTUARIES & BESPOKE RETREATS SECTION */}
      <section className="new-home-section discovery-section" id="sanctuaries-grid">
        <Reveal>
          <div className="section-topline">
            <div>
              <span className="new-eyebrow dark">The Curated Portfolio</span>
              <h2>Handpicked Sanctuaries<br /><em>Off the Open Market.</em></h2>
            </div>
            <Link to="/packages" className="section-link">
              <span>View all 140+ retreats</span> 
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Interactive Category Filter Pills */}
        <div className="sanctuary-filter-tabs">
          {SANCTUARY_CATEGORIES.map(cat => (
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

        {/* Sanctuary Cards Grid */}
        <div className="sanctuary-cards-grid">
          {filteredSanctuaries.map((item, index) => (
            <Reveal key={item.id} delay={index * 90} className="sanctuary-card">
              <div className="card-image-wrap">
                <SmartImage 
                  src={item.image} 
                  alt={item.title} 
                  sizes="(max-width: 620px) 92vw, (max-width: 900px) 48vw, 32vw" 
                />
                <span className="card-luxury-tag">{item.tag}</span>
                <span className="card-price-pill">From ${item.price.toLocaleString()} <small>/ night</small></span>
              </div>

              <div className="sanctuary-card-content">
                <div className="card-top-meta">
                  <span className="card-location"><MapPin size={13} /> {item.location}</span>
                  <span className="card-rating"><Star size={13} fill="#d4af37" color="#d4af37" /> {item.rating}</span>
                </div>

                <h3>{item.title}</h3>

                <div className="card-spec-pills">
                  {item.specs.map(spec => (
                    <span key={spec} className="spec-pill">{spec}</span>
                  ))}
                </div>

                <div className="card-transit-notice">
                  <Plane size={13} /> {item.transit}
                </div>

                <div className="card-action-row">
                  <button 
                    type="button"
                    className="card-inquire-btn"
                    onClick={() => setModalItem(item)}
                  >
                    <span>Reserve Sanctuary</span>
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

      {/* SOVEREIGN TRANSIT & PRIVATE FLEET SHOWCASE */}
      <section className="signal-section">
        <div className="signal-glow" />
        <div className="new-home-section signal-inner">
          <Reveal direction="right">
            <span className="new-eyebrow">Bespoke Transit Pairings</span>
            <h2>Private Fleet &<br /><em>Direct Transfers.</em></h2>
            <p>Skip crowded terminals and commercial itineraries. TravelSphere pairs every sanctuary with dedicated aviation and maritime charters.</p>
            
            <div className="transit-tab-controls">
              <button 
                type="button"
                className={`transit-tab-btn ${transitTab === 'aviation' ? 'active' : ''}`}
                onClick={() => setTransitTab('aviation')}
              >
                <Plane size={16} /> Private Aviation
              </button>
              <button 
                type="button"
                className={`transit-tab-btn ${transitTab === 'yacht' ? 'active' : ''}`}
                onClick={() => setTransitTab('yacht')}
              >
                <Anchor size={16} /> Superyacht Charters
              </button>
            </div>

            <Link to="/vehicles" className="signal-link">
              <span>Explore full transport fleet</span>
              <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="transit-showcase-card">
            {transitTab === 'aviation' ? (
              <Reveal delay={100} className="transit-panel">
                <div className="transit-img-wrap">
                  <SmartImage 
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=92" 
                    alt="Gulfstream G700 Cabin"
                  />
                  <span className="transit-badge">Global Access · 14 Passengers</span>
                </div>
                <div className="transit-info">
                  <h3>Gulfstream G700 & Bombardier 7500 Fleet</h3>
                  <p>Non-stop long-range transit with private bedroom suites, high-speed Ka-band connectivity, and tarmac VIP luggage dispatch.</p>
                  <div className="transit-specs-grid">
                    <div><small>Cruising Speed</small><strong>Mach 0.90</strong></div>
                    <div><small>Maximum Range</small><strong>7,750 nm</strong></div>
                    <div><small>Custom Menu</small><strong>Michelin Curated</strong></div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={100} className="transit-panel">
                <div className="transit-img-wrap">
                  <SmartImage 
                    src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1920&q=92" 
                    alt="Superyacht Deck"
                  />
                  <span className="transit-badge">Moored Sovereign Suites</span>
                </div>
                <div className="transit-info">
                  <h3>Custom Displacement Mega-Yachts</h3>
                  <p>Explore secluded coves in Sardinia, Amalfi, and the Greek Cyclades with private submersibles, diving gear, and tender boats.</p>
                  <div className="transit-specs-grid">
                    <div><small>Vessel Length</small><strong>62 Meters</strong></div>
                    <div><small>Crew Complement</small><strong>16 Professionals</strong></div>
                    <div><small>Special Amenity</small><strong>Submarine Bay</strong></div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* THREE STEP SOVEREIGN CONCIERGE RHYTHM */}
      <section className="new-home-section journey-section">
        <Reveal>
          <div className="section-topline">
            <div>
              <span className="new-eyebrow dark">White-Glove Process</span>
              <h2>How Sovereign Travel<br /><em>Comes Together.</em></h2>
            </div>
            <Link to="/support" className="section-link">
              <span>Consult a Specialist</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="journey-steps">
          <Reveal delay={100} className="journey-step">
            <span className="journey-number">01</span>
            <div>
              <h3>Discreet Consultation</h3>
              <p>Share your vision, preferred architecture, and desired pace. Your dedicated specialist curates off-market villas and private islands.</p>
            </div>
            <ArrowRight className="journey-arrow" size={19} />
          </Reveal>

          <Reveal delay={200} className="journey-step">
            <span className="journey-number">02</span>
            <div>
              <h3>Synchronized Transit & Privileges</h3>
              <p>Private aviation, helicopter transfers, Michelin chef provisioning, and bespoke security are seamlessly synchronized into a sovereign manifest.</p>
            </div>
            <ArrowRight className="journey-arrow" size={19} />
          </Reveal>

          <Reveal delay={300} className="journey-step">
            <span className="journey-number">03</span>
            <div>
              <h3>Seamless Sovereign Escrow</h3>
              <p>Protected payment via sovereign escrow with 24/7 proactive concierge support before takeoff, during residence, and upon safe return.</p>
            </div>
            <ArrowRight className="journey-arrow" size={19} />
          </Reveal>
        </div>
      </section>

      {/* BESPOKE CONCIERGE CALL-TO-ACTION */}
      <section className="home-trip-cta">
        <div className="new-home-section cta-inner">
          <Reveal direction="right">
            <span className="new-eyebrow">Initiate Consultation</span>
            <h2>Begin your next<br /><em>transcendent chapter.</em></h2>
            <p>Connect directly with a TravelSphere senior curator. Receive bespoke property manifests within 24 hours.</p>
            <div className="hero-actions">
              <button 
                type="button" 
                className="hero-primary"
                onClick={() => setModalItem(SANCTUARIES[0])}
              >
                <span>Inquire Custom Itinerary</span>
                <ArrowRight size={17} />
              </button>
              <Link to="/contact" className="hero-secondary">
                <span>Private Concierge Desk</span>
              </Link>
            </div>
          </Reveal>

          <Reveal direction="left" delay={140} className="cta-art">
            <div className="cta-ring ring-one" />
            <div className="cta-ring ring-two" />
            <div className="cta-art-card">
              <Shield size={24} />
              <span>Sovereign Protocol</span>
              <strong>100% Privacy<br />& White-Glove Care</strong>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTERACTIVE BESPOKE CUSTOMIZER & RESERVATION MODAL */}
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
              <span className="modal-eyebrow">SOVEREIGN RESERVATION STUDIO</span>
              <h2>{modalItem.title}</h2>
              <p><MapPin size={14} /> {modalItem.location} · {modalItem.category}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="modal-customizer-body">
              <div className="customizer-controls-grid">
                <div className="control-group">
                  <label>Duration of Stay</label>
                  <div className="pill-number-selector">
                    {[3, 5, 7, 14].map(days => (
                      <button 
                        key={days}
                        type="button" 
                        className={`pill-choice ${modalDays === days ? 'active' : ''}`}
                        onClick={() => setModalDays(days)}
                      >
                        {days} Nights
                      </button>
                    ))}
                  </div>
                </div>

                <div className="control-group">
                  <label>Number of Guests</label>
                  <div className="pill-number-selector">
                    {[2, 4, 6, 8].map(guests => (
                      <button 
                        key={guests}
                        type="button" 
                        className={`pill-choice ${modalGuests === guests ? 'active' : ''}`}
                        onClick={() => setModalGuests(guests)}
                      >
                        {guests} Guests
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="addons-section">
                <h4>Bespoke Add-Ons & Transit Pairings</h4>
                <div className="addons-list">
                  <label className="addon-toggle-row">
                    <input 
                      type="checkbox" 
                      checked={addOnHelicopter} 
                      onChange={e => setAddOnHelicopter(e.target.checked)} 
                    />
                    <div className="addon-info">
                      <strong>Private Helicopter / Direct Air Transfer</strong>
                      <small>Dedicated airport to estate helipad landing</small>
                    </div>
                    <span className="addon-price">+$4,500</span>
                  </label>

                  <label className="addon-toggle-row">
                    <input 
                      type="checkbox" 
                      checked={addOnChef} 
                      onChange={e => setAddOnChef(e.target.checked)} 
                    />
                    <div className="addon-info">
                      <strong>Dedicated Michelin-Trained Private Chef</strong>
                      <small>Custom daily dining & vineyard cellar pairings</small>
                    </div>
                    <span className="addon-price">+$2,200 / day</span>
                  </label>

                  <label className="addon-toggle-row">
                    <input 
                      type="checkbox" 
                      checked={addOnSommelier} 
                      onChange={e => setAddOnSommelier(e.target.checked)} 
                    />
                    <div className="addon-info">
                      <strong>Resident Master Sommelier & Wine Cellar Tour</strong>
                      <small>Private vintage tastings from regional grand crus</small>
                    </div>
                    <span className="addon-price">+$1,400 / day</span>
                  </label>
                </div>
              </div>

              <div className="pricing-summary-bar">
                <div>
                  <small>Estimated Sovereign Escrow</small>
                  <strong>${estimatedPrice.toLocaleString()}</strong>
                </div>
                <button type="submit" className="hero-primary">
                  <span>Confirm with Dedicated Concierge</span>
                  <ArrowRight size={17} />
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
              <span>TS</span> TravelSphere Sovereign
            </Link>
            <p>Private Sanctuary Curator & Sovereign Transit Concierge.</p>
          </div>
          <div className="footer-proof">
            <Users size={17} />
            <span>
              <strong>18,000+ Connoisseurs</strong>
              <small>Served across 42 countries</small>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

