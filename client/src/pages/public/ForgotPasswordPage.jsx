/**
 * @fileoverview Forgot Password page for requesting a reset link.
 */

import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

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
          <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl text-center space-y-6 flex flex-col items-center animate-scaleUp">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white uppercase tracking-wide">Reset Link Transmitted</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                If an account exists for <span className="font-semibold text-tata-gold">{email}</span>, password recovery instructions have been successfully sent.
              </p>
            </div>

            <a
              href="/login"
              className="w-full py-2.5 rounded-xl border border-steel-700 hover:border-steel-600 bg-steel-900/40 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white flex items-center justify-center space-x-1.5 transition-colors focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </a>
          </div>
        ) : (
          <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Recover Credentials</h3>
              <p className="text-xs text-slate-400 mt-1">Enter your registered email and we'll send you an authorization link to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="recovery-email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    id="recovery-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
                  />
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
                {loading ? 'Transmitting Reset Key...' : 'Send Recovery Instructions'}
              </button>
            </form>

            <div className="pt-4 border-t border-steel-700/60 text-center">
              <a href="/login" className="text-xs font-bold text-tata-gold hover:text-tata-amber transition-colors flex items-center justify-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
