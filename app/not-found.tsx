import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-[var(--color-foreground)] mb-4">404</h1>
        <p className="text-xl text-[var(--color-foreground-secondary)] mb-8">Sayfa bulunamadı</p>
        <Link 
          href="/tr" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-sm hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
