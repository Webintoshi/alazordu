'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from '@/lib/i18n-context';
import { Instagram, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const locale = useLocale();
  const { t } = useTranslations();
  const year = new Date().getFullYear();

  const exploreLinks = [
    { href: `/${locale}`, label: 'Ana Sayfa' },
    { href: `/${locale}/menu`, label: 'Menü' },
    { href: `/${locale}/hotel`, label: 'Otel' },
    { href: `/${locale}/contact`, label: 'İletişim' },
  ];

  return (
    <footer className="relative bg-[var(--color-stone-900)] overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Main Content */}
      <div className="container-wide relative pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href={`/${locale}`} className="inline-block group">
              <img
                src="/g%C3%B6rsel%20i%C3%A7erikler/Alaz%20Logo.webp"
                alt="Alaz"
                className="h-12 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </Link>
            <p className="mt-6 text-[var(--color-stone-400)] leading-relaxed max-w-md font-body text-lg">
              Ateşin sıcaklığı, lezzetin şiiri. Eşsiz manzara eşliğinde unutulmaz bir gastronomi deneyimi.
            </p>
            
            {/* Social */}
            <div className="mt-10">
              <a
                href="https://instagram.com/alaz.ordu"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-3 px-6 py-3 rounded-full",
                  "border border-[var(--color-stone-700)] text-[var(--color-stone-300)]",
                  "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                  "transition-all duration-300 group"
                )}
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">@alaz.ordu</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-small text-[var(--color-copper-400)] tracking-[0.2em] mb-8">
              KEŞFET
            </h3>
            <ul className="space-y-5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group flex items-center gap-2 text-[var(--color-stone-300)]",
                      "hover:text-white transition-colors duration-300"
                    )}
                  >
                    <span className="w-0 h-px bg-[var(--color-accent)] group-hover:w-4 transition-all duration-300" />
                    <span className="text-lg font-display">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-small text-[var(--color-copper-400)] tracking-[0.2em] mb-8">
              İLETİŞİM
            </h3>
            <ul className="space-y-6">
              <li>
                <a 
                  href="https://maps.google.com/?q=Zaferimilli,+270.+Sokak+No+7,+Altınordu/Ordu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 text-[var(--color-stone-300)] hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5 mt-0.5 text-[var(--color-accent)] shrink-0" strokeWidth={1.5} />
                  <span className="leading-relaxed">
                    Zaferimilli, 270. Sokak No 7<br />
                    <span className="text-[var(--color-stone-500)]">52100 Altınordu/Ordu</span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+904522222422" 
                  className="group flex items-center gap-4 text-[var(--color-stone-300)] hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-[var(--color-accent)] shrink-0" strokeWidth={1.5} />
                  <span className="text-lg tracking-wide">(0452) 222 24 22</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@alazrestaurant.com"
                  className="group flex items-center gap-4 text-[var(--color-stone-300)] hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-[var(--color-accent)] shrink-0" strokeWidth={1.5} />
                  <span>info@alazrestaurant.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-20 pt-8 border-t border-[var(--color-stone-800)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-sm text-[var(--color-stone-500)]">
              © {year} Alaz Restaurant. Tüm hakları saklıdır.
            </p>
            
            {/* Back to Top Hint */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-[var(--color-stone-500)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 group"
            >
              <span>Yukarı dön</span>
              <span className="inline-block rotate-[-90deg] group-hover:-translate-y-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-8 flex justify-center">
          <a 
            href="https://celebix.co" 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-70 transition-opacity duration-300"
          >
            <img 
              src="/footer%20imza.svg" 
              alt="Celebix" 
              className="h-6 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
