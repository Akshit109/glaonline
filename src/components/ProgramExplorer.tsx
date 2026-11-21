import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Clock, Percent, Search, X } from 'lucide-react';
import { PROGRAMS, type Program, type ProgramLevel } from '../data/programs';
import { FEE_CONCESSIONS } from '../data/universityData';

interface ProgramExplorerProps {
  onApplyClick: (programId?: string) => void;
}

type FilterTab = 'ALL' | ProgramLevel;
type ConcessionId = (typeof FEE_CONCESSIONS)[number]['id'];

function parseInr(feeString: string): number {
  return Number(feeString.replace(/[^0-9]/g, '')) || 0;
}

function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function ProgramExplorer({ onApplyClick }: ProgramExplorerProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string>(PROGRAMS[0].id);
  const [concessionId, setConcessionId] = useState<ConcessionId>('standard');
  const prefersReducedMotion = useReducedMotion();
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const activeConcession =
    FEE_CONCESSIONS.find((c) => c.id === concessionId) ?? FEE_CONCESSIONS[0];

  const tabs = useMemo(
    () => [
      { key: 'ALL' as const, label: `All (${PROGRAMS.length})` },
      {
        key: 'UG' as const,
        label: `Undergraduate (${PROGRAMS.filter((p) => p.level === 'UG').length})`,
      },
      {
        key: 'PG' as const,
        label: `Postgraduate (${PROGRAMS.filter((p) => p.level === 'PG').length})`,
      },
    ],
    []
  );

  const filteredPrograms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PROGRAMS.filter((program) => {
      const matchesTab = activeTab === 'ALL' || program.level === activeTab;
      if (!matchesTab) return false;
      if (!query) return true;
      return (
        program.name.toLowerCase().includes(query) ||
        program.shortName.toLowerCase().includes(query) ||
        program.summary.toLowerCase().includes(query) ||
        program.specializations.some((spec) => spec.toLowerCase().includes(query)) ||
        program.careers.some((career) => career.toLowerCase().includes(query))
      );
    });
  }, [activeTab, searchQuery]);

  const handleToggleProgram = (program: Program) => {
    setExpandedId((current) => (current === program.id ? '' : program.id));
  };

  return (
    <section
      id="programs"
      className="relative py-20 lg:py-28 bg-white border-b border-black/10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 h-[360px] w-[360px] rounded-full bg-[#F9CE3A]/20 blur-[120px]"
      />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 font-mono-num text-xs font-semibold tracking-wider uppercase text-[#186534]">
              <span aria-hidden="true" className="h-px w-8 bg-[#186534]" />
              Academic Catalogue · 2026 Intake
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.06] tracking-[-0.025em] font-extrabold text-black">
              Find the degree that takes you{' '}
              <span className="relative inline-block">
                <span className="relative z-10">further.</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 h-[0.32em] bg-[#F9CE3A] z-0"
                />
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Level tabs with sliding indicator */}
            <div
              role="tablist"
              aria-label="Filter programmes by level"
              className="flex flex-wrap items-center self-start p-1 bg-[#F1F1F1] border border-black/10"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#186534] ${
                      isActive ? 'text-white' : 'text-[#454545] hover:text-black'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="program-tab-pill"
                        aria-hidden="true"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 420, damping: 34 }
                        }
                        className="absolute inset-0 bg-[#0A120E]"
                      />
                    )}
                    <span className="relative">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by degree, specialisation, or career path..."
                aria-label="Search programmes by degree, specialisation, or career path"
                className="w-full min-h-[48px] pl-10 pr-10 py-2.5 bg-[#F8F8F8] border border-black/15 text-sm text-black placeholder:text-[#666666] transition-colors focus:outline-none focus:bg-white focus:border-[#186534] focus:ring-2 focus:ring-[#186534]/15"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear programme search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#666666] hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tuition estimator */}
        <div className="relative mb-8 overflow-hidden bg-[#0F1C08] text-white px-5 sm:px-7 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          <div className="relative flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#F56C1F]">
              <Percent className="w-4 h-4" aria-hidden="true" />
            </span>
            <div className="text-sm">
              <p className="font-display text-base font-bold">Tuition Estimator</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeConcession.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="mt-0.5 text-white/75"
                >
                  {activeConcession.note}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div
            role="group"
            aria-label="Select fee concession category"
            className="relative flex flex-wrap items-center gap-1.5"
          >
            {FEE_CONCESSIONS.map((item) => {
              const selected = item.id === concessionId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setConcessionId(item.id)}
                  aria-pressed={selected}
                  className={`px-3.5 py-2 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F9CE3A] ${
                    selected
                      ? 'bg-[#F9CE3A] border-[#F9CE3A] text-[#0F1C08]'
                      : 'bg-transparent border-white/25 text-white/80 hover:text-white hover:border-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Programme directory */}
        {filteredPrograms.length === 0 ? (
          <div className="py-16 text-center bg-[#F8F8F8] border border-dashed border-black/20 px-6">
            <p className="font-display text-2xl font-bold text-black">
              No programmes match &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="mt-2 text-sm text-[#454545]">
              Try searching for MBA, MCA, BBA, BCA, B.Com, Finance, or Business Analytics.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveTab('ALL');
              }}
              className="mt-5 inline-flex items-center justify-center min-h-[40px] px-5 py-2 bg-[#0A120E] text-white text-sm font-semibold hover:bg-[#186534] transition-colors cursor-pointer"
            >
              Show All {PROGRAMS.length} Programmes
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrograms.map((program, idx) => {
              const isExpanded = expandedId === program.id;
              const baseSemFee = parseInr(program.semesterFee);
              const baseTotalFee = parseInr(program.totalFee);
              const discountFactor = 1 - activeConcession.discountPercent / 100;
              const effectiveSemFee = formatInr(Math.round(baseSemFee * discountFactor));
              const effectiveTotalFee = formatInr(Math.round(baseTotalFee * discountFactor));

              return (
                <motion.article
                  key={program.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: easeCurve }}
                  className={`group relative overflow-hidden border transition-all duration-300 ${
                    isExpanded
                      ? 'bg-[#F8F8F8] border-[#186534]/40 shadow-[0_24px_48px_-28px_rgba(15,28,8,0.45)]'
                      : 'bg-white border-black/12 hover:border-black/30 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Accent bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-full w-[3px] origin-top bg-[#F56C1F] transition-transform duration-300 ${
                      isExpanded ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                    }`}
                  />

                  <div className="p-5 sm:p-7">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center">
                      {/* Code & level */}
                      <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-3 lg:gap-1.5">
                        <span className="font-mono-num text-2xl font-bold text-[#186534] tabular-nums">
                          {program.code}
                        </span>
                        <span className="inline-block bg-black/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#454545]">
                          {program.levelLabel}
                        </span>
                      </div>

                      {/* Name & summary */}
                      <div className="lg:col-span-5">
                        <button
                          type="button"
                          onClick={() => handleToggleProgram(program)}
                          aria-expanded={isExpanded}
                          aria-controls={`program-panel-${program.id}`}
                          className="text-left w-full group/btn cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#186534]"
                        >
                          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-black group-hover/btn:text-[#186534] transition-colors">
                            {program.name}
                          </h3>
                          <p className="mt-1.5 text-sm text-[#454545] line-clamp-2">
                            {program.summary}
                          </p>
                        </button>
                      </div>

                      {/* Duration & fee */}
                      <div className="lg:col-span-3 flex flex-wrap lg:flex-col gap-x-6 gap-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#186534]" aria-hidden="true" />
                          <span className="font-semibold text-black tabular-nums">
                            {program.duration} ({program.semesters} Sem)
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <motion.span
                            key={effectiveSemFee}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="font-display text-xl font-extrabold text-black tabular-nums"
                          >
                            {effectiveSemFee}
                          </motion.span>
                          <span className="text-xs text-[#666666]">/ sem</span>
                          {activeConcession.discountPercent > 0 && (
                            <span className="font-mono-num text-xs text-[#666666] line-through">
                              {program.semesterFee}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Toggle */}
                      <div className="lg:col-span-2 flex items-center lg:justify-end">
                        <button
                          type="button"
                          onClick={() => handleToggleProgram(program)}
                          aria-expanded={isExpanded}
                          aria-controls={`program-panel-${program.id}`}
                          className={`inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186534] ${
                            isExpanded
                              ? 'bg-[#0A120E] border-[#0A120E] text-white'
                              : 'bg-white border-black/20 text-black hover:border-black'
                          }`}
                        >
                          <span>{isExpanded ? 'Hide Specs' : 'Program Specs'}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`program-panel-${program.id}`}
                          initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: easeCurve }}
                          className="overflow-hidden"
                        >
                          <div className="mt-7 pt-7 border-t border-dashed border-black/20 grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Column A */}
                            <div className="lg:col-span-5 space-y-6">
                              <div>
                                <h4 className="font-mono-num text-xs font-semibold uppercase tracking-wider text-[#666666]">
                                  Specialisations &amp; Tracks
                                </h4>
                                <ul className="mt-3 flex flex-wrap gap-2">
                                  {program.specializations.map((spec) => (
                                    <li
                                      key={spec}
                                      className="bg-white border border-black/15 px-3 py-1.5 text-xs font-semibold text-black"
                                    >
                                      {spec}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-mono-num text-xs font-semibold uppercase tracking-wider text-[#666666]">
                                  Eligibility Criteria
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-[#454545]">
                                  {program.eligibility}
                                </p>
                              </div>
                            </div>

                            {/* Column B */}
                            <div className="lg:col-span-4 space-y-6">
                              <div>
                                <h4 className="font-mono-num text-xs font-semibold uppercase tracking-wider text-[#666666]">
                                  Target Roles
                                </h4>
                                <ul className="mt-3 space-y-2 text-sm font-medium text-black">
                                  {program.careers.map((career) => (
                                    <li key={career} className="flex items-baseline gap-2.5">
                                      <span
                                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#186534] translate-y-[-2px]"
                                        aria-hidden="true"
                                      />
                                      <span>{career}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-mono-num text-xs font-semibold uppercase tracking-wider text-[#666666]">
                                  Key Highlights
                                </h4>
                                <ul className="mt-3 space-y-2 text-sm text-[#454545]">
                                  {program.highlights.map((item) => (
                                    <li key={item} className="flex items-baseline gap-2.5">
                                      <span
                                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F56C1F] translate-y-[-2px]"
                                        aria-hidden="true"
                                      />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Column C: fee panel */}
                            <div className="relative lg:col-span-3 overflow-hidden bg-[#0F1C08] text-white p-5 flex flex-col justify-between gap-5">
                              <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#F56C1F]/30 blur-[50px]"
                              />
                              <div className="relative">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className="font-mono-num text-xs font-semibold uppercase tracking-wider text-[#F9CE3A]">
                                    Fee Specification
                                  </h4>
                                  {activeConcession.discountPercent > 0 && (
                                    <span className="bg-[#F9CE3A] px-2 py-0.5 font-mono-num text-[11px] font-bold text-[#0F1C08]">
                                      -{activeConcession.discountPercent}% Grant
                                    </span>
                                  )}
                                </div>
                                <dl className="mt-4 space-y-2.5 text-sm">
                                  <div className="flex justify-between gap-2">
                                    <dt className="text-white/70">Tuition / Sem</dt>
                                    <dd className="font-mono-num font-semibold text-white">
                                      {effectiveSemFee}
                                    </dd>
                                  </div>
                                  <div className="flex justify-between gap-2">
                                    <dt className="text-white/70">Total Tuition</dt>
                                    <dd className="font-mono-num font-semibold text-[#F9CE3A]">
                                      {effectiveTotalFee}
                                    </dd>
                                  </div>
                                  <div className="flex justify-between gap-2 text-xs text-white/65 pt-2.5 border-t border-dashed border-white/25">
                                    <dt>One-time Registration</dt>
                                    <dd className="font-mono-num">{program.registrationFee}</dd>
                                  </div>
                                  <div className="flex justify-between gap-2 text-xs text-white/65">
                                    <dt>One-time Alumni Fee</dt>
                                    <dd className="font-mono-num">{program.alumniFee}</dd>
                                  </div>
                                  <div className="flex justify-between gap-2 text-xs text-white/65">
                                    <dt>Exam Fee</dt>
                                    <dd className="font-mono-num">{program.examFee}</dd>
                                  </div>
                                </dl>
                              </div>

                              <button
                                type="button"
                                onClick={() => onApplyClick(program.id)}
                                className="group/apply relative w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 bg-[#F56C1F] text-white text-sm font-semibold hover:bg-[#dc5b12] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F9CE3A]"
                              >
                                <span>Apply for {program.shortName}</span>
                                <ArrowUpRight
                                  className="w-4 h-4 transition-transform group-hover/apply:translate-x-0.5 group-hover/apply:-translate-y-0.5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}