/**
 * @fileoverview Multi-step form progress indicator.
 */

import clsx from 'clsx';
import { Check } from 'lucide-react';

/**
 * @param {object} props Component props.
 * @param {Array<{label: string}>} props.steps Step definitions.
 * @param {number} props.currentStep Zero-based current step index.
 */
export default function StepProgress({ steps, currentStep }) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <li
              key={step.label}
              className={clsx('flex flex-1 items-center', index < steps.length - 1 && 'pr-4')}
            >
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                    isComplete && 'bg-tata-blue text-white',
                    isCurrent && 'border-2 border-tata-blue bg-steel-800 text-tata-light',
                    !isComplete && !isCurrent && 'border border-steel-600 bg-steel-800 text-gray-500',
                  )}
                >
                  {isComplete ? <Check size={16} /> : index + 1}
                </span>
                <span
                  className={clsx(
                    'hidden text-sm sm:inline',
                    isCurrent ? 'font-medium text-white' : 'text-gray-400',
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'mx-4 h-0.5 flex-1',
                    isComplete ? 'bg-tata-blue' : 'bg-steel-600',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
