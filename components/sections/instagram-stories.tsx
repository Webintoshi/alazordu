'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n-context';
import { motion, useInView } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

// Video içerikleri - Buraya reels videolarınızı ekleyeceksiniz
const stories = [
  {
    id: 1,
    title: 'Video 1',
    duration: '0:15',
    description: '',
    videoSrc: '/Reels/video1.mp4',
    thumbnail: '',
  },
  {
    id: 2,
    title: 'Video 2',
    duration: '0:30',
    description: '',
    videoSrc: '/Reels/video2.mp4',
    thumbnail: '',
  },
  {
    id: 3,
    title: 'Video 3',
    duration: '0:20',
    description: '',
    videoSrc: '/Reels/video3.mp4',
    thumbnail: '',
  },
  {
    id: 4,
    title: 'Video 4',
    duration: '0:25',
    description: '',
    videoSrc: '/Reels/video4.mp4',
    thumbnail: '',
  },
];

interface StoryCardProps {
  story: typeof stories[0];
}

function StoryCard({ story }: StoryCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Oynatma durumunu yönet
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Otomatik oynatma engellenirse sessizde dene
          videoRef.current!.muted = true;
          setIsMuted(true);
          videoRef.current!.play().catch(() => {});
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Progress bar animasyonu
  useEffect(() => {
    if (!isPlaying || !videoRef.current) return;
    
    const updateProgress = () => {
      if (videoRef.current) {
        const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(percent);
      }
    };

    videoRef.current.addEventListener('timeupdate', updateProgress);
    return () => videoRef.current?.removeEventListener('timeupdate', updateProgress);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const hasVideo = story.videoSrc && story.videoSrc.length > 0;

  return (
    <div className={cn(
      'relative w-full aspect-[9/16] rounded-2xl overflow-hidden',
      'bg-gradient-to-b from-[var(--color-background-tertiary)] to-[var(--color-background-secondary)]',
      'shadow-xl',
      'border border-[var(--color-border)]',
      'dark:from-stone-800 dark:to-stone-900 dark:border-stone-700/50',
      'group cursor-pointer'
    )}>
      {/* Video / Thumbnail */}
      <div className="absolute inset-0">
        {hasVideo ? (
          <video
            ref={videoRef}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-500',
              !isPlaying && 'opacity-0'
            )}
            src={story.videoSrc}
            muted={isMuted}
            playsInline
            poster={story.thumbnail}
            onClick={togglePlay}
            onEnded={handleEnded}
          />
        ) : null}
        
        {/* Thumbnail / Placeholder Background */}
        <div 
          className={cn(
            'absolute inset-0 bg-gradient-to-br from-[var(--color-background-tertiary)] to-[var(--color-background-secondary)]',
            'dark:from-stone-700/50 dark:to-stone-800',
            isPlaying && hasVideo && 'opacity-0'
          )}
        >
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-copper-600)_0%,transparent_70%)]" />
          </div>
        </div>
      </div>

      {/* Gradient Overlays - Instagram Style */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 dark:from-black/80 dark:via-black/20 dark:to-black/40 from-stone-900/60 via-stone-900/20 to-stone-900/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent dark:from-black/30 from-stone-900/20" />

      {/* Top Section */}
      <div className="absolute top-0 left-0 right-0 p-4">
        {/* Progress Bars */}
        <div className="flex gap-1 mb-3">
          {stories.map((_, idx) => (
            <div 
              key={idx} 
              className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden"
            >
              <div 
                className={cn(
                  'h-full bg-[var(--color-accent)] transition-all duration-100',
                  idx === story.id - 1 && isPlaying && 'transition-[width] duration-300'
                )}
                style={{ 
                  width: idx === story.id - 1 ? `${progress}%` : idx < story.id - 1 ? '100%' : '0%' 
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-copper-700)] p-[2px]">
              <div className="w-full h-full rounded-full bg-[var(--color-background-secondary)] dark:bg-stone-800 flex items-center justify-center">
                <span className="text-xs font-bold text-[var(--color-accent)]">A</span>
              </div>
            </div>
            <span className="text-xs font-medium text-white dark:text-white/90 text-[var(--color-foreground)]">alazrestoran</span>
          </div>
          
          {/* Mute Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="p-2 rounded-full bg-black/30 dark:bg-black/30 bg-white/30 backdrop-blur-sm text-white dark:text-white/80 text-[var(--color-foreground)] hover:bg-black/50 dark:hover:bg-black/50 hover:bg-white/50 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>



      {/* Progress Bar Only */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-accent)] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Center - Play Button */}
      <div 
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
          isPlaying && hasVideo ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        )}
        onClick={togglePlay}
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
        >
          <Play className={cn("w-7 h-7 text-white ml-1", isPlaying && "opacity-0")} fill="currentColor" />
        </motion.div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(184,115,51,0.1)]" />
      </div>
    </div>
  );
}

export function InstagramStories() {
  const { t } = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Ekran boyutunu kontrol et
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = Math.min(currentIndex + 1, stories.length - 1);
    setCurrentIndex(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[var(--color-background-secondary)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-small text-[var(--color-accent)] mb-4 block">
            Instagram Reels
          </span>
          <h2 className="text-display-md font-display text-[var(--color-foreground)] mb-4">
            Hikayelerimiz
          </h2>
          <p className="text-body text-[var(--color-foreground-secondary)] font-body">
            Alaz Restoran'ın günlük hazırlıkları, özel anlar ve lezzet yolculuğundan kesitler.
          </p>
        </motion.div>

        {/* Desktop: 4'lü Grid */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (story.id - 1) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <StoryCard story={story} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Horizontal Scroll / Snap */}
        <div className="md:hidden relative">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stories.map((story, index) => (
              <div 
                key={story.id}
                className={cn(
                  'flex-shrink-0 w-[280px] snap-center transition-transform duration-300',
                  currentIndex === index ? 'scale-100' : 'scale-95 opacity-80'
                )}
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg transition-all z-10',
              currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white'
            )}
            aria-label="Önceki"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-foreground)]" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === stories.length - 1}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-lg transition-all z-10',
              currentIndex === stories.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white'
            )}
            aria-label="Sonraki"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-foreground)]" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  index === currentIndex 
                    ? 'w-6 bg-[var(--color-accent)]' 
                    : 'w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-foreground-muted)]'
                )}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-xs text-[var(--color-foreground-muted)] mt-4">
            Kaydırmak için sağa/sola sürükleyin
          </p>
        </div>

      </div>
    </section>
  );
}
