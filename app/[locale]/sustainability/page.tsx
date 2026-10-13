import type { Metadata } from 'next';
import { SustainabilityReport } from '@/components/sustainability-report';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale !== 'en';
  const title = isTr ? 'Sürdürülebilirlik | Alaz Otel' : 'Sustainability | Alaz Hotel';
  const description = isTr
    ? 'Alaz Otel’in sürdürülebilirlik raporunu inceleyin. Çevre, kaynak kullanımı, çalışan yaşamı ve kültürel miras çalışmalarımız hakkında bilgi edinin.'
    : 'Read Alaz Hotel’s sustainability report covering environmental impact, resource use, employee wellbeing and cultural heritage.';
  const url = `https://alazordu.com/${isTr ? 'tr' : 'en'}/sustainability/`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        tr: 'https://alazordu.com/tr/sustainability/',
        en: 'https://alazordu.com/en/sustainability/',
      },
    },
    openGraph: { title, description, url, locale: isTr ? 'tr_TR' : 'en_US' },
    twitter: { title, description },
  };
}

export default function SustainabilityPage() {
  return <SustainabilityReport />;
}
