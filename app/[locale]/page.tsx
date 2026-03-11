import { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { RestaurantMenu } from '@/components/sections/restaurant-menu';
import { InstagramStories } from '@/components/sections/instagram-stories';
import { Gallery } from '@/components/sections/gallery';
import { Testimonials } from '@/components/sections/testimonials';
import { ContactSection } from '@/components/sections/contact-section';
import { trMeta, enMeta, siteConfig, generateBreadcrumbSchema } from '@/lib/seo-config';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';
  const meta = isTr ? trMeta.home : enMeta.home;
  const url = isTr ? siteConfig.url : `${siteConfig.url}/en`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        'tr': siteConfig.url,
        'en': `${siteConfig.url}/en`,
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
          alt: isTr 
            ? 'Alaz Restaurant - Ordu\'nun En İyi Deniz Manzaralı Restoranı'
            : 'Alaz Restaurant - Best Sea View Restaurant in Ordu Turkey',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTr = locale === 'tr';

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isTr ? 'Ana Sayfa' : 'Home', url: isTr ? siteConfig.url : `${siteConfig.url}/en` },
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
      <Hero />
      <About />
      <RestaurantMenu />
      <InstagramStories />
      <Gallery />
      <Testimonials />
      <ContactSection />
    </>
  );
}
