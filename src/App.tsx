
import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProgramExplorer } from './components/ProgramExplorer';
import { UniversityHighlights } from './components/UniversityHighlights';
import { LearningExperience } from './components/LearningExperience';
import { CareerSection } from './components/CareerSection';
import { HiringPartners } from './components/HiringPartners';
import { Testimonials } from './components/Testimonials';
import { AdmissionProcess } from './components/AdmissionProcess';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { Chatbot } from './components/Chatbot';
import { CONTACT_INFO } from './data/universityData';
import { DirectorMessage } from './components/DirectorMessage';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>(
    undefined,
  );
  const [showMobileStickyCta, setShowMobileStickyCta] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setShowMobileStickyCta(window.scrollY > 560);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleApplyClick = (programId?: string) => {
    setSelectedProgramId(programId);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Scroll Progress Hairline */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#F56C1F] origin-left z-50 pointer-events-none"
        />
      )}

      <Navbar onApplyClick={handleApplyClick} />

      <main className="pb-16 md:pb-0">
        <Hero onApplyClick={handleApplyClick} />

        <ProgramExplorer onApplyClick={handleApplyClick} />

        <UniversityHighlights />

        {/* Director's Message Video */}
        <DirectorMessage />

        <LearningExperience />

        <CareerSection onApplyClick={handleApplyClick} />

        {/* Sliding Company Logos */}
        <HiringPartners />

        <Testimonials />

        <AdmissionProcess onApplyClick={handleApplyClick} />

        <FAQ />

        <FinalCTA onApplyClick={handleApplyClick} />
      </main>

      <Footer onApplyClick={handleApplyClick} />

      {/* GLA Online AI Admissions Chatbot */}
      <Chatbot />

      {/* Discreet Mobile Sticky Admission CTA */}
      {showMobileStickyCta && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-black/15 px-4 py-2.5 flex items-center justify-between gap-3">
          <a
            href={CONTACT_INFO.phoneHref}
            className="text-xs font-medium text-[#454545] hover:text-black whitespace-nowrap"
          >
            Call {CONTACT_INFO.phoneDisplay}
          </a>

          <button
            type="button"
            onClick={() => handleApplyClick()}
            className="min-h-[40px] px-5 py-2 bg-[#F56C1F] text-white text-xs font-semibold hover:bg-[#dc5b12] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Apply for 2026
          </button>
        </div>
      )}

      <ApplicationModal
        isOpen={modalOpen}
        initialProgramId={selectedProgramId}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
