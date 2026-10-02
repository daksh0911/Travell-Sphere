import { useMemo, useState } from 'react';
import { 
  ArrowRight, Check, ChevronDown, Clock3, Heart, MapPin, Search, ShieldCheck, 
  Star, X, AlertCircle, Send, Users, Calendar, Phone, Mail, User
} from 'lucide-react';
import './TourPackages.css';
import './Compare.css';
import SmartImage from '../../../components/common/SmartImage';
import { validateEmail, validateName, validatePhone, validateDate } from '../../../utils/validation';

const PACKAGES = [
  {
    id: 1,
    title: 'Maldives Overwater Bungalow Escape',
    location: 'Maldives',
    category: 'Beach & Islands',
    days: 5,
    nights: 4,
    price: 1850,
    oldPrice: 2200,
    rating: 4.9,
    reviews: 1280,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=92',
    tag: 'Bestseller',
    inclusions: ['Private water villa', 'Dolphin sunset cruise', 'All gourmet meals', 'Airport speedboat transfer']
  },
  {
    id: 2,
    title: 'Santorini Sunset Villa & Catamaran Tour',
    location: 'Santorini, Greece',
    category: 'Honeymoon',
    days: 6,
    nights: 5,
    price: 1980,
    oldPrice: 2400,
    rating: 4.8,
    reviews: 940,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=92',
    tag: 'Limited Dates',
    inclusions: ['Cliffside sea view villa', 'Catamaran sunset sail', 'Wine tasting in Oia', 'Daily breakfast']
  },
  {
    id: 3,
    title: 'Bali Rainforest Wellness & Temple Trails',
    location: 'Bali, Indonesia',
    category: 'Wellness',
    days: 5,
    nights: 4,
    price: 1120,
    oldPrice: 1400,
    rating: 4.7,
    reviews: 1520,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=92',
    tag: 'Great Value',
    inclusions: ['Jungle pool suite', 'Daily spa & yoga', 'Waterfall excursion', 'Private driver']
  },
  {
    id: 4,
    title: 'Swiss Alps Scenic Glacier Express & Chalet',
    location: 'Interlaken, Switzerland',
    category: 'Adventure',
    days: 8,
    nights: 7,
    price: 2100,
    oldPrice: 2600,
    rating: 5.0,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=92',
    tag: 'Top Rated',
    inclusions: ['First-class scenic train', 'Alpine chalet stay', 'Jungfrau glacier trip', 'Daily Swiss breakfast']
  },
  {
    id: 5,
    title: 'Kyoto Heritage, Shrines & Tea Ceremony',
    location: 'Kyoto, Japan',
    category: 'Culture',
    days: 7,
    nights: 6,
    price: 1450,
    oldPrice: 1800,
    rating: 4.9,
    reviews: 1450,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=92',
    tag: 'New Season',
    inclusions: ['Authentic Ryokan stay', 'Tea master ceremony', 'Temple express passes', 'Bullet train transfer']
  },
  {
    id: 6,
    title: 'Dubai Marina Luxury & Desert Safari',
    location: 'Dubai, UAE',
    category: 'Luxury',
    days: 4,
    nights: 3,
    price: 1450,
    oldPrice: 1900,
    rating: 4.9,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c0?auto=format&fit=crop&w=1920&q=92',
    tag: 'Popular',
    inclusions: ['5★ Marina resort', 'Private 4x4 dune safari', 'Marina yacht cruise', 'Airport VIP transfer']
  }
];

const CATEGORIES = ['All packages', 'Beach & Islands', 'Honeymoon', 'Wellness', 'Adventure', 'Culture', 'Luxury'];

