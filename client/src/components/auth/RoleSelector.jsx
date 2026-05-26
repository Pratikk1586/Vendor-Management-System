/**
 * @fileoverview Role selection cards for the registration/login views.
 */

import { Building2, Contact, Shield } from 'lucide-react';
import { VENDOR, DEPT_HEAD, HR_ADMIN } from '../../constants/roles';

export default function RoleSelector({ value, onChange }) {
  const cards = [
    {
      id: VENDOR,
      title: 'Vendor Partner',
      desc: 'Register as an industrial supplier, fabricator, or logistics firm to submit bids and manage contracts.',
      icon: Building2,
      activeColor: 'border-tata-blue bg-tata-blue/5 text-tata-light ring-1 ring-tata-blue/30',
      iconBg: 'bg-tata-blue/10 text-tata-light',
      hoverColor: 'hover:border-tata-blue/40 hover:bg-tata-blue/5',
    },
    {
      id: DEPT_HEAD,
      title: 'Department Head',
      desc: 'Verify materials, coordinate technical specifications, evaluate commercial bids, and authorize contracts.',
      icon: Contact,
      activeColor: 'border-emerald-500 bg-emerald-500/5 text-emerald-400 ring-1 ring-emerald-500/30',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      hoverColor: 'hover:border-emerald-500/40 hover:bg-emerald-500/5',
    },
    {
      id: HR_ADMIN,
      title: 'HR / Portal Admin',
      desc: 'Manage user memberships, review vendor approvals, track platform audit trails, and manage system security.',
      icon: Shield,
      activeColor: 'border-purple-500 bg-purple-500/5 text-purple-400 ring-1 ring-purple-500/30',
      iconBg: 'bg-purple-500/10 text-purple-400',
      hoverColor: 'hover:border-purple-500/40 hover:bg-purple-500/5',
    },
  ];

  return (
    <div className="w-full font-body">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {cards.map((card) => {
          const Icon = card.icon;
          const isSelected = value === card.id;

          return (
            <button
              key={card.id}
              onClick={() => onChange(card.id)}
              type="button"
              className={`text-left rounded-xl p-5 border bg-steel-800/40 border-steel-700/60 shadow-lg flex flex-col items-start transition-all duration-200 focus:outline-none ${
                isSelected ? card.activeColor : `border-steel-700/60 ${card.hoverColor}`
              }`}
            >
              {/* Icon Bubble */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0 transition-colors ${
                isSelected ? card.iconBg : 'bg-steel-700/60 text-slate-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-base font-bold text-white mb-2 tracking-wide">
                {card.title}
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {card.desc}
              </p>
            </button>
          );
        })}

      </div>
    </div>
  );
}
