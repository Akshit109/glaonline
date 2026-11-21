import { motion } from 'motion/react';
import { ArrowUpRight, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { PROGRAMS } from '../data/programs';
import { CONTACT_INFO } from '../data/universityData';
import glaLogo from '../assets/logo/logo.webp';

interface FooterProps {
  onApplyClick: () => void;
}

export const Footer = ({ onApplyClick }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const programLinks = PROGRAMS.map((program) => ({
    name: program.shortName || program.name,
    href: `#${program.id}`,
  }));

  const universityLinks = [
    { name: 'About GLA University', href: '#why-gla' },
    { name: 'Campus Experience', href: '#experience' },
    { name: 'Career Opportunities', href: '#careers' },
    { name: 'Why Choose GLA', href: '#why-gla' },
  ];

  const admissionLinks = [
    { name: 'Apply Now', action: onApplyClick },
    { name: 'Student Portal', href: CONTACT_INFO.studentPortalUrl },
    { name: 'Contact Admissions', href: `mailto:${CONTACT_INFO.email}` },
  ];

  return (
    <footer className="relative bg-white text-black overflow-hidden">
      {/* Top Accent Line */}
      <div className="h-[3px] w-full bg-[#186534]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <a
              href="#top"
              aria-label="GLA University Home"
              className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F56C1F]"
            >
              <img
                src={glaLogo}
                alt="GLA University"
                className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
              />
            </a>

            <p className="text-sm leading-relaxed text-black/65 max-w-sm">
              Centre for Distance &amp; Online Education, GLA University.
              NAAC A+ accredited digital degree programmes for undergraduate
              and postgraduate learners.
            </p>

            {/* Contact Information */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-black/65">
                <MapPin size={16} className="mt-1 shrink-0 text-[#186534]" />
                <span>{CONTACT_INFO.mathuraCampus}</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-black/65">
                <MapPin size={16} className="mt-1 shrink-0 text-[#186534]" />
                <span>{CONTACT_INFO.noidaCampus}</span>
              </div>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-sm text-black/65 hover:text-[#186534] transition-colors"
              >
                <Mail size={16} className="shrink-0 text-[#186534]" />
                <span>{CONTACT_INFO.email}</span>
              </a>

              {CONTACT_INFO.phone && (
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 text-sm text-black/65 hover:text-[#186534] transition-colors"
                >
                  <Phone size={16} className="shrink-0 text-[#186534]" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Programs Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#186534] mb-6">
              Online Programs
            </h3>

            <ul className="space-y-4">
              {programLinks.map((program, index) => (
                <motion.li
                  key={program.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <a
                    href={program.href}
                    className="group inline-flex items-center gap-2 text-sm text-black/65 hover:text-[#186534] transition-colors"
                  >
                    <span>{program.name}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0 group-hover:translate-x-0.5 transition-all text-[#F56C1F]"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* University Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#186534] mb-6">
              University
            </h3>

            <ul className="space-y-4">
              {universityLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-black/65 hover:text-[#186534] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0 group-hover:translate-x-0.5 transition-all text-[#F56C1F]"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Admissions Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#186534] mb-6">
              Admissions &amp; Portals
            </h3>

            <ul className="space-y-4">
              {admissionLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  {'action' in link ? (
                    <button
                      onClick={link.action}
                      className="group inline-flex items-center gap-2 text-sm text-black/65 hover:text-[#186534] transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0 group-hover:translate-x-0.5 transition-all text-[#F56C1F]"
                      />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-black/65 hover:text-[#186534] transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0 group-hover:translate-x-0.5 transition-all text-[#F56C1F]"
                      />
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={onApplyClick}
              className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-[#186534] text-white text-sm font-medium rounded-full hover:bg-[#124c27] transition-all duration-300 hover:shadow-lg hover:shadow-green-900/15 group"
            >
              Apply for 2026
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-black/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-black/50 text-center md:text-left">
            © {new Date().getFullYear()} GLA University. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-xs text-black/50 hover:text-[#186534] transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#terms"
              className="text-xs text-black/50 hover:text-[#186534] transition-colors"
            >
              Terms &amp; Conditions
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs text-black/50 hover:text-[#186534] transition-colors group"
          >
            Back to top
            <span className="p-2 rounded-full border border-black/15 group-hover:border-[#186534] group-hover:text-[#186534] transition-all">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};