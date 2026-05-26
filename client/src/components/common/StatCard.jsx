/**
 * @fileoverview Dashboard statistics display card.
 */

import clsx from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/** @type {Record<string, string>} Trend icon/color map. */
const TREND_CONFIG = {
  up: { icon: TrendingUp, className: 'text-green-400' },
  down: { icon: TrendingDown, className: 'text-red-400' },
  neutral: { icon: Minus, className: 'text-gray-400' },
};

/**
 * @param {object} props Component props.
 * @param {string} props.label Stat label.
 * @param {string|number} props.value Stat value.
 * @param {React.ReactNode} [props.icon]
 * @param {'up'|'down'|'neutral'} [props.trend]
 * @param {string} [props.trendValue]
 * @param {string} [props.color] Optional accent border color class.
 */
export default function StatCard({
  label,
  value,
  icon,
  trend,
  trendValue,
  color = 'border-tata-blue',
}) {
  const TrendIcon = trend ? TREND_CONFIG[trend]?.icon : null;
  const trendClass = trend ? TREND_CONFIG[trend]?.className : '';

  return (
    <div
      className={clsx(
        'rounded-xl border border-steel-600 border-l-4 bg-steel-800 p-5',
        color,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-1 font-display text-3xl tracking-wide text-white">{value}</p>
          {trend && trendValue && (
            <p className={clsx('mt-2 flex items-center gap-1 text-xs', trendClass)}>
              {TrendIcon && <TrendIcon size={14} />}
              {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-steel-700 p-2 text-tata-light">{icon}</div>
        )}
      </div>
    </div>
  );
}
