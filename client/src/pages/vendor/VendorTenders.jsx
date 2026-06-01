/**
 * @fileoverview Vendor Tender search and filter page. Displays a grid of available procurement opportunities.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Eye, MapPin } from 'lucide-react';
import SearchInput from '../../components/common/SearchInput';
import FilterBar from '../../components/common/FilterBar';
import Pagination from '../../components/common/Pagination';

export default function VendorTenders() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ dept: 'ALL', status: 'ALL' });
  const [page, setPage] = useState(1);

  const mockTenders = [
    { id: 'TEND-4890', title: '120 Ton Coated Steel Coils Procurement', dept: 'Raw Materials', deadline: '2026-06-15', budget: '₹50,00,000', status: 'Active', location: 'Jamshedpur Works' },
    { id: 'TEND-4752', title: 'High-Density Structural Packaging Material', dept: 'Packaging', deadline: '2026-06-20', budget: '₹15,00,000', status: 'Active', location: 'Kalinganagar Factory' },
    { id: 'TEND-4620', title: 'Factory Logistics Route Route-9 Operations', dept: 'Logistics', deadline: '2026-06-10', budget: '₹25,00,000', status: 'Active', location: 'Pan-India Routes' },
    { id: 'TEND-4510', title: 'Electrical Substation Maintenance Services', dept: 'Electrical', deadline: '2026-05-30', budget: '₹12,00,000', status: 'Active', location: 'Jamshedpur Works' },
    { id: 'TEND-4498', title: 'Blast Furnace IT Infrastructure Upgrades', dept: 'IT & Services', deadline: '2026-06-30', budget: '₹95,00,000', status: 'Active', location: 'Central Headquarters' },
  ];

  const filterConfig = [
    {
      key: 'dept',
      label: 'Department',
      options: [
        { value: 'ALL', label: 'All Depts' },
        { value: 'Raw Materials', label: 'Raw Materials' },
        { value: 'Packaging', label: 'Packaging' },
        { value: 'Logistics', label: 'Logistics' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'ALL', label: 'All Statuses' },
        { value: 'Active', label: 'Active Only' },
      ],
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ dept: 'ALL', status: 'ALL' });
    setSearchTerm('');
    setPage(1);
  };

  // Filter items
  const filteredTenders = mockTenders.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filters.dept === 'ALL' || t.dept === filters.dept;
    const matchesStatus = filters.status === 'ALL' || t.status === filters.status;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTenders.length / 4) || 1;
  const paginatedTenders = filteredTenders.slice((page - 1) * 4, page * 4);

  return (
    <div className="space-y-6 font-body">

      {/* Tenders Header */}
      <div className="border-b border-steel-700/60 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">ACTIVE SOURCING OPPORTUNITIES</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mt-1">
            Browse Procurement Tenders
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Submit bids and view technical compliance requirements for live sourcing schedules.
          </p>
        </div>
      </div>

      {/* Sourcing Search and Filter Controls */}
      <div className="p-4 rounded-2xl bg-steel-800 border border-steel-700/60 space-y-4">
        <div className="max-w-md text-black">
          <SearchInput onSearch={setSearchTerm} placeholder="Search by tender ID or title..." />
        </div>
        <div className="border-t border-slate-200/60 pt-3">
          <FilterBar
            filters={filterConfig}
            values={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>
      </div>

      {/* Grid of Tenders */}
      {paginatedTenders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {paginatedTenders.map((tender) => (
            <div
              key={tender.id}
              className="bg-steel-800 border border-steel-700 hover:border-tata-blue/40 rounded-2xl p-5 shadow-xl flex flex-col justify-between group transition-colors duration-150"
            >
              <div className="space-y-3">

                {/* Reference ID & Location */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-steel-900 border border-steel-700 font-mono font-bold text-[10px] text-tata-gold leading-none">
                    {tender.id}
                  </span>
                  <div className="flex items-center text-[10px] text-slate-600 space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-600" />
                    <span>{tender.location}</span>
                  </div>
                </div>

                {/* Tender Title */}
                <h3 className="text-base font-bold text-black leading-snug group-hover:text-tata-light transition-colors">
                  {tender.title}
                </h3>

                {/* Sourcing Details */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-steel-900/35 border border-steel-700/50 rounded-xl">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-stone-700 block leading-none">Department</span>
                    <span className="text-xs font-semibold text-black block mt-1.5">{tender.dept}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-stone-700 block leading-none">Estimated Budget</span>
                    <span className="text-xs font-semibold text-black block mt-1.5">{tender.budget}</span>
                  </div>
                </div>

              </div>

              {/* Action and Deadline Bar */}
              <div className="mt-5 pt-4 border-t border-steel-700/60 flex items-center justify-between">
                <div className="flex items-center text-xs text-slate-600 space-x-1.5">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>Due Date: <span className="font-semibold text-slate-600">{tender.deadline}</span></span>
                </div>

                <button
                  onClick={() => navigate(`/vendor/tenders/${tender.id}`)}
                  type="button"
                  className="py-1.5 px-3 rounded-lg bg-black hover:bg-slate-500 text-xs font-bold text-white border border-steel-600 hover:border-tata-blue/40 flex items-center space-x-1.5 transition-all duration-150 focus:outline-none"
                >
                  <Eye className="w-3.5  h-3.5" />
                  <span>Inspect Details</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-steel-800 border border-steel-700/60 rounded-2xl">
          <p className="text-sm text-slate-400 font-medium">No live sourcing opportunities match your query.</p>
        </div>
      )}

      {/* Pagination component */}
      {filteredTenders.length > 4 && (
        <div className="pt-4 border-t border-steel-700/40">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            total={filteredTenders.length}
          />
        </div>
      )}

    </div>
  );
}
