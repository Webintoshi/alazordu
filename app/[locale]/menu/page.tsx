'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Minimize2, Download, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MenuPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-[var(--color-background-secondary)]">
        <div className="container-wide text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-small text-[var(--color-accent)] mb-4 block"
          >
            Lezzet Yolculuğu
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display-lg font-display text-[var(--color-foreground)]"
          >
            Alaz Menü
          </motion.h1>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container-wide">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative mx-auto max-w-5xl",
              isFullscreen && "fixed inset-0 z-50 max-w-none bg-[var(--color-background)]"
            )}
          >
            {/* Elegant Frame */}
            <div className={cn(
              "relative rounded-lg overflow-hidden",
              "bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-tertiary)]",
              "dark:from-[#3d3630] dark:to-[#2a2520]",
              "p-3 md:p-6",
              "shadow-2xl"
            )}>
              {/* Leather Texture */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Copper Border Lines */}
              <div className="absolute inset-2 md:inset-4 border border-[var(--color-copper-600)]/30 rounded pointer-events-none" />
              <div className="absolute inset-3 md:inset-5 border border-[var(--color-copper-600)]/20 rounded pointer-events-none" />

              {/* PDF Container */}
              <div className="relative bg-[var(--color-stone-50)] rounded shadow-inner min-h-[70vh] md:min-h-[80vh]">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-stone-100)]">
                    <div className="text-center">
                      <BookOpen className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-4 animate-pulse" />
                      <p className="text-[var(--color-foreground-muted)] font-body">Menü yükleniyor...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  src="/ALAZ MENÜ.pdf#toolbar=0&navpanes=0"
                  className={cn(
                    "w-full h-[70vh] md:h-[80vh] rounded",
                    isLoading ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={() => setIsLoading(false)}
                  title="Alaz Restaurant Menu"
                />
              </div>

              {/* Controls */}
              <div className="relative mt-4 flex items-center justify-center gap-4">
                <a
                  href="/ALAZ MENÜ.pdf"
                  download
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full",
                    "bg-[var(--color-copper-600)]/20 text-[var(--color-copper-400)]",
                    "hover:bg-[var(--color-copper-600)]/30",
                    "transition-all duration-300 text-sm font-medium"
                  )}
                >
                  <Download className="w-4 h-4" />
                  PDF İndir
                </a>
                
                <button
                  onClick={toggleFullscreen}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full",
                    "bg-[var(--color-copper-600)]/20 text-[var(--color-copper-400)]",
                    "hover:bg-[var(--color-copper-600)]/30",
                    "transition-all duration-300 text-sm font-medium"
                  )}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  {isFullscreen ? 'Küçült' : 'Tam Ekran'}
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-3 -right-3 w-20 h-20 border border-[var(--color-accent)]/20 rounded-full pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-28 h-28 border border-[var(--color-accent)]/10 rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
