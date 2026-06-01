/**
 * @fileoverview Tab bar navigation component.
 */

import clsx from 'clsx';

/**
 * @param {object} props Component props.
 * @param {Array<{id: string, label: string, count?: number}>} props.tabs
 * @param {string} props.activeTab Currently active tab id.
 * @param {function} props.onChange Tab change handler.
 */
export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-1 border-b border-steel-600" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'relative px-4 py-2.5 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'text-black'
              : 'text-gray-500 hover:text-black',
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 rounded-full bg-slate-600 px-2 py-0.5 text-xs text-white">
              {tab.count}
            </span>
          )}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-tata-blue" />
          )}
        </button>
      ))}
    </div>
  );
}
