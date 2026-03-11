import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı | 404 - Alaz Restaurant',
  description: 'Aradığınız sayfa bulunamadı. Ana sayfaya dönün veya menümüzü keşfedin.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-display font-bold text-[var(--color-accent)]/10 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-20 h-20 text-[var(--color-accent)]" strokeWidth={1} />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-[var(--color-foreground)] mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-lg text-[var(--color-foreground-secondary)] mb-8 max-w-md mx-auto">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. 
          Ana sayfaya dönüp menümüzü keşfedebilirsiniz.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 px-8 py-4 rounded-xl",
              "bg-[var(--color-accent)] text-white font-medium",
              "hover:bg-[var(--color-accent-hover)] transition-all duration-300",
              "hover:scale-105"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/menu/"
            className={cn(
              "flex items-center gap-2 px-8 py-4 rounded-xl",
              "border border-[var(--color-border)] text-[var(--color-foreground)]",
              "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
              "transition-all duration-300"
            )}
          >
            Menüyü Gör
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-foreground-muted)] mb-4">
            Yardımcı olabilecek bağlantılar:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/menu/" className="text-[var(--color-accent)] hover:underline">
              Menü
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/hotel/" className="text-[var(--color-accent)] hover:underline">
              Otel
            </Link>
            <span className="text-[var(--color-border)]">|</span>
            <Link href="/contact/" className="text-[var(--color-accent)] hover:underline">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
