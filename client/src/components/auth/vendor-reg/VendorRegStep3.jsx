/**
 * @fileoverview Step 3 of Vendor Registration — Document uploads, password strength checkers, terms of service, and successful reference screen.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Upload, Eye, EyeOff, Loader2, FileText, CheckCircle } from 'lucide-react';

// Unified Sub-component for individual Drag & Drop File Upload Box
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
        {required ? (
          <span className="px-1.5 py-0.5 text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 rounded-md uppercase font-semibold tracking-widest">Required</span>
        ) : (
          <span className="text-[10px] text-slate-500 font-normal">Optional</span>
        )}
      </div>

      <div className="relative border border-dashed border-steel-600 hover:border-steel-500 bg-steel-900/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors">
        {fileName ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2.5 min-w-0">
              <FileText className="w-5 h-5 text-tata-gold flex-shrink-0" />
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

export default function VendorRegStep3({ data = {}, onChange, onBack, onSubmit, loading, error }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tocChecked, setTocChecked] = useState(false);
  const [errors, setErrors] = useState({});

  // Success Confirmation states
  const [success, setSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState('');

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

  const handleFileUpload = (docType, fileName) => {
    // Clear document error
    if (errors[docType]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[docType];
        return next;
      });
    }
    onChange({ [docType]: fileName });
  };

  const handleFileRemove = (docType) => {
    onChange({ [docType]: null });
  };

  const validateStep = () => {
    const newErrors = {};

    // Mandatory document checks
    if (!data.gstCertificate) newErrors.gstCertificate = 'GST Certificate upload is required';
    if (!data.panCard) newErrors.panCard = 'PAN Card upload is required';

    // Password validation
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

    if (!tocChecked) {
      newErrors.toc = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        // Build final registration payload
        await onSubmit({ ...data, password });
        
        // Generate dynamic registration reference number
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const ref = `TS-VEN-${dateStr}-${randomNum}`;
        
        setRefNumber(ref);
        setSuccess(true);
      } catch {
        // Parent component processes errors inside raw props
      }
    }
  };

  // Render successful confirmation screen on completion
  if (success) {
    return (
      <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-10 shadow-2xl text-center font-body flex flex-col items-center">
        
        {/* Animated Checkmark Circle */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-8 flex-shrink-0 animate-scaleUp">
          <CheckCircle className="w-10 h-10 text-emerald-400 animate-pulse" />
        </div>

        {/* Successful Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 uppercase tracking-wide">
          Application Under Review
        </h2>
        <span className="text-xs text-tata-gold font-mono uppercase tracking-widest leading-none">
          Tata Steel Colors vendor Portal
        </span>

        {/* Dynamic reference number display */}
        <div className="mt-8 p-4 rounded-xl bg-steel-900 border border-steel-700/60 text-center max-w-sm w-full select-all">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block leading-none">Registration Reference ID</span>
          <span className="text-lg font-mono font-bold text-white block mt-2 tracking-wider">{refNumber}</span>
        </div>

        {/* Summary profile metrics */}
        <div className="mt-8 p-5 bg-steel-900/30 border border-steel-700/40 rounded-xl max-w-lg w-full text-left space-y-3.5">
          <div className="flex justify-between border-b border-steel-700/50 pb-2">
            <span className="text-xs text-slate-400">Legal Company Name:</span>
            <span className="text-xs font-bold text-white text-right">{data.companyName}</span>
          </div>
          <div className="flex justify-between border-b border-steel-700/50 pb-2">
            <span className="text-xs text-slate-400">Primary Sourcing Email:</span>
            <span className="text-xs font-medium text-white text-right">{data.officialEmail}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-xs text-slate-400">Registered Sourcing Sectors:</span>
            <span className="text-xs font-medium text-tata-gold text-right">{data.departments?.length || 0} Department(s) selected</span>
          </div>
        </div>

        {/* Explanatory next-steps paragraphs */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-8 leading-relaxed font-normal">
          Your partner registration request has been successfully recorded in our central procurement index. Sourcing managers and compliance officers will review your documents and tax identifiers.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-3 leading-relaxed font-normal">
          An activation notice containing further authorization instructions will be dispatched to <span className="font-semibold text-slate-300">{data.officialEmail}</span> within 3-5 business days.
        </p>

        {/* Return to Home CTA button */}
        <button
          onClick={() => navigate('/')}
          type="button"
          className="mt-10 py-3 px-8 rounded-xl text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg shadow-tata-blue/20 hover:scale-105 hover:shadow-tata-blue/35 transition-all duration-200 focus:outline-none"
        >
          Return to Portal Home
        </button>

      </div>
    );
  }

  return (
    <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl font-body">
      
      {/* Step Header */}
      <div className="border-b border-steel-700/60 pb-4 mb-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">Step 3 of 3</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
          Verification Uploads & Security
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Attach corporate compliance documents and configure a secure workspace password.
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="space-y-6">
        
        {/* SECTION 1: Document Upload Zones */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            Verification Documents
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FileUploadZone
              label="GST Certificate"
              required={true}
              fileName={data.gstCertificate}
              onUpload={(name) => handleFileUpload('gstCertificate', name)}
              onRemove={() => handleFileRemove('gstCertificate')}
            />
            
            <FileUploadZone
              label="PAN Card"
              required={true}
              fileName={data.panCard}
              onUpload={(name) => handleFileUpload('panCard', name)}
              onRemove={() => handleFileRemove('panCard')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FileUploadZone
              label="MSME Certificate"
              required={false}
              fileName={data.msmeCertificate}
              onUpload={(name) => handleFileUpload('msmeCertificate', name)}
              onRemove={() => handleFileRemove('msmeCertificate')}
            />

            <FileUploadZone
              label="Incorporation Cert (COI)"
              required={false}
              fileName={data.coi}
              onUpload={(name) => handleFileUpload('coi', name)}
              onRemove={() => handleFileRemove('coi')}
            />

            <FileUploadZone
              label="Cancelled Cheque"
              required={false}
              fileName={data.cancelledCheque}
              onUpload={(name) => handleFileUpload('cancelledCheque', name)}
              onRemove={() => handleFileRemove('cancelledCheque')}
            />
          </div>

          {(errors.gstCertificate || errors.panCard) && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2 animate-fadeIn">
              <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="leading-snug space-y-1">
                {errors.gstCertificate && <p>{errors.gstCertificate}</p>}
                {errors.panCard && <p>{errors.panCard}</p>}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Password Sourcing and Strength Indicator */}
        <div className="space-y-4 pt-4 border-t border-steel-700/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            Secure Password Credentials
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="password-reg" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Workspace Password *
              </label>
              <div className="relative">
                <input
                  id="password-reg"
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

              {/* Password strength indicators */}
              {password && (
                <div className="mt-2.5 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-slate-400">Security Rating:</span>
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
              <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
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

        {/* SECTION 3: Terms of Service */}
        <div className="space-y-3 pt-4 border-t border-steel-700/50">
          <div className="flex items-start">
            <input
              id="toc-checkbox"
              type="checkbox"
              checked={tocChecked}
              onChange={(e) => setTocChecked(e.target.checked)}
              className="h-4.5 w-4.5 mt-0.5 rounded bg-steel-900 border-steel-700 text-tata-blue focus:ring-tata-blue/20 focus:ring-offset-0 focus:outline-none"
            />
            <label htmlFor="toc-checkbox" className="ml-2.5 block text-xs sm:text-sm text-slate-400 leading-normal font-normal select-none">
              I hereby declare that all supplied corporate documents and GSTIN/PAN records are valid. I agree to comply with the Tata Steel Supplier Code of Conduct and authorize verification checks. *
            </label>
          </div>
          {errors.toc && (
            <p className="text-red-400 text-xs mt-1 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.toc}</p>
          )}
        </div>

        {/* Error message from parent onSubmit response */}
        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Submit Actions Bar */}
        <div className="pt-6 border-t border-steel-700/60 flex items-center justify-between">
          <button
            type="button"
            disabled={loading}
            onClick={onBack}
            className="flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-semibold border border-steel-600 bg-steel-800 text-slate-300 hover:bg-steel-700 hover:border-steel-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Contact & Address
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center py-2.5 px-8 rounded-xl text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg shadow-tata-blue/20 hover:scale-105 hover:shadow-tata-blue/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Profile...
              </>
            ) : (
              'Submit Registration'
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
