/**
 * @fileoverview Login page containing role card toggles and login inputs wrapped inside the Public layout.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RoleSelector from '../../components/auth/RoleSelector';
import LoginForm from '../../components/auth/LoginForm';
import { useAuthStore } from '../../store/authStore';
import { VENDOR } from '../../constants/roles.js';

export default function LoginPage() {
  const [role, setRole] = useState(VENDOR);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginSubmit = (credentials) => {
    setLoading(true);
    setError('');

    // Simulate authentication call
    setTimeout(() => {
      setLoading(false);
      const { email, password } = credentials;

      if (!email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }

      // Enforce Tata Steel email domain checks for internal staff
      if (credentials.role === 'dept_head' && !email.endsWith('@tatasteel.com')) {
        setError('Department Head sign-in strictly requires an official @tatasteel.com email.');
        return;
      }
      if (credentials.role === 'hr_admin' && !email.endsWith('@tatasteel.com')) {
        setError('Admin sign-in strictly requires an official @tatasteel.com email.');
        return;
      }

      if (password.length < 6) {
        setError('Password must contain at least 6 characters.');
        return;
      }

      // Generate a mock user session
      const namePrefix = email.split('@')[0];
      const displayName = namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1);
      const mockUser = {
        name: displayName,
        email: email,
        avatarUrl: null,
      };

      setAuth(mockUser, 'mock-jwt-token-12345', credentials.role);

      // Route to correct dashboard workspace
      if (credentials.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (credentials.role === 'dept_head') {
        navigate('/dept/dashboard');
      } else if (credentials.role === 'hr_admin') {
        navigate('/admin/dashboard');
      }
    }, 800);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl w-full space-y-8 flex flex-col items-center">
        
        {/* Core Tata Logo Header */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-tata-gold to-tata-amber rounded-2xl flex items-center justify-center font-display text-2xl text-steel-900 font-extrabold shadow-lg shadow-tata-gold/10 mb-3 flex-shrink-0">
            TS
          </div>
          <h1 className="text-xl font-display tracking-widest text-white uppercase text-center">
            Tata Steel Colors
          </h1>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
            Vendor Management Portal
          </span>
        </div>

        {/* Step 1: Select Active Role */}
        <div className="w-full">
          <div className="text-center mb-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">Section 1</span>
            <h3 className="text-sm font-semibold text-slate-300">Choose your portal access role</h3>
          </div>
          <RoleSelector value={role} onChange={setRole} />
        </div>

        {/* Step 2: Login Inputs */}
        <div className="max-w-md w-full">
          <LoginForm
            role={role}
            onSubmit={handleLoginSubmit}
            loading={loading}
            error={error}
          />
        </div>

        {/* Account Onboarding Redirection */}
        <p className="text-sm text-center text-slate-400">
          Need a workspace profile?{' '}
          <Link to="/register" className="text-tata-gold hover:text-tata-amber font-semibold transition-colors">
            Register for access
          </Link>
        </p>

      </div>
    </div>
  );
}
