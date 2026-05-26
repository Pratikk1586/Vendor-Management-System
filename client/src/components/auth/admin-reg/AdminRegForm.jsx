/**
 * @fileoverview AdminRegistrationForm — Single step registration for portal administrators, including HR authorization masks and files.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Upload, FileText, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

// Local Sub-component for individual Drag & Drop File Upload Box
function FileUploadZone({ label, required, fileName, onUpload, onRemove }) {
  const fileInputId = `file-input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file.name);
    }
  };

  return (
    <div className="flex flex-col space-y-1.5 font-body">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
        <span>{label}</span>
        {required && (
          <span className="px-1.5 py-0.5 text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 rounded-md uppercase font-semibold tracking-widest">Required</span>
        )}
      </div>

      <div className="relative border border-dashed border-steel-600 hover:border-steel-500 bg-steel-900/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors">
        {fileName ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2.5 min-w-0">
              <FileText className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="text-xs text-white truncate font-medium max-w-[150px] sm:max-w-[200px]">
                {fileName}
              </span>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors focus:outline-none"
            >
              Remove
            </button>
          </div>
        ) : (
          <label htmlFor={fileInputId} className="cursor-pointer flex flex-col items-center justify-center w-full py-2.5">
            <Upload className="w-5 h-5 text-slate-400 mb-2" />
            <span className="text-xs text-slate-300 font-medium">Click to upload doc</span>
            <span className="text-[10px] text-slate-500 mt-1 font-mono uppercase tracking-widest">PDF, PNG, JPG (Max 5MB)</span>
            <input
              id={fileInputId}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default function AdminRegForm({ onSubmit, loading, error }) {
  const navigate = useNavigate();

  // Form Fields State
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [authCode, setAuthCode] = useState('');
  
  const [employeeIdCard, setEmployeeIdCard] = useState(null);
  const [hrAuthLetter, setHrAuthLetter] = useState(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Toggles
  const [showAuthCode, setShowAuthCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // States
  const [declared, setDeclared] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Password strength algorithm
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-transparent', textClass: 'text-slate-500' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score, label: 'Weak Strength', color: 'bg-red-500 w-1/4', textClass: 'text-red-400' };
    if (score <= 3) return { score, label: 'Medium Strength', color: 'bg-orange-500 w-2/3', textClass: 'text-orange-400' };
    return { score, label: 'Strong Security', color: 'bg-green-500 w-full', textClass: 'text-green-400' };
  };

  const strength = getPasswordStrength(password);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    
    if (!email) {
      newErrors.email = 'Official email is required';
    } else if (!/^[^\s@]+@tatasteel\.com$/.test(email.trim().toLowerCase())) {
      newErrors.email = 'Enter a valid corporate email ending in @tatasteel.com';
    }

    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }

    if (!designation.trim()) newErrors.designation = 'Official designation is required';
    if (!authCode.trim()) newErrors.authCode = 'Portal HR Authorization Code is required';
    
    if (!employeeIdCard) newErrors.employeeIdCard = 'Employee ID Card upload is required';
    if (!hrAuthLetter) newErrors.hrAuthLetter = 'HR Sourcing Authorization Letter is required';

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

    if (!declared) newErrors.declared = 'You must accept the official administrator declaration';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          name,
          employeeId,
          email,
          mobile,
          designation,
          authCode,
          employeeIdCard,
          hrAuthLetter,
          password
        };
        await onSubmit(payload);
        setSuccess(true);
      } catch {
        // Handled globally
      }
    }
  };

  if (success) {
    return (
      <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-10 shadow-2xl text-center font-body flex flex-col items-center">
        
        {/* Visual purple check badge */}
        <div className="w-20 h-20 rounded-full bg-purple-500/10 border-2 border-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/10 mb-8 flex-shrink-0 animate-scaleUp">
          <CheckCircle className="w-10 h-10 text-purple-400 animate-pulse" />
        </div>

        {/* Headings */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 uppercase tracking-wide">
          Admin Request Logged
        </h2>
        <span className="text-xs text-purple-400 font-mono uppercase tracking-widest leading-none">
          HR Administration Onboarding
        </span>

        {/* Summary profile table */}
        <div className="mt-8 p-5 bg-steel-900/30 border border-steel-700/40 rounded-xl max-w-lg w-full text-left space-y-3.5">
          <div className="flex justify-between border-b border-steel-700/50 pb-2">
            <span className="text-xs text-slate-400">Administrator Name:</span>
            <span className="text-xs font-bold text-white text-right">{name}</span>
          </div>
          <div className="flex justify-between border-b border-steel-700/50 pb-2">
            <span className="text-xs text-slate-400">Employee ID:</span>
            <span className="text-xs font-mono font-bold text-white text-right">{employeeId}</span>
          </div>
          <div className="flex justify-between border-b border-steel-700/50 pb-2">
            <span className="text-xs text-slate-400">Official Designation:</span>
            <span className="text-xs font-semibold text-purple-400 text-right">{designation}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-xs text-slate-400">Official Email:</span>
            <span className="text-xs font-medium text-white text-right">{email}</span>
          </div>
        </div>

        {/* Informative description texts */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-8 leading-relaxed font-normal">
          Your portal Administrator authorization request has been logged successfully. Since this access tier allows portal management, membership configuration, and security settings, review is mandatory.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-3 leading-relaxed font-normal">
          Our senior security supervisors are verifying your HR Authorization code and credentials. You will receive an activation email at <span className="font-semibold text-slate-300">{email}</span> once approved.
        </p>

        {/* Pushing back to login page */}
        <button
          onClick={() => navigate('/login')}
          type="button"
          className="mt-10 py-3 px-8 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-600/20 hover:scale-105 transition-all duration-200 focus:outline-none"
        >
          Return to Portal Login
        </button>

      </div>
    );
  }

  return (
    <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl font-body">
      
      {/* Header Info */}
      <div className="border-b border-steel-700/60 pb-4 mb-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400">portal administrator</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
          Admin Access Registration
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Provide your employee credentials, secure auth codes, and compliance files to register.
        </p>
      </div>

      <form onSubmit={handleAdminSubmit} className="space-y-6">
        
        {/* SECTION 1: Core Profiles */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-steel-700 pb-2">
            Administrator Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name-admin" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                id="name-admin"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => { const n = { ...prev }; delete n.name; return n; });
                }}
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
              <label htmlFor="employeeId-admin" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Employee ID *
              </label>
              <input
                id="employeeId-admin"
                type="text"
                required
                value={employeeId}
                onChange={(e) => {
                  setEmployeeId(e.target.value);
                  if (errors.employeeId) setErrors((prev) => { const n = { ...prev }; delete n.employeeId; return n; });
                }}
                placeholder="e.g. TS-01912"
                className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.employeeId ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
              {errors.employeeId && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.employeeId}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email-admin" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Official Email *
              </label>
              <input
                id="email-admin"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => { const n = { ...prev }; delete n.email; return n; });
                }}
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
              <label htmlFor="mobile-admin" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Mobile Number *
              </label>
              <input
                id="mobile-admin"
                type="tel"
                required
                maxLength={10}
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  if (errors.mobile) setErrors((prev) => { const n = { ...prev }; delete n.mobile; return n; });
                }}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="designation-admin" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Official Designation *
              </label>
              <input
                id="designation-admin"
                type="text"
                required
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                  if (errors.designation) setErrors((prev) => { const n = { ...prev }; delete n.designation; return n; });
                }}
                placeholder="e.g. Sourcing Director"
                className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.designation ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
              {errors.designation && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.designation}</p>
              )}
            </div>

            {/* Masked Authorization Code with show/hide toggle */}
            <div>
              <label htmlFor="authCode-admin" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Portal HR Authorization Code *
              </label>
              <div className="relative">
                <input
                  id="authCode-admin"
                  type={showAuthCode ? 'text' : 'password'}
                  required
                  value={authCode}
                  onChange={(e) => {
                    setAuthCode(e.target.value);
                    if (errors.authCode) setErrors((prev) => { const n = { ...prev }; delete n.authCode; return n; });
                  }}
                  placeholder="Secret security token"
                  className={`block w-full px-4 pr-10 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                    errors.authCode ? 'border-red-500' : 'border-steel-700/80'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowAuthCode(!showAuthCode)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                >
                  {showAuthCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.authCode && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.authCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Document Upload Zones */}
        <div className="space-y-5 pt-4 border-t border-steel-700/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-steel-700 pb-2">
            Verification Files
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FileUploadZone
              label="Employee ID Card"
              required={true}
              fileName={employeeIdCard}
              onUpload={(name) => {
                setEmployeeIdCard(name);
                if (errors.employeeIdCard) setErrors((prev) => { const n = { ...prev }; delete n.employeeIdCard; return n; });
              }}
              onRemove={() => setEmployeeIdCard(null)}
            />

            <FileUploadZone
              label="HR Authorization Letter"
              required={true}
              fileName={hrAuthLetter}
              onUpload={(name) => {
                setHrAuthLetter(name);
                if (errors.hrAuthLetter) setErrors((prev) => { const n = { ...prev }; delete n.hrAuthLetter; return n; });
              }}
              onRemove={() => setHrAuthLetter(null)}
            />
          </div>

          {(errors.employeeIdCard || errors.hrAuthLetter) && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2 animate-fadeIn font-normal">
              <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="leading-snug space-y-1">
                {errors.employeeIdCard && <p>{errors.employeeIdCard}</p>}
                {errors.hrAuthLetter && <p>{errors.hrAuthLetter}</p>}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Password Credentials */}
        <div className="space-y-4 pt-4 border-t border-steel-700/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-steel-700 pb-2">
            Secure Admin Password
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="password-admin" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Create Password *
              </label>
              <div className="relative">
                <input
                  id="password-admin"
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
              <label htmlFor="confirmPassword-admin" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword-admin"
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
        </div>

        {/* SECTION 4: Compliance checks */}
        <div className="space-y-4 pt-4 border-t border-steel-700/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-steel-700 pb-2">
            Compliance & Declaration
          </h3>
          
          <div className="flex items-start">
            <input
              id="declaration-checkbox-admin"
              type="checkbox"
              checked={declared}
              onChange={(e) => setDeclared(e.target.checked)}
              className="h-4.5 w-4.5 mt-0.5 rounded bg-steel-900 border-steel-700 text-purple-500 focus:ring-purple-500/20 focus:ring-offset-0 focus:outline-none"
            />
            <label htmlFor="declaration-checkbox-admin" className="ml-2.5 block text-xs sm:text-sm text-slate-400 leading-normal select-none font-normal">
              I hereby declare that I am an active HR / Sourcing Admin staff of Tata Steel. I confirm that all entered employee details, designation rankings, and HR authorization letters are authentic. I understand my profile access is subject to double Super Admin audit and clearance. *
            </label>
          </div>
          {errors.declared && (
            <p className="text-red-400 text-xs mt-1 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.declared}</p>
          )}
        </div>

        {/* Error message from parent onSubmit response */}
        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2 animate-fadeIn font-normal">
            <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Submit Actions Button */}
        <div className="pt-6 border-t border-steel-700/60 flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center py-2.5 px-8 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-600/20 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              'Submit Admin Registration'
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
