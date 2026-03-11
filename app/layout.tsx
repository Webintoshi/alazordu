import type { Metadata, Viewport } from 'next';
import { DM_Sans, Crimson_Pro } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n-context';
import { ThemeProvider } from '@/lib/theme-provider';
import { SmoothScroll } from '@/components/shared/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingActions } from '@/components/layout/floating-actions';
import { siteConfig, trMeta, enMeta, generateRestaurantSchema } from '@/lib/seo-config';
import Script from 'next/script';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-crimson-pro',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF8F5' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1814' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: trMeta.home.title,
    template: '%s | Alaz Restaurant',
  },
  description: trMeta.home.description,
  keywords: trMeta.home.keywords,
  authors: [{ name: 'Alaz Restaurant', url: siteConfig.url }],
  creator: 'Alaz Restaurant',
  publisher: 'Alaz Restaurant',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: trMeta.home.title,
    description: trMeta.home.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Alaz Restaurant - Ordu\'nun En İyi Deniz Manzaralı Restoranı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: trMeta.home.title,
    description: trMeta.home.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'tr': siteConfig.url,
      'en': `${siteConfig.url}/en`,
    },
  },
  verification: {
    google: '', // Google Search Console doğrulama kodu buraya eklenecek
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function RootLayout(props: any) {
  const params = await props.params;
  const locale = params?.locale || 'tr';
  const isTr = locale === 'tr';
  
  // Schema JSON-LD
  const restaurantSchema = generateRestaurantSchema(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* GitHub Pages SPA redirect handler */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var redirect = sessionStorage.redirect;
                delete sessionStorage.redirect;
                if (redirect && redirect !== location.pathname + location.search + location.hash) {
                  history.replaceState(null, null, redirect);
                }
              })();
            `,
          }}
        />
        
        {/* Schema.org JSON-LD */}
        <Script
          id="restaurant-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema),
          }}
        />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="TR-52" />
        <meta name="geo.placename" content="Altınordu, Ordu" />
        <meta name="geo.position" content="40.9833;37.8747" />
        <meta name="ICBM" content="40.9833, 37.8747" />
        
        {/* Mobile App Capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Alaz Restaurant" />
        <meta name="application-name" content="Alaz Restaurant" />
        <meta name="msapplication-TileColor" content="#B87333" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Language Alternates */}
        <link rel="alternate" hrefLang="tr" href={siteConfig.url} />
        <link rel="alternate" hrefLang="en" href={`${siteConfig.url}/en`} />
        <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />
      </head>
      <body className={`${dmSans.variable} ${crimsonPro.variable} antialiased`}>
        <I18nProvider initialLocale={locale as 'tr' | 'en'}>
          <ThemeProvider>
            <SmoothScroll>
              <Navbar />
              <main id="main-content">
                {props.children}
              </main>
              <Footer />
              <FloatingActions />
            </SmoothScroll>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
