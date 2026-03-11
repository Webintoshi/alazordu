// SEO Configuration for Alaz Restaurant
// Title max: 76 chars | Description max: 154 chars

export const siteConfig = {
  name: 'Alaz Restaurant',
  url: 'https://alazrestaurant.com',
  logo: '/görsel%20içerikler/Alaz%20Logo.webp',
  favicon: '/favicon.ico',
  ogImage: '/görsel%20içerikler/gece02.webp',
  twitterHandle: '@alazrestoran',
  locale: {
    tr: 'tr_TR',
    en: 'en_US',
  },
};

// TR Meta Data
export const trMeta = {
  home: {
    title: 'Alaz Restaurant | Ordu\'nun En İyi Restoranı | Deniz Manzaralı',
    description: 'Ordu Altınordu\'da eşsiz deniz manzaralı fine dining deneyimi. Ateşin sıcaklığı ve lezzetin şiiriyle gastronomi sanatını keşfedin. Rezervasyon için tıklayın!',
    keywords: ['Ordu restoran', 'Altınordu restoran', 'deniz manzaralı restoran', 'fine dining Ordu', 'Alaz Restaurant', 'gurme restoran', 'akşam yemeği Ordu'],
  },
  menu: {
    title: 'Alaz Restaurant Menü | Gurme Lezzetler | Ordu',
    description: 'Alaz Restaurant\'ın özenle hazırlanan menüsünü keşfedin. Yerel ve uluslararası lezzetlerin buluştuğu, ateşte pişirilmiş eşsiz tatlar sizi bekliyor.',
    keywords: ['Alaz menü', 'Ordu restoran menü', 'gurme menü', 'fine dining menü', 'steakhouse Ordu'],
  },
  hotel: {
    title: 'Alaz Hotel | Deniz Manzaralı Superior & Exclusive Odalar | Ordu',
    description: 'Alaz Hotel\'in lüks deniz manzaralı odalarında konaklayın. Superior ve Exclusive oda seçenekleriyle unutulmaz bir tatil deneyimi yaşayın.',
    keywords: ['Alaz Hotel', 'Ordu otel', 'deniz manzaralı otel', 'lüks otel Ordu', 'superior oda', 'exclusive oda'],
  },
  contact: {
    title: 'Alaz Restaurant İletişim | Rezervasyon | Ordu Altınordu',
    description: 'Alaz Restaurant\'a rezervasyon yapın. Zaferimilli, 270. Sokak No 7 Altınordu/Ordu adresindeyiz. Telefon: (0452) 222 24 22',
    keywords: ['Alaz rezervasyon', 'Ordu restoran iletişim', 'restoran telefon', 'Alaz adres'],
  },
};

// EN Meta Data
export const enMeta = {
  home: {
    title: 'Alaz Restaurant | Best Restaurant in Ordu Turkey | Sea View',
    description: 'Experience unique fine dining with breathtaking sea view in Altınordu, Ordu. Discover the art of gastronomy with fire-cooked flavors. Book your table now!',
    keywords: ['Ordu restaurant', 'Turkey fine dining', 'sea view restaurant', 'Alaz Restaurant', 'gourmet dining', 'luxury restaurant Ordu'],
  },
  menu: {
    title: 'Alaz Restaurant Menu | Gourmet Dishes | Ordu Turkey',
    description: 'Explore Alaz Restaurant\'s carefully crafted menu. Unique flavors where local and international cuisines meet, cooked over open fire await you.',
    keywords: ['Alaz menu', 'Ordu restaurant menu', 'gourmet menu', 'fine dining menu', 'steakhouse Turkey'],
  },
  hotel: {
    title: 'Alaz Hotel | Sea View Superior & Exclusive Rooms | Ordu Turkey',
    description: 'Stay in Alaz Hotel\'s luxury sea view rooms. Experience an unforgettable vacation with Superior and Exclusive room options.',
    keywords: ['Alaz Hotel', 'Ordu hotel', 'sea view hotel', 'luxury hotel Turkey', 'superior room', 'exclusive room'],
  },
  contact: {
    title: 'Alaz Restaurant Contact | Reservations | Ordu Altınordu Turkey',
    description: 'Make a reservation at Alaz Restaurant. Located at Zaferimilli, 270. Sokak No 7 Altınordu/Ordu. Phone: +90 452 222 24 22',
    keywords: ['Alaz reservation', 'Ordu restaurant contact', 'restaurant phone', 'Alaz address'],
  },
};

// Schema.org JSON-LD
export function generateRestaurantSchema(locale: 'tr' | 'en' = 'tr') {
  const isTr = locale === 'tr';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Alaz Restaurant',
    image: siteConfig.ogImage,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: '+90-452-222-24-22',
    priceRange: '₺₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zaferimilli, 270. Sokak No 7',
      addressLocality: 'Altınordu',
      addressRegion: 'Ordu',
      postalCode: '52100',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.9833,
      longitude: 37.8747,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '01:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '00:00',
      },
    ],
    servesCuisine: ['Turkish', 'Mediterranean', 'International'],
    acceptsReservations: 'True',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
    sameAs: [
      'https://instagram.com/alaz.ordu',
    ],
    description: isTr 
      ? 'Ordu\'nun en iyi deniz manzaralı restoranı. Fine dining deneyimi ve lüks konaklama.'
      : 'Best sea view restaurant in Ordu. Fine dining experience and luxury accommodation.',
  };
}

export function generateLocalBusinessSchema(locale: 'tr' | 'en' = 'tr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Alaz Restaurant & Hotel',
    image: siteConfig.ogImage,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: '+90-452-222-24-22',
    email: 'info@alazrestaurant.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zaferimilli, 270. Sokak No 7',
      addressLocality: 'Altınordu',
      addressRegion: 'Ordu',
      postalCode: '52100',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.9833,
      longitude: 37.8747,
    },
    openingHours: ['Tu-Su 09:00-00:00', 'Sa 09:00-01:00'],
    priceRange: '₺₺₺',
    paymentAccepted: 'Cash, Credit Card',
    currenciesAccepted: 'TRY',
    areaServed: 'Ordu, Turkey',
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
