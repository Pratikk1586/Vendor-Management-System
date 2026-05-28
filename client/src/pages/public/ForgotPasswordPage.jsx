/**
 * @fileoverview Forgot Password page for requesting a reset link.
 */

import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate recovery email send
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
            Account Recovery
          </span>
        </div>

        {submitted ? (
          <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xl text-center space-y-6 flex flex-col items-center animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">Reset Link Transmitted</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                If an account exists for <span className="font-semibold text-tata-blue">{email}</span>, password recovery instructions have been successfully sent.
              </p>
            </div>

            <Link
              to="/login"
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 flex items-center justify-center space-x-1.5 transition-colors focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-blue">Recover Credentials</h3>
              <p className="text-xs text-slate-500 mt-1">Enter your registered email and we'll send you an authorization link to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="recovery-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="recovery-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="block w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-tata-blue transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs sm:text-sm font-bold text-white shadow-lg shadow-tata-blue/20 hover:shadow-tata-blue/35 transition-all focus:outline-none"
              >
                {loading ? 'Transmitting Reset Key...' : 'Send Recovery Instructions'}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-200 text-center">
              <Link to="/login" className="text-xs font-bold text-tata-blue hover:text-tata-light transition-colors flex items-center justify-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
