import { useMemo, useState } from 'react';
import { 
  ArrowRight, Check, ChevronDown, Gauge, MapPin, Search, ShieldCheck, 
  Users, X, AlertCircle, Send, Calendar, Phone, Mail, User
} from 'lucide-react';
import './Vehicles.css';
import SmartImage from '../../../components/common/SmartImage';
import { validateEmail, validateName, validatePhone, validateDateRange } from '../../../utils/validation';

const VEHICLES = [
  {
    id: 1,
    name: 'Mercedes-Benz E-Class Sedan',
    type: 'Executive Sedan',
    price: 120,
    seats: 3,
    luggage: 2,
    gear: 'Automatic',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1920&q=92',
    city: 'Dubai & UAE',
    tag: 'Executive Choice'
  },
  {
    id: 2,
    name: 'Range Rover Velar 4x4',
    type: 'Luxury SUV',
    price: 185,
    seats: 5,
    luggage: 4,
    gear: 'Automatic',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=92',
    city: 'Paris & Côte d’Azur',
    tag: 'Premium SUV'
  },
  {
    id: 3,
    name: 'Toyota Hiace Luxury Passenger Van',
    type: 'Private Van',
    price: 145,
    seats: 8,
    luggage: 6,
    gear: 'Automatic',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=92',
    city: 'Kyoto & Tokyo',
    tag: 'Families & Groups'
  },
  {
    id: 4,
    name: 'BMW R 1250 GS Adventure Touring',
    type: 'Adventure Motorcycle',
    price: 92,
    seats: 2,
    luggage: 2,
    gear: 'Manual',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1920&q=92',
    city: 'Bali & Southeast Asia',
    tag: 'Scenic Roads'
  }
];

