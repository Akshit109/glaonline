import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onApplyClick: (programId?: string) => void;
}

export function FinalCTA({ onApplyClick }: FinalCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-[#0A120E] text-white py-24 lg:py-32 overflow-hidden border-b border-white/10">
      {/* Subtle Precision Tech Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="font-mono-num text-xs font-semibold tracking-wider uppercase text-[#F9CE3A]">
            GLA Online · Admissions 2026
          </p>

          <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-[4.25rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-white">
            Your next chapter
            <br />
            <span className="text-[#F56C1F]">starts here.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/80 max-w-xl">
            Take the first step toward a degree that fits your ambitions and your life. UGC-DEB
            entitled UG and PG programmes backed by NAAC A+ accreditation and 28 years of academic
            legacy.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onApplyClick()}
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 bg-[#F56C1F] text-white text-sm sm:text-base font-semibold hover:bg-[#dc5b12] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9CE3A]"
            >
              <span>Apply for 2026</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href="#programs"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 border border-white/30 text-white text-sm sm:text-base font-semibold hover:bg-white/10 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Programs
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
