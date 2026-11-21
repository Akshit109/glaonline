import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { ADMISSION_STEPS } from '../data/universityData';

interface AdmissionProcessProps {
  onApplyClick: (programId?: string) => void;
}

export function AdmissionProcess({ onApplyClick }: AdmissionProcessProps) {
  const prefersReducedMotion = useReducedMotion();
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const lastIndex = ADMISSION_STEPS.length - 1;

  return (
    <section
      id="admissions"
      className="relative py-20 lg:py-28 bg-[#F1F1F1] border-b border-black/10 overflow-hidden"
    >
      {/* Soft decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-[380px] w-[380px] rounded-full bg-[#F9CE3A]/25 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-24 h-[320px] w-[320px] rounded-full bg-[#186534]/10 blur-[110px]"
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12">
          <div className="lg:col-span-8">
            <p className="inline-flex items-center gap-2 font-mono-num text-xs font-semibold tracking-wider uppercase text-[#186534]">
              <span aria-hidden="true" className="h-px w-8 bg-[#186534]" />
              2026 Admission Timeline
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl leading-[1.06] tracking-[-0.025em] font-extrabold text-black">
              Four clear steps from{' '}
              <span className="relative inline-block">
                <span className="relative z-10">enquiry</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 h-[0.32em] bg-[#F9CE3A] -z-0"
                />
              </span>{' '}
              to orientation.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              type="button"
              onClick={() => onApplyClick()}
              className="group inline-flex items-center justify-center gap-2 min-h-[48px] pl-6 pr-2.5 py-2.5 bg-[#F56C1F] text-white text-sm font-semibold hover:bg-[#dc5b12] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F56C1F]"
            >
              <span>Apply Now</span>
              <span className="grid h-7 w-7 place-items-center bg-white/20 transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Track: horizontal on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[15px] left-0 right-0 h-px bg-black/15"
          />
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: easeCurve }}
            className="hidden lg:block absolute top-[15px] left-0 right-0 h-[2px] -mt-px bg-gradient-to-r from-[#186534] via-[#F9CE3A] to-[#F56C1F] origin-left"
          />
          {/* Track: vertical on mobile */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute top-2 bottom-2 left-[15px] w-px bg-black/15"
          />
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: easeCurve }}
            className="lg:hidden absolute top-2 bottom-2 left-[14px] w-[2px] bg-gradient-to-b from-[#186534] via-[#F9CE3A] to-[#F56C1F] origin-top"
          />

          <ol className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-6">
            {ADMISSION_STEPS.map((step, idx) => {
              const isLast = idx === lastIndex;
              return (
                <motion.li
                  key={step.number}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: idx * 0.1, ease: easeCurve }}
                  className="relative pl-12 lg:pl-0 lg:pt-14"
                >
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-5 lg:top-0 grid h-[31px] w-[31px] place-items-center rounded-full border-2 ring-4 ring-[#F1F1F1] ${
                      isLast
                        ? 'bg-[#F56C1F] border-[#F56C1F] text-white'
                        : 'bg-white border-[#186534] text-[#186534]'
                    }`}
                  >
                    {isLast ? (
                      <Check className="w-4 h-4" strokeWidth={3} />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[#186534]" />
                    )}
                  </span>

                  {/* Card */}
                  <div className="group relative h-full overflow-hidden bg-white border border-black/10 p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#186534]/40 hover:shadow-[0_24px_48px_-24px_rgba(15,28,8,0.35)]">
                    {/* Ghost number */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-3 -right-2 font-display text-[7rem] leading-none font-extrabold text-black/[0.04] tabular-nums select-none transition-colors duration-300 group-hover:text-[#F9CE3A]/40"
                    >
                      {step.number}
                    </span>

                    {/* Accent bar slides in on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-[0.18] bg-[#F56C1F] transition-transform duration-500 group-hover:scale-x-100"
                    />

                    <div className="relative">
                      <span className="inline-flex items-center font-mono-num text-xs font-semibold tracking-wider text-[#186534] bg-[#186534]/10 px-2.5 py-1 tabular-nums">
                        STEP {step.number}
                      </span>
                      <h3 className="mt-5 font-display text-xl lg:text-2xl font-bold tracking-tight text-black">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#454545]">
                        {step.description}
                      </p>
                    </div>

                    <p className="relative mt-7 pt-4 border-t border-dashed border-black/20 font-mono-num text-xs font-medium text-[#555555] flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F56C1F]"
                      />
                      {step.detail}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Closing CTA band */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: easeCurve }}
          className="mt-14 lg:mt-16 relative overflow-hidden bg-[#0F1C08] text-white px-6 sm:px-10 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <p className="relative font-display text-xl sm:text-2xl font-bold tracking-tight max-w-[32ch]">
            Step 01 takes a few minutes. <span className="text-[#F9CE3A]">Start yours today.</span>
          </p>
          <button
            type="button"
            onClick={() => onApplyClick()}
            className="relative inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 bg-[#F56C1F] text-white text-sm font-semibold hover:bg-[#dc5b12] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9CE3A]"
          >
            <span>Begin Application</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}