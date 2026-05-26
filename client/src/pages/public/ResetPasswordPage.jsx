/**
 * @fileoverview Reset Password page that captures reset token parameters and saves updated passwords.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Password strength logic
  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', color: 'bg-steel-700', percentage: 'w-0' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 4:
        return { label: 'Strong Security', color: 'bg-emerald-500', percentage: 'w-full' };
      case 3:
        return { label: 'Medium Strength', color: 'bg-orange-500', percentage: 'w-2/3' };
      default:
        return { label: 'Weak (Enforce mixed cases/nums/symbols)', color: 'bg-red-500', percentage: 'w-1/3' };
    }
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate save delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-md w-full space-y-8 flex flex-col items-center">
        
        {/* Core Tata Logo Header */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-tata-gold to-tata-amber rounded-2xl flex items-center justify-center font-display text-2xl text-steel-900 font-extrabold shadow-lg shadow-tata-gold/10 mb-3 flex-shrink-0">
            TS
          </div>
          <h1 className="text-xl font-display tracking-widest text-white uppercase text-center">
            Tata Steel Colors
          </h1>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
            Secure Password Reset
          </span>
        </div>

        {submitted ? (
          <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl text-center space-y-6 flex flex-col items-center animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white uppercase tracking-wide">Credentials Updated</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Your portal password has been reset successfully. You can now use your new password to sign in.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              type="button"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-tata-blue/30 transition-all focus:outline-none"
            >
              Sign In with New Password
            </button>
          </div>
        ) : (
          <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Create New Password</h3>
              <p className="text-[10px] text-slate-500 font-mono tracking-wide mt-1">Verification Token: {token?.substring(0, 12)}...</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Password field */}
              <div>
                <label htmlFor="reset-pass" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    id="reset-pass"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="block w-full pl-10 pr-10 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Strength Meter */}
                {password && (
                  <div className="mt-2.5 space-y-1 animate-fadeIn">
                    <div className="w-full bg-steel-900 h-1 rounded overflow-hidden">
                      <div className={`h-full ${strength.color} transition-all duration-300 ${strength.percentage}`} />
                    </div>
                    <span className="text-[9px] font-bold uppercase font-mono tracking-widest text-slate-400 block text-right">
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password field */}
              <div>
                <label htmlFor="confirm-reset-pass" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    id="confirm-reset-pass"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="block w-full pl-10 pr-10 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-tata-blue/30 transition-all focus:outline-none"
              >
                {loading ? 'Updating Credentials...' : 'Save & Overwrite Password'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
