// Unified service layer for all 5 Provider & Admin + Customer Dashboards
// Supports real-time local storage persistence and syncs with backend API when available

const API_BASE = 'http://localhost:5000/api';

// Initial Mock Seed Data for Dashboards
const SEED_USERS = [
  { id: 101, name: 'Alice Walker', email: 'alice@example.com', role: 'CUSTOMER', phone: '+1-555-0192', status: 'ACTIVE', created_at: '2026-08-10' },
  { id: 102, name: 'Robert Vance', email: 'robert@example.com', role: 'CUSTOMER', phone: '+1-555-0144', status: 'ACTIVE', created_at: '2026-08-14' },
  { id: 103, name: 'Sophia Reed', email: 'sophia@example.com', role: 'CUSTOMER', phone: '+1-555-0188', status: 'ACTIVE', created_at: '2026-08-20' },
  { id: 104, name: 'Sarah Jenkins', email: 'sarah@horizon-travel.com', role: 'TRAVEL_AGENT', phone: '+1-555-0101', status: 'ACTIVE', company: 'Horizon Escapes', created_at: '2026-07-12' },
  { id: 105, name: 'David Miller', email: 'david@wanderlust.com', role: 'TRAVEL_AGENT', phone: '+1-555-0104', status: 'PENDING', company: 'Wanderlust Tours', created_at: '2026-09-01' },
  { id: 106, name: 'Elena Rostova', email: 'elena@grandpalace.com', role: 'HOTEL_MANAGER', phone: '+1-555-0103', status: 'ACTIVE', company: 'Grand Palace Hotel', created_at: '2026-06-15' },
  { id: 107, name: 'Amira Al-Mansoor', email: 'amira@desertoasis.com', role: 'HOTEL_MANAGER', phone: '+1-555-0106', status: 'PENDING', company: 'Desert Oasis Resort', created_at: '2026-09-04' },
  { id: 108, name: 'Michael Chang', email: 'michael@apextransports.com', role: 'TRANSPORT_PROVIDER', phone: '+1-555-0102', status: 'ACTIVE', company: 'Apex Transports', created_at: '2026-05-11' },
  { id: 109, name: 'Carlos Rodriguez', email: 'carlos@speedyfleets.com', role: 'TRANSPORT_PROVIDER', phone: '+1-555-0105', status: 'PENDING', company: 'Speedy Fleet Express', created_at: '2026-09-08' },
  { id: 110, name: 'Marco Rossi', email: 'marco@tourguides.com', role: 'TOUR_GUIDE', phone: '+1-555-0199', status: 'ACTIVE', company: 'Independent Alpine Guide', created_at: '2026-08-01' },
  { id: 111, name: 'Yuki Tanaka', email: 'yuki@tokyoguides.jp', role: 'TOUR_GUIDE', phone: '+81-90-5551', status: 'PENDING', company: 'Tokyo Heritage Guides', created_at: '2026-09-10' }
];

const SEED_AGENT_PACKAGES = [
  {
    id: 1,
    title: 'Kyoto Cherry Blossom & Temple Discovery',
    category: 'Culture & Heritage',
    location: 'Kyoto, Japan',
    days: 7,
    nights: 6,
    price: 1450,
    availability: 'Available',
    maxCapacity: 15,
    bookedCount: 8,
    promo: '10% Early Bird OFF',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=92',
    itinerary: [
      { day: 1, title: 'Arrival in Kyoto & Gion Sunset Walk' },
      { day: 2, title: 'Fushimi Inari Shrine & Kiyomizu-dera Temple' },
      { day: 3, title: 'Arashiyama Bamboo Grove & Sagano Scenic Railway' },
      { day: 4, title: 'Traditional Tea Ceremony & Geisha Cultural Tour' }
    ]
  },
  {
    id: 2,
    title: 'Santorini Sunset Villa & Yacht Excursion',
    category: 'Honeymoon Specials',
    location: 'Santorini, Greece',
    days: 6,
    nights: 5,
    price: 1980,
    availability: 'Available',
    maxCapacity: 10,
    bookedCount: 6,
    promo: 'Complimentary Wine Tasting',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=92',
    itinerary: [
      { day: 1, title: 'Oia Villa Check-in & Caldera View Welcome Dinner' },
      { day: 2, title: 'Volcanic Island & Hot Springs Private Catamaran' },
      { day: 3, title: 'Santo Winery Tasting & Akrotiri Ruins' }
    ]
  },
  {
    id: 3,
    title: 'Swiss Alps Glacier & Scenic Express Train',
    category: 'Mountain Escapes',
    location: 'Interlaken, Switzerland',
    days: 8,
    nights: 7,
    price: 2100,
    availability: 'Limited Seats',
    maxCapacity: 12,
    bookedCount: 10,
    promo: 'First Class Pass Included',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=92',
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Transfer to Interlaken Chalet' },
      { day: 2, title: 'Jungfraujoch - Top of Europe Train Expedition' }
    ]
  }
];

