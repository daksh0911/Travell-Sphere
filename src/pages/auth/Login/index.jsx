import { useState } from 'react';
import { 
  ArrowRight, Eye, EyeOff, Globe2, LockKeyhole, Mail, ShieldCheck, 
  Sparkles, UserRound, AlertCircle, Check 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail, validatePassword } from '../../../utils/validation';
import './Login.css';

const DEMOS = [
  { label: 'Admin', email: 'admin@travel.com', role: 'ADMIN', color: '#0ea5e9' },
  { label: 'Travel Agent', email: 'sarah@horizon-travel.com', role: 'TRAVEL_AGENT', color: '#8b5cf6' },
  { label: 'Hotel Manager', email: 'elena@grandpalace.com', role: 'HOTEL_MANAGER', color: '#f59e0b' },
  { label: 'Transport Host', email: 'michael@apextransports.com', role: 'TRANSPORT_PROVIDER', color: '#ec4899' },
  { label: 'Tour Guide', email: 'marco@tourguides.com', role: 'TOUR_GUIDE', color: '#10b981' },
  { label: 'Customer', email: 'alice@example.com', role: 'CUSTOMER', color: '#06b6d4' }
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState(location.state?.registeredEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const target = (role) => {
    switch ((role || '').toUpperCase()) {
      case 'ADMIN':
      case 'ADMINISTRATOR':
      case 'SUPER_ADMIN':
        return '/admin-dashboard';
      case 'TRAVEL_AGENT':
        return '/agent-dashboard';
      case 'HOTEL_MANAGER':
        return '/hotel-dashboard';
      case 'TRANSPORT_PROVIDER':
        return '/transport-dashboard';
      case 'TOUR_GUIDE':
        return '/guide-dashboard';
      default:
        return '/user-dashboard';
    }
  };

  const validateLoginForm = () => {
    const errors = {};
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const passErr = validatePassword(password, 6);
    if (passErr) errors.password = passErr;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setLoading(true);
    setErrorMessage('');
    try {
      const res = await login({ email, password });
      navigate(target(res.user?.role || 'CUSTOMER'));
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const quick = async (demo) => {
    setEmail(demo.email);
    setPassword('password123');
    setFieldErrors({});
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await login({ email: demo.email, password: 'password123' }).catch(() => null);
      if (res?.user) {
        navigate(target(res.user.role));
      } else {
        const demoUser = {
          id: demo.email,
          name: demo.email.split('@')[0].toUpperCase(),
          email: demo.email,
          role: demo.role
        };
        localStorage.setItem('travelsphere_active_user', JSON.stringify(demoUser));
        window.location.assign(target(demo.role));
      }
    } catch {
      navigate(target(demo.role));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page-new">
      <header className="login-topbar">
        <Link to="/" className="login-brand">
          <span>TS</span> TravelSphere
        </Link>
        <div className="login-topbar-right">
          <span>New to TravelSphere?</span>
          <Link to="/register">
            Create an account <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <div className="login-shell">
        <section className="login-story">
          <div className="login-story-glow glow-one" />
          <div className="login-story-glow glow-two" />
          <div className="login-story-content">
            <span className="login-eyebrow">
              <Sparkles size={14} /> Welcome Back
            </span>
            <h1>
              Pick up where<br />
              your journey<br />
              <em>left off.</em>
            </h1>
            <p>
              Your saved itineraries, hotel bookings, flight confirmations, and 24/7 dedicated support all in one convenient place.
            </p>
            <div className="login-story-proof">
              <span><ShieldCheck size={15} /> 100% Encrypted</span>
              <span><Globe2 size={15} /> 42 Countries</span>
              <span><UserRound size={15} /> Single Sign-On</span>
            </div>
          </div>
        </section>

        <section className="login-form-side">
          <div className="login-card-new">
            <span className="login-eyebrow dark">USER & PARTNER LOGIN</span>
            <h2>Welcome <em>back.</em></h2>
            <p className="login-subtitle">Sign in to manage your trips, properties, or guide schedules.</p>

            {errorMessage && (
              <div className="login-error">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={submit} className="login-form-new" noValidate>
              <label>
                <span>Email address *</span>
                <div className="login-input" style={{ borderColor: fieldErrors.email ? '#ef4444' : '' }}>
                  <Mail size={16} />
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                  />
                </div>
                {fieldErrors.email && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {fieldErrors.email}
                  </small>
                )}
              </label>

              <label>
                <span>Password *</span>
                <div className="login-input" style={{ borderColor: fieldErrors.password ? '#ef4444' : '' }}>
                  <LockKeyhole size={16} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Your secure password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {fieldErrors.password}
                  </small>
                )}
              </label>

              <div className="login-options">
                <label>
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={e => setRememberMe(e.target.checked)} 
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" onClick={() => setErrorMessage('Demo Mode: You can click any role below to sign in immediately.')}>
                  Forgot password?
                </button>
              </div>

              <button className="login-submit-new" type="submit" disabled={loading}>
                {loading ? 'Verifying account...' : (
                  <>
                    <span>Sign In to TravelSphere</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="demo-divider">
              <span>or instant demo login by role</span>
            </div>

            <div className="demo-grid">
              {DEMOS.map(demo => (
                <button 
                  key={demo.role} 
                  type="button" 
                  onClick={() => quick(demo)} 
                  style={{ '--demo-color': demo.color }}
                >
                  <i />
                  <span>{demo.label}</span>
                </button>
              ))}
            </div>

            <div className="login-security">
              <ShieldCheck size={14} />
              <span>Protected Account · <Link to="/privacy">Privacy Policy</Link></span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
