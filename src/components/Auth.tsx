import React, { useState } from 'react';
import { AuthUser, UserRole } from '../types';
import { GOV_EMBLEM_URL } from '../data/mockData';

interface AuthProps {
  onAuthenticated: (user: AuthUser) => void;
}

const ROLES: { id: UserRole; label: string; icon: string; hint: string }[] = [
  { id: 'farmer', label: 'Farmer', icon: 'agriculture', hint: 'Book slots, track your pass' },
  { id: 'driver', label: 'Transporter', icon: 'local_shipping', hint: 'Bid on lifting jobs' },
  { id: 'inspection-head', label: 'Inspection Head', icon: 'fact_check', hint: 'Quality gate checks' },
  { id: 'mandi-head', label: 'Mandi Head', icon: 'storefront', hint: 'Run one mandi' },
  { id: 'admin', label: 'Admin', icon: 'admin_panel_settings', hint: 'Full system access' },
];

const DEMO_NAMES: Record<UserRole, string> = {
  farmer: 'Ramesh Kumar',
  driver: 'Suresh Yadav',
  'inspection-head': 'Dr. Anita Sharma',
  'mandi-head': 'Vikram Singh',
  admin: 'System Admin',
};

// OTP-based login for citizen-facing roles; password login for official roles
// that carry procurement/audit responsibility.
const isOtpRole = (role: UserRole) => role === 'farmer' || role === 'driver';

