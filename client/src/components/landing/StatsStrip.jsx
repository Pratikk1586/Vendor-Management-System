/**
 * @fileoverview Full-width steel-700 Stats Strip component with scroll-triggered count-up animations.
 */

import { useState, useEffect, useRef } from 'react';

// Self-contained Animated Count Up Subcomponent
function CountUp({ target, duration = 1500, trigger = false, decimals = 0, prefix = '', suffix = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = parseFloat(target);
    if (start === end) return;

    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula for smooth decelerating animation
      const easeProgress = progress * (2 - progress);
      const currentValue = start + (end - start) * easeProgress;

      setValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, trigger]);

  // Format number display
  const formatNumber = (num) => {
    const rounded = num.toFixed(decimals);
    if (decimals === 0) {
      return parseInt(rounded, 10).toLocaleString();
    }
    return rounded;
  };

  return (
    <span className="font-mono font-bold text-3xl sm:text-4xl lg:text-5xl text-tata-gold">
      {prefix}
      {formatNumber(value)}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  const [intersecting, setIntersecting] = useState(false);
  const containerRef = useRef(null);

  // Set up Scroll Intersection Observer
  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          // Once it triggers, we disconnect the observer so it doesn't repeat
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const stats = [
    { target: 26, label: 'Countries', suffix: '+' },
    { target: 50, label: 'Color Variants', suffix: '+' },
    { target: 2.4, label: 'Revenue', prefix: '₹', suffix: 'L Cr', decimals: 1 },
    { target: 75000, label: 'Employees', suffix: '+' },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-steel-700 border-y border-steel-600/80 w-full relative z-10 font-body py-8 sm:py-10 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center divide-y md:divide-y-0 md:divide-x divide-steel-600/60">
          
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center space-y-1 sm:space-y-2 ${
                index >= 2 ? 'pt-8 md:pt-0' : ''
              } ${index === 1 ? 'pt-8 sm:pt-0' : ''}`}
            >
              <div className="flex items-baseline space-x-0.5">
                <CountUp
                  target={stat.target}
                  decimals={stat.decimals || 0}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                  trigger={intersecting}
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-300">
                {stat.label}
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
