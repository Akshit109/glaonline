import { useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, BadgeCheck, PlayCircle, Radio } from 'lucide-react';
import { EditorialImage } from './EditorialImage';
import { HERO_MEDIA, RECOGNITION_BADGES } from '../data/universityData';

interface HeroProps {
  onApplyClick: (programId?: string) => void;
}

const CYCLE_WORDS = ['pace.', 'schedule.', 'terms.', 'city.'];
const PROGRAMS = ['MBA', 'MCA', 'BBA', 'BCA', 'B.Com (Hons.)'];

export function Hero({ onApplyClick }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const [wordIndex, setWordIndex] = useState(0);
  const [spot, setSpot] = useState({ x: 30, y: 30 });

  // Rotating word in the headline
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(
      () => setWordIndex((i) => (i + 1) % CYCLE_WORDS.length),
      2400
    );
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  // Cursor spotlight over the grid
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const rise = (delay: number, y = 16) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: easeCurve },
  });

  return (
    <section
      id="top"
      onMouseMove={handleMove}
      className="relative bg-[#0F1C08] text-white pt-24 lg:pt-28 pb-10 lg:pb-14 border-b border-white/10 overflow-hidden"
    >
      {/* Grid base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      {/* Cursor-lit grid (same grid, brighter, masked to a soft circle) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 hidden md:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(249,206,58,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(249,206,58,0.28) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          WebkitMaskImage: `radial-gradient(260px circle at ${spot.x}% ${spot.y}%, #000, transparent 70%)`,
          maskImage: `radial-gradient(260px circle at ${spot.x}% ${spot.y}%, #000, transparent 70%)`,
        }}
      />
      {/* Warm ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-[#F56C1F]/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-0 h-[480px] w-[480px] rounded-full bg-[#F9CE3A]/10 blur-[140px]"
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Live admissions pill */}
            <motion.div {...rise(0, 10)} className="mb-7 lg:mb-9">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#F9CE3A]/40 bg-[#F9CE3A]/10 pl-3 pr-4 py-1.5 text-xs sm:text-sm font-semibold text-[#F9CE3A]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#F9CE3A] opacity-70 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F9CE3A]" />
                </span>
                Admissions 2026 are open
                <span aria-hidden="true" className="text-[#F9CE3A]/40">
                  |
                </span>
                <span className="font-medium text-white/80">UG &amp; PG</span>
              </span>
            </motion.div>

            {/* Headline with rotating word */}
            <motion.h1
              {...rise(0.05, 20)}
              className="font-display text-[clamp(2.75rem,5.6vw,5.25rem)] leading-[0.98] tracking-[-0.035em] font-extrabold"
            >
              Your future.
              <br />
              <span className="inline-flex flex-wrap items-baseline gap-x-[0.28em]">
                <span>Your</span>
                <span className="relative inline-block min-w-[4.6ch] h-[1.05em] align-bottom overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={CYCLE_WORDS[wordIndex]}
                      initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.4, ease: easeCurve }}
                      className="absolute left-0 top-0 text-[#F56C1F] whitespace-nowrap"
                    >
                      {CYCLE_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
              <br />
              <span className="relative inline-block">
                Your degree.
                {/* Hand-drawn style underline */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 14"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-2 w-full h-[0.22em] text-[#F9CE3A]"
                >
                  <motion.path
                    d="M2 9 C 60 2, 120 13, 180 6 S 270 4, 298 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={prefersReducedMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: easeCurve }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              {...rise(0.14)}
              className="mt-9 lg:mt-10 text-base sm:text-lg leading-[1.65] text-white/80 max-w-[54ch]"
            >
              Earn a recognised degree from GLA University. Learn on your schedule through an
              enterprise-grade digital campus, build career-ready skills, and move forward
              without putting your life on pause.
            </motion.p>

            {/* Actions */}
            <motion.div {...rise(0.2)} className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onApplyClick()}
                className="group inline-flex items-center justify-center gap-2.5 min-h-[52px] pl-7 pr-3 py-3 bg-[#F56C1F] text-white text-sm sm:text-base font-semibold hover:bg-[#dc5b12] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9CE3A]"
              >
                <span>Apply for 2026</span>
                <span className="grid h-8 w-8 place-items-center bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>

              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 border border-white/25 text-white text-sm sm:text-base font-semibold hover:bg-white/10 hover:border-white/50 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <PlayCircle className="w-4 h-4 text-[#F9CE3A]" aria-hidden="true" />
                Explore Programs
              </a>
            </motion.div>

            {/* Grants as ticket-style chips */}
            <motion.div {...rise(0.26)} className="mt-8 flex flex-wrap gap-3">
              {[
                { big: '40%', small: 'Alumni grant' },
                { big: '20%', small: 'Sibling grant' },
              ].map((g) => (
                <div
                  key={g.small}
                  className="flex items-center gap-3 border border-dashed border-white/25 bg-white/[0.04] px-4 py-2.5"
                >
                  <span className="font-display text-2xl font-extrabold text-[#F9CE3A] leading-none">
                    {g.big}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {g.small}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: arch portrait with floating UI cards */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px]">
              {/* Offset outline frame */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 h-full w-full rounded-t-[999px] border border-[#F9CE3A]/50"
              />
              {/* Orange block behind */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 h-2/3 w-2/3 bg-[#F56C1F]/90"
              />

              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, clipPath: 'inset(12% 0% 0% 0%)' }
                }
                animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 0.8, delay: 0.1, ease: easeCurve }}
                className="relative h-[440px] sm:h-[540px] lg:h-[600px] rounded-t-[999px] overflow-hidden bg-[#14201A] border border-white/15"
              >
                <EditorialImage
                  src={HERO_MEDIA}
                  alt="GLA Online graduate student studying on a laptop in sunlit architectural hall"
                  loading="eager"
                  fallbackTitle="GLA Online — 2026 Intake"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0A120E]/90 via-[#0A120E]/40 to-transparent pointer-events-none"
                />
              </motion.div>

              {/* Floating: live class */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 1, x: 0, y: [0, -6, 0] }
                }
                transition={{
                  opacity: { duration: 0.5, delay: 0.5 },
                  x: { duration: 0.5, delay: 0.5, ease: easeCurve },
                  y: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
                }}
                className="absolute top-24 -left-3 sm:-left-10 bg-white text-[#0F1C08] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] px-4 py-3 flex items-center gap-3"
              >
                <span className="grid h-9 w-9 place-items-center bg-[#F56C1F] text-white">
                  <Radio className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F56C1F]">
                    Live now
                  </p>
                  <p className="text-sm font-bold leading-tight">Live + Recorded LMS</p>
                </div>
              </motion.div>

              {/* Floating: recognised */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 1, x: 0, y: [0, 6, 0] }
                }
                transition={{
                  opacity: { duration: 0.5, delay: 0.65 },
                  x: { duration: 0.5, delay: 0.65, ease: easeCurve },
                  y: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
                }}
                className="absolute top-1/2 -right-2 sm:-right-8 bg-[#0A120E]/95 backdrop-blur-md border border-white/20 px-4 py-3 flex items-center gap-3"
              >
                <BadgeCheck className="w-5 h-5 text-[#F9CE3A]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold leading-tight">100% Online</p>
                  <p className="text-[11px] text-white/65">Recognised degree</p>
                </div>
              </motion.div>

              {/* Bottom admissions panel */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#0A120E]/95 backdrop-blur-md border border-white/20 p-4 sm:p-5">
                <p className="font-mono-num text-xs font-semibold text-[#F9CE3A] tracking-wide">
                  2026 ADMISSIONS OPEN
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {PROGRAMS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => onApplyClick(p)}
                      className="px-2.5 py-1 text-xs font-semibold border border-white/20 text-white hover:bg-[#F56C1F] hover:border-[#F56C1F] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9CE3A]"
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <p className="mt-3 pt-3 border-t border-white/15 text-xs text-white/70">
                  Mathura &amp; Greater Noida Campuses
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recognition strip */}
        <div className="mt-14 lg:mt-20 pt-6 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {RECOGNITION_BADGES.map((item, i) => (
            <motion.div
              key={item.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.07, ease: easeCurve }}
              className="flex flex-col bg-[#0F1C08] px-4 py-4 lg:px-6 hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-xs text-white/60 font-medium">{item.label}</span>
              <span className="mt-1 font-display text-lg sm:text-xl font-bold text-white tabular-nums">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="hidden lg:flex justify-center pt-8">
          <a
            href="#programs"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F9CE3A]"
          >
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <ArrowDown className="w-3.5 h-3.5 text-[#F56C1F]" />
            </motion.span>
            <span>Scroll to explore UG &amp; PG programmes</span>
          </a>
        </div>
      </div>
    </section>
  );
}