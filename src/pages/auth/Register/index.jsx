import { useState } from 'react';
import { 
  AlertCircle, ArrowRight, Award, Building2, Check, CheckCircle2, 
  Eye, EyeOff, MapPin, Plane, ShieldCheck, Sparkles, Truck, UserRound 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { validateEmail, validateName, validatePassword } from '../../../utils/validation';
import './Register.css';

const ROLES = [
  { key: 'CUSTOMER', label: 'Traveller', short: 'Plan & book your vacations', icon: <UserRound size={18} />, color: '#0ea5e9' },
  { key: 'TRAVEL_AGENT', label: 'Travel Agent', short: 'Build custom itineraries for clients', icon: <Plane size={18} />, color: '#8b5cf6' },
  { key: 'HOTEL_MANAGER', label: 'Hotel Partner', short: 'Manage suites & reservations', icon: <Building2 size={18} />, color: '#f59e0b' },
  { key: 'TRANSPORT_PROVIDER', label: 'Transport Host', short: 'Manage car fleet & transfers', icon: <Truck size={18} />, color: '#ec4899' },
  { key: 'TOUR_GUIDE', label: 'Tour Guide', short: 'Lead guided local excursions', icon: <Award size={18} />, color: '#10b981' },
  { key: 'ADMIN', label: 'System Admin', short: 'Full portal management', icon: <ShieldCheck size={18} />, color: '#38bdf8' }
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState('CUSTOMER');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'US',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const activeRole = ROLES.find(item => item.key === role) || ROLES[0];

  const change = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateRegisterForm = () => {
    const errors = {};
    const nameErr = validateName(formData.fullName, 'Full name');
    if (nameErr) errors.fullName = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    if (role !== 'CUSTOMER' && !formData.company.trim()) {
      errors.company = 'Organisation or property name is required.';
    }

    const passErr = validatePassword(formData.password, 6);
    if (passErr) errors.password = passErr;

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms & Conditions.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async e => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateRegisterForm()) return;

    setLoading(true);
    try {
      const result = await register({
        fullName: formData.fullName,
        email: formData.email,
        country: formData.country,
        phone: formData.phone,
        company: formData.company,
        role,
        password: formData.password
      });

      setSuccessMessage(result.message || `${activeRole.label} account created successfully! Redirecting to login...`);
      setTimeout(() => navigate('/login', { state: { registeredEmail: formData.email, selectedRole: role } }), 1500);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page-new">
      <header className="register-topbar">
        <Link to="/" className="login-brand">
          <span>TS</span> TravelSphere
        </Link>
        <div className="register-topbar-right">
          <span>Already have an account?</span>
          <Link to="/login">
            Sign In <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <div className="register-shell">
        <section className="register-story">
          <div className="register-story-content">
            <span className="register-eyebrow">
              <Sparkles size={14} /> Join TravelSphere
            </span>
            <h1>
              Your next<br />
              <em>adventure</em><br />
              starts right here.
            </h1>
            <p>
              Create your account to unlock curated travel packages, personalized stays, verified local guides, and 24/7 dedicated support.
            </p>
            <div className="register-story-metrics">
              <div>
                <strong>42</strong>
                <span>Destinations<br />Worldwide</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average<br />Satisfaction</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Live Concierge<br />Support</span>
              </div>
            </div>
          </div>
        </section>

        <section className="register-form-side">
          <div className="register-form-head">
            <div>
              <span className="register-eyebrow dark">STEP 1: SELECT YOUR ACCOUNT TYPE</span>
              <h2>Choose your <em>role.</em></h2>
            </div>
            <span className="form-step">Step 01 <i /> 02</span>
          </div>

          <div className="role-grid">
            {ROLES.map(item => (
              <button 
                type="button" 
                key={item.key} 
                className={`role-tile ${role === item.key ? 'active' : ''}`}
                style={{ '--role-color': item.color }} 
                onClick={() => setRole(item.key)}
              >
                <span className="role-icon">{item.icon}</span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.short}</small>
                </span>
                {role === item.key && <Check size={15} className="role-check" />}
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="register-message error">
              <AlertCircle size={17} />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="register-message success">
              <CheckCircle2 size={17} />
              <span>{successMessage}</span>
            </div>
          )}

          <form className="register-form-new" onSubmit={submit} noValidate>
            <div className="form-section-label">
              <span>02</span>
              <div>
                <strong>Account Details</strong>
                <small>Creating a {activeRole.label} account</small>
              </div>
            </div>

            <label className="register-field">
              <span>Full Name *</span>
              <input 
                type="text" 
                name="fullName" 
                placeholder={role === 'CUSTOMER' ? 'e.g. Alex Johnson' : 'Account manager name'} 
                value={formData.fullName} 
                onChange={change} 
                style={{ borderColor: fieldErrors.fullName ? '#ef4444' : '' }}
              />
              {fieldErrors.fullName && (
                <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {fieldErrors.fullName}
                </small>
              )}
            </label>

            {role !== 'CUSTOMER' && (
              <label className="register-field">
                <span>{role === 'HOTEL_MANAGER' ? 'Property Name *' : role === 'TRAVEL_AGENT' ? 'Agency Name *' : 'Company / Fleet Name *'}</span>
                <input 
                  type="text" 
                  name="company" 
                  placeholder="e.g. Grand Horizon Resorts" 
                  value={formData.company} 
                  onChange={change} 
                  style={{ borderColor: fieldErrors.company ? '#ef4444' : '' }}
                />
                {fieldErrors.company && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {fieldErrors.company}
                  </small>
                )}
              </label>
            )}

            <label className="register-field">
              <span>Email Address *</span>
              <input 
                type="email" 
                name="email" 
                placeholder="name@example.com" 
                value={formData.email} 
                onChange={change} 
                style={{ borderColor: fieldErrors.email ? '#ef4444' : '' }}
              />
              {fieldErrors.email && (
                <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {fieldErrors.email}
                </small>
              )}
            </label>

            <div className="register-field-row">
              <label className="register-field">
                <span>Country</span>
                <select name="country" value={formData.country} onChange={change}>
                  <option value="US">United States</option>
                  <option value="IN">India</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="AE">UAE</option>
                  <option value="JP">Japan</option>
                </select>
              </label>

              <label className="register-field">
                <span>Phone Number</span>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone} 
                  onChange={change} 
                />
              </label>
            </div>

            <div className="register-field-row">
              <label className="register-field password-field">
                <span>Password (6+ characters) *</span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  placeholder="Min 6 characters" 
                  value={formData.password} 
                  onChange={change} 
                  style={{ borderColor: fieldErrors.password ? '#ef4444' : '' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {fieldErrors.password && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {fieldErrors.password}
                  </small>
                )}
              </label>

              <label className="register-field password-field">
                <span>Confirm Password *</span>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  name="confirmPassword" 
                  placeholder="Repeat password" 
                  value={formData.confirmPassword} 
                  onChange={change} 
                  style={{ borderColor: fieldErrors.confirmPassword ? '#ef4444' : '' }}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {fieldErrors.confirmPassword && (
                  <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <AlertCircle size={12} /> {fieldErrors.confirmPassword}
                  </small>
                )}
              </label>
            </div>

            <label className="agreement-row">
              <input 
                type="checkbox" 
                checked={formData.agreeTerms} 
                onChange={e => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))} 
              />
              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
              </span>
            </label>
            {fieldErrors.agreeTerms && (
              <small style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={12} /> {fieldErrors.agreeTerms}
              </small>
            )}

            <button className="register-submit-new" type="submit" disabled={loading}>
              {loading ? 'Creating your account...' : (
                <>
                  <span>Create {activeRole.label} Account</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="register-form-foot">
            <ShieldCheck size={15} />
            <span>Your information is protected by industry-standard 256-bit SSL encryption.</span>
          </div>
        </section>
      </div>
    </main>
  );
}
