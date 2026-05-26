/**
 * @fileoverview Step 2 of Department Head Registration — ID & authorization letter uploads, declarations, and pending confirmation screen.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { DEPARTMENTS } from '../../../constants/departments';

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
              <FileText className="w-5 h-5 text-emerald-400 flex-shrink-0" />
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

export default function DeptHeadRegStep2({ data = {}, onChange, onBack, onSubmit, loading, error }) {
  const navigate = useNavigate();
  const [declared, setDeclared] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileUpload = (docType, fileName) => {
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

    if (!data.employeeCard) newErrors.employeeCard = 'Employee ID Card upload is required';
    if (!data.authorizationLetter) newErrors.authorizationLetter = 'HR Sourcing Authorization Letter is required';
    if (!data.idProof) newErrors.idProof = 'Government ID Proof is required';
    if (!declared) newErrors.declared = 'You must accept the official staff declaration';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDeptSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        await onSubmit(data);
        setSuccess(true);
      } catch {
        // Handled in parents
      }
    }
  };

  // Find human readable department name
  const selectedDeptObj = DEPARTMENTS.find((d) => d.id === data.department);
  const deptLabel = selectedDeptObj ? selectedDeptObj.name : 'Procurement';

  if (success) {
    return (
      <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-10 shadow-2xl text-center font-body flex flex-col items-center">
        
        {/* Visual emerald check badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-8 flex-shrink-0 animate-scaleUp">
          <CheckCircle className="w-10 h-10 text-emerald-400 animate-pulse" />
        </div>

        {/* Headings */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 uppercase tracking-wide">
          Account Pending Approval
        </h2>
        <span className="text-xs text-emerald-400 font-mono uppercase tracking-widest leading-none">
          Staff Verification Process
        </span>

        {/* Summary profile table */}
        <div className="mt-8 p-5 bg-steel-900/30 border border-steel-700/40 rounded-xl max-w-lg w-full text-left space-y-3.5">
          <div className="flex justify-between border-b border-steel-700/50 pb-2">
            <span className="text-xs text-slate-400">Employee Name:</span>
            <span className="text-xs font-bold text-white text-right">{data.name}</span>
          </div>
          <div className="flex justify-between border-b border-steel-700/50 pb-2">
            <span className="text-xs text-slate-400">Employee ID:</span>
            <span className="text-xs font-mono font-bold text-white text-right">{data.employeeId}</span>
          </div>
          <div className="flex justify-between border-b border-steel-700/50 pb-2">
            <span className="text-xs text-slate-400">Registered Department:</span>
            <span className="text-xs font-semibold text-emerald-400 text-right">{deptLabel}</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-xs text-slate-400">Official Email:</span>
            <span className="text-xs font-medium text-white text-right">{data.email}</span>
          </div>
        </div>

        {/* Informative description texts */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-8 leading-relaxed font-normal">
          Your Department Head authorization request has been logged successfully. Since this access tier allows tender publication and commercial bid evaluation, double-verification is active.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mt-3 leading-relaxed font-normal">
          Our administrative portal managers and HR personnel are reviewing your Sourcing Authorization Letter. You will receive an activation email at <span className="font-semibold text-slate-300">{data.email}</span> once approved.
        </p>

        {/* Pushing back to login page */}
        <button
          onClick={() => navigate('/login')}
          type="button"
          className="mt-10 py-3 px-8 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/20 hover:scale-105 transition-all duration-200 focus:outline-none"
        >
          Return to Portal Login
        </button>

      </div>
    );
  }

  return (
    <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl font-body">
      
      {/* Step Header */}
      <div className="border-b border-steel-700/60 pb-4 mb-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">Step 2 of 2</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
          Verification Documentation
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Attach corporate staff credentials to verify official department authorization status.
        </p>
      </div>

      <form onSubmit={handleDeptSubmit} className="space-y-6">
        
        {/* SECTION 1: Document Upload Zones */}
        <div className="space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-steel-700 pb-2">
            Verification Files
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FileUploadZone
              label="Employee ID Card"
              required={true}
              fileName={data.employeeCard}
              onUpload={(name) => handleFileUpload('employeeCard', name)}
              onRemove={() => handleFileRemove('employeeCard')}
            />

            <FileUploadZone
              label="Authorization Letter"
              required={true}
              fileName={data.authorizationLetter}
              onUpload={(name) => handleFileUpload('authorizationLetter', name)}
              onRemove={() => handleFileRemove('authorizationLetter')}
            />

            <FileUploadZone
              label="Government ID Proof"
              required={true}
              fileName={data.idProof}
              onUpload={(name) => handleFileUpload('idProof', name)}
              onRemove={() => handleFileRemove('idProof')}
            />
          </div>

          {(errors.employeeCard || errors.authorizationLetter || errors.idProof) && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2 animate-fadeIn">
              <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="leading-snug space-y-1 font-normal">
                {errors.employeeCard && <p>{errors.employeeCard}</p>}
                {errors.authorizationLetter && <p>{errors.authorizationLetter}</p>}
                {errors.idProof && <p>{errors.idProof}</p>}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Official Declaration Checkbox */}
        <div className="space-y-4 pt-4 border-t border-steel-700/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-steel-700 pb-2">
            Declaration & Compliance
          </h3>
          
          <div className="flex items-start">
            <input
              id="declaration-checkbox"
              type="checkbox"
              checked={declared}
              onChange={(e) => setDeclared(e.target.checked)}
              className="h-4.5 w-4.5 mt-0.5 rounded bg-steel-900 border-steel-700 text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-0 focus:outline-none"
            />
            <label htmlFor="declaration-checkbox" className="ml-2.5 block text-xs sm:text-sm text-slate-400 leading-normal select-none font-normal">
              I hereby declare that I am an active staff member of Tata Steel. I confirm that all uploaded employee badges, authorization letters, and ID cards are authentic. I understand my profile access is subject to direct HR review and Sourcing Head authorization. *
            </label>
          </div>
          {errors.declared && (
            <p className="text-red-400 text-xs mt-1 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.declared}</p>
          )}
        </div>

        {/* Error message from parent onSubmit response */}
        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-4.5 h-4.5 text-red-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Buttons Bar */}
        <div className="pt-6 border-t border-steel-700/60 flex items-center justify-between">
          <button
            type="button"
            disabled={loading}
            onClick={onBack}
            className="flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-semibold border border-steel-600 bg-steel-800 text-slate-300 hover:bg-steel-700 hover:border-steel-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Staff Details
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center py-2.5 px-8 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/20 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registering...
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
