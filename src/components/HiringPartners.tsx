import { motion } from 'motion/react';

const PARTNER_LOGOS = [
  { name: 'Accenture', domain: 'accenture.com' },
  { name: 'Deloitte', domain: 'deloitte.com' },
  { name: 'TCS', domain: 'tcs.com' },
  { name: 'Cognizant', domain: 'cognizant.com' },
  { name: 'Capgemini', domain: 'capgemini.com' },
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Infosys', domain: 'infosys.com' },
  { name: 'Wipro', domain: 'wipro.com' },
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Bosch', domain: 'bosch.com' },
  { name: 'Aon', domain: 'aon.com' },
];

const LogoCard = ({
  name,
  domain,
}: {
  name: string;
  domain: string;
}) => {
  return (
    <div className="group flex flex-col items-center justify-center shrink-0 w-[160px] sm:w-[190px] h-[150px] sm:h-[170px] px-5">
      {/* Logo */}
      <div className="flex items-center justify-center h-24 w-full">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt={`${name} logo`}
          loading="lazy"
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-65 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
        />
      </div>

      {/* Company Name */}
      <p className="mt-3 text-sm sm:text-base font-semibold text-black/65 tracking-wide text-center whitespace-nowrap transition-colors duration-300 group-hover:text-[#186534]">
        {name}
      </p>
    </div>
  );
};

export const HiringPartners = () => {
  const duplicatedLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="relative bg-white py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#186534] mb-4">
            Industry Connections
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-black">
            Where ambition meets{' '}
            <span className="text-[#186534]">opportunity.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-black/55 max-w-2xl mx-auto leading-relaxed">
            Build your future with career opportunities across leading
            organizations and a growing industry network.
          </p>
        </div>

        {/* Continuous Logo Slider */}
        <div className="relative overflow-hidden">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent" />

          <motion.div
            className="flex w-max items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 35,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((company, index) => (
              <LogoCard
                key={`${company.name}-${index}`}
                name={company.name}
                domain={company.domain}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-[#F56C1F]" />
        </div>
      </div>
</section>
  );
};