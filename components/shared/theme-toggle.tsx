'use client';

import { useTheme } from '@/lib/theme-provider';
import { useTranslations } from '@/lib/i18n-context';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useTranslations();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'group flex items-center gap-2 p-2 rounded-full transition-all duration-300',
        'hover:bg-[var(--color-background-tertiary)]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        className
      )}
      aria-label={isDark ? t('theme.light') : t('theme.dark')}
      title={isDark ? t('theme.light') : t('theme.dark')}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun
          className={cn(
            'absolute inset-0 w-5 h-5 transition-all duration-500',
            isDark 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
          )}
          strokeWidth={1.5}
        />
        
        {/* Moon Icon */}
        <Moon
          className={cn(
            'absolute inset-0 w-5 h-5 transition-all duration-500',
            isDark 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          )}
          strokeWidth={1.5}
        />
      </div>
      
      {showLabel && (
        <span className="text-sm font-medium text-[var(--color-foreground-secondary)]">
          {isDark ? t('theme.dark') : t('theme.light')}
        </span>
      )}
    </button>
  );
}
