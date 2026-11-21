import { motion } from 'motion/react';

export function DirectorMessage() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#186534] mb-4">
              A Message from the Director
            </p>

            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
              Shaping the future of
              <span className="text-[#186534]"> online education.</span>
            </h2>

            <p className="mt-6 text-gray-600 leading-8 text-base md:text-lg">
              Discover the vision, philosophy and commitment behind GLA University
              Online, and how we are building a flexible, accessible and
              future-focused learning experience for students.
            </p>
          </motion.div>

          {/* Vimeo Video */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-xl">
              <div className="aspect-video w-full">
                <iframe
                  src="https://player.vimeo.com/video/1164234967?h=3c45c224cc&autopause=0&player_id=0&app_id=58479"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  title="Director’s Message – GLA University Online"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}