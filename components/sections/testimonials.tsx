'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n-context';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const { t } = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Get reviews array from translations
  const reviews = [
    { text: t('testimonials.reviews.0.text'), author: t('testimonials.reviews.0.author'), role: t('testimonials.reviews.0.role') },
    { text: t('testimonials.reviews.1.text'), author: t('testimonials.reviews.1.author'), role: t('testimonials.reviews.1.role') },
    { text: t('testimonials.reviews.2.text'), author: t('testimonials.reviews.2.author'), role: t('testimonials.reviews.2.role') },
  ];

  const navigate = (newDirection: 'prev' | 'next') => {
    setDirection(newDirection === 'next' ? 1 : -1);
    if (newDirection === 'next') {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    }
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      navigate('next');
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[var(--color-background-secondary)] overflow-hidden"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-small text-[var(--color-accent)] mb-4 block">
            {t('testimonials.eyebrow')}
          </span>
          <h2 className="text-display-md font-display text-[var(--color-foreground)]">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Quote className="w-16 h-16 text-[var(--color-accent)]/20" />
          </div>

          {/* Carousel Content */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-full text-center px-4"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-body text-[var(--color-foreground)] leading-relaxed mb-8 max-w-3xl mx-auto">
                  &ldquo;{reviews[currentIndex].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-2">
                  {/* Avatar Placeholder */}
                  <div className="w-14 h-14 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center mb-2">
                    <span className="text-lg font-display font-medium text-[var(--color-accent)]">
                      {reviews[currentIndex].author.charAt(0)}
                    </span>
                  </div>
                  <cite className="not-italic font-display font-medium text-[var(--color-foreground)]">
                    {reviews[currentIndex].author}
                  </cite>
                  <span className="text-sm text-[var(--color-foreground-muted)]">
                    {reviews[currentIndex].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate('prev')}
              className={cn(
                'p-3 rounded-full border border-[var(--color-border)]',
                'text-[var(--color-foreground-secondary)]',
                'transition-all duration-300',
                'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'w-8 bg-[var(--color-accent)]'
                      : 'bg-[var(--color-border)] hover:bg-[var(--color-foreground-muted)]'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate('next')}
              className={cn(
                'p-3 rounded-full border border-[var(--color-border)]',
                'text-[var(--color-foreground-secondary)]',
                'transition-all duration-300',
                'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              )}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
