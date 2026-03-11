import { Metadata } from 'next';
import { useTranslations } from '@/lib/i18n-context';
import { trMeta, enMeta, siteConfig, generateBreadcrumbSchema } from '@/lib/seo-config';
import Script from 'next/script';
import { cn } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';
  const meta = isTr ? trMeta.menu : enMeta.menu;
  const url = isTr ? `${siteConfig.url}/menu/` : `${siteConfig.url}/en/menu/`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        'tr': `${siteConfig.url}/menu/`,
        'en': `${siteConfig.url}/en/menu/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isTr ? 'tr_TR' : 'en_US',
      url: url,
      siteName: siteConfig.name,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: isTr ? 'Alaz Restaurant Menü' : 'Alaz Restaurant Menu',
        },
      ],
    },
  };
}

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTr = locale === 'tr';

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isTr ? 'Ana Sayfa' : 'Home', url: isTr ? siteConfig.url : `${siteConfig.url}/en` },
    { name: isTr ? 'Menü' : 'Menu', url: isTr ? `${siteConfig.url}/menu/` : `${siteConfig.url}/en/menu/` },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <main className="min-h-screen bg-[var(--color-background)] pt-20">
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center mb-16">
              <span className="text-small text-[var(--color-accent)] tracking-[0.2em] block mb-4">
                {isTr ? 'LEZZET YOLCULUĞU' : 'CULINARY JOURNEY'}
              </span>
              <h1 className="text-display-lg font-display font-semibold text-[var(--color-foreground)]">
                {isTr ? 'Menümüz' : 'Our Menu'}
              </h1>
              <p className="mt-4 text-[var(--color-foreground-secondary)] max-w-2xl mx-auto">
                {isTr 
                  ? 'Ateşin sıcaklığı ve tutkuyla hazırlanan eşsiz lezzetlerimizi keşfedin.'
                  : 'Discover our unique flavors prepared with the warmth of fire and passion.'}
              </p>
            </div>

            <div className={cn(
              "relative overflow-hidden rounded-2xl",
              "border border-[var(--color-border)]",
              "shadow-2xl bg-[var(--color-background-secondary)]"
            )}>
              <div className="aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/9]">
                <iframe
                  src="/ALAZ%20MEN%C3%9C.pdf"
                  className="w-full h-full"
                  title={isTr ? 'Alaz Restaurant Menü' : 'Alaz Restaurant Menu'}
                />
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-[var(--color-foreground-secondary)] mb-6">
                {isTr 
                  ? 'Menüyü tam ekran görüntülemek için PDF\'i indirebilirsiniz.'
                  : 'You can download the PDF to view the menu in full screen.'}
              </p>
              <a
                href="/ALAZ%20MEN%C3%9C.pdf"
                download
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-full",
                  "bg-[var(--color-accent)] text-white font-medium",
                  "hover:bg-[var(--color-accent-hover)] transition-colors"
                )}
              >
                {isTr ? 'Menüyü İndir' : 'Download Menu'}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
