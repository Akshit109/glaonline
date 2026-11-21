import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { CONTACT_INFO, FAQ_ITEMS } from '../data/universityData';

export function FAQ() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-b border-black/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Sticky Header Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <p className="font-mono-num text-xs font-semibold tracking-wider uppercase text-[#186534]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl leading-[1.06] tracking-[-0.025em] font-extrabold text-black">
              Everything you need to know before applying.
            </h2>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#454545]">
              Clear answers on eligibility, UGC-DEB recognition, LMS delivery, online proctored
              exams, and semester fee schedules.
            </p>

            <div className="mt-8 pt-6 border-t border-black/10 space-y-2 text-sm">
              <p className="font-bold text-black">Direct Admissions Desk</p>
              <p className="text-[#454545]">
                <a href={CONTACT_INFO.phoneHref} className="underline hover:text-[#186534]">
                  {CONTACT_INFO.phoneDisplay}
                </a>{' '}
                · {CONTACT_INFO.supportHours}
              </p>
              <p className="text-[#454545]">
                <a href={CONTACT_INFO.emailHref} className="underline hover:text-[#186534]">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Right Accessible Accordion */}
          <div className="lg:col-span-8 divide-y divide-black/15 border-t border-b border-black/15">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              const buttonId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <div key={item.id} className="py-5 sm:py-6">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full text-left flex items-start justify-between gap-6 py-1 group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#186534]"
                    >
                      <div className="space-y-1">
                        <span className="font-mono-num text-xs font-semibold text-[#186534] block">
                          {item.category}
                        </span>
                        <span className="font-display text-lg sm:text-xl font-bold text-black group-hover:text-[#186534] transition-colors block">
                          {item.question}
                        </span>
                      </div>
                      <span
                        className="w-8 h-8 shrink-0 flex items-center justify-center border border-black/20 text-black group-hover:border-black transition-colors mt-1"
                        aria-hidden="true"
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 pr-12 text-sm sm:text-base leading-relaxed text-[#454545]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
