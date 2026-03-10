'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from '@/lib/i18n-context';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Gerçek görseller - public/Görsel Galeri/ klasöründen
const galleryImages = [
  { 
    id: 1, 
    src: '/Görsel Galeri/alaz görsel1.webp', 
    alt: 'Alaz Restoran - İç Mekan',
    span: 'col-span-2 row-span-2',
    priority: true 
  },
  { 
    id: 2, 
    src: '/Görsel Galeri/alaz restoran görsel 2.webp', 
    alt: 'Alaz Restoran - Lezzetler',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 3, 
    src: '/Görsel Galeri/alaz restoran görsel 3.webp', 
    alt: 'Alaz Restoran - Atmosfer',
    span: 'col-span-1 row-span-2' 
  },
  { 
    id: 4, 
    src: '/Görsel Galeri/alaz restoran görsel 4.webp', 
    alt: 'Alaz Restoran - Detaylar',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 5, 
    src: '/Görsel Galeri/alaz restoran görsel5.webp', 
    alt: 'Alaz Restoran - Sunum',
    span: 'col-span-1 row-span-1' 
  },
  { 
    id: 6, 
    src: '/Görsel Galeri/alaz restoran görsel6.webp', 
    alt: 'Alaz Restoran - Özel Anlar',
    span: 'col-span-2 row-span-1' 
  },
];

export function Gallery() {
  const { t } = useTranslations();
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    } else {
      setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="section-padding bg-[var(--color-background)]"
      >
        <div className="container-wide">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-small text-[var(--color-accent)] mb-4 block">
                {t('gallery.eyebrow')}
              </span>
              <h2 className="text-display-md font-display text-[var(--color-foreground)]">
                {t('gallery.title')}
              </h2>
            </div>
            <p className="text-body text-[var(--color-foreground-secondary)] font-body max-w-md">
              {t('gallery.subtitle')}
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  'relative overflow-hidden rounded-sm cursor-pointer group',
                  image.span
                )}
                onClick={() => openLightbox(index)}
              >
                {/* Optimized Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={image.priority}
                  quality={75}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-white transform -rotate-45" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Link
              href={`/${locale}/gallery`}
              className={cn(
                'inline-flex items-center gap-2 text-[var(--color-accent)]',
                'font-medium text-sm tracking-wide',
                'transition-colors duration-300 hover:text-[var(--color-accent-hover)]'
              )}
            >
              Tüm Galeriyi Gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[currentImage].src}
                alt={galleryImages[currentImage].alt}
                fill
                sizes="100vw"
                className="object-contain"
                quality={75}
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
