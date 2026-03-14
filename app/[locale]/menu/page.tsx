'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Sparkles, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

// react-pdf'i dynamic import ile yükle (SSR devre dışı)
const PDFViewer = dynamic(
  () => import('@/components/pdf-viewer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
        <div className="w-12 h-12 border-3 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[var(--color-foreground-secondary)]">Menü yükleniyor...</p>
      </div>
    ),
  }
);

export default function MenuPage() {
  const [locale, setLocale] = useState<string>('tr');

  useEffect(() => {
    const path = window.location.pathname;
    const localeFromPath = path.split('/')[1] || 'tr';
    setLocale(localeFromPath);
  }, []);

  const isTr = locale === 'tr';

  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-16 sm:pt-20">
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 mb-4 sm:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-xs sm:text-sm font-medium text-[var(--color-accent)] tracking-wide">
                {isTr ? 'LEZZET YOLCULUĞU' : 'CULINARY JOURNEY'}
              </span>
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-4"
            >
              <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[var(--color-accent)]" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--color-foreground)]">
                {isTr ? 'Menümüz' : 'Our Menu'}
              </h1>
              <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[var(--color-accent)]" />
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-[var(--color-foreground-secondary)] max-w-xl mx-auto text-sm sm:text-base px-4"
            >
              {isTr 
                ? 'Ateşin sıcaklığı ve tutkuyla hazırlanan eşsiz lezzetlerimizi keşfedin. Her sayfada yeni bir tat macerası sizi bekliyor.'
                : 'Discover our unique flavors prepared with the warmth of fire and passion. A new taste adventure awaits you on every page.'}
            </motion.p>
          </motion.div>

          {/* PDF Viewer Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={cn(
              "relative rounded-2xl sm:rounded-3xl overflow-hidden",
              "border border-[var(--color-border)]",
              "shadow-2xl shadow-black/10",
              "bg-[var(--color-background-secondary)]"
            )}
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-l-2 border-t-2 border-[var(--color-accent)]/30 rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-r-2 border-t-2 border-[var(--color-accent)]/30 rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-l-2 border-b-2 border-[var(--color-accent)]/30 rounded-bl-2xl sm:rounded-bl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-r-2 border-b-2 border-[var(--color-accent)]/30 rounded-br-2xl sm:rounded-br-3xl pointer-events-none" />
            
            <PDFViewer />
          </motion.div>

          {/* Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 sm:mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-background-secondary)] border border-[var(--color-border)]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs sm:text-sm text-[var(--color-foreground-secondary)]">
                {isTr 
                  ? 'Menü sayfalarını görmek için alttaki küçük resimlere veya ok tuşlarına tıklayın'
                  : 'Click on the thumbnails below or use arrow buttons to navigate'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
