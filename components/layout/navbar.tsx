'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from '@/lib/i18n-context';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const { t } = useTranslations();
  
  // Alt sayfalarda (hero olmayan sayfalar) navbar'ı her zaman scrolled göster
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/';
  const showScrolled = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Ana sayfa değilse scroll kontrolü gerekmez
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: `/${locale}#about`, label: t('nav.about') || 'Hakkımızda' },
    { href: `/${locale}/menu`, label: t('nav.menu') },
    { href: `/${locale}/hotel`, label: t('nav.hotel') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          showScrolled
            ? 'py-3 glass shadow-sm'
            : 'py-6 bg-transparent'
        )}
      >
        <div className="container-wide">
          <nav className="flex items-center justify-between" role="navigation" aria-label="Main navigation">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="relative z-10"
              aria-label="Alaz Home"
            >
              <img
                src="/g%C3%B6rsel%20i%C3%A7erikler/Alaz%20Logo.webp"
                alt="Alaz"
                className={cn(
                  'h-16 md:h-20 w-auto transition-all duration-300',
                  showScrolled ? 'brightness-0 dark:brightness-100' : 'brightness-0 invert'
                )}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium tracking-wide transition-colors duration-300',
                    'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current',
                    'after:transition-all after:duration-300 hover:after:w-full',
                    showScrolled 
                      ? 'text-[var(--color-foreground-secondary)] hover:text-[var(--color-foreground)]' 
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher 
                variant="minimal" 
                className={cn(
                  'transition-colors duration-300',
                  showScrolled ? '' : '[&_button]:text-white/80 [&_button:hover]:text-white'
                )} 
              />
              <div className={cn(
                'w-px h-4 transition-colors duration-300',
                showScrolled ? 'bg-[var(--color-border)]' : 'bg-white/20'
              )} />
              <ThemeToggle 
                className={cn(
                  'transition-colors duration-300',
                  showScrolled ? '' : 'text-white/80 hover:text-white hover:bg-white/10'
                )} 
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden relative z-50 p-2 transition-colors duration-300',
                showScrolled || isMobileMenuOpen ? 'text-[var(--color-foreground)]' : 'text-white'
              )}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[var(--color-background)]/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-3xl md:text-4xl font-display font-medium text-[var(--color-foreground)]',
                'transition-all duration-500 hover:text-[var(--color-accent)]',
                isMobileMenuOpen 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Actions */}
          <div 
            className={cn(
              'flex items-center gap-6 mt-8 pt-8 border-t border-[var(--color-border)]',
              'transition-all duration-500',
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <LanguageSwitcher />
            <div className="w-px h-6 bg-[var(--color-border)]" />
            <ThemeToggle showLabel />
          </div>
        </div>
      </div>
    </>
  );
}
