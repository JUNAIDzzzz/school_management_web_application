import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiImage } from 'react-icons/fi';
import { GALLERY_IMAGES } from '../../data/schoolContent';
import GradientPlaceholder from '../common/GradientPlaceholder';
import { GALLERY_ILLUSTRATIONS } from '../illustrations/Illustrations';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="bg-slate-50/70 py-24">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Gallery</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Life at {`Brightfield`}
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={container}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {GALLERY_IMAGES.map((image, idx) => {
            const Illustration = GALLERY_ILLUSTRATIONS[image.scene];
            return (
              <motion.button
                key={image.id}
                variants={item}
                whileHover={{ scale: 1.03 }}
                onClick={() => setActive(image)}
                data-cursor-hover
                className="group relative aspect-square overflow-hidden rounded-2xl text-left"
              >
                <GradientPlaceholder seed={idx} className="h-full w-full">
                  {image.image ? (
                    <img
                      src={image.image}
                      alt={image.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-white/85 transition-transform duration-300 group-hover:scale-110">
                      {Illustration && <Illustration className="h-full w-full" />}
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <FiImage className="mb-1 text-white/80" />
                    <p className="text-xs font-medium text-white">{image.alt}</p>
                  </div>
                </GradientPlaceholder>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <FiX size={22} />
              </button>
              <GradientPlaceholder seed={active.id} className="aspect-video w-full rounded-2xl shadow-2xl">
                {active.image ? (
                  <img src={active.image} alt={active.alt} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-white/80">
                    {(() => {
                      const ActiveIllustration = GALLERY_ILLUSTRATIONS[active.scene];
                      return ActiveIllustration ? <ActiveIllustration className="h-full max-h-48 w-auto" /> : null;
                    })()}
                  </div>
                )}
                <div className="relative flex h-full items-end bg-gradient-to-t from-black/50 via-transparent to-transparent p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                      {active.category}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">{active.alt}</p>
                  </div>
                </div>
              </GradientPlaceholder>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
