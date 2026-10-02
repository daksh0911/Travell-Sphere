import { useMemo, useState } from 'react';
import { 
  ArrowRight, BedDouble, Check, ChevronDown, Heart, MapPin, Search, 
  ShieldCheck, Star, X, AlertCircle, Send, Users, Calendar
} from 'lucide-react';
import './Hotels.css';
import SmartImage from '../../../components/common/SmartImage';
import { validateEmail, validateName, validatePhone, validateDateRange } from '../../../utils/validation';

const HOTELS = [
  {
    id: 1,
    name: 'Grand Palace Hotel & Onsen Spa',
    city: 'Kyoto, Japan',
    type: 'Luxury Heritage Hotel',
    rating: 4.92,
    reviews: 842,
    price: 245,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=92',
    amenities: ['Onsen spa', 'Michelin dining', 'Zen garden view', 'Tea lounge'],
    badge: 'Top Rated'
  },
  {
    id: 2,
    name: 'Azure Caldera Sea View Villa',
    city: 'Santorini, Greece',
    type: 'Boutique Cliffside Stay',
    rating: 4.88,
    reviews: 506,
    price: 310,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=92',
    amenities: ['Private plunge pool', 'Breakfast included', 'Sunset terrace', 'Airport shuttle'],
    badge: 'Best for Couples'
  },
  {
    id: 3,
    name: 'The Palm Oasis Resort & Suites',
    city: 'Dubai, UAE',
    type: '5★ Luxury Beachfront Resort',
    rating: 4.9,
    reviews: 1190,
    price: 380,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=92',
    amenities: ['Private beach', 'Infinity pool', 'Desert safari desk', '24/7 Butler'],
    badge: 'Bestseller'
  },
  {
    id: 4,
    name: 'Alpine House Chalet & Lodge',
    city: 'Interlaken, Switzerland',
    type: 'Mountain View Lodge',
    rating: 4.79,
    reviews: 384,
    price: 190,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1920&q=92',
    amenities: ['Lake views', 'Scenic rail desk', 'Chalet breakfast', 'Ski storage'],
    badge: 'Great Value'
  },
  {
    id: 5,
    name: 'Ubud Canopy Rainforest Sanctuary',
    city: 'Bali, Indonesia',
    type: 'Eco-Luxury Wellness Retreat',
    rating: 4.86,
    reviews: 728,
    price: 165,
    image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1920&q=92',
    amenities: ['Daily yoga', 'Jungle infinity pool', 'Holistic spa rituals', 'Organic dining'],
    badge: 'Wellness Pick'
  },
  {
    id: 6,
    name: 'Maison Lumière Boutique Hotel',
    city: 'Paris, France',
    type: 'Artisan Design Hotel',
    rating: 4.75,
    reviews: 962,
    price: 285,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=92',
    amenities: ['Central boulevard', '24/7 Concierge', 'Rooftop cocktail bar', 'French bakery'],
    badge: 'City Favourite'
  }
];

