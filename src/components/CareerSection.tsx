import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { EditorialImage } from './EditorialImage';
import { CAREER_BENEFITS, CAREER_MEDIA } from '../data/universityData';

interface CareerSectionProps {
  onApplyClick: (programId?: string) => void;
}

/** Counts from 0 to `to` once, when scrolled into view. */
function CountUp({ to, reduced }: { to: number; reduced: boolean | null }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export function CareerSection({ onApplyClick }: CareerSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="careers"
      className="relative py-20 lg:py-28 bg-[#F1F1F1] border-b border-black/10 overflow-hidden"
    >
      {/* Decorative glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 -left-24 h-[340px] w-[340px] rounded-full bg-[#F56C1F]/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-[#186534]/10 blur-[120px]"
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* LEFT: headline + photo with stat badge */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="inline-flex items-center gap-2 font-mono-num text-xs font-semibold tracking-wider uppercase text-[#186534]">
                <span aria-hidden="true" className="h-px w-8 bg-[#186534]" />
                Career Support &amp; Outcomes
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.06] tracking-[-0.025em] font-extrabold text-black">
                Your degree is the{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">beginning.</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-[0.32em] bg-[#F9CE3A] z-0"
                  />
                </span>
                <br />
                <span className="text-[#365C62]">Not the destination.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#454545] max-w-xl">
                GLA Online integrates career preparation directly into your academic timeline,
                giving learners structured placement assistance backed by an 86% five-year
                placement track record.
              </p>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: easeCurve }}
              className="mt-10 relative"
            >
              {/* Offset accent frames */}
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full border border-[#F56C1F]/60"
              />
              <div
                aria-hidden="true"
                className="absolute -top-3 -left-3 h-24 w-24 bg-[#F9CE3A]"
              />

              <div className="relative h-[320px] sm:h-[400px] bg-white border border-black/10 overflow-hidden">
                <EditorialImage
                  src={CAREER_MEDIA}
                  alt="Professionals reviewing business analytics and strategy reports in glass studio"
                  fallbackTitle="GLA Career & Placement Cell"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A120E]/80 to-transparent pointer-events-none"
                />
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                whileInView={
                  prefersReducedMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 1, x: 0, y: [0, -6, 0] }
                }
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.3 },
                  x: { duration: 0.5, delay: 0.3, ease: easeCurve },
                  y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 },
                }}
                className="absolute -bottom-6 left-4 sm:left-8 bg-[#0F1C08] text-white px-5 py-4 flex items-center gap-4 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] border border-white/10"
              >
                <span className="grid h-11 w-11 place-items-center bg-[#F56C1F]">
                  <TrendingUp className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-3xl font-extrabold leading-none text-[#F9CE3A]">
                    <CountUp to={86} reduced={prefersReducedMotion} />%
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/70">
                    Five-year placement record
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: benefits as a connected vertical timeline of cards */}
          <div className="lg:col-span-6 flex flex-col justify-between lg:pt-4">
            <ol className="relative space-y-4">
              <div
                aria-hidden="true"
                className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-[#186534] via-[#F9CE3A] to-[#F56C1F] opacity-60 hidden sm:block"
              />
              {CAREER_BENEFITS.map((benefit, idx) => (
                <motion.li
                  key={benefit.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: easeCurve }}
                  className="group relative flex items-start gap-5 bg-white border border-black/10 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#186534]/40 hover:shadow-[0_20px_40px_-24px_rgba(15,28,8,0.4)]"
                >
                  {/* left accent */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[#F56C1F] transition-transform duration-300 group-hover:scale-y-100"
                  />
                  <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center bg-[#186534]/10 font-mono-num text-sm font-bold text-[#186534] tabular-nums transition-colors duration-300 group-hover:bg-[#186534] group-hover:text-white">
                    {benefit.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-black">{benefit.title}</h3>
                    <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#454545]">
                      {benefit.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="hidden sm:block w-4 h-4 mt-1 shrink-0 text-black/20 transition-all duration-300 group-hover:text-[#F56C1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </motion.li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-[#666666] max-w-sm">
                Placement assistance and career guidance are available across all eligible UG and
                PG enrolments.
              </p>
              <button
                type="button"
                onClick={() => onApplyClick()}
                className="group inline-flex items-center gap-2 min-h-[48px] pl-6 pr-2.5 py-2.5 bg-[#0A120E] text-white text-sm font-semibold hover:bg-[#186534] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186534]"
              >
                <span>Speak with Admissions</span>
                <span className="grid h-7 w-7 place-items-center bg-white/15 transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}