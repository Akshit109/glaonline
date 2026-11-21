import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  GraduationCap,
  Loader2,
  PhoneCall,
  X,
} from 'lucide-react';
import { PROGRAMS } from '../data/programs';
import { CONTACT_INFO, FEE_CONCESSIONS } from '../data/universityData';

interface ApplicationModalProps {
  isOpen: boolean;
  initialProgramId?: string;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  programId: string;
  concessionId: string;
  city: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  programId?: string;
  consent?: string;
}

const inputBase =
  'w-full min-h-[46px] px-3.5 py-2.5 bg-[#F7F7F5] border text-sm text-black placeholder:text-[#777777] transition-colors focus:outline-none focus:bg-white focus:border-[#186534] focus:ring-2 focus:ring-[#186534]/15';

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono-num text-[11px] font-semibold uppercase tracking-wider text-[#454545] mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-xs text-[#D00000]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ApplicationModal({
  isOpen,
  initialProgramId,
  onClose,
}: ApplicationModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    programId: initialProgramId || PROGRAMS[0].id,
    concessionId: FEE_CONCESSIONS[0].id,
    city: '',
    consent: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (initialProgramId) {
      setForm((prev) => ({ ...prev, programId: initialProgramId }));
    }
  }, [initialProgramId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock page scroll while the dialog is open
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!form.programId) {
      nextErrors.programId = 'Please select a degree programme.';
    }
    if (!form.consent) {
      nextErrors.consent = 'Please confirm permission for admissions counselling contact.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const refCode = `GLA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      try {
        sessionStorage.setItem(
          'gla_online_latest_enquiry',
          JSON.stringify({
            refCode,
            programId: form.programId,
            concessionId: form.concessionId,
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            submittedAt: new Date().toISOString(),
          })
        );
      } catch {
        // Ignore storage restriction
      }
      setIsSubmitting(false);
      setSubmittedRef(refCode);
    }, 550);
  };

  const selectedProgram = PROGRAMS.find((p) => p.id === form.programId) ?? PROGRAMS[0];

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setErrors({});
    onClose();
  };

  const fieldClass = (hasError?: string) =>
    `${inputBase} ${hasError ? 'border-[#D00000]/60' : 'border-black/15'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="application-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-[#060D03]/80 backdrop-blur-sm"
          />

          {/* Dialog Panel: split layout */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeCurve }}
            className="relative z-10 w-full max-w-4xl max-h-[94vh] bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden grid grid-cols-1 md:grid-cols-[320px_1fr]"
          >
            {/* Close */}
            <button
              type="button"
              onClick={handleResetAndClose}
              aria-label="Close application dialog"
              className="absolute top-3 right-3 z-20 w-10 h-10 inline-flex items-center justify-center bg-white/90 md:bg-transparent border border-black/15 md:border-black/10 text-black hover:bg-[#F1F1F1] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186534]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* LEFT: brand panel */}
            <aside className="relative hidden md:flex flex-col justify-between bg-[#0F1C08] text-white p-8 overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#F56C1F]/30 blur-[90px]"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#F9CE3A]/40 bg-[#F9CE3A]/10 px-3 py-1 text-xs font-semibold text-[#F9CE3A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F9CE3A]" />
                  Admissions 2026
                </span>
                <h3 className="mt-6 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.025em]">
                  Your degree
                  <br />
                  starts with
                  <br />
                  <span className="text-[#F56C1F]">one form.</span>
                </h3>
                <ul className="mt-7 space-y-3 text-sm text-white/80">
                  {[
                    '100% online, recognised degree',
                    'Live + recorded classes',
                    'Alumni & sibling grants available',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <BadgeCheck
                        className="w-4 h-4 mt-0.5 shrink-0 text-[#F9CE3A]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Live summary of the chosen programme */}
              <div className="relative mt-8 border border-dashed border-white/30 bg-white/[0.05] p-4">
                <p className="font-mono-num text-[11px] font-semibold uppercase tracking-wider text-[#F9CE3A]">
                  You are applying for
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center bg-[#F56C1F] shrink-0">
                    <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={selectedProgram.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="font-display text-lg font-bold leading-tight">
                        {selectedProgram.shortName}
                      </p>
                      <p className="text-xs text-white/70">
                        {selectedProgram.semesterFee} / semester
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </aside>

            {/* RIGHT: form / success */}
            <div className="relative overflow-y-auto max-h-[94vh] p-6 sm:p-8 md:p-10">
              <div className="pr-10">
                <p className="font-mono-num text-xs font-semibold uppercase tracking-wider text-[#186534]">
                  Admissions 2026 · GLA Online
                </p>
                <h2
                  id="application-modal-title"
                  className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-black"
                >
                  {submittedRef ? 'Enquiry Registered' : 'Start Your 2026 Application'}
                </h2>
                {!submittedRef && (
                  <p className="mt-2 text-sm text-[#555555]">
                    Takes under a minute. A counsellor will help with eligibility and fees.
                  </p>
                )}
              </div>

              {submittedRef ? (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeCurve }}
                  className="pt-7 space-y-6"
                >
                  <div className="flex items-start gap-4">
                    <motion.span
                      initial={prefersReducedMotion ? false : { scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#186534] text-white"
                    >
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </motion.span>
                    <p className="text-sm sm:text-base font-semibold text-black leading-snug pt-1">
                      Thank you, {form.fullName.trim()}. Your interest in{' '}
                      {selectedProgram.shortName} has been recorded.
                    </p>
                  </div>

                  {/* Ticket-style reference */}
                  <div className="relative border border-black/15 bg-[#F7F7F5] px-5 py-4 flex items-center justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border border-black/15"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border border-black/15"
                    />
                    <div>
                      <p className="font-mono-num text-[11px] font-semibold uppercase tracking-wider text-[#555555]">
                        Reference ID
                      </p>
                      <p className="mt-0.5 font-mono-num text-lg sm:text-xl font-bold text-black tracking-wide">
                        {submittedRef}
                      </p>
                    </div>
                    <span className="hidden sm:inline-block border-l border-dashed border-black/25 pl-4 font-mono-num text-xs font-semibold text-[#186534]">
                      {selectedProgram.shortName}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-[#454545]">
                    <p className="font-semibold text-black">Recommended Next Steps</p>
                    <div className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center bg-[#186534] text-white text-xs font-bold">
                        1
                      </span>
                      <p>
                        Complete your official registration and generate your UGC DEB ID directly
                        on the GLA Online portal.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center bg-[#186534] text-white text-xs font-bold">
                        2
                      </span>
                      <p>
                        For immediate eligibility, scholarship verification, or fee-plan
                        assistance, call{' '}
                        <a
                          href={CONTACT_INFO.phoneHref}
                          className="inline-flex items-center gap-1 font-semibold text-black underline hover:text-[#186534]"
                        >
                          <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                          {CONTACT_INFO.phoneDisplay}
                        </a>{' '}
                        ({CONTACT_INFO.supportHours}).
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <a
                      href={CONTACT_INFO.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 bg-[#F56C1F] text-white text-sm font-semibold hover:bg-[#dc5b12] transition-colors"
                    >
                      <span>Continue on glaonline.com</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="inline-flex items-center justify-center min-h-[46px] px-5 py-2.5 border border-black/20 text-sm font-semibold text-black hover:bg-[#F1F1F1] transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="pt-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field id="applicant-program" label="Programme" error={errors.programId}>
                      <select
                        id="applicant-program"
                        value={form.programId}
                        onChange={(e) => setForm({ ...form, programId: e.target.value })}
                        aria-invalid={Boolean(errors.programId)}
                        className={fieldClass(errors.programId)}
                      >
                        {PROGRAMS.map((prog) => (
                          <option key={prog.id} value={prog.id}>
                            {prog.shortName} ({prog.semesterFee}/sem)
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field id="applicant-concession" label="Fee Category">
                      <select
                        id="applicant-concession"
                        value={form.concessionId}
                        onChange={(e) => setForm({ ...form, concessionId: e.target.value })}
                        className={fieldClass()}
                      >
                        {FEE_CONCESSIONS.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field id="applicant-name" label="Full Name" error={errors.fullName}>
                      <input
                        id="applicant-name"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Aarav Sharma"
                        aria-invalid={Boolean(errors.fullName)}
                        className={fieldClass(errors.fullName)}
                      />
                    </Field>

                    <Field id="applicant-phone" label="Mobile Number" error={errors.phone}>
                      <input
                        id="applicant-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98XXXXXXXX"
                        aria-invalid={Boolean(errors.phone)}
                        className={fieldClass(errors.phone)}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field id="applicant-email" label="Email Address" error={errors.email}>
                      <input
                        id="applicant-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className={fieldClass(errors.email)}
                      />
                    </Field>

                    <Field id="applicant-city" label="City / State (Optional)">
                      <input
                        id="applicant-city"
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="e.g. Mathura, UP"
                        className={fieldClass()}
                      />
                    </Field>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 text-xs text-[#454545] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-0.5 w-4 h-4 accent-[#186534]"
                      />
                      <span>
                        I authorise GLA University Online admissions counsellors to contact me
                        with programme information, eligibility details, and 2026 intake updates.
                      </span>
                    </label>
                    {errors.consent && (
                      <p role="alert" className="mt-1 text-xs text-[#D00000]">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-black/10">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-2.5 bg-[#F56C1F] text-white text-sm font-semibold hover:bg-[#dc5b12] disabled:opacity-60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F56C1F]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Admission Counselling</span>
                          <ArrowUpRight
                            className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    <a
                      href={CONTACT_INFO.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#454545] hover:text-black underline"
                    >
                      <span>Direct Portal Application</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}