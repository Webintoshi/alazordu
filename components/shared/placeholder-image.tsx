'use client';

import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  number: number;
  alt?: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'video' | 'auto';
  variant?: 'default' | 'light' | 'dark';
  showNumber?: boolean;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[16/9]',
  video: 'aspect-video',
  auto: '',
};

export function PlaceholderImage({
  number,
  alt = `Placeholder ${number}`,
  className,
  aspectRatio = 'landscape',
  variant = 'default',
  showNumber = true,
}: PlaceholderImageProps) {
  const formattedNumber = number.toString().padStart(2, '0');
  
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--color-background-tertiary)]',
        aspectRatioClasses[aspectRatio],
        className
      )}
      role="img"
      aria-label={alt}
    >
      {/* Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              currentColor 20px,
              currentColor 21px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              currentColor 20px,
              currentColor 21px
            )
          `,
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className={cn(
          'absolute inset-0 opacity-50',
          variant === 'light' && 'bg-gradient-to-br from-stone-200/50 to-stone-300/30',
          variant === 'dark' && 'bg-gradient-to-br from-stone-800/50 to-stone-900/30',
          variant === 'default' && 'bg-gradient-to-br from-[var(--color-stone-200)]/30 to-[var(--color-stone-300)]/20'
        )}
      />
      
      {/* Placeholder Number */}
      {showNumber && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span 
              className="font-display text-[clamp(2rem,5vw,4rem)] font-light tracking-[0.2em] text-[var(--color-foreground-muted)]"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {formattedNumber}
            </span>
            <div className="mt-2 h-px w-12 mx-auto bg-[var(--color-accent)]/30" />
          </div>
        </div>
      )}
      
      {/* Corner Accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-[var(--color-accent)]/20" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-[var(--color-accent)]/20" />
    </div>
  );
}

// For use with actual images when they arrive
interface ResponsivePlaceholderProps extends PlaceholderImageProps {
  priority?: boolean;
}

export function ResponsivePlaceholder({
  priority = false,
  ...props
}: ResponsivePlaceholderProps) {
  return <PlaceholderImage {...props} />;
}
