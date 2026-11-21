import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/universityData';
import glaLogo from '../assets/logo/logo.webp';

interface NavbarProps {
  onApplyClick: (programId?: string) => void;
}

const NAV_LINKS = [
  { label: 'Programs', href: '#programs' },
  { label: 'Why GLA', href: '#why-gla' },
  { label: 'Experience', href: '#experience' },
  { label: 'Careers', href: '#careers' },
];

export function Navbar({ onApplyClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu when page scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white text-black border-b border-black/10 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 lg:h-[72px] flex items-center justify-between gap-8">

        {/* Zone 1: GLA Logo */}
        <a
          href="#top"
          className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F56C1F]"
          aria-label="GLA University Home"
        >
          <img
            src={glaLogo}
            alt="GLA University"
            className="h-14 sm:h-16 lg:h-20 w-auto object-contain transition-opacity duration-200 hover:opacity-90"
          />
        </a>

        {/* Zone 2: Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#454545] hover:text-black transition-colors duration-150 whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#F56C1F] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F56C1F]"
            >
              {item.label}
            </a>
          ))}

          {/* Login */}
          <a
            href={CONTACT_INFO.studentPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#454545] hover:text-black transition-colors duration-150 whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#F56C1F] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F56C1F]"
          >
            Login
          </a>
        </nav>

        {/* Zone 3: Apply Button + Mobile Menu */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Apply Now */}
          <button
            type="button"
            onClick={() => onApplyClick()}
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-5 py-2 text-sm font-semibold bg-[#F56C1F] text-white hover:bg-[#dc5b12] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F56C1F]"
          >
            Apply Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-black hover:bg-[#F1F1F1] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F56C1F]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white text-black border-b border-black/10 px-5 pb-6 pt-2"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col divide-y divide-black/10"
            >
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3.5 text-base font-semibold text-black hover:text-[#186534] transition-colors flex items-center justify-between min-h-[44px]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#666666]" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}

              {/* About GLA */}
              <a
                href="#about-gla"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 text-base font-semibold text-black hover:text-[#186534] transition-colors flex items-center justify-between min-h-[44px]"
              >
                <span>About GLA</span>
                <span className="text-xs text-[#666666]" aria-hidden="true">
                  →
                </span>
              </a>

              {/* Student Portal */}
              <a
                href={CONTACT_INFO.studentPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 text-base font-medium text-[#454545] hover:text-black transition-colors flex items-center justify-between min-h-[44px]"
              >
                <span>Student Portal Login</span>
                <span className="text-xs text-[#666666]" aria-hidden="true">
                  ↗
                </span>
              </a>
            </nav>

            {/* Mobile Apply CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onApplyClick();
                }}
                className="w-full min-h-[44px] py-3 px-6 bg-[#F56C1F] text-white text-sm font-semibold hover:bg-[#dc5b12] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F56C1F]"
              >
                Apply for 2026 Admissions
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}