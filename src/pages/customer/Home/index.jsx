import { ArrowRight, Compass, Headphones, Heart, MapPin, Plane, ShieldCheck, Sparkles, Star, Users, WandSparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import SmartImage from '../../../components/common/SmartImage';
import './Home.css';

const FEATURED = [
  { title: 'Maldives', meta: 'Private water villas · 5 days', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=92', tone: 'sea' },
  { title: 'Kyoto', meta: 'Gardens, rituals, and slow mornings', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=92', tone: 'stone' },
  { title: 'Rajasthan', meta: 'Palaces, desert skies, and stories', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=92', tone: 'sand' }
];

const JOURNEY_STEPS = [
  ['01', 'Tell us the feeling', 'Beach calm, city energy, a little wonder—we start with what you want to feel.'],
  ['02', 'Shape the route', 'Browse the right destinations, stays, vehicles, and experiences in one place.'],
  ['03', 'Go with confidence', 'A real specialist, flexible support, and the important details already handled.']
];

export default function Home() {
  return <main className="new-home">
    <section className="new-home-hero">
      <div className="hero-aurora aurora-one" /><div className="hero-aurora aurora-two" /><div className="hero-grid" />
      <nav className="hero-mini-nav"><span className="hero-kicker"><span className="pulse-dot" /> Travel, re-cut for you</span><span>Est. 2026 · 42 countries · 24/7 care</span></nav>
      <div className="hero-layout">
        <div className="hero-copy">
          <Reveal direction="right"><span className="new-eyebrow"><Sparkles size={14} /> The new way to wander</span></Reveal>
          <Reveal direction="right" delay={90}><h1>Find the version<br />of the world that<br /><em>feels like yours.</em></h1></Reveal>
          <Reveal direction="right" delay={180}><p className="hero-lede">Thoughtful trips, beautiful stays, and local moments—shaped around your pace, not a template.</p></Reveal>
          <Reveal direction="right" delay={270}><div className="hero-actions"><Link to="/destinations" className="hero-primary">Start exploring <ArrowRight size={17} /></Link><Link to="/packages" className="hero-secondary"><Compass size={16} /> See curated trips</Link></div></Reveal>
          <Reveal direction="right" delay={360}><div className="hero-proof"><div className="avatar-stack"><span>AR</span><span>MK</span><span>JN</span><span>+</span></div><div><strong>Loved by 18,000+ travellers</strong><small><Star size={12} fill="currentColor" /> 4.9 average experience rating</small></div></div></Reveal>
        </div>
        <Reveal direction="left" delay={160} className="hero-orbit-wrap"><div className="hero-orbit-card"><div className="orbit-image"><SmartImage src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=92" alt="Misty mountain landscape" priority sizes="(max-width: 900px) 92vw, 420px" /><div className="orbit-image-label"><MapPin size={13} /> Ladakh, India <span>·</span> 04:36 PM</div></div><div className="orbit-card-content"><div><small>Editor’s current obsession</small><h2>High altitude,<br /><em>low noise.</em></h2></div><Link to="/packages" className="round-arrow" aria-label="Explore mountain trips"><ArrowRight size={19} /></Link></div></div><div className="orbit-pill pill-top"><WandSparkles size={15} /><span>Made around<br /><strong>your rhythm</strong></span></div><div className="orbit-pill pill-bottom"><ShieldCheck size={15} /><span>Protected<br /><strong>every step</strong></span></div></Reveal>
      </div>
      <div className="hero-scroll-cue"><span /> Scroll to wander</div>
    </section>

    <section className="new-home-section discovery-section"><Reveal><div className="section-topline"><div><span className="new-eyebrow dark">A little inspiration</span><h2>Start with a <em>somewhere.</em></h2></div><Link to="/destinations" className="section-link">View all destinations <ArrowRight size={15} /></Link></div></Reveal><div className="featured-grid">{FEATURED.map((item, index) => <Reveal key={item.title} delay={index * 100} className={index === 0 ? 'featured-card featured-card-large' : 'featured-card'}><Link to={`/destinations/${item.title.toLowerCase()}`}><SmartImage src={item.image} alt={item.title} sizes="(max-width: 620px) 92vw, (max-width: 900px) 48vw, 42vw" /><div className={`featured-tone ${item.tone}`} /><div className="featured-copy"><span>0{index + 1} / 03</span><h3>{item.title}</h3><p>{item.meta}</p><strong>Explore <ArrowRight size={15} /></strong></div></Link></Reveal>)}</div></section>

    <section className="signal-section"><div className="signal-glow" /><div className="new-home-section signal-inner"><Reveal direction="right"><span className="new-eyebrow">Why it feels different</span><h2>Less searching.<br /><em>More arriving.</em></h2><p>TravelSphere brings the whole journey together, without making you feel like you’re shopping for one.</p><Link to="/about" className="signal-link">How we travel <ArrowRight size={16} /></Link></Reveal><div className="signal-cards"><Reveal delay={80}><article><span className="signal-icon"><Heart size={18} /></span><h3>Curated, not crowded</h3><p>Places with a point of view—chosen by people who actually go.</p></article></Reveal><Reveal delay={180}><article><span className="signal-icon"><Headphones size={18} /></span><h3>A human in your corner</h3><p>Get real support before takeoff, during the trip, and after you’re home.</p></article></Reveal><Reveal delay={280}><article><span className="signal-icon"><ShieldCheck size={18} /></span><h3>Clear from the start</h3><p>Transparent inclusions, trusted partners, and no mystery at checkout.</p></article></Reveal></div></div></section>

    <section className="new-home-section journey-section"><Reveal><div className="section-topline"><div><span className="new-eyebrow dark">The TravelSphere rhythm</span><h2>Three moves to<br /><em>somewhere better.</em></h2></div><Link to="/support" className="section-link">Need a human? <ArrowRight size={15} /></Link></div></Reveal><div className="journey-steps">{JOURNEY_STEPS.map(([number, title, copy], index) => <Reveal key={number} delay={index * 120} className="journey-step"><span className="journey-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight className="journey-arrow" size={19} /></Reveal>)}</div></section>

    <section className="home-trip-cta"><div className="new-home-section cta-inner"><Reveal direction="right"><span className="new-eyebrow">Your next chapter is out there</span><h2>Let’s make the<br /><em>first move.</em></h2><p>Tell us where your mind keeps going. We’ll help you find the route.</p><Link to="/packages" className="hero-primary">Find my trip <ArrowRight size={17} /></Link></Reveal><Reveal direction="left" delay={140} className="cta-art"><div className="cta-ring ring-one" /><div className="cta-ring ring-two" /><div className="cta-art-card"><Plane size={22} /><span>Next stop</span><strong>Somewhere<br />you’ll remember.</strong></div></Reveal></div></section>

    <footer className="new-home-footer"><div className="new-home-section footer-inner"><div><Link to="/" className="footer-brand"><span>TS</span> TravelSphere</Link><p>Travel with a point of view.</p></div><div className="footer-proof"><Users size={17} /><span><strong>18,000+ travellers</strong><small>and counting</small></span></div></div></footer>
  </main>;
}
