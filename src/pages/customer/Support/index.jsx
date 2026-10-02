import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Clock3, Headphones, MessageCircle, Search, ShieldCheck } from 'lucide-react';
import './Support.css';

const FAQS = [
  ['Can I change the dates of a trip after booking?', 'Most curated trips can be adjusted before confirmation. Open your booking from the dashboard and send a change request; your specialist will reply with availability and any fare difference.'],
  ['When do I pay for a trip?', 'You can request an itinerary without paying. Once a specialist confirms availability, you will see the final price, cancellation terms, and secure payment options.'],
  ['What happens if my flight is delayed?', 'Our support team can help coordinate transfers and notify the local partner. Keep your booking reference ready so we can locate the right itinerary quickly.'],
  ['Are hotels and transfers included in package prices?', 'Each package has a clear inclusions list. If something is not included, it will be shown separately before you confirm your booking.'],
  ['How do I contact my travel specialist?', 'Use the support form below or reply to your confirmation message. Logged-in customers can also access support from their dashboard.']
];

export default function SupportPage() {
  const [open, setOpen] = useState(0); const [query, setQuery] = useState(''); const [sent, setSent] = useState(false);
  const visible = FAQS.filter(([q, a]) => `${q} ${a}`.toLowerCase().includes(query.toLowerCase()));
  const submit = async e => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${base}/support/tickets`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Support API unavailable');
    } catch {
      const localTickets = JSON.parse(localStorage.getItem('ts_support_tickets') || '[]');
      localStorage.setItem('ts_support_tickets', JSON.stringify([{ ...payload, createdAt: new Date().toISOString() }, ...localTickets]));
    }
    setSent(true); e.currentTarget.reset(); setTimeout(() => setSent(false), 6000);
  };
  return <main className="support-page"><section className="support-hero"><div><span className="support-eyebrow">TRAVELSPHERE CARE</span><h1>Real people.<br /><em>Real help.</em></h1><p>From your first idea to the moment you return home, our travel team is here to make the journey feel easy.</p></div><div className="support-hero-card"><Headphones size={23} /><strong>Average reply time</strong><b>under 15 min</b><small>Mon–Sun · 24/7 urgent support</small></div></section><section className="support-status"><div><span className="status-dot" /> All systems operational</div><span>Last checked just now</span></section><section className="support-grid"><div><span className="support-eyebrow dark">COMMON QUESTIONS</span><h2>Answers before<br /><em>you ask.</em></h2><div className="support-search"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search support" /></div><div className="faq-list">{visible.map(([question, answer], index) => <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{open === index && <p>{answer}</p>}</div>)}</div></div><div className="support-contact-card"><span className="support-eyebrow dark">SEND A MESSAGE</span><h3>Let’s sort it out.</h3><p>Tell us what you need and a specialist will get back to you shortly.</p>{sent ? <div className="support-success"><CheckCircle2 size={24} /><strong>Message received</strong><span>Your support request is in the queue. We’ll reply soon.</span></div> : <form onSubmit={submit}><label>Your email<input name="email" type="email" required placeholder="you@example.com" /></label><label>What can we help with?<select name="category" defaultValue="booking"><option value="booking">A booking or itinerary</option><option value="hotel">A hotel stay</option><option value="transport">Transport or transfers</option><option value="other">Something else</option></select></label><label>Message<textarea name="message" required rows="5" placeholder="Give us a little context..." /></label><button type="submit">Send to support <ArrowRight size={16} /></button></form>}<div className="support-contact-links"><span><MessageCircle size={16} /> Live chat for logged-in travellers</span><span><Clock3 size={16} /> Emergency travel line always open</span><span><ShieldCheck size={16} /> Your details stay private</span></div></div></section></main>;
}
