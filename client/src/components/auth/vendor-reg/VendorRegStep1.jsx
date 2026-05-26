/**
 * @fileoverview Step 1 of Vendor Registration — Corporate profile details, tax identifiers, and sector focus.
 */

import { useState } from 'react';
import { ArrowRight, AlertCircle, Building, Hash } from 'lucide-react';
import { DEPARTMENTS } from '../../../constants/departments';

export default function VendorRegStep1({ data = {}, onChange, onNext }) {
  const [errors, setErrors] = useState({});

  const currentYear = new Date().getFullYear();

  // Validate GST Number format (Indian standard GSTIN: 15 characters)
  const validateGST = (gst) => {
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return regex.test(gst);
  };

  // Validate PAN Number format (Indian standard PAN: 10 characters)
  const validatePAN = (pan) => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(pan);
  };

  const handleFieldChange = (field, value) => {
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    onChange({ [field]: value });
  };

  // Handle department checkbox toggles
  const handleDeptToggle = (deptId) => {
    const currentDepts = data.departments || [];
    let updatedDepts;
    if (currentDepts.includes(deptId)) {
      updatedDepts = currentDepts.filter((id) => id !== deptId);
    } else {
      updatedDepts = [...currentDepts, deptId];
    }
    handleFieldChange('departments', updatedDepts);
  };

  const validateStep = () => {
    const newErrors = {};

    if (!data.companyName?.trim()) newErrors.companyName = 'Company name is required';
    
    if (!data.gstNumber) {
      newErrors.gstNumber = 'GSTIN is required';
    } else if (!validateGST(data.gstNumber.toUpperCase())) {
      newErrors.gstNumber = 'Invalid GSTIN format (e.g. 22AAAAA0000A1Z5)';
    }

    if (!data.panNumber) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!validatePAN(data.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Invalid PAN format (e.g. ABCDE1234F)';
    }

    const year = parseInt(data.yearEstablished, 10);
    if (!data.yearEstablished) {
      newErrors.yearEstablished = 'Establishment year is required';
    } else if (isNaN(year) || year < 1900 || year > currentYear) {
      newErrors.yearEstablished = `Establishment year must be between 1900 and ${currentYear}`;
    }

    if (!data.companyType) newErrors.companyType = 'Select a company ownership type';
    if (!data.industrySector) newErrors.industrySector = 'Select an industry sector';
    if (!data.departments || data.departments.length === 0) {
      newErrors.departments = 'Select at least one department checkbox';
    }

    if (data.website && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(data.website)) {
      newErrors.website = 'Enter a valid URL (including http/https)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Auto-format keys to uppercase
      onChange({
        gstNumber: data.gstNumber.toUpperCase(),
        panNumber: data.panNumber.toUpperCase(),
      });
      onNext();
    }
  };

  return (
    <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl font-body">
      
      {/* Step Header */}
      <div className="border-b border-steel-700/60 pb-4 mb-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">Step 1 of 3</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
          Corporate Information
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Provide your legal corporate credentials and choose operational departments.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        
        {/* Row 1: Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Legal Company Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Building className="w-4 h-4" />
            </div>
            <input
              id="companyName"
              type="text"
              required
              value={data.companyName || ''}
              onChange={(e) => handleFieldChange('companyName', e.target.value)}
              placeholder="e.g. Apex Metallurgicals Pvt Ltd"
              className={`block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.companyName ? 'border-red-500' : 'border-steel-700/80'
              }`}
            />
          </div>
          {errors.companyName && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.companyName}</p>
          )}
        </div>

        {/* Row 2: GST and PAN Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="gstNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              GSTIN Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Hash className="w-4 h-4" />
              </div>
              <input
                id="gstNumber"
                type="text"
                required
                maxLength={15}
                value={data.gstNumber || ''}
                onChange={(e) => handleFieldChange('gstNumber', e.target.value)}
                placeholder="15-character GST Code"
                className={`block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 uppercase ${
                  errors.gstNumber ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
            </div>
            {errors.gstNumber && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.gstNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="panNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              PAN Card Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Hash className="w-4 h-4" />
              </div>
              <input
                id="panNumber"
                type="text"
                required
                maxLength={10}
                value={data.panNumber || ''}
                onChange={(e) => handleFieldChange('panNumber', e.target.value)}
                placeholder="10-character PAN Code"
                className={`block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 uppercase ${
                  errors.panNumber ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
            </div>
            {errors.panNumber && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.panNumber}</p>
            )}
          </div>
        </div>

        {/* Row 3: Year established, Company Type, Industry Sector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="yearEstablished" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Year Established *
            </label>
            <input
              id="yearEstablished"
              type="number"
              required
              min={1900}
              max={currentYear}
              value={data.yearEstablished || ''}
              onChange={(e) => handleFieldChange('yearEstablished', e.target.value)}
              placeholder="e.g. 1995"
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.yearEstablished ? 'border-red-500' : 'border-steel-700/80'
              }`}
            />
            {errors.yearEstablished && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.yearEstablished}</p>
            )}
          </div>

          <div>
            <label htmlFor="companyType" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Company Type *
            </label>
            <select
              id="companyType"
              required
              value={data.companyType || ''}
              onChange={(e) => handleFieldChange('companyType', e.target.value)}
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.companyType ? 'border-red-500' : 'border-steel-700/80'
              }`}
            >
              <option value="" disabled className="text-slate-500">Select Type</option>
              <option value="Proprietary" className="bg-steel-800">Proprietary</option>
              <option value="Partnership" className="bg-steel-800">Partnership</option>
              <option value="Private Limited" className="bg-steel-800">Private Limited</option>
              <option value="Public Limited" className="bg-steel-800">Public Limited</option>
            </select>
            {errors.companyType && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.companyType}</p>
            )}
          </div>

          <div>
            <label htmlFor="industrySector" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Industry Sector *
            </label>
            <select
              id="industrySector"
              required
              value={data.industrySector || ''}
              onChange={(e) => handleFieldChange('industrySector', e.target.value)}
              className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                errors.industrySector ? 'border-red-500' : 'border-steel-700/80'
              }`}
            >
              <option value="" disabled className="text-slate-500">Select Sector</option>
              <option value="Steel" className="bg-steel-800">Steel & Metallurgy</option>
              <option value="Manufacturing" className="bg-steel-800">Manufacturing</option>
              <option value="Logistics" className="bg-steel-800">Logistics & Freight</option>
              <option value="IT Services" className="bg-steel-800">IT Services</option>
              <option value="Construction" className="bg-steel-800">Civil & Construction</option>
              <option value="Electrical" className="bg-steel-800">Electrical & Machinery</option>
              <option value="Other" className="bg-steel-800">Other Sourcing</option>
            </select>
            {errors.industrySector && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.industrySector}</p>
            )}
          </div>
        </div>

        {/* Row 4: Website */}
        <div>
          <label htmlFor="website" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Company Website (Optional)
          </label>
          <input
            id="website"
            type="url"
            value={data.website || ''}
            onChange={(e) => handleFieldChange('website', e.target.value)}
            placeholder="https://www.example.com"
            className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
              errors.website ? 'border-red-500' : 'border-steel-700/80'
            }`}
          />
          {errors.website && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.website}</p>
          )}
        </div>

        {/* Row 5: Departments Checklist */}
        <div className="pt-4 border-t border-steel-700/50">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Register for Departments *
          </label>
          <p className="text-xs text-slate-400 mb-4 leading-normal font-normal">
            Choose the specific sourcing department(s) your products/services cater to.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {DEPARTMENTS.map((dept) => {
              const isChecked = (data.departments || []).includes(dept.id);
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => handleDeptToggle(dept.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition-all ${
                    isChecked
                      ? 'border-tata-blue bg-tata-blue/5 text-white ring-1 ring-tata-blue/30'
                      : 'border-steel-700 bg-steel-900/30 text-slate-400 hover:border-steel-600 hover:text-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="h-4 w-4 rounded bg-steel-900 border-steel-700 text-tata-blue focus:ring-tata-blue/20 focus:ring-offset-0 focus:outline-none pointer-events-none"
                  />
                  <span>{dept.name}</span>
                </button>
              );
            })}
          </div>
          {errors.departments && (
            <p className="text-red-400 text-xs mt-2.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.departments}</p>
          )}
        </div>

        {/* Submit button bar */}
        <div className="pt-6 border-t border-steel-700/60 flex justify-end">
          <button
            type="submit"
            className="flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg shadow-tata-blue/20 hover:scale-105 hover:shadow-tata-blue/35 transition-all duration-200 focus:outline-none"
          >
            Contact & Address Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </form>
    </div>
  );
}
