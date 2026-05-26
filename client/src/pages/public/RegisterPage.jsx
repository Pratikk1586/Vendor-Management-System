/**
 * @fileoverview Main registration page that switches between vendor, dept head, and admin onboarding.
 */

import { useState } from 'react';
import RoleSelector from '../../components/auth/RoleSelector';
import VendorRegStep1 from '../../components/auth/vendor-reg/VendorRegStep1';
import VendorRegStep2 from '../../components/auth/vendor-reg/VendorRegStep2';
import VendorRegStep3 from '../../components/auth/vendor-reg/VendorRegStep3';
import DeptHeadRegStep1 from '../../components/auth/depthead-reg/DeptHeadRegStep1';
import DeptHeadRegStep2 from '../../components/auth/depthead-reg/DeptHeadRegStep2';
import AdminRegForm from '../../components/auth/admin-reg/AdminRegForm';
import StepProgress from '../../components/common/StepProgress';
import { VENDOR, DEPT_HEAD, HR_ADMIN } from '../../constants/roles.js';

export default function RegisterPage() {
  const [role, setRole] = useState(VENDOR);
  const [activeStep, setActiveStep] = useState(0);

  // Separate states to hold accumulated data for each path
  const [vendorData, setVendorData] = useState({
    companyName: '',
    gstNumber: '',
    panNumber: '',
    yearEstablished: '',
    companyType: '',
    industrySector: '',
    website: '',
    departments: [],
    primaryName: '',
    primaryDesignation: '',
    primaryEmail: '',
    primaryMobile: '',
    altName: '',
    altMobile: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressPinCode: '',
    locations: [],
    turnover: '',
  });

  const [deptData, setDeptData] = useState({
    fullName: '',
    employeeId: '',
    officialEmail: '',
    mobileNumber: '',
    designation: '',
    yearsAtCompany: '',
    departmentId: '',
  });

  const [adminData, setAdminData] = useState({
    fullName: '',
    employeeId: '',
    officialEmail: '',
    mobileNumber: '',
    designation: '',
    authCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle role toggles
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setActiveStep(0);
    setError('');
  };

  // Vendor handlers
  const handleVendorChange = (fields) => {
    setVendorData((prev) => ({ ...prev, ...fields }));
  };

  const handleVendorSubmit = async () => {
    setLoading(true);
    setError('');
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  // Department Head handlers
  const handleDeptChange = (fields) => {
    setDeptData((prev) => ({ ...prev, ...fields }));
  };

  const handleDeptSubmit = async () => {
    setLoading(true);
    setError('');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  // Admin handlers
  const handleAdminChange = (fields) => {
    setAdminData((prev) => ({ ...prev, ...fields }));
  };

  const handleAdminSubmit = async () => {
    setLoading(true);
    setError('');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  // Define steps for each flow to load into the step indicator
  const getFlowSteps = () => {
    switch (role) {
      case VENDOR:
        return [
          { label: 'Corporate' },
          { label: 'Contact' },
          { label: 'Docs & Security' },
        ];
      case DEPT_HEAD:
        return [
          { label: 'Profile' },
          { label: 'Verification' },
        ];
      case HR_ADMIN:
        return [
          { label: 'Form Credentials' },
        ];
      default:
        return [];
    }
  };

  const steps = getFlowSteps();

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-4xl w-full space-y-8 flex flex-col items-center">
        
        {/* Registration Header */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-tata-gold to-tata-amber rounded-2xl flex items-center justify-center font-display text-2xl text-steel-900 font-extrabold shadow-lg shadow-tata-gold/10 mb-3 flex-shrink-0">
            TS
          </div>
          <h1 className="text-xl font-display tracking-widest text-white uppercase text-center">
            Partner Workspace Setup
          </h1>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
            Tata Steel Colors division
          </span>
        </div>

        {/* Step 1: Selector Role */}
        <div className="w-full">
          <div className="text-center mb-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">Section 1</span>
            <h3 className="text-sm font-semibold text-slate-300">Select registration profile</h3>
          </div>
          <RoleSelector value={role} onChange={handleRoleChange} />
        </div>

        {/* Step 2: Flow progress bar */}
        {steps.length > 1 && (
          <div className="w-full max-w-xl bg-steel-800/40 p-4 border border-steel-700/40 rounded-xl">
            <StepProgress steps={steps} currentStep={activeStep} />
          </div>
        )}

        {/* Step 3: Conditionally render flow forms */}
        <div className="w-full max-w-3xl">
          {role === VENDOR && (
            <>
              {activeStep === 0 && (
                <VendorRegStep1
                  data={vendorData}
                  onChange={handleVendorChange}
                  onNext={() => setActiveStep(1)}
                />
              )}
              {activeStep === 1 && (
                <VendorRegStep2
                  data={vendorData}
                  onChange={handleVendorChange}
                  onNext={() => setActiveStep(2)}
                  onBack={() => setActiveStep(0)}
                />
              )}
              {activeStep === 2 && (
                <VendorRegStep3
                  data={vendorData}
                  onChange={handleVendorChange}
                  onBack={() => setActiveStep(1)}
                  onSubmit={handleVendorSubmit}
                  loading={loading}
                  error={error}
                />
              )}
            </>
          )}

          {role === DEPT_HEAD && (
            <>
              {activeStep === 0 && (
                <DeptHeadRegStep1
                  data={deptData}
                  onChange={handleDeptChange}
                  onNext={() => setActiveStep(1)}
                />
              )}
              {activeStep === 1 && (
                <DeptHeadRegStep2
                  data={deptData}
                  onChange={handleDeptChange}
                  onBack={() => setActiveStep(0)}
                  onSubmit={handleDeptSubmit}
                  loading={loading}
                  error={error}
                />
              )}
            </>
          )}

          {role === HR_ADMIN && (
            <AdminRegForm
              data={adminData}
              onChange={handleAdminChange}
              onSubmit={handleAdminSubmit}
              loading={loading}
              error={error}
            />
          )}
        </div>

        {/* Redirect back to Login Link */}
        <p className="text-sm text-center text-slate-400">
          Already have a portal profile?{' '}
          <a href="/login" className="text-tata-gold hover:text-tata-amber font-semibold transition-colors">
            Sign In here
          </a>
        </p>

      </div>
    </div>
  );
}
