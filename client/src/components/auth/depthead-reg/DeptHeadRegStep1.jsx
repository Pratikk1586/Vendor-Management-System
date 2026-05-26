/**
 * @fileoverview Step 1 of Department Head Registration — Core profiles, official email, and credentials.
 */

import { useState } from 'react';
import { ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { DEPARTMENTS } from '../../../constants/departments';

export default function DeptHeadRegStep1({ data = {}, onChange, onNext }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    onChange({ [field]: value });
  };

  // Password strength algorithm
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-transparent', textClass: 'text-slate-500' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[/W_]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score, label: 'Weak Strength', color: 'bg-red-500 w-1/4', textClass: 'text-red-400' };
    if (score <= 3) return { score, label: 'Medium Strength', color: 'bg-orange-500 w-2/3', textClass: 'text-orange-400' };
    return { score, label: 'Strong Security', color: 'bg-green-500 w-full', textClass: 'text-green-400' };
  };

  const strength = getPasswordStrength(password);

  const validateStep = () => {
    const newErrors = {};

    if (!data.name?.trim()) newErrors.name = 'Full name is required';
    if (!data.employeeId?.trim()) newErrors.employeeId = 'Employee ID is required';
    
    if (!data.email) {
      newErrors.email = 'Official email is required';
    } else if (!/^[^\s@]+@tatasteel\.com$/.test(data.email.trim().toLowerCase())) {
      newErrors.email = 'Enter a valid corporate email ending in @tatasteel.com';
    }

    if (!data.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(data.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }

    if (!data.designation?.trim()) newErrors.designation = 'Official designation is required';
    
    const years = parseInt(data.yearsAtCompany, 10);
    if (!data.yearsAtCompany) {
      newErrors.yearsAtCompany = 'Years at company is required';
    } else if (isNaN(years) || years < 0 || years > 50) {
      newErrors.yearsAtCompany = 'Enter a valid number of years (0 - 50)';
    }

    if (!data.department) newErrors.department = 'Select your department';

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      onChange({ password });
      onNext();
    }
  };

  return (
    <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl font-body">
      
      {/* Step Header */}
      <div className="border-b border-steel-700/60 pb-4 mb-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">Step 1 of 2</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
          Staff Profile Details
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Provide your official employee identification and register your department.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        
        {/* Row 1: Full Name & Employee ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              id="name-dept"
              type="text"
              required
              value={data.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="e.g. Anand Mahindra"
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.name ? 'border-red-500' : 'border-steel-700/80'
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="employeeId-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Employee ID *
            </label>
            <input
              id="employeeId-dept"
              type="text"
              required
              value={data.employeeId || ''}
              onChange={(e) => handleFieldChange('employeeId', e.target.value)}
              placeholder="e.g. TS-58912"
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.employeeId ? 'border-red-500' : 'border-steel-700/80'
              }`}
            />
            {errors.employeeId && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.employeeId}</p>
            )}
          </div>
        </div>

        {/* Row 2: Official Email & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Official Sourcing Email *
            </label>
            <input
              id="email-dept"
              type="email"
              required
              value={data.email || ''}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="must end with @tatasteel.com"
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.email ? 'border-red-500' : 'border-steel-700/80'
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="mobile-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Mobile Number *
            </label>
            <input
              id="mobile-dept"
              type="tel"
              required
              maxLength={10}
              value={data.mobile || ''}
              onChange={(e) => handleFieldChange('mobile', e.target.value)}
              placeholder="10-digit Phone Number"
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.mobile ? 'border-red-500' : 'border-steel-700/80'
              }`}
            />
            {errors.mobile && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.mobile}</p>
            )}
          </div>
        </div>

        {/* Row 3: Designation, Years, Department */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="designation-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Official Designation *
            </label>
            <input
              id="designation-dept"
              type="text"
              required
              value={data.designation || ''}
              onChange={(e) => handleFieldChange('designation', e.target.value)}
              placeholder="e.g. Sourcing Officer"
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.designation ? 'border-red-500' : 'border-steel-700/80'
              }`}
            />
            {errors.designation && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.designation}</p>
            )}
          </div>

          <div>
            <label htmlFor="yearsAtCompany" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Years at Company *
            </label>
            <input
              id="yearsAtCompany"
              type="number"
              required
              min={0}
              max={50}
              value={data.yearsAtCompany || ''}
              onChange={(e) => handleFieldChange('yearsAtCompany', e.target.value)}
              placeholder="e.g. 5"
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.yearsAtCompany ? 'border-red-500' : 'border-steel-700/80'
              }`}
            />
            {errors.yearsAtCompany && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.yearsAtCompany}</p>
            )}
          </div>

          <div>
            <label htmlFor="department-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Sourcing Department *
            </label>
            <select
              id="department-dept"
              required
              value={data.department || ''}
              onChange={(e) => handleFieldChange('department', e.target.value)}
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.department ? 'border-red-500' : 'border-steel-700/80'
              }`}
            >
              <option value="" disabled>Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id} className="bg-steel-800">{dept.name}</option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.department}</p>
            )}
          </div>
        </div>

        {/* Row 4: Password and Strength indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-steel-700/50">
          <div>
            <label htmlFor="password-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Create Password *
            </label>
            <div className="relative">
              <input
                id="password-dept"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className={`block w-full px-4 pr-10 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.password ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {password && (
              <div className="mt-2.5 space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Strength:</span>
                  <span className={strength.textClass}>{strength.label}</span>
                </div>
                <div className="w-full bg-steel-900 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} />
                </div>
              </div>
            )}
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword-dept" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                id="confirmPassword-dept"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type password"
                className={`block w-full px-4 pr-10 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Action button bar */}
        <div className="pt-6 border-t border-steel-700/60 flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg shadow-tata-blue/20 hover:scale-105 hover:shadow-tata-blue/35 transition-all duration-200 focus:outline-none"
          >
            Verification Credentials
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </form>
    </div>
  );
}
