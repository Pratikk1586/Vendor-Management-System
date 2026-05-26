/**
 * @fileoverview Step 2 of Vendor Registration — Primary and alternate contacts, corporate address, turnovers, and operational tags.
 */

import { useState } from 'react';
import { ArrowLeft, ArrowRight, AlertCircle, Plus, X, Contact2, Mail, Phone, MapPin } from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal'
];

export default function VendorRegStep2({ data = {}, onChange, onNext, onBack }) {
  const [tagInput, setTagInput] = useState('');
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

  // Add operational location chip tag
  const addTag = () => {
    const cleanTag = tagInput.trim().replace(/,/g, '');
    if (cleanTag) {
      const currentTags = data.operationalLocations || [];
      if (!currentDeDupe(currentTags, cleanTag)) {
        handleFieldChange('operationalLocations', [...currentTags, cleanTag]);
      }
      setTagInput('');
    }
  };

  const currentDeDupe = (arr, val) => {
    return arr.some((item) => item.toLowerCase() === val.toLowerCase());
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (indexToRemove) => {
    const currentTags = data.operationalLocations || [];
    const updatedTags = currentTags.filter((_, idx) => idx !== indexToRemove);
    handleFieldChange('operationalLocations', updatedTags);
  };

  const validateStep = () => {
    const newErrors = {};

    // Contact validation
    if (!data.primaryContactName?.trim()) newErrors.primaryContactName = 'Primary contact name is required';
    if (!data.designation?.trim()) newErrors.designation = 'Contact designation is required';
    
    if (!data.officialEmail) {
      newErrors.officialEmail = 'Official email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.officialEmail)) {
      newErrors.officialEmail = 'Enter a valid corporate email format';
    }

    if (!data.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(data.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }

    if (data.altMobile && !/^\d{10}$/.test(data.altMobile)) {
      newErrors.altMobile = 'Alternate mobile must be exactly 10 digits';
    }

    // Address validation
    if (!data.street?.trim()) newErrors.street = 'Street address is required';
    if (!data.city?.trim()) newErrors.city = 'City is required';
    if (!data.state) newErrors.state = 'Select an Indian state';
    
    if (!data.pinCode) {
      newErrors.pinCode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(data.pinCode)) {
      newErrors.pinCode = 'PIN code must be exactly 6 digits';
    }

    if (!data.annualTurnover) newErrors.annualTurnover = 'Select an annual turnover bracket';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <div className="w-full bg-steel-800 border border-steel-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl font-body">
      
      {/* Step Header */}
      <div className="border-b border-steel-700/60 pb-4 mb-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">Step 2 of 3</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
          Contact & Address Specifications
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Define your primary communication details, turn-over ranges, and operations address.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        
        {/* SECTION 1: Contact Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            Primary Contact Person
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="primaryContactName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Contact2 className="w-4 h-4" />
                </div>
                <input
                  id="primaryContactName"
                  type="text"
                  required
                  value={data.primaryContactName || ''}
                  onChange={(e) => handleFieldChange('primaryContactName', e.target.value)}
                  placeholder="e.g. Sanjay Sen"
                  className={`block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                    errors.primaryContactName ? 'border-red-500' : 'border-steel-700/80'
                  }`}
                />
              </div>
              {errors.primaryContactName && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.primaryContactName}</p>
              )}
            </div>

            <div>
              <label htmlFor="designation" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Designation *
              </label>
              <input
                id="designation"
                type="text"
                required
                value={data.designation || ''}
                onChange={(e) => handleFieldChange('designation', e.target.value)}
                placeholder="e.g. Sourcing Manager"
                className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.designation ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
              {errors.designation && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.designation}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="officialEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Official Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="officialEmail"
                  type="email"
                  required
                  value={data.officialEmail || ''}
                  onChange={(e) => handleFieldChange('officialEmail', e.target.value)}
                  placeholder="e.g. contact@apexmetals.com"
                  className={`block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                    errors.officialEmail ? 'border-red-500' : 'border-steel-700/80'
                  }`}
                />
              </div>
              {errors.officialEmail && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.officialEmail}</p>
              )}
            </div>

            <div>
              <label htmlFor="mobile" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Mobile Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="mobile"
                  type="tel"
                  required
                  maxLength={10}
                  value={data.mobile || ''}
                  onChange={(e) => handleFieldChange('mobile', e.target.value)}
                  placeholder="10-digit Phone Number"
                  className={`block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                    errors.mobile ? 'border-red-500' : 'border-steel-700/80'
                  }`}
                />
              </div>
              {errors.mobile && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.mobile}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label htmlFor="altContactName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Alternate Contact Name (Optional)
              </label>
              <input
                id="altContactName"
                type="text"
                value={data.altContactName || ''}
                onChange={(e) => handleFieldChange('altContactName', e.target.value)}
                placeholder="e.g. Amit Sen"
                className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150"
              />
            </div>

            <div>
              <label htmlFor="altMobile" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Alternate Mobile (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="altMobile"
                  type="tel"
                  maxLength={10}
                  value={data.altMobile || ''}
                  onChange={(e) => handleFieldChange('altMobile', e.target.value)}
                  placeholder="10-digit Phone Number"
                  className={`block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                    errors.altMobile ? 'border-red-500' : 'border-steel-700/80'
                  }`}
                />
              </div>
              {errors.altMobile && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.altMobile}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Address Specification */}
        <div className="space-y-4 pt-4 border-t border-steel-700/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            Corporate & Operating Address
          </h3>

          <div>
            <label htmlFor="street" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Street Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                id="street"
                type="text"
                required
                value={data.street || ''}
                onChange={(e) => handleFieldChange('street', e.target.value)}
                placeholder="Plot / Road / Block / Building details"
                className={`block w-full pl-10 pr-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.street ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
            </div>
            {errors.street && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.street}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                City *
              </label>
              <input
                id="city"
                type="text"
                required
                value={data.city || ''}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                placeholder="e.g. Jamshedpur"
                className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.city ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
              {errors.city && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                State *
              </label>
              <select
                id="state"
                required
                value={data.state || ''}
                onChange={(e) => handleFieldChange('state', e.target.value)}
                className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.state ? 'border-red-500' : 'border-steel-700/80'
                }`}
              >
                <option value="" disabled>Select State</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st} className="bg-steel-800">{st}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.state}</p>
              )}
            </div>

            <div>
              <label htmlFor="pinCode" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                PIN Code *
              </label>
              <input
                id="pinCode"
                type="text"
                required
                maxLength={6}
                value={data.pinCode || ''}
                onChange={(e) => handleFieldChange('pinCode', e.target.value)}
                placeholder="6-digit PIN Code"
                className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.pinCode ? 'border-red-500' : 'border-steel-700/80'
                }`}
              />
              {errors.pinCode && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.pinCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: Turnover and Operational Tags */}
        <div className="space-y-4 pt-4 border-t border-steel-700/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-tata-gold border-b border-steel-700 pb-2">
            Revenue & Operations Logistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Annual Turnover select bracket */}
            <div>
              <label htmlFor="annualTurnover" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Annual Turnover Bracket *
              </label>
              <select
                id="annualTurnover"
                required
                value={data.annualTurnover || ''}
                onChange={(e) => handleFieldChange('annualTurnover', e.target.value)}
                className={`block w-full px-4 py-2.5 rounded-xl bg-steel-900 border text-white text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150 ${
                  errors.annualTurnover ? 'border-red-500' : 'border-steel-700/80'
                }`}
              >
                <option value="" disabled>Select Bracket</option>
                <option value="Under ₹50L" className="bg-steel-800">Under ₹50 Lakhs</option>
                <option value="₹50L - ₹2Cr" className="bg-steel-800">₹50 Lakhs - ₹2 Crores</option>
                <option value="₹2Cr - ₹10Cr" className="bg-steel-800">₹2 Crores - ₹10 Crores</option>
                <option value="₹10Cr - ₹50Cr" className="bg-steel-800">₹10 Crores - ₹50 Crores</option>
                <option value="Above ₹50Cr" className="bg-steel-800">Above ₹50 Crores</option>
              </select>
              {errors.annualTurnover && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" /> {errors.annualTurnover}</p>
              )}
            </div>

            {/* Tag Input for Operational Locations */}
            <div>
              <label htmlFor="operationalLocations" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Operational Locations (Enter to add)
              </label>
              <div className="flex space-x-2">
                <input
                  id="operationalLocations"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="e.g. Joda, Kalinganagar"
                  className="block flex-1 px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors duration-150"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-steel-700 hover:bg-steel-600 text-slate-200 border border-steel-600 hover:border-steel-500 px-4 rounded-xl flex items-center justify-center transition-colors focus:outline-none"
                >
                  <Plus className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Tag Chips Container */}
              <div className="flex flex-wrap gap-2 mt-3 select-none">
                {(data.operationalLocations || []).map((loc, idx) => (
                  <span
                    key={`${loc}-${idx}`}
                    className="inline-flex items-center space-x-1.5 bg-steel-900/80 border border-steel-700 px-3 py-1 rounded-full text-xs font-medium text-slate-300 shadow-sm"
                  >
                    <span>{loc}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(idx)}
                      className="text-slate-500 hover:text-red-400 transition-colors focus:outline-none"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Bar */}
        <div className="pt-6 border-t border-steel-700/60 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-semibold border border-steel-600 bg-steel-800 text-slate-300 hover:bg-steel-700 hover:border-steel-500 transition-all focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Corporate Profile
          </button>
          
          <button
            type="submit"
            className="flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-semibold bg-gradient-to-r from-tata-blue to-tata-light text-white shadow-lg shadow-tata-blue/20 hover:scale-105 hover:shadow-tata-blue/35 transition-all duration-200 focus:outline-none"
          >
            Document Uploads
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </form>
    </div>
  );
}
