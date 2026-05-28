/**
 * @fileoverview Role selection cards for the registration/login views.
 */

import { Building2, Contact, Shield } from 'lucide-react';
import { VENDOR, DEPT_HEAD, HR_ADMIN } from '../../constants/roles';

export default function RoleSelector({ value, onChange, excludeRoles = [] }) {
  const cards = [
    {
      id: VENDOR,
      title: 'Vendor Partner',
      desc: 'Register as an industrial supplier, fabricator, or logistics firm to submit bids and manage contracts.',
      icon: Building2,
      activeColor: 'border-tata-blue bg-blue-50/20 text-tata-blue ring-1 ring-tata-blue/30',
      iconBg: 'bg-tata-blue/10 text-tata-blue',
      hoverColor: 'hover:border-tata-blue/40 hover:bg-blue-50/5',
    },
    {
      id: DEPT_HEAD,
      title: 'Department Head',
      desc: 'Verify materials, coordinate technical specifications, evaluate commercial bids, and authorize contracts.',
      icon: Contact,
      activeColor: 'border-emerald-500 bg-emerald-50/20 text-emerald-600 ring-1 ring-emerald-500/30',
      iconBg: 'bg-emerald-100 text-emerald-600',
      hoverColor: 'hover:border-emerald-500/40 hover:bg-emerald-50/5',
    },
    {
      id: HR_ADMIN,
      title: 'HR / Portal Admin',
      desc: 'Manage user memberships, review vendor approvals, track platform audit trails, and manage system security.',
      icon: Shield,
      activeColor: 'border-indigo-500 bg-indigo-50/20 text-indigo-600 ring-1 ring-indigo-500/30',
      iconBg: 'bg-indigo-100 text-indigo-600',
      hoverColor: 'hover:border-indigo-500/40 hover:bg-indigo-50/5',
    },
  ].filter((card) => !excludeRoles.includes(card.id));

  // Determine dynamic columns based on number of active cards
  const gridColsClass = cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <div className="w-full font-body">
      <div className={`grid grid-cols-1 ${gridColsClass} gap-5`}>
        
        {cards.map((card) => {
          const Icon = card.icon;
          const isSelected = value === card.id;

          return (
            <button
              key={card.id}
              onClick={() => onChange(card.id)}
              type="button"
              className={`text-left rounded-xl p-5 border bg-white shadow-md flex flex-col items-start transition-all duration-200 focus:outline-none ${
                isSelected ? card.activeColor : `border-slate-200 text-slate-800 ${card.hoverColor}`
              }`}
            >
              {/* Icon Bubble */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0 transition-colors ${
                isSelected ? card.iconBg : 'bg-slate-100 text-slate-500'
              }`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-base font-bold text-slate-900 mb-2 tracking-wide">
                {card.title}
              </h3>
              
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {card.desc}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
}
