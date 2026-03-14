'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/lib/i18n-context';
import { motion } from 'framer-motion';

export function Hero() {
  const { t } = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setScrollY(-rect.top);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.4;

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image - Same for both modes */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.37, 0, 0.63, 1] }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 scale-110"
            style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
          >
            <img
              src="/g%C3%B6rsel%20i%C3%A7erikler/alazordu%20hero%20banner.jpg"
              alt="Alaz Restaurant"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/60 tracking-widest uppercase">
            {t('hero.scroll')}
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/20" />
    </section>
  );
}
