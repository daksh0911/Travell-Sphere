import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Check, Command, Compass, Heart, Search, Sparkles, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SiteCommandCenter.css';

const ACTIONS = [
  { label: 'Explore destinations', detail: 'Find a place that fits your mood', path: '/destinations', icon: Compass },
  { label: 'Browse curated trips', detail: 'Compare ready-to-go journeys', path: '/packages', icon: Sparkles },
  { label: 'Find a beautiful stay', detail: 'Hotels, villas, and retreats', path: '/hotels', icon: Heart },
  { label: 'Get travel support', detail: 'Talk to a real specialist', path: '/support', icon: Users },
];
const MOODS = ['Slow and restorative', 'Big energy and culture', 'Nature and open skies', 'Romantic and unhurried'];
const PARTY = ['Just me', 'Two of us', 'Family escape', 'Friends together'];
const BUDGETS = ['Thoughtful value', 'Comfort first', 'A little extra', 'No hard ceiling'];

export default function SiteCommandCenter() {
  const navigate = useNavigate();
  const [studioOpen, setStudioOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ mood: '', party: '', budget: '' });

  useEffect(() => {
    const studio = () => setStudioOpen(true);
    const command = () => { setCommandOpen(true); setQuery(''); };
    window.addEventListener('travelsphere:open-studio', studio);
    window.addEventListener('travelsphere:open-command', command);
    const onKey = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); command(); }
      if (event.key === 'Escape') { setStudioOpen(false); setCommandOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('travelsphere:open-studio', studio); window.removeEventListener('travelsphere:open-command', command); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overlay-open', studioOpen || commandOpen);
    return () => document.body.classList.remove('overlay-open');
  }, [studioOpen, commandOpen]);

  const filteredActions = useMemo(() => ACTIONS.filter(action => `${action.label} ${action.detail}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const choose = (path) => navigate(path);
  const studioComplete = step === 3;
  const recommendation = answers.mood.includes('Nature') ? '/destinations?feeling=nature' : answers.mood.includes('Romantic') ? '/packages?style=romantic' : answers.budget === 'Thoughtful value' ? '/packages?style=value' : '/destinations';

  return <>
    {commandOpen && <div className="command-backdrop" onMouseDown={() => setCommandOpen(false)}><section className="command-palette" onMouseDown={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="TravelSphere quick navigation"><div className="command-search"><Search size={18}/><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the journey…"/><kbd><Command size={12}/> K</kbd></div><div className="command-label">QUICK MOVES</div><div className="command-actions">{filteredActions.map(({ label, detail, path, icon: Icon }) => <button key={label} onClick={() => choose(path)}><span className="command-icon"><Icon size={17}/></span><span><strong>{label}</strong><small>{detail}</small></span><ArrowRight size={15}/></button>)}{filteredActions.length === 0 && <p className="command-empty">No exact match. Try “hotel”, “trip”, or “support”.</p>}</div><div className="command-footer"><span>Press <kbd>Esc</kbd> to close</span><span>TravelSphere command center</span></div></section></div>}
    {studioOpen && <div className="studio-backdrop" onMouseDown={() => setStudioOpen(false)}><section className="studio-panel" onMouseDown={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Trip Studio"><button className="studio-close" onClick={() => setStudioOpen(false)} aria-label="Close Trip Studio"><X size={19}/></button><div className="studio-rail"><span className="studio-orbit"><Sparkles size={18}/></span><span className="studio-kicker">TRAVELSPHERE / TRIP STUDIO</span><h2>Build a trip<br/><em>that feels like you.</em></h2><p>Three quick choices. A better starting point. Nothing is booked until you say yes.</p><div className="studio-proof"><Check size={14}/> Saved privately in this browser</div></div><div className="studio-content">{studioComplete ? <div className="studio-result"><span className="studio-result-mark"><Check size={22}/></span><span className="studio-kicker dark">YOUR FIRST DIRECTION</span><h3>Let’s start with<br/><em>{answers.mood.toLowerCase()}.</em></h3><p>{answers.party} · {answers.budget}. We’ve shaped a shortlist around that feeling, not a generic destination.</p><button onClick={() => choose(recommendation)}>See my shortlist <ArrowRight size={17}/></button><button className="studio-secondary" onClick={() => { setStep(0); setAnswers({ mood: '', party: '', budget: '' }); }}>Start again</button></div> : <><div className="studio-progress"><span>0{step + 1}</span><div><i style={{ width: `${((step + 1) / 3) * 100}%` }}/></div><span>03</span></div><div className="studio-question">{step === 0 && <><span className="studio-kicker dark">THE FEELING</span><h3>What do you want<br/>more of?</h3><div className="studio-options">{MOODS.map(item => <button className={answers.mood === item ? 'selected' : ''} key={item} onClick={() => { setAnswers(current => ({ ...current, mood: item })); setStep(1); }}>{item}<ArrowRight size={15}/></button>)}</div></>}{step === 1 && <><span className="studio-kicker dark">THE COMPANY</span><h3>Who is this<br/>chapter for?</h3><div className="studio-options">{PARTY.map(item => <button className={answers.party === item ? 'selected' : ''} key={item} onClick={() => { setAnswers(current => ({ ...current, party: item })); setStep(2); }}>{item}<ArrowRight size={15}/></button>)}</div></>}{step === 2 && <><span className="studio-kicker dark">THE SHAPE</span><h3>How should it<br/>feel financially?</h3><div className="studio-options">{BUDGETS.map(item => <button className={answers.budget === item ? 'selected' : ''} key={item} onClick={() => { setAnswers(current => ({ ...current, budget: item })); setStep(3); }}>{item}<ArrowRight size={15}/></button>)}</div></>}</div><div className="studio-mini-note"><CalendarDays size={15}/> You can add dates and stays after the shortlist.</div></>}</div></section></div>}
  </>;
}
