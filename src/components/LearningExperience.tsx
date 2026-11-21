import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { EditorialImage } from './EditorialImage';
import { LEARNING_FEATURES, LEARNING_MEDIA } from '../data/universityData';

export function LearningExperience() {
  const [activeId, setActiveId] = useState<string>(LEARNING_FEATURES[0].id);
  const prefersReducedMotion = useReducedMotion();
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const activeIndex = Math.max(
    0,
    LEARNING_FEATURES.findIndex((item) => item.id === activeId)
  );
  const activeFeature = LEARNING_FEATURES[activeIndex] ?? LEARNING_FEATURES[0];
  const total = LEARNING_FEATURES.length;

  return (
    <section
      id="experience"
      className="relative py-20 lg:py-28 bg-white border-b border-black/10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -right-28 h-[380px] w-[380px] rounded-full bg-[#F56C1F]/10 blur-[120px]"
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Title */}
        <div className="max-w-3xl pb-12 lg:pb-16">
          <p className="inline-flex items-center gap-2 font-mono-num text-xs font-semibold tracking-wider uppercase text-[#186534]">
            <span aria-hidden="true" className="h-px w-8 bg-[#186534]" />
            Student Experience &amp; LMS Architecture
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.06] tracking-[-0.025em] font-extrabold text-black">
            Built around{' '}
            <span className="relative inline-block">
              <span className="relative z-10">your life.</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 h-[0.32em] bg-[#F9CE3A] z-0"
              />
            </span>
            <br />
            <span className="text-[#365C62]">Not the other way around.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: sticky stage */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="relative">
              {/* Offset accents */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -left-3 h-24 w-24 bg-[#F9CE3A]"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-2/3 w-2/3 border border-[#F56C1F]/60"
              />

              {/* Photo */}
              <div className="relative h-[260px] sm:h-[340px] bg-[#F1F1F1] border border-black/10 overflow-hidden">
                <EditorialImage
                  src={LEARNING_MEDIA}
                  alt="GLA Online learner studying from a sunlit home desk with laptop and notes"
                  fallbackTitle="GLA Online LMS Studio"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A120E]/60 to-transparent pointer-events-none"
                />
              </div>

              {/* LMS console styled like an app window, overlapping the photo */}
              <div className="relative -mt-14 mx-3 sm:mx-6 bg-[#0A120E] text-white border border-white/15 shadow-[0_28px_56px_-20px_rgba(0,0,0,0.6)]">
                {/* Window chrome */}
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F56C1F]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F9CE3A]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#4ADE80]/80" />
                  </div>
                  <span className="font-mono-num text-[11px] text-white/50 tabular-nums">
                    MODULE {activeIndex + 1} / {total}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/15">
                    <div>
                      <span className="font-mono-num text-xs text-[#F9CE3A] font-semibold">
                        LMS MODULE {activeFeature.step}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-bold text-white">
                        {activeFeature.lmsModuleTitle}
                      </h3>
                    </div>
                    <div className="text-right shrink-0 border border-dashed border-white/25 px-3 py-1.5">
                      <span className="block text-[11px] text-white/60">
                        {activeFeature.lmsMetricLabel}
                      </span>
                      <span className="font-mono-num text-xs sm:text-sm font-semibold text-[#F9CE3A]">
                        {activeFeature.lmsMetricValue}
                      </span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: easeCurve }}
                      className="pt-4"
                    >
                      <ul className="space-y-2.5 text-sm text-white/85">
                        {activeFeature.lmsDetails.map((detail) => (
                          <li key={detail} className="flex items-start gap-2.5">
                            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center bg-[#F56C1F]/20 text-[#F56C1F]">
                              <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress segments */}
                  <div className="mt-5 flex gap-1.5" aria-hidden="true">
                    {LEARNING_FEATURES.map((feature, i) => (
                      <span
                        key={feature.id}
                        className={`h-1 flex-1 transition-colors duration-300 ${
                          i <= activeIndex ? 'bg-[#F56C1F]' : 'bg-white/15'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: chapter list */}
          <div className="lg:col-span-6 space-y-3">
            {LEARNING_FEATURES.map((feature) => {
              const isSelected = feature.id === activeId;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveId(feature.id)}
                  onMouseEnter={() => setActiveId(feature.id)}
                  aria-pressed={isSelected}
                  className={`group relative w-full text-left overflow-hidden border px-5 sm:px-6 py-5 sm:py-6 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186534] ${
                    isSelected
                      ? 'bg-[#F8F8F8] border-[#186534]/40 shadow-[0_20px_40px_-28px_rgba(15,28,8,0.5)] lg:translate-x-1.5'
                      : 'bg-white border-black/10 hover:border-black/30'
                  }`}
                >
                  {/* Active indicator slides between cards */}
                  {isSelected && (
                    <motion.span
                      layoutId="learning-active-bar"
                      aria-hidden="true"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                      className="absolute left-0 top-0 h-full w-[3px] bg-[#F56C1F]"
                    />
                  )}

                  {/* Ghost step number */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-5 right-3 font-display text-[5.5rem] leading-none font-extrabold tabular-nums select-none transition-colors duration-300 ${
                      isSelected ? 'text-[#F9CE3A]/50' : 'text-black/[0.04]'
                    }`}
                  >
                    {feature.step}
                  </span>

                  <div className="relative flex items-start gap-5">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center font-mono-num text-sm font-bold tabular-nums transition-colors duration-300 ${
                        isSelected
                          ? 'bg-[#F56C1F] text-white'
                          : 'bg-[#186534]/10 text-[#186534]'
                      }`}
                    >
                      {feature.step}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-black">
                          {feature.title}
                        </h3>
                        <span className="font-mono-num text-xs font-semibold text-[#186534]">
                          {feature.subtitle}
                        </span>
                      </div>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#454545] max-w-[52ch]">
                        {feature.description}
                      </p>
                      <span
                        className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#186534] transition-all duration-300 ${
                          isSelected ? 'opacity-100' : 'opacity-0 -translate-x-1'
                        }`}
                        aria-hidden="true"
                      >
                        Shown in the LMS console
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}