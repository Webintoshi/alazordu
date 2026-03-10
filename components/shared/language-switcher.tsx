'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale, useI18n } from '@/lib/i18n-context';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    // Force navigation to new locale
    const newPath = pathname.replace(/^\/(tr|en)/, `/${newLocale}`);
    router.push(newPath);
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => handleLocaleChange(l)}
            className={cn(
              'px-2 py-1 text-sm font-medium transition-all duration-300',
              locale === l
                ? 'text-[var(--color-accent)]'
                : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]'
            )}
            aria-label={`Switch to ${l.toUpperCase()}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => handleLocaleChange(l)}
          className={cn(
            'relative px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-sm',
            locale === l
              ? 'text-[var(--color-foreground)]'
              : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]'
          )}
          aria-label={`Switch to ${l.toUpperCase()}`}
          aria-current={locale === l ? 'true' : undefined}
        >
          {locale === l && (
            <span className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-sm" />
          )}
          <span className="relative">{l.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