export default function HotelsPage() {
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [rating, setRating] = useState('Any rating');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('ts_saved_hotels') || '[]'));
  const [toast, setToast] = useState('');

  // Form state & validation
  const [hotelForm, setHotelForm] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '2026-10-18',
    checkOut: '2026-10-23',
    guests: '2',
    roomType: 'Deluxe King Room'
  });
  const [formErrors, setFormErrors] = useState({});

  const hotels = useMemo(() => {
    return HOTELS.filter(h => 
      `${h.name} ${h.city}`.toLowerCase().includes(query.toLowerCase()) &&
      h.price <= maxPrice &&
      (rating === 'Any rating' || h.rating >= Number(rating))
    );
  }, [query, maxPrice, rating]);

  const toggleSave = (id) => {
    const next = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
    setSaved(next);
    localStorage.setItem('ts_saved_hotels', JSON.stringify(next));
  };

  const handleOpenHotelModal = (hotel) => {
    setSelected(hotel);
    setHotelForm({
      name: '',
      email: '',
      phone: '',
      checkIn: '2026-10-18',
      checkOut: '2026-10-23',
      guests: '2',
      roomType: 'Deluxe King Room'
    });
    setFormErrors({});
  };

  const validateHotelForm = () => {
    const errors = {};
    const nameErr = validateName(hotelForm.name, 'Full name');
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(hotelForm.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(hotelForm.phone);
    if (phoneErr) errors.phone = phoneErr;

    const dateRangeErr = validateDateRange(hotelForm.checkIn, hotelForm.checkOut);
    if (dateRangeErr) errors.dates = dateRangeErr;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReserve = (e) => {
    e.preventDefault();
    if (!validateHotelForm()) return;

    const checkInDate = new Date(hotelForm.checkIn);
    const checkOutDate = new Date(hotelForm.checkOut);
    const nights = Math.max(1, Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
    const totalEstimate = selected.price * nights;

    const newBooking = {
      id: `HOT-${Date.now()}`,
      hotel: selected.name,
      city: selected.city,
      travelerName: hotelForm.name,
      email: hotelForm.email,
      phone: hotelForm.phone,
      checkIn: hotelForm.checkIn,
      checkOut: hotelForm.checkOut,
      nights,
      guests: hotelForm.guests,
      roomType: hotelForm.roomType,
      totalEstimate,
      status: 'Confirmed by Property',
      createdAt: new Date().toISOString()
    };

    const bookings = JSON.parse(localStorage.getItem('ts_hotel_requests') || '[]');
    localStorage.setItem('ts_hotel_requests', JSON.stringify([newBooking, ...bookings]));

    setSelected(null);
    setToast(`Reservation request confirmed for ${selected.name}! Details dispatched to ${hotelForm.email}.`);
    setTimeout(() => setToast(''), 6000);
  };

  return (
    <main className="hotel-market">
      <section className="hotel-hero">
        <div>
          <span className="hotel-eyebrow">HANDPICKED STAYS & RESORTS</span>
          <h1>Stay somewhere<br /><em>you’ll remember.</em></h1>
          <p>From peaceful ryokans and alpine chalets to coastal villas, find your perfect home away from home.</p>
        </div>
        <div className="hotel-hero-stat">
          <strong>4.9/5</strong>
          <span>average guest satisfaction<br />across our properties</span>
        </div>
      </section>

      <section className="hotel-search-panel">
        <div className="hotel-search-input">
          <Search size={18} />
          <input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search hotel name, destination, or feature..."
          />
        </div>

        <label>
          Max Price / night: 
          <input 
            type="range" 
            min="100" 
            max="600" 
            value={maxPrice} 
            onChange={e => setMaxPrice(Number(e.target.value))}
          />
          <strong>${maxPrice}</strong>
        </label>

        <label>
          Guest Rating: 
          <select value={rating} onChange={e => setRating(e.target.value)}>
            <option>Any rating</option>
            <option value="4.9">4.9+ Top Rated</option>
            <option value="4.8">4.8+ Exceptional</option>
            <option value="4.5">4.5+ Very Good</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </section>

      {toast && (
        <div className="hotel-toast">
          <Check size={18} />
          <span>{toast}</span>
        </div>
      )}

      <section className="hotel-results">
        <div className="hotel-results-head">
          <div>
            <span className="hotel-eyebrow dark">CURATED SELECTION</span>
            <h2>Places that feel <em>welcoming.</em></h2>
          </div>
          <span>{hotels.length} verified stays available</span>
        </div>

        <div className="hotel-grid">
          {hotels.map(hotel => (
            <article className="hotel-card" key={hotel.id}>
              <div className="hotel-card-image">
                <SmartImage 
                  src={hotel.image} 
                  alt={hotel.name} 
                  sizes="(max-width: 620px) 92vw, (max-width: 900px) 48vw, 31vw" 
                />
                <span>{hotel.badge}</span>
                <button 
                  className={saved.includes(hotel.id) ? 'saved' : ''} 
                  onClick={() => toggleSave(hotel.id)}
                  aria-label="Save hotel"
                >
                  <Heart size={17} fill={saved.includes(hotel.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="hotel-card-body">
                <div className="hotel-card-location">
                  <MapPin size={14} />
                  <span>{hotel.city}</span>
                </div>

                <h3>{hotel.name}</h3>
                <p className="hotel-type">{hotel.type}</p>

                <div className="hotel-rating">
                  <Star size={14} fill="currentColor" />
                  <strong>{hotel.rating}</strong>
                  <span>({hotel.reviews} guest reviews)</span>
                </div>

                <div className="hotel-amenities">
                  {hotel.amenities.map(a => (
                    <span key={a}>{a}</span>
                  ))}
                </div>

                <div className="hotel-card-footer">
                  <div>
                    <small>From</small>
                    <strong>${hotel.price}</strong>
                    <small>/ night</small>
                  </div>
                  <button onClick={() => handleOpenHotelModal(hotel)}>
                    Book Stay <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HOTEL RESERVATION MODAL WITH VALIDATION */}
      {selected && (
        <div className="hotel-backdrop" onClick={() => setSelected(null)}>
          <form className="hotel-booking" onClick={e => e.stopPropagation()} onSubmit={handleReserve} noValidate>
            <button type="button" className="hotel-modal-close" onClick={() => setSelected(null)}><X size={18} /></button>
            <SmartImage src={selected.image} alt={selected.name} sizes="(max-width: 620px) 100vw, 560px" />
            
            <div className="hotel-booking-body">
              <span className="hotel-eyebrow dark">{selected.type}</span>
              <h2>{selected.name}</h2>
              <p><MapPin size={14} /> {selected.city}</p>

              <label>
                Guest Full Name *
                <input 
                  type="text"
                  placeholder="e.g. David Miller"
                  value={hotelForm.name}
                  onChange={e => setHotelForm({...hotelForm, name: e.target.value})}
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
                  placeholder="david@example.com"
                  value={hotelForm.email}
                  onChange={e => setHotelForm({...hotelForm, email: e.target.value})}
                  style={{ borderColor: formErrors.email ? '#ef4444' : '' }}
                />
                {formErrors.email && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {formErrors.email}
                  </small>
                )}
              </label>

              <label>
                Phone Number *
                <input 
                  type="tel"
                  placeholder="+1 (555) 345-6789"
                  value={hotelForm.phone}
                  onChange={e => setHotelForm({...hotelForm, phone: e.target.value})}
                  style={{ borderColor: formErrors.phone ? '#ef4444' : '' }}
                />
                {formErrors.phone && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {formErrors.phone}
                  </small>
                )}
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
                <label style={{ marginTop: 0 }}>
                  Check-in Date *
                  <input 
                    type="date"
                    value={hotelForm.checkIn}
                    onChange={e => setHotelForm({...hotelForm, checkIn: e.target.value})}
                  />
                </label>

                <label style={{ marginTop: 0 }}>
                  Check-out Date *
                  <input 
                    type="date"
                    value={hotelForm.checkOut}
                    onChange={e => setHotelForm({...hotelForm, checkOut: e.target.value})}
                  />
                </label>
              </div>
              {formErrors.dates && (
                <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {formErrors.dates}
                </small>
              )}

              <label>
                Number of Guests
                <select 
                  value={hotelForm.guests} 
                  onChange={e => setHotelForm({...hotelForm, guests: e.target.value})}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </label>

              <div className="hotel-booking-note">
                <BedDouble size={18} />
                <span>
                  <strong>Complimentary Breakfast Included</strong>
                  <small>Free cancellation up to 48 hours before check-in.</small>
                </span>
              </div>

              <button className="hotel-reserve" type="submit">
                <Send size={16} />
                <span>Request Room Reservation</span>
              </button>
              <small className="hotel-secure">
                <ShieldCheck size={13} /> Direct confirmation · No instant charge required
              </small>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
