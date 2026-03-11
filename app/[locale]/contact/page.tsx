'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram,
  ArrowUpRight,
  Send,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from '@/lib/i18n-context';
import Script from 'next/script';
import { siteConfig, generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/seo-config';

const workingHours = [
  { day: 'Pazartesi', hours: 'Kapalı' },
  { day: 'Salı - Cuma', hours: '09:00 - 00:00' },
  { day: 'Cumartesi', hours: '09:00 - 01:00' },
  { day: 'Pazar', hours: '09:00 - 00:00' },
];

const workingHoursEn = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday - Friday', hours: '09:00 - 00:00' },
  { day: 'Saturday', hours: '09:00 - 01:00' },
  { day: 'Sunday', hours: '09:00 - 00:00' },
];

export default function ContactPage() {
  const locale = useLocale();
  const isTr = locale === 'tr';
  const hours = isTr ? workingHours : workingHoursEn;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isTr ? 'Ana Sayfa' : 'Home', url: isTr ? siteConfig.url : `${siteConfig.url}/en` },
    { name: isTr ? 'İletişim' : 'Contact', url: isTr ? `${siteConfig.url}/contact/` : `${siteConfig.url}/en/contact/` },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema(locale);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <main className="min-h-screen bg-[var(--color-background)]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-small text-[var(--color-accent)] tracking-widest">
                {isTr ? 'BİZİMLE İLETİŞİME GEÇİN' : 'GET IN TOUCH'}
              </span>
              <h1 className="text-display-lg font-display font-semibold text-[var(--color-foreground)] mt-4">
                {isTr ? 'Bize Ulaşın' : 'Contact Us'}
              </h1>
              <p className="mt-6 text-lg text-[var(--color-foreground-secondary)] leading-relaxed">
                {isTr 
                  ? 'Rezervasyon, özel etkinlikler veya sorularınız için bize ulaşabilirsiniz. Size en kısa sürede dönüş yapacağız.'
                  : 'Reach out to us for reservations, special events, or any questions. We will get back to you as soon as possible.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="pb-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: MapPin,
                  title: isTr ? 'Adres' : 'Address',
                  content: 'Zaferimilli, 270. Sokak No 7',
                  subContent: isTr ? 'Altınordu/Ordu' : 'Altınordu/Ordu, Turkey',
                  href: 'https://maps.google.com/?q=Zaferimilli,+270.+Sokak+No+7,+Altınordu/Ordu',
                  external: true
                },
                {
                  icon: Phone,
                  title: isTr ? 'Telefon' : 'Phone',
                  content: '(0452) 222 24 22',
                  subContent: isTr ? 'Rezervasyon için arayın' : 'Call for reservations',
                  href: 'tel:+904522222422',
                  external: false
                },
                {
                  icon: Mail,
                  title: isTr ? 'E-posta' : 'Email',
                  content: 'info@alazrestaurant.com',
                  subContent: isTr ? '7/24 yazabilirsiniz' : 'Available 24/7',
                  href: 'mailto:info@alazrestaurant.com',
                  external: false
                },
                {
                  icon: Instagram,
                  title: 'Instagram',
                  content: '@alaz.ordu',
                  subContent: isTr ? 'Bizi takip edin' : 'Follow us',
                  href: 'https://instagram.com/alaz.ordu',
                  external: true
                }
              ].map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    "group relative p-8 rounded-2xl",
                    "bg-[var(--color-background)] border border-[var(--color-border)]",
                    "hover:border-[var(--color-accent)]/30 hover:shadow-xl",
                    "transition-all duration-500"
                  )}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                      "bg-[var(--color-background-secondary)]",
                      "group-hover:bg-[var(--color-accent)]/10 group-hover:scale-110",
                      "transition-all duration-500"
                    )}>
                      <item.icon className="w-6 h-6 text-[var(--color-accent)]" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-small text-[var(--color-foreground-muted)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-lg font-medium text-[var(--color-foreground)] mb-1">
                      {item.content}
                    </p>
                    <p className="text-sm text-[var(--color-foreground-secondary)]">
                      {item.subContent}
                    </p>

                    <div className="mt-6 flex items-center gap-1 text-sm text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{item.external ? (isTr ? 'Yönlendir' : 'Navigate') : (isTr ? 'Bağlan' : 'Connect')}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Map & Hours Section */}
        <section className="py-20 bg-[var(--color-background-secondary)]">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.595226819!2d37.8747!3d40.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40876f8!2sAlt%C4%B1nordu%2FOrdu!5e0!3m2!1str!2str!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    title={isTr ? 'Alaz Restaurant Konum' : 'Alaz Restaurant Location'}
                  />
                  
                  <a
                    href="https://maps.google.com/?q=Zaferimilli,+270.+Sokak+No+7,+Altınordu/Ordu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80",
                      "p-6 rounded-xl glass",
                      "border border-[var(--color-border)]",
                      "hover:border-[var(--color-accent)]/30",
                      "transition-all duration-300 group"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                        <Navigation className="w-5 h-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[var(--color-foreground)]">
                          {isTr ? 'Yol Tarifi Al' : 'Get Directions'}
                        </h4>
                        <p className="text-sm text-[var(--color-foreground-secondary)] mt-1">
                          {isTr ? 'Google Maps üzerinden navigasyon başlat' : 'Start navigation via Google Maps'}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Working Hours */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className={cn(
                  "h-full p-8 rounded-2xl",
                  "bg-[var(--color-background)] border border-[var(--color-border)]"
                )}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-[var(--color-foreground)]">
                        {isTr ? 'Çalışma Saatleri' : 'Working Hours'}
                      </h3>
                      <p className="text-sm text-[var(--color-foreground-secondary)]">
                        {isTr ? 'Haftalık programımız' : 'Our weekly schedule'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {hours.map((item, index) => (
                      <motion.div
                        key={item.day}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={cn(
                          "flex items-center justify-between py-4 px-4 rounded-xl",
                          "border-b border-[var(--color-border)] last:border-0",
                          index === 0 && "bg-red-500/5 border-red-500/20"
                        )}
                      >
                        <span className={cn(
                          "font-medium",
                          index === 0 ? "text-red-500" : "text-[var(--color-foreground)]"
                        )}>
                          {item.day}
                        </span>
                        <span className={cn(
                          "text-sm",
                          index === 0 ? "text-red-500 font-medium" : "text-[var(--color-foreground-secondary)]"
                        )}>
                          {item.hours}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-[var(--color-background-secondary)]">
                    <p className="text-sm text-[var(--color-foreground-secondary)] text-center">
                      <span className="text-[var(--color-accent)] font-medium">{isTr ? 'Not:' : 'Note:'}</span> {isTr ? 'Özel etkinlikler ve grup rezervasyonları için farklı saatler uygulanabilir.' : 'Different hours may apply for special events and group reservations.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Contact CTA */}
        <section className="py-20">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={cn(
                "relative overflow-hidden rounded-3xl p-12 md:p-16",
                "bg-gradient-to-br from-[var(--color-stone-900)] to-[var(--color-stone-800)]"
              )}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-copper-600)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative text-center max-w-2xl mx-auto">
                <span className="inline-block px-4 py-2 rounded-full bg-white/5 text-[var(--color-copper-400)] text-sm mb-6">
                  {isTr ? 'Hızlı Rezervasyon' : 'Quick Reservation'}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
                  {isTr ? 'Yerinizi Ayırtın' : 'Make Your Reservation'}
                </h2>
                <p className="text-lg text-[var(--color-stone-300)] mb-8">
                  {isTr 
                    ? 'En iyi deneyim için rezervasyon yaptırmanızı öneririz. WhatsApp üzerinden hızlıca yer ayırtabilirsiniz.'
                    : 'We recommend making a reservation for the best experience. You can quickly book via WhatsApp.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+904522222422"
                    className={cn(
                      "flex items-center gap-3 px-8 py-4 rounded-xl",
                      "bg-white text-[var(--color-stone-900)]",
                      "font-medium transition-all duration-300",
                      "hover:bg-[var(--color-copper-100)] hover:scale-105"
                    )}
                  >
                    <Phone className="w-5 h-5" />
                    {isTr ? 'Hemen Ara' : 'Call Now'}
                  </a>
                  <a
                    href="https://wa.me/905452222422"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-3 px-8 py-4 rounded-xl",
                      "bg-[var(--color-copper-600)] text-white",
                      "font-medium transition-all duration-300",
                      "hover:bg-[var(--color-copper-700)] hover:scale-105"
                    )}
                  >
                    <Send className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
