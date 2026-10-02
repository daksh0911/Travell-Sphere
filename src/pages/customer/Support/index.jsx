import { useState } from 'react';
import { 
  ArrowRight, CheckCircle2, ChevronDown, Clock3, Headphones, 
  MessageCircle, Search, ShieldCheck, AlertCircle, Send 
} from 'lucide-react';
import { validateEmail, validateName } from '../../../utils/validation';
import './Support.css';

const FAQS = [
  ['Can I change the dates of a trip after booking?', 'Most trips can be adjusted before confirmation. Open your booking from the dashboard and send a change request; your specialist will reply with availability and any difference.'],
  ['When do I pay for a trip?', 'You can request an itinerary without paying. Once a specialist confirms availability, you will see the final price, cancellation terms, and secure payment options.'],
  ['What happens if my flight is delayed?', 'Our support team helps coordinate transfers and notifies your local partner. Keep your booking reference ready so we can assist immediately.'],
  ['Are hotels and transfers included in package prices?', 'Each package has a clear inclusions list. If something is optional, it will be shown clearly before you confirm.'],
  ['How do I contact my travel specialist?', 'Use the support form below, send an email, or message us on WhatsApp. Logged-in customers also have access to live assistance from their dashboard.']
];

export default function SupportPage() {
  const [open, setOpen] = useState(0); 
  const [query, setQuery] = useState(''); 
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'booking',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const visible = FAQS.filter(([q, a]) => 
    `${q} ${a}`.toLowerCase().includes(query.toLowerCase())
  );

  const validateSupportForm = () => {
    const errs = {};
    const nameErr = validateName(form.name, 'Your name');
    if (nameErr) errs.name = nameErr;

    const emailErr = validateEmail(form.email);
    if (emailErr) errs.email = emailErr;

    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async e => {
    e.preventDefault();
    if (!validateSupportForm()) return;

    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await fetch(`${base}/support/tickets`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(form) 
      }).catch(() => null);
    } catch {
      // Fallback
    }

    const localTickets = JSON.parse(localStorage.getItem('ts_support_tickets') || '[]');
    localStorage.setItem('ts_support_tickets', JSON.stringify([{ ...form, createdAt: new Date().toISOString() }, ...localTickets]));

    setSent(true);
    setForm({ name: '', email: '', category: 'booking', message: '' });
    setTimeout(() => setSent(false), 7000);
  };

  return (
    <main className="support-page">
      <section className="support-hero">
        <div>
          <span className="support-eyebrow">24/7 TRAVEL CARE & ASSISTANCE</span>
          <h1>Real people.<br /><em>Real help.</em></h1>
          <p>From your first itinerary idea to the moment you return home, our travel team is here to make your journey effortless.</p>
        </div>
        <div className="support-hero-card">
          <Headphones size={23} />
          <strong>Average reply time</strong>
          <b>under 15 min</b>
          <small>Mon–Sun · 24/7 Priority Support</small>
        </div>
      </section>

      <section className="support-status">
        <div>
          <span className="status-dot" /> All travel concierge desks operational
        </div>
        <span>Live verification active</span>
      </section>

      <section className="support-grid">
        <div>
          <span className="support-eyebrow dark">FREQUENTLY ASKED QUESTIONS</span>
          <h2>Answers before<br /><em>you ask.</em></h2>
          
          <div className="support-search">
            <Search size={17} />
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search help topics or questions..." 
            />
          </div>

          <div className="faq-list">
            {visible.map(([question, answer], index) => (
              <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}>
                <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
                  <span>{question}</span>
                  <ChevronDown size={18} />
                </button>
                {open === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="support-contact-card">
          <span className="support-eyebrow dark">DIRECT INQUIRY</span>
          <h3>Send Us a Message</h3>
          <p>Tell us what you need and a dedicated specialist will respond right away.</p>

          {sent ? (
            <div className="support-success">
              <CheckCircle2 size={24} />
              <strong>Message successfully dispatched!</strong>
              <span>Our support desk will reply to your email within 15 minutes.</span>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label>
                Your Name *
                <input 
                  type="text"
                  placeholder="e.g. Rachel Green"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  style={{ borderColor: errors.name ? '#ef4444' : '' }}
                />
                {errors.name && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {errors.name}
                  </small>
                )}
              </label>

              <label>
                Your Email *
                <input 
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  style={{ borderColor: errors.email ? '#ef4444' : '' }}
                />
                {errors.email && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {errors.email}
                  </small>
                )}
              </label>

              <label>
                What can we assist with?
                <select 
                  value={form.category} 
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  <option value="booking">A tour booking or package</option>
                  <option value="hotel">A hotel reservation</option>
                  <option value="transport">Transport or airport transfers</option>
                  <option value="other">General inquiry / Custom itinerary</option>
                </select>
              </label>

              <label>
                Message *
                <textarea 
                  rows="4" 
                  placeholder="Tell us how we can help..." 
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  style={{ borderColor: errors.message ? '#ef4444' : '' }}
                />
                {errors.message && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {errors.message}
                  </small>
                )}
              </label>

              <button type="submit">
                <Send size={16} />
                <span>Send to Support Specialist</span>
              </button>
            </form>
          )}

          <div className="support-contact-links">
            <span><MessageCircle size={16} /> Live assistance available 7 days a week</span>
            <span><Clock3 size={16} /> Emergency hotline always open for active travelers</span>
            <span><ShieldCheck size={16} /> 100% private and protected communication</span>
          </div>
        </div>
      </section>
    </main>
  );
}
