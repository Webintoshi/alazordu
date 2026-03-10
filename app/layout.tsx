import type { Metadata } from 'next';
import { DM_Sans, Crimson_Pro } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n-context';
import { ThemeProvider } from '@/lib/theme-provider';
import { SmoothScroll } from '@/components/shared/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingActions } from '@/components/layout/floating-actions';
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

export const metadata: Metadata = {
  title: 'Alaz Restaurant | Premium Gastronomic Experience',
  description: 'Unique flavors, elegant ambiance, and unforgettable moments. At Alaz Restaurant, we transform gastronomy into art.',
  keywords: ['restaurant', 'fine dining', 'gastronomy', 'istanbul', 'luxury dining'],
  authors: [{ name: 'Alaz Restaurant' }],
  openGraph: {
    title: 'Alaz Restaurant',
    description: 'Premium Gastronomic Experience',
    type: 'website',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function RootLayout(props: any) {
  const params = await props.params;
  const locale = params?.locale || 'tr';

  return (
    <html lang={locale} suppressHydrationWarning>
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