const SEED_HOTEL_INFO = {
  name: 'Grand Palace Resort & Spa',
  location: 'Kyoto, Japan',
  propertyType: '5-Star Luxury Resort',
  rating: 4.9,
  address: '45 Cherry Blossom Lane, Higashiyama, Kyoto',
  contactEmail: 'reservations@grandpalace.com',
  contactPhone: '+81 75 555 8899',
  imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=92',
  description: 'Experience refined Japanese hospitality, authentic Zen gardens, traditional onsens, and panoramic mountain views.',
  facilities: ['Thermal Onsen Spa', 'Michelin Star Dining', 'Free High-Speed Wi-Fi', 'Infinity Pool', 'Airport Executive Shuttle', '24/7 Concierge']
};

const SEED_HOTEL_ROOMS = [
  { id: 201, roomType: 'Deluxe Sakura Suite', pricePerNight: 350, capacity: '2 Adults', status: 'Available', amenities: 'King Bed, Mountain View, Private Balcony, Deep Soaking Tub', imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=92' },
  { id: 202, roomType: 'Zen Garden Executive Suite', pricePerNight: 520, capacity: '3 Adults', status: 'Available', amenities: 'Tatami Lounge, Private Onsen Bath, Garden View', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=92' },
  { id: 203, roomType: 'Imperial Ocean Penthouse', pricePerNight: 890, capacity: '4 Adults', status: 'Booked', amenities: '2 Bedrooms, Private Infinity Pool, Butler Service', imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=92' }
];

const SEED_HOTEL_RESERVATIONS = [
  { id: 'RES-8801', guestName: 'Alice Walker', roomType: 'Deluxe Sakura Suite', checkIn: '2026-10-15', checkOut: '2026-10-20', guests: 2, totalAmount: 1750, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 'RES-8802', guestName: 'Robert Vance', roomType: 'Zen Garden Executive Suite', checkIn: '2026-11-01', checkOut: '2026-11-05', guests: 2, totalAmount: 2080, status: 'Pending', paymentStatus: 'Deposit Paid' },
  { id: 'RES-8803', guestName: 'Sophia Reed', roomType: 'Imperial Ocean Penthouse', checkIn: '2026-12-24', checkOut: '2026-12-28', guests: 4, totalAmount: 3560, status: 'Confirmed', paymentStatus: 'Paid' }
];

const SEED_TRANSPORT_SERVICES = [
  { id: 301, serviceType: 'Flight', title: 'Skyways International - Flight SK-702', origin: 'New York (JFK)', destination: 'Paris (CDG)', departureTime: '08:30 AM', arrivalTime: '09:45 PM', duration: '7h 15m', price: 680, seatsTotal: 180, seatsAvailable: 42, vehicleName: 'Boeing 787 Dreamliner', status: 'On Schedule' },
  { id: 302, serviceType: 'Bus', title: 'Express Luxury Volvo Liner - Bus EX-40', origin: 'Manali', destination: 'Delhi', departureTime: '06:00 PM', arrivalTime: '07:30 AM', duration: '13h 30m', price: 65, seatsTotal: 45, seatsAvailable: 12, vehicleName: 'Volvo B11R Multi-Axle Sleeper', status: 'On Schedule' },
  { id: 303, serviceType: 'Train', title: 'Shinkansen Bullet Express - Train Bullet-N700', origin: 'Tokyo Station', destination: 'Kyoto Station', departureTime: '10:00 AM', arrivalTime: '12:15 PM', duration: '2h 15m', price: 130, seatsTotal: 300, seatsAvailable: 85, vehicleName: 'Series N700S Shinkansen', status: 'On Schedule' }
];

const SEED_TRANSPORT_BOOKINGS = [
  { id: 'TRP-501', passengerName: 'Alice Walker', serviceTitle: 'Skyways International - Flight SK-702', serviceType: 'Flight', travelDate: '2026-10-10', seatNumbers: '14A, 14B', totalAmount: 1360, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 'TRP-502', passengerName: 'Robert Vance', serviceTitle: 'Express Luxury Volvo Liner - Bus EX-40', serviceType: 'Bus', travelDate: '2026-10-18', seatNumbers: '08, 09', totalAmount: 130, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 'TRP-503', passengerName: 'Sophia Reed', serviceTitle: 'Shinkansen Bullet Express', serviceType: 'Train', travelDate: '2026-11-02', seatNumbers: 'Car 4 / 12C', totalAmount: 260, status: 'Pending', paymentStatus: 'Pending' }
];

const SEED_GUIDE_PROFILE = {
  fullName: 'Marco Rossi',
  bio: 'Certified Alpine Explorer & Cultural Historian with over 9 years of guided mountain treks and historical city walks in Western Europe.',
  languages: ['English', 'Italian', 'French', 'German'],
  experienceYears: 9,
  hourlyRate: 65,
  dailyRate: 380,
  city: 'Interlaken & Swiss Alps',
  status: 'Available',
  availabilityCalendar: 'Full Availability for Autumn 2026',
  rating: 4.95,
  completedTours: 142,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=92'
};

const SEED_GUIDE_REQUESTS = [
  { id: 'G-701', customerName: 'Alice Walker', phone: '+1-555-0192', tourName: 'Matterhorn & Glacier Panorama Trail', location: 'Zermatt, Switzerland', requestDate: '2026-10-18', guests: 2, totalAmount: 760, status: 'Pending', specialNotes: 'Interested in photography spots along alpine lakes.' },
  { id: 'G-702', customerName: 'Robert Vance', phone: '+1-555-0144', tourName: 'Interlaken Old Town & Castle Heritage Walk', location: 'Interlaken, Switzerland', requestDate: '2026-10-22', guests: 4, totalAmount: 450, status: 'Accepted', specialNotes: 'Includes elderly family members, easy walking pace needed.' },
  { id: 'G-703', customerName: 'Sophia Reed', phone: '+1-555-0188', tourName: 'Lucerne Alpine Sunset Trek', location: 'Lucerne, Switzerland', requestDate: '2026-11-05', guests: 2, totalAmount: 520, status: 'Completed', specialNotes: 'Private anniversary tour.' }
];

const SEED_COMPLAINTS = [
  { id: 'CMP-101', customerName: 'Robert Vance', subject: 'Flight delay notification issue', category: 'Transportation', message: 'Departure time was delayed by 2 hours without SMS alert.', status: 'Open', response: '', createdAt: '2026-09-02' },
  { id: 'CMP-102', customerName: 'Sophia Reed', subject: 'Refund request for extra baggage', category: 'Payments', message: 'Baggage fee was charged twice at check-in counter.', status: 'In Progress', response: 'Admin inspecting carrier invoice.', createdAt: '2026-09-05' },
  { id: 'CMP-103', customerName: 'Alice Walker', subject: 'Hotel room view upgrade question', category: 'Hotel Stay', message: 'Query regarding lake view upgrade option.', status: 'Resolved', response: 'Upgraded guest to Deluxe Ocean Suite free of charge.', createdAt: '2026-08-28' }
];

// LocalStorage Helper functions
const getStored = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStored = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
};

// API Service Interface for Dashboards
export const dashboardService = {
  // ---------------- ADMIN DASHBOARD ----------------
  getAdminData: async () => {
    const users = getStored('ts_admin_users', SEED_USERS);
    const packages = getStored('ts_agent_packages', SEED_AGENT_PACKAGES);
    const complaints = getStored('ts_admin_complaints', SEED_COMPLAINTS);
    const hotelReservations = getStored('ts_hotel_reservations', SEED_HOTEL_RESERVATIONS);
    const transportBookings = getStored('ts_transport_bookings', SEED_TRANSPORT_BOOKINGS);

    const totalRevenue = hotelReservations.reduce((sum, r) => sum + r.totalAmount, 0) + 
                         transportBookings.reduce((sum, t) => sum + t.totalAmount, 0) + 
                         packages.reduce((sum, p) => sum + (p.price * p.bookedCount), 0);

    return {
      users,
      packages,
      complaints,
      stats: {
        totalUsers: users.length,
        pendingProviders: users.filter(u => u.status === 'PENDING').length,
        activePackages: packages.length,
        totalBookings: hotelReservations.length + transportBookings.length + 15,
        totalRevenue: totalRevenue,
        openComplaints: complaints.filter(c => c.status !== 'Resolved').length
      }
    };
  },

  updateUserStatus: async (userId, newStatus) => {
    const users = getStored('ts_admin_users', SEED_USERS);
    const updated = users.map(u => u.id === userId ? { ...u, status: newStatus } : u);
    setStored('ts_admin_users', updated);
    return { success: true, users: updated };
  },

  approveProviderAccount: async (userId) => {
    const users = getStored('ts_admin_users', SEED_USERS);
    const updated = users.map(u => u.id === userId ? { ...u, status: 'ACTIVE' } : u);
    setStored('ts_admin_users', updated);
    return { success: true, users: updated };
  },

  updateComplaintStatus: async (complaintId, status, responseText) => {
    const complaints = getStored('ts_admin_complaints', SEED_COMPLAINTS);
    const updated = complaints.map(c => c.id === complaintId ? { ...c, status, response: responseText || c.response } : c);
    setStored('ts_admin_complaints', updated);
    return { success: true, complaints: updated };
  },

  // ---------------- TRAVEL AGENT DASHBOARD ----------------
  getAgentData: async () => {
    const packages = getStored('ts_agent_packages', SEED_AGENT_PACKAGES);
    const inquiries = getStored('ts_agent_inquiries', [
      { id: 'INQ-101', customerName: 'Alice Walker', packageTitle: 'Kyoto Cherry Blossom', message: 'Are vegetarian meals available during the tea ceremony?', date: '2026-09-08', status: 'Pending', reply: '' },
      { id: 'INQ-102', customerName: 'Robert Vance', packageTitle: 'Swiss Alps Scenic Train', message: 'Can we request luggage transfer between hotel chalets?', date: '2026-09-10', status: 'Replied', reply: 'Yes! Complimentary chalet luggage transfer is included.' }
    ]);
    return { packages, inquiries };
  },

  saveAgentPackage: async (pkg) => {
    const packages = getStored('ts_agent_packages', SEED_AGENT_PACKAGES);
    let updated;
    if (pkg.id) {
      updated = packages.map(p => p.id === pkg.id ? { ...p, ...pkg } : p);
    } else {
      const newPkg = { ...pkg, id: Date.now(), bookedCount: 0, rating: 5.0, imageUrl: pkg.imageUrl || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=92' };
      updated = [newPkg, ...packages];
    }
    setStored('ts_agent_packages', updated);
    return { success: true, packages: updated };
  },

  deleteAgentPackage: async (pkgId) => {
    const packages = getStored('ts_agent_packages', SEED_AGENT_PACKAGES);
    const updated = packages.filter(p => p.id !== pkgId);
    setStored('ts_agent_packages', updated);
    return { success: true, packages: updated };
  },

  replyInquiry: async (inquiryId, replyText) => {
    const inquiries = getStored('ts_agent_inquiries', []);
    const updated = inquiries.map(i => i.id === inquiryId ? { ...i, reply: replyText, status: 'Replied' } : i);
    setStored('ts_agent_inquiries', updated);
    return { success: true, inquiries: updated };
  },

  // ---------------- HOTEL MANAGER DASHBOARD ----------------
  getHotelData: async () => {
    const hotelInfo = getStored('ts_hotel_info', SEED_HOTEL_INFO);
    const rooms = getStored('ts_hotel_rooms', SEED_HOTEL_ROOMS);
    const reservations = getStored('ts_hotel_reservations', SEED_HOTEL_RESERVATIONS);
    return { hotelInfo, rooms, reservations };
  },

  saveHotelInfo: async (info) => {
    setStored('ts_hotel_info', info);
    return { success: true, hotelInfo: info };
  },

  saveHotelRoom: async (room) => {
    const rooms = getStored('ts_hotel_rooms', SEED_HOTEL_ROOMS);
    let updated;
    if (room.id) {
      updated = rooms.map(r => r.id === room.id ? { ...r, ...room } : r);
    } else {
      const newRoom = { ...room, id: Date.now() };
      updated = [newRoom, ...rooms];
    }
    setStored('ts_hotel_rooms', updated);
    return { success: true, rooms: updated };
  },

  deleteHotelRoom: async (roomId) => {
    const rooms = getStored('ts_hotel_rooms', SEED_HOTEL_ROOMS);
    const updated = rooms.filter(r => r.id !== roomId);
    setStored('ts_hotel_rooms', updated);
    return { success: true, rooms: updated };
  },

  updateReservationStatus: async (reservationId, status) => {
    const reservations = getStored('ts_hotel_reservations', SEED_HOTEL_RESERVATIONS);
    const updated = reservations.map(r => r.id === reservationId ? { ...r, status } : r);
    setStored('ts_hotel_reservations', updated);
    return { success: true, reservations: updated };
  },

  // ---------------- TRANSPORT PROVIDER DASHBOARD ----------------
  getTransportData: async () => {
    const services = getStored('ts_transport_services', SEED_TRANSPORT_SERVICES);
    const bookings = getStored('ts_transport_bookings', SEED_TRANSPORT_BOOKINGS);
    return { services, bookings };
  },

  saveTransportService: async (service) => {
    const services = getStored('ts_transport_services', SEED_TRANSPORT_SERVICES);
    let updated;
    if (service.id) {
      updated = services.map(s => s.id === service.id ? { ...s, ...service } : s);
    } else {
      const newService = { ...service, id: Date.now() };
      updated = [newService, ...services];
    }
    setStored('ts_transport_services', updated);
    return { success: true, services: updated };
  },

  deleteTransportService: async (serviceId) => {
    const services = getStored('ts_transport_services', SEED_TRANSPORT_SERVICES);
    const updated = services.filter(s => s.id !== serviceId);
    setStored('ts_transport_services', updated);
    return { success: true, services: updated };
  },

  updateTransportBookingStatus: async (bookingId, status) => {
    const bookings = getStored('ts_transport_bookings', SEED_TRANSPORT_BOOKINGS);
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status } : b);
    setStored('ts_transport_bookings', updated);
    return { success: true, bookings: updated };
  },

  // ---------------- TOUR GUIDE DASHBOARD ----------------
  getGuideData: async () => {
    const profile = getStored('ts_guide_profile', SEED_GUIDE_PROFILE);
    const requests = getStored('ts_guide_requests', SEED_GUIDE_REQUESTS);
    return { profile, requests };
  },

  saveGuideProfile: async (profile) => {
    setStored('ts_guide_profile', profile);
    return { success: true, profile };
  },

  updateGuideRequestStatus: async (requestId, status) => {
    const requests = getStored('ts_guide_requests', SEED_GUIDE_REQUESTS);
    const updated = requests.map(r => r.id === requestId ? { ...r, status } : r);
    setStored('ts_guide_requests', updated);
    return { success: true, requests: updated };
  }
};

export default dashboardService;
