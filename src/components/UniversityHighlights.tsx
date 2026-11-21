import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { EditorialImage } from './EditorialImage';
import { CAMPUS_MEDIA, GLOBAL_HUBS, UNIVERSITY_STATS } from '../data/universityData';

const ACCREDITATIONS = ['NAAC A+ (3.46)', 'UGC-DEB Entitled', 'NIRF 151–200 Band', 'WES Recognised'];

function AnimatedCounter({
  target,
  suffix = '',
  fallback,
}: {
  target?: number;
  suffix?: string;
  fallback: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    target && !prefersReducedMotion ? `0${suffix}` : fallback
  );

  useEffect(() => {
    if (!target) {
      setDisplayValue(fallback);
      return;
    }
    if (prefersReducedMotion) {
      setDisplayValue(fallback);
      return;
    }
    if (!isInView) return;

    const duration = 900;
    const startTime = performance.now();
    let frameId: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplayValue(`${current.toLocaleString('en-IN')}${suffix}`);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(fallback);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, suffix, fallback, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
    </span>
  );
}

export function UniversityHighlights() {
  const prefersReducedMotion = useReducedMotion();
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="why-gla"
      className="relative py-20 lg:py-28 bg-[#F1F1F1] border-b border-black/10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[380px] w-[380px] rounded-full bg-[#F9CE3A]/20 blur-[120px]"
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* TOP: story + campus photo */}
        <div
          id="about-gla"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-stretch pb-16 lg:pb-20"
        >
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="inline-flex items-center gap-2 font-mono-num text-xs font-semibold tracking-wider uppercase text-[#186534]">
                <span aria-hidden="true" className="h-px w-8 bg-[#186534]" />
                Why GLA Online
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-[1.06] tracking-[-0.025em] font-extrabold text-black">
                <span className="relative inline-block">
                  <span className="relative z-10">28 years</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-[0.32em] bg-[#F9CE3A] z-0"
                  />
                </span>{' '}
                of legacy. Built for digital scale.
              </h2>
            </div>

            <div className="mt-8 lg:mt-12 space-y-5 text-base leading-relaxed text-[#454545]">
              <p>
                Every online degree from GLA University carries the same statutory standing,
                faculty oversight, and academic rigour as our established Mathura and Greater Noida
                campuses.
              </p>

              {/* Accreditation chips */}
              <ul className="flex flex-wrap gap-2 pt-1">
                {ACCREDITATIONS.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-white border border-black/15 px-3 py-1.5 font-mono-num text-xs font-semibold text-black"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#186534]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeCurve }}
            className="lg:col-span-7 relative"
          >
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-full w-full border border-[#F56C1F]/60"
            />
            <div className="relative h-[320px] sm:h-[400px] lg:h-full lg:min-h-[440px] bg-white border border-black/10 overflow-hidden">
              <EditorialImage
                src={CAMPUS_MEDIA}
                alt="GLA University academic courtyard in warm morning light"
                fallbackTitle="GLA University Campus"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A120E]/70 to-transparent pointer-events-none"
              />
              <div className="absolute left-5 bottom-5 inline-flex items-center gap-2 bg-[#0F1C08]/90 backdrop-blur-sm border border-white/15 px-3.5 py-2 text-xs font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F9CE3A]" />
                Mathura &amp; Greater Noida Campuses
              </div>
            </div>
          </motion.div>
        </div>

        {/* METRIC LEDGER: dark panel */}
        <div className="relative bg-[#0F1C08] text-white overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#F56C1F]/25 blur-[110px]"
          />

          <div className="relative divide-y divide-white/15 px-5 sm:px-10 lg:px-14">
            {UNIVERSITY_STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: easeCurve }}
                className="group relative py-9 lg:py-11 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-[#F56C1F] transition-transform duration-500 group-hover:scale-x-100"
                />

                <div className="lg:col-span-5 flex items-baseline gap-4">
                  <span className="font-mono-num text-xs font-semibold text-white/40 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-5xl sm:text-6xl lg:text-[4.75rem] leading-none font-extrabold tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-[#F9CE3A]">
                    <AnimatedCounter
                      target={stat.numericTarget}
                      suffix={stat.suffix}
                      fallback={stat.value}
                    />
                  </span>
                </div>

                <div className="lg:col-span-3">
                  <p className="font-mono-num text-xs font-semibold uppercase tracking-wider text-[#F9CE3A]">
                    {stat.category}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold text-white">{stat.label}</h3>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-sm sm:text-base leading-relaxed text-white/75">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GLOBAL NETWORK */}
        <div className="mt-16 lg:mt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div>
              <p className="inline-flex items-center gap-2 font-mono-num text-xs font-semibold uppercase tracking-wider text-[#186534]">
                <span aria-hidden="true" className="h-px w-8 bg-[#186534]" />
                Global Network
              </p>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-black">
                A Global Network of Change-Makers
              </h3>
            </div>
            <p className="text-sm text-[#454545] max-w-md">
              Our GLAdiators contribute across leading global enterprises, high-growth startups,
              and international research institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GLOBAL_HUBS.map((hub, idx) => (
              <motion.div
                key={hub.region}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: easeCurve }}
                className="group relative overflow-hidden bg-white border border-black/10 p-6 min-h-[180px] flex flex-col justify-between gap-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#186534]/40 hover:shadow-[0_24px_48px_-24px_rgba(15,28,8,0.4)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-[0.2] bg-[#F56C1F] transition-transform duration-500 group-hover:scale-x-100"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-6 -right-1 font-display text-[6rem] leading-none font-extrabold text-black/[0.04] tabular-nums select-none transition-colors duration-300 group-hover:text-[#F9CE3A]/40"
                >
                  0{idx + 1}
                </span>

                <div className="relative flex items-center justify-between">
                  <span className="font-mono-num text-xs font-semibold text-[#186534] tabular-nums">
                    0{idx + 1}
                  </span>
                  <ArrowUpRight
                    className="w-4 h-4 text-black/20 transition-all duration-300 group-hover:text-[#F56C1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="relative">
                  <h4 className="font-display text-xl font-bold text-black">{hub.region}</h4>
                  <p className="mt-1.5 text-sm text-[#454545]">{hub.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}