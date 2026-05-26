/**
 * @fileoverview Secure login form supporting show/hide password, error banners, and loading indicators.
 */

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { ROLE_LABELS } from '../../constants/roles';

export default function LoginForm({ role, onSubmit, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    onSubmit({ email, password, role, rememberMe });
  };

  const getRoleTheme = () => {
    switch (role) {
      case 'dept_head':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'hr_admin':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-tata-light bg-tata-blue/10 border-tata-blue/30';
    }
  };

  return (
    <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl font-body">
      
      {/* Header Info */}
      <div className="mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Sign In to Portal
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Enter your login credentials below to access your account workspace.
        </p>
      </div>

      {/* Auto-inherited Role Display Banner */}
      {role && (
        <div className={`p-3 rounded-lg border text-center text-xs font-semibold tracking-wide uppercase mb-6 select-none ${getRoleTheme()}`}>
          Access Level: {ROLE_LABELS[role] || role}
        </div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@company.com"
              className="block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-xs text-tata-gold hover:text-tata-amber transition-colors font-medium"
            >
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full pl-10 pr-10 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded bg-steel-900 border-steel-700 text-tata-blue focus:ring-tata-blue/20 focus:ring-offset-0 focus:outline-none"
          />
          <label htmlFor="remember-me" className="ml-2.5 block text-xs sm:text-sm text-slate-400 select-none font-normal">
            Remember me on this machine
          </label>
        </div>

        {/* Error Alert Display Box */}
        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start space-x-2.5 animate-fadeIn">
            <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-full py-3 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg shadow-tata-blue/20 hover:from-tata-light hover:to-tata-blue hover:shadow-tata-blue/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Authenticating...
            </>
          ) : (
            'Sign In to Workspace'
          )}
        </button>

      </form>
    </div>
  );
}