export default function VehiclesPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All vehicles');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');

  // Form state & validation
  const [vehicleForm, setVehicleForm] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '2026-10-18',
    returnDate: '2026-10-22',
    serviceType: 'Private Chauffeur',
    pickupLocation: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const vehicles = useMemo(() => {
    return VEHICLES.filter(v => 
      (type === 'All vehicles' || v.type.toLowerCase() === type.toLowerCase()) &&
      `${v.name} ${v.city}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, type]);

  const handleOpenVehicleModal = (v) => {
    setSelected(v);
    setVehicleForm({
      name: '',
      email: '',
      phone: '',
      pickupDate: '2026-10-18',
      returnDate: '2026-10-22',
      serviceType: 'Private Chauffeur',
      pickupLocation: ''
    });
    setFormErrors({});
  };

  const validateVehicleForm = () => {
    const errors = {};
    const nameErr = validateName(vehicleForm.name, 'Full name');
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(vehicleForm.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(vehicleForm.phone);
    if (phoneErr) errors.phone = phoneErr;

    const dateRangeErr = validateDateRange(vehicleForm.pickupDate, vehicleForm.returnDate);
    if (dateRangeErr) errors.dates = dateRangeErr;

    if (!vehicleForm.pickupLocation.trim()) {
      errors.pickupLocation = 'Pickup address or airport is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitVehicleBooking = (e) => {
    e.preventDefault();
    if (!validateVehicleForm()) return;

    const pDate = new Date(vehicleForm.pickupDate);
    const rDate = new Date(vehicleForm.returnDate);
    const days = Math.max(1, Math.ceil((rDate - pDate) / (1000 * 60 * 60 * 24)));
    const totalCost = selected.price * days;

    const newRequest = {
      id: `CAR-${Date.now()}`,
      vehicle: selected.name,
      travelerName: vehicleForm.name,
      email: vehicleForm.email,
      phone: vehicleForm.phone,
      pickupDate: vehicleForm.pickupDate,
      returnDate: vehicleForm.returnDate,
      serviceType: vehicleForm.serviceType,
      pickupLocation: vehicleForm.pickupLocation,
      days,
      totalCost,
      status: 'Confirmed Driver Assigned',
      createdAt: new Date().toISOString()
    };

    const current = JSON.parse(localStorage.getItem('ts_vehicle_requests') || '[]');
    localStorage.setItem('ts_vehicle_requests', JSON.stringify([newRequest, ...current]));

    setSelected(null);
    setToast(`Vehicle reservation request received for ${selected.name}! Confirmation sent to ${vehicleForm.email}.`);
    setTimeout(() => setToast(''), 6000);
  };

  return (
    <main className="vehicle-market">
      <section className="vehicle-hero">
        <div>
          <span className="vehicle-eyebrow">RELIABLE TRANSIT & CAR RENTALS</span>
          <h1>Travel smoothly<br /><em>on your terms.</em></h1>
          <p>Airport pickups, private chauffeur hire, and self-drive vehicles tailored to your journey.</p>
        </div>
        <div className="vehicle-route-card">
          <span>POPULAR ROUTE</span>
          <strong>Kyoto → Arashiyama</strong>
          <small>Private luxury van · from $145 / day</small>
        </div>
      </section>

      <section className="vehicle-toolbar">
        <div className="vehicle-search">
          <Search size={18} />
          <input 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search vehicle model, city, or destination..."
          />
        </div>

        <label>
          Vehicle type: 
          <select value={type} onChange={e => setType(e.target.value)}>
            <option>All vehicles</option>
            <option>Executive Sedan</option>
            <option>Luxury SUV</option>
            <option>Private Van</option>
            <option>Adventure Motorcycle</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </section>

      {toast && (
        <div className="vehicle-toast">
          <Check size={18} />
          <span>{toast}</span>
        </div>
      )}

      <section className="vehicle-results">
        <div className="vehicle-results-head">
          <div>
            <span className="vehicle-eyebrow dark">THE FLEET</span>
            <h2>Get there comfortably,<br /><em>every mile.</em></h2>
          </div>
          <span>{vehicles.length} vehicles available</span>
        </div>

        <div className="vehicle-grid">
          {vehicles.map(v => (
            <article className="vehicle-card" key={v.id}>
              <div className="vehicle-image">
                <SmartImage 
                  src={v.image} 
                  alt={v.name} 
                  sizes="(max-width: 620px) 92vw, (max-width: 900px) 48vw, 31vw" 
                />
                <span>{v.tag}</span>
              </div>

              <div className="vehicle-body">
                <div className="vehicle-city">
                  <MapPin size={14} /> {v.city}
                </div>

                <h3>{v.name}</h3>
                <p>{v.type}</p>

                <div className="vehicle-specs">
                  <span><Users size={15} /> {v.seats} seats</span>
                  <span><Gauge size={15} /> {v.gear}</span>
                  <span>▣ {v.luggage} bags</span>
                </div>

                <div className="vehicle-footer">
                  <div>
                    <small>From</small>
                    <strong>${v.price}</strong>
                    <small>/ day</small>
                  </div>
                  <button onClick={() => handleOpenVehicleModal(v)}>
                    Book Vehicle <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VEHICLE BOOKING MODAL WITH VALIDATION */}
      {selected && (
        <div className="vehicle-backdrop" onClick={() => setSelected(null)}>
          <form className="vehicle-modal" onClick={e => e.stopPropagation()} onSubmit={submitVehicleBooking} noValidate>
            <button type="button" className="vehicle-close" onClick={() => setSelected(null)}><X size={18} /></button>
            <SmartImage src={selected.image} alt={selected.name} sizes="(max-width: 620px) 100vw, 560px" />
            
            <div className="vehicle-modal-body">
              <span className="vehicle-eyebrow dark">{selected.type}</span>
              <h2>{selected.name}</h2>
              <p>{selected.city} · ${selected.price} / day</p>

              <label>
                Full Name *
                <input 
                  type="text"
                  placeholder="e.g. Jessica Taylor"
                  value={vehicleForm.name}
                  onChange={e => setVehicleForm({...vehicleForm, name: e.target.value})}
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
                  placeholder="jessica@example.com"
                  value={vehicleForm.email}
                  onChange={e => setVehicleForm({...vehicleForm, email: e.target.value})}
                  style={{ borderColor: formErrors.email ? '#ef4444' : '' }}
                />
                {formErrors.email && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {formErrors.email}
                  </small>
                )}
              </label>

              <label>
                Phone / WhatsApp *
                <input 
                  type="tel"
                  placeholder="+1 (555) 789-0123"
                  value={vehicleForm.phone}
                  onChange={e => setVehicleForm({...vehicleForm, phone: e.target.value})}
                  style={{ borderColor: formErrors.phone ? '#ef4444' : '' }}
                />
                {formErrors.phone && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {formErrors.phone}
                  </small>
                )}
              </label>

              <label>
                Pickup Location / Airport *
                <input 
                  type="text"
                  placeholder="e.g. Kyoto Station or Hotel Lobby"
                  value={vehicleForm.pickupLocation}
                  onChange={e => setVehicleForm({...vehicleForm, pickupLocation: e.target.value})}
                  style={{ borderColor: formErrors.pickupLocation ? '#ef4444' : '' }}
                />
                {formErrors.pickupLocation && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {formErrors.pickupLocation}
                  </small>
                )}
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
                <label style={{ marginTop: 0 }}>
                  Pickup Date *
                  <input 
                    type="date"
                    value={vehicleForm.pickupDate}
                    onChange={e => setVehicleForm({...vehicleForm, pickupDate: e.target.value})}
                  />
                </label>

                <label style={{ marginTop: 0 }}>
                  Return Date *
                  <input 
                    type="date"
                    value={vehicleForm.returnDate}
                    onChange={e => setVehicleForm({...vehicleForm, returnDate: e.target.value})}
                  />
                </label>
              </div>
              {formErrors.dates && (
                <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {formErrors.dates}
                </small>
              )}

              <label>
                Service Type
                <select 
                  value={vehicleForm.serviceType} 
                  onChange={e => setVehicleForm({...vehicleForm, serviceType: e.target.value})}
                >
                  <option value="Private Chauffeur">Dedicated Private Chauffeur</option>
                  <option value="Airport Transfer">Point-to-Point Airport Transfer</option>
                  <option value="Self Drive">Self-Drive Rental</option>
                </select>
              </label>

              <button className="vehicle-submit" type="submit">
                <Send size={16} />
                <span>Request Vehicle Availability</span>
              </button>
              <small className="vehicle-note">
                <ShieldCheck size={14} /> Punctuality guaranteed · Licensed professional drivers
              </small>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
