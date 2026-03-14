'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from '@/lib/i18n-context';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuCategories = [
  { id: 'starters', placeholder: 5 },
  { id: 'mains', placeholder: 6 },
  { id: 'desserts', placeholder: 7 },
  { id: 'drinks', placeholder: 8 },
];

export function RestaurantMenu() {
  const { t } = useTranslations();
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="section-padding bg-[var(--color-background-secondary)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-small text-[var(--color-accent)] mb-4 block">
            {t('menu.eyebrow')}
          </span>
          <h2 className="text-display-md font-display text-[var(--color-foreground)] mb-4">
            {t('menu.title')}
          </h2>
          <p className="text-body text-[var(--color-foreground-secondary)] font-body">
            {t('menu.subtitle')}
          </p>
        </motion.div>

        {/* Menu Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/${locale}/menu#${category.id}`}
                className={cn(
                  'group block relative overflow-hidden rounded-sm',
                  'bg-[var(--color-background)]',
                  'transition-all duration-500',
                  'hover:shadow-xl hover:-translate-y-2'
                )}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src="/g%C3%B6rsel%20i%C3%A7erikler/lezzet%20yolculugu.png"
                    alt={t(`menu.categories.${category.id}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category Number */}
                  <span className="absolute top-4 left-4 text-6xl font-display font-bold text-white/10">
                    0{index + 1}
                  </span>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-display font-medium text-white mb-2">
                      {t(`menu.categories.${category.id}.name`)}
                    </h3>
                    <p className="text-sm text-white/80 font-body line-clamp-2">
                      {t(`menu.categories.${category.id}.description`)}
                    </p>
                    
                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Keşfet</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href={`/${locale}/menu`}
            className={cn(
              'inline-flex items-center gap-3 px-8 py-4',
              'bg-[var(--color-foreground)] text-[var(--color-background)]',
              'font-medium text-sm tracking-wide',
              'rounded-sm transition-all duration-300',
              'hover:bg-[var(--color-accent)] hover:shadow-lg',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
            )}
          >
            {t('menu.cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