export default function TourPackagesPage() {
  const [query, setQuery] = useState(localStorage.getItem('ts_destination_interest') || '');
  const [category, setCategory] = useState('All packages');
  const [sort, setSort] = useState('recommended');
  const [compare, setCompare] = useState([]);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('ts_package_wishlist') || '[]'));
  const [booking, setBooking] = useState(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [toast, setToast] = useState('');

  // Booking Form State with Validation
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-10-25',
    guests: '2'
  });
  const [formErrors, setFormErrors] = useState({});

  const results = useMemo(() => {
    const filtered = PACKAGES.filter(pkg => 
      (category === 'All packages' || pkg.category.toLowerCase() === category.toLowerCase()) &&
      `${pkg.title} ${pkg.location}`.toLowerCase().includes(query.toLowerCase())
    );
    return [...filtered].sort((a, b) => 
      sort === 'price' ? a.price - b.price : sort === 'rating' ? b.rating - a.rating : 0
    );
  }, [query, category, sort]);

  const toggleWish = (id) => {
    const next = wishlist.includes(id) ? wishlist.filter(item => item !== id) : [...wishlist, id];
    setWishlist(next);
    localStorage.setItem('ts_package_wishlist', JSON.stringify(next));
  };

  const toggleCompare = (id) => {
    setCompare(current => 
      current.includes(id) ? current.filter(item => item !== id) : current.length < 3 ? [...current, id] : current
    );
  };

  const handleOpenBooking = (pkg) => {
    setBooking(pkg);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '2026-10-25',
      guests: '2'
    });
    setFormErrors({});
  };

  const validateBookingForm = () => {
    const errors = {};
    const nameErr = validateName(bookingForm.name, 'Full name');
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(bookingForm.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(bookingForm.phone);
    if (phoneErr) errors.phone = phoneErr;

    const dateErr = validateDate(bookingForm.date, 'Departure date');
    if (dateErr) errors.date = dateErr;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitBooking = (e) => {
    e.preventDefault();
    if (!validateBookingForm()) return;

    const reservation = {
      id: `TS-${Date.now()}`,
      packageId: booking.id,
      packageTitle: booking.title,
      travelerName: bookingForm.name,
      email: bookingForm.email,
      phone: bookingForm.phone,
      date: bookingForm.date,
      guests: bookingForm.guests,
      totalPrice: booking.price * parseInt(bookingForm.guests || '1'),
      status: 'Confirmed by Specialist',
      createdAt: new Date().toISOString()
    };

    const current = JSON.parse(localStorage.getItem('ts_trip_requests') || '[]');
    localStorage.setItem('ts_trip_requests', JSON.stringify([reservation, ...current]));
    
    setBooking(null);
    setToast(`Trip reservation request submitted for ${booking.title}! Confirmation sent to ${bookingForm.email}.`);
    setTimeout(() => setToast(''), 6000);
  };

  return (
    <main className="package-marketplace">
      <section className="package-heading">
        <div>
          <span className="market-eyebrow">EXPLORE HANDCRAFTED ITINERARIES</span>
          <h1>Trips worth<br /><em>remembering.</em></h1>
          <p>Thoughtful itineraries, trusted local experts, and all the details taken care of.</p>
        </div>
        <div className="package-trust">
          <ShieldCheck size={20} />
          <span>
            <strong>100% Protected Booking</strong>
            <small>Free date changes & 24/7 support</small>
          </span>
        </div>
      </section>

      <section className="package-toolbar">
        <div className="package-search">
          <Search size={18} />
          <input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search by country, city, or experience..."
          />
        </div>

        <div className="category-scroll">
          {CATEGORIES.map(item => (
            <button 
              className={category === item ? 'active' : ''} 
              key={item} 
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="package-sort">
          <span>{results.length} curated trips</span>
          <label>
            Sort by 
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price">Price: low to high</option>
              <option value="rating">Highest rated</option>
            </select>
            <ChevronDown size={15} />
          </label>
        </div>
      </section>

      {toast && (
        <div className="package-toast">
          <Check size={18} />
          <span>{toast}</span>
        </div>
      )}

      <section className="package-grid">
        {results.map(pkg => (
          <article className="package-product-card" key={pkg.id}>
            <div className="package-image-wrap">
              <SmartImage 
                src={pkg.image} 
                alt={pkg.title} 
                sizes="(max-width: 620px) 92vw, (max-width: 900px) 48vw, 31vw" 
              />
              <span className="package-tag">{pkg.tag}</span>
              <button 
                className={`package-wish ${wishlist.includes(pkg.id) ? 'saved' : ''}`} 
                onClick={() => toggleWish(pkg.id)}
                aria-label="Add to wishlist"
              >
                <Heart size={18} fill={wishlist.includes(pkg.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="package-card-body">
              <div className="package-location">
                <MapPin size={14} />
                <span>{pkg.location}</span>
                <span>·</span>
                <Clock3 size={14} />
                <span>{pkg.days} days / {pkg.nights} nights</span>
              </div>

              <h2>{pkg.title}</h2>

              <div className="package-rating">
                <Star size={14} fill="currentColor" />
                <strong>{pkg.rating}</strong>
                <span>({pkg.reviews.toLocaleString()} reviews)</span>
              </div>

              <ul>
                {pkg.inclusions.map(item => (
                  <li key={item}><Check size={14} />{item}</li>
                ))}
              </ul>

              <div className="package-card-footer">
                <div>
                  <small>From</small>
                  <strong>${pkg.price.toLocaleString()}</strong>
                  <del>${pkg.oldPrice.toLocaleString()}</del>
                  <small>/ person</small>
                </div>
                <button className="package-book" onClick={() => handleOpenBooking(pkg)}>
                  Book Trip <ArrowRight size={16} />
                </button>
              </div>

              <label className="compare-check">
                <input 
                  type="checkbox" 
                  checked={compare.includes(pkg.id)} 
                  onChange={() => toggleCompare(pkg.id)}
                /> 
                Compare trip
              </label>
            </div>
          </article>
        ))}
      </section>

      {results.length === 0 && (
        <div className="package-empty">
          <Search size={32} />
          <h2>No trips found</h2>
          <p>Try searching for a country, city, or travel style.</p>
          <button onClick={() => { setQuery(''); setCategory('All packages'); }}>Clear filters</button>
        </div>
      )}

      {/* Comparison Drawer */}
      {compare.length > 0 && (
        <div className="compare-bar">
          <div>
            <strong>{compare.length} trips selected</strong>
            <span>Compare dates, inclusions, and pricing side by side.</span>
          </div>
          <button onClick={() => setCompare([])}>Clear</button>
          <button className="package-book" onClick={() => setCompareOpen(true)}>
            Compare now <ArrowRight size={16} />
          </button>
        </div>
      )}

      {compareOpen && (
        <div className="compare-backdrop" onClick={() => setCompareOpen(false)}>
          <section className="compare-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setCompareOpen(false)}><X size={18} /></button>
            <span className="market-eyebrow">SIDE-BY-SIDE TRIP COMPARISON</span>
            <h2>Choose the journey<br /><em>that fits you best.</em></h2>
            
            <div className="compare-table">
              {compare.map(id => PACKAGES.find(item => item.id === id)).filter(Boolean).map(pkg => (
                <article key={pkg.id}>
                  <SmartImage src={pkg.image} alt={pkg.title} sizes="(max-width: 620px) 85vw, 240px" />
                  <strong>{pkg.title}</strong>
                  <span>{pkg.location}</span>
                  <b>${pkg.price.toLocaleString()} <small>/ person</small></b>
                  <div><Check size={14} /> {pkg.days} days / {pkg.nights} nights</div>
                  <div><Star size={14} /> {pkg.rating} ({pkg.reviews} reviews)</div>
                  <button onClick={() => { handleOpenBooking(pkg); setCompareOpen(false); }}>
                    Book this trip <ArrowRight size={15} />
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* BOOKING MODAL WITH VALIDATION */}
      {booking && (
        <div className="booking-backdrop" onClick={() => setBooking(null)}>
          <form className="booking-modal" onClick={e => e.stopPropagation()} onSubmit={submitBooking} noValidate>
            <button type="button" className="modal-close" onClick={() => setBooking(null)}><X size={18} /></button>
            <span className="market-eyebrow">RESERVE YOUR JOURNEY</span>
            <h2>{booking.title}</h2>
            <p><MapPin size={14} /> {booking.location} · {booking.days} days / {booking.nights} nights</p>

            <label>
              Full Name *
              <input 
                type="text"
                placeholder="e.g. Alex Johnson"
                value={bookingForm.name}
                onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                style={{ borderColor: formErrors.name ? '#ef4444' : '' }}
              />
              {formErrors.name && (
                <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {formErrors.name}
                </small>
              )}
            </label>

            <label>
              Email Address *
              <input 
                type="email"
                placeholder="alex@example.com"
                value={bookingForm.email}
                onChange={e => setBookingForm({...bookingForm, email: e.target.value})}
                style={{ borderColor: formErrors.email ? '#ef4444' : '' }}
              />
              {formErrors.email && (
                <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {formErrors.email}
                </small>
              )}
            </label>

            <label>
              Phone / WhatsApp Number *
              <input 
                type="tel"
                placeholder="+1 (555) 234-5678"
                value={bookingForm.phone}
                onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                style={{ borderColor: formErrors.phone ? '#ef4444' : '' }}
              />
              {formErrors.phone && (
                <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {formErrors.phone}
                </small>
              )}
            </label>

            <label>
              Preferred Departure Date *
              <input 
                type="date" 
                value={bookingForm.date}
                onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                style={{ borderColor: formErrors.date ? '#ef4444' : '' }}
              />
              {formErrors.date && (
                <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {formErrors.date}
                </small>
              )}
            </label>

            <label>
              Number of Travellers
              <select 
                value={bookingForm.guests} 
                onChange={e => setBookingForm({...bookingForm, guests: e.target.value})}
              >
                <option value="1">1 traveller ($ {booking.price.toLocaleString()})</option>
                <option value="2">2 travellers ($ {(booking.price * 2).toLocaleString()})</option>
                <option value="3">3 travellers ($ {(booking.price * 3).toLocaleString()})</option>
                <option value="4">4 travellers ($ {(booking.price * 4).toLocaleString()})</option>
              </select>
            </label>

            <div className="booking-total">
              <span>Total Estimated Cost</span>
              <strong>${(booking.price * parseInt(bookingForm.guests || '1')).toLocaleString()}</strong>
            </div>

            <button className="primary-book" type="submit">
              <Send size={16} />
              <span>Confirm Trip Reservation</span>
            </button>
            <small className="booking-note">
              <ShieldCheck size={14} /> No upfront charge. Your specialist confirms all bookings first.
            </small>
          </form>
        </div>
      )}
    </main>
  );
}