export const Auth: React.FC<AuthProps> = ({ onAuthenticated }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>('farmer');

  // Shared
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // OTP flow (farmer / driver)
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  // Password flow (official roles)
  const [password, setPassword] = useState('');
  const [idField, setIdField] = useState(''); // vehicle no / employee id

  const idLabel = role === 'driver' ? 'Vehicle registration number' : 'Employee / officer ID';

  const resetFlow = () => {
    setError('');
    setOtpSent(false);
    setOtp('');
    setPassword('');
  };

  const selectRole = (r: UserRole) => {
    setRole(r);
    resetFlow();
  };

  const switchTab = (t: 'login' | 'signup') => {
    setTab(t);
    resetFlow();
  };

  const sendOtp = () => {
    if (phone.replace(/\D/g, '').length !== 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setOtpSent(true);
  };

  const verifyOtpAndContinue = () => {
    if (otp.length !== 4) {
      setError('Enter the 4-digit OTP');
      return;
    }
    if (tab === 'signup' && name.trim().length < 2) {
      setError('Enter your full name');
      return;
    }
    setError('');
    onAuthenticated({
      id: 'u_' + Date.now(),
      name: tab === 'signup' ? name.trim() : DEMO_NAMES[role],
      phone,
      role,
    });
  };

  const submitPasswordLogin = () => {
    if (phone.replace(/\D/g, '').length !== 10) return setError('Enter a valid 10-digit mobile number');
    if (password.length < 4) return setError('Password must be at least 4 characters');
    if (tab === 'signup' && name.trim().length < 2) return setError('Enter your full name');
    if (tab === 'signup' && idField.trim().length < 2) return setError(`Enter your ${idLabel.toLowerCase()}`);
    setError('');
    onAuthenticated({
      id: 'u_' + Date.now(),
      name: tab === 'signup' ? name.trim() : DEMO_NAMES[role],
      phone,
      role,
    });
  };

  const quickDemoLogin = (r: UserRole) => {
    onAuthenticated({ id: 'demo_' + r, name: DEMO_NAMES[r], phone: '9876543210', role: r });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-6">
          <img src={GOV_EMBLEM_URL} alt="KrishiQueue Government Emblem" className="h-10 w-auto" />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[19px] text-primary-container">KrishiQueue</span>
            <span className="text-[12px] text-on-surface-variant">कृषि कतार · Mandi Logistics Platform</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_1px_12px_rgba(0,0,0,0.08)] border border-outline-variant/40 p-5">
          <div className="flex bg-surface-container rounded-xl p-1 mb-5">
            <button
              onClick={() => switchTab('login')}
              className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
                tab === 'login' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant'
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => switchTab('signup')}
              className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
                tab === 'signup' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant'
              }`}
            >
              Sign up
            </button>
          </div>

          <div className="mb-4">
            <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide mb-2">I am a</div>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => selectRole(r.id)}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-center transition-colors ${
                    role === r.id
                      ? 'border-primary bg-primary-fixed/40 text-primary-container'
                      : 'border-outline-variant/50 text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{r.icon}</span>
                  <span className="text-[10.5px] font-semibold leading-tight">{r.label}</span>
                </button>
              ))}
            </div>
            <div className="text-[11px] text-on-surface-variant mt-2">{ROLES.find((r) => r.id === role)?.hint}</div>
          </div>

          <div className="flex items-center gap-1.5 mb-4 bg-surface-container rounded-lg px-2.5 py-1.5">
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
              {isOtpRole(role) ? 'sms' : 'lock'}
            </span>
            <span className="text-[11px] text-on-surface-variant">
              {isOtpRole(role) ? 'This role signs in with a one-time OTP' : 'This role signs in with an employee password'}
            </span>
          </div>

          {tab === 'signup' && (
            <div className="mb-3">
              <label className="text-[11px] font-semibold text-on-surface-variant mb-1 block">Full name</label>
              <input
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="Enter your full name"
                className="w-full bg-surface-container-low rounded-lg px-3 py-2.5 text-[13px] outline-none border border-transparent focus:border-primary"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="text-[11px] font-semibold text-on-surface-variant mb-1 block">Mobile number</label>
            <div className="flex items-center bg-surface-container-low rounded-lg px-3 py-2.5 border border-transparent focus-within:border-primary">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant mr-1.5">call</span>
              <input
                value={phone}
                disabled={isOtpRole(role) && otpSent}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                placeholder="98765 43210"
                className="bg-transparent outline-none text-[13px] w-full disabled:opacity-60"
              />
            </div>
          </div>

          {isOtpRole(role) ? (
            <>
              {!otpSent ? (
                <button
                  onClick={sendOtp}
                  className="w-full bg-primary text-on-primary font-semibold text-[13px] rounded-xl py-3 shadow-xs active:scale-[0.99] transition-transform"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <div className="mb-2">
                    <label className="text-[11px] font-semibold text-on-surface-variant mb-1 block">
                      Enter OTP sent to {phone}
                    </label>
                    <div className="flex items-center bg-surface-container-low rounded-lg px-3 py-2.5 border border-transparent focus-within:border-primary">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant mr-1.5">password</span>
                      <input
                        value={otp}
                        onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(''); }}
                        placeholder="0000"
                        className="bg-transparent outline-none text-[13px] w-full tracking-widest"
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="flex items-center gap-1.5 text-[12px] text-error mb-2">
                      <span className="material-symbols-outlined text-[14px]">error</span>
                      {error}
                    </div>
                  )}
                  <button
                    onClick={verifyOtpAndContinue}
                    className="w-full bg-primary text-on-primary font-semibold text-[13px] rounded-xl py-3 shadow-xs active:scale-[0.99] transition-transform"
                  >
                    Verify &amp; continue
                  </button>
                  <button
                    onClick={() => { setOtpSent(false); setOtp(''); setError(''); }}
                    className="w-full text-[11px] text-on-surface-variant mt-2"
                  >
                    Change number
                  </button>
                </>
              )}
              {!otpSent && error && (
                <div className="flex items-center gap-1.5 text-[12px] text-error mt-2">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {error}
                </div>
              )}
            </>
          ) : (
            <>
              {tab === 'signup' && (
                <div className="mb-3">
                  <label className="text-[11px] font-semibold text-on-surface-variant mb-1 block">{idLabel}</label>
                  <input
                    value={idField}
                    onChange={(e) => { setIdField(e.target.value); setError(''); }}
                    placeholder={idLabel}
                    className="w-full bg-surface-container-low rounded-lg px-3 py-2.5 text-[13px] outline-none border border-transparent focus:border-primary"
                  />
                </div>
              )}

              <div className="mb-2">
                <label className="text-[11px] font-semibold text-on-surface-variant mb-1 block">Password</label>
                <div className="flex items-center bg-surface-container-low rounded-lg px-3 py-2.5 border border-transparent focus-within:border-primary">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant mr-1.5">lock</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="••••••"
                    className="bg-transparent outline-none text-[13px] w-full"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-[12px] text-error mb-2">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {error}
                </div>
              )}

              <button
                onClick={submitPasswordLogin}
                className="w-full bg-primary text-on-primary font-semibold text-[13px] rounded-xl py-3 shadow-xs active:scale-[0.99] transition-transform"
              >
                {tab === 'login' ? 'Log in' : 'Create account'}
              </button>

              {tab === 'signup' && (
                <div className="text-[11px] text-on-surface-variant mt-2 text-center">
                  Official accounts are approved by an admin before first login.
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-5 border-t border-outline-variant/40 pt-4">
          <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide mb-2 text-center">
            Demo: jump straight in as
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => quickDemoLogin(r.id)}
                className="flex items-center gap-1 bg-surface-container rounded-full px-2.5 py-1.5 text-[11px] font-medium text-on-surface hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[13px]">{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
