'use client';

import { useRef } from 'react';
import { useTranslations } from '@/lib/i18n-context';
import { useTheme } from '@/lib/theme-provider';
import { PlaceholderImage } from '@/components/shared/placeholder-image';
import { motion, useInView } from 'framer-motion';

export function About() {
  const { t } = useTranslations();
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-[var(--color-background)] overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <img
                  src="/g%C3%B6rsel%20i%C3%A7erikler/gecep04.jpg"
                  alt="Alaz Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Accent Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-8 -right-8 md:-right-12 w-1/2 aspect-square"
              >
                <div className="relative w-full h-full p-3 bg-[var(--color-background)]">
                  <img
                    src="/g%C3%B6rsel%20i%C3%A7erikler/03.jpg"
                    alt="Alaz Restaurant Detail"
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[var(--color-accent)]/30" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[var(--color-accent)]/30" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-small text-[var(--color-accent)] mb-4 block"
            >
              {t('about.eyebrow')}
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-display-md font-display text-[var(--color-foreground)] mb-6"
            >
              {t('about.title')}
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 text-body text-[var(--color-foreground-secondary)] font-body"
            >
              <p>{t('about.description')}</p>
              <p>{t('about.description2')}</p>
              <div className="pt-4 border-t border-[var(--color-border)]">
                <p className="text-lg font-display text-[var(--color-foreground)]">
                  Hoşgeldiniz...<br/>
                  <span className="text-[var(--color-accent)]">Geçmişin zarafetine, bugünün lezzetine.</span>
                </p>
              </div>
            </motion.div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
