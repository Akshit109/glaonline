import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EditorialImage } from './EditorialImage';
import { CONTACT_INFO, TESTIMONIALS } from '../data/universityData';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const current = TESTIMONIALS[index];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-black/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-black/15">
          <div>
            <p className="font-mono-num text-xs font-semibold tracking-wider uppercase text-[#186534]">
              Student Perspectives
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl leading-[1.06] tracking-[-0.025em] font-extrabold text-black">
              Real ambitions, sustained in motion.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono-num text-xs font-semibold text-[#666666] mr-2">
              0{index + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous student story"
              className="w-11 h-11 inline-flex items-center justify-center border border-black/20 bg-white text-black hover:border-black hover:bg-[#F1F1F1] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186534]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next student story"
              className="w-11 h-11 inline-flex items-center justify-center border border-black/20 bg-white text-black hover:border-black hover:bg-[#F1F1F1] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186534]"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pt-10 lg:pt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Student Portrait */}
            <div className="lg:col-span-4">
              <div className="aspect-square max-w-[360px] bg-[#F1F1F1] border border-black/10 overflow-hidden">
                <EditorialImage
                  src={current.image}
                  alt={`Portrait of ${current.name}, ${current.program} learner`}
                  fallbackTitle={current.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Expressive Quote & Story */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-[2rem] leading-[1.35] text-black font-semibold">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="mt-8 pt-6 border-t border-black/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="font-display text-base font-bold text-black">{current.name}</p>
                  <p className="text-sm text-[#454545] mt-0.5">
                    {current.role} · {current.location}
                  </p>
                  <p className="font-mono-num text-xs font-semibold text-[#186534] mt-1">
                    {current.program}
                  </p>
                </div>

                <div className="sm:text-right max-w-xs">
                  <p className="font-mono-num text-xs font-semibold uppercase tracking-wider text-[#666666]">
                    Outcome
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#454545]">{current.outcome}</p>
                </div>
              </div>

              {current.isSampleProfile && (
                <p className="mt-6 text-xs text-[#666666]">
                  Illustrative learner profile reflecting typical working-professional pathways.
                  Published student and alumni stories are available on{' '}
                  <a
                    href={CONTACT_INFO.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-black"
                  >
                    glaonline.com
                  </a>
                  .
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
