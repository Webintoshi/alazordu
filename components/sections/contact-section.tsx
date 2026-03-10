'use client';

import { useRef } from 'react';
import { useTranslations } from '@/lib/i18n-context';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContactSection() {
  const { t } = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Adres',
      value: 'Zaferimilli, 270. Sokak No 7, 52100 Altınordu/Ordu',
      href: 'https://maps.google.com/?q=Alaz+Restaurant+Ordu',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '(0452) 222 24 22',
      href: 'tel:+904522222422',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-[var(--color-background)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-small text-[var(--color-accent)] mb-4 block">
            {t('contact.eyebrow')}
          </span>
          <h2 className="text-display-md font-display text-[var(--color-foreground)] mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-body text-[var(--color-foreground-secondary)] font-body">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.icon === MapPin ? '_blank' : undefined}
                  rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    'group flex items-start gap-4 p-4 rounded-sm',
                    'bg-[var(--color-background-secondary)]',
                    'transition-all duration-300',
                    'hover:shadow-md'
                  )}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-small text-[var(--color-foreground-muted)] mb-1">
                      {item.label}
                    </p>
                    <p className="text-[var(--color-foreground)] font-medium flex items-center gap-2">
                      {item.value}
                      {item.icon === MapPin && (
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-sm bg-[var(--color-background-secondary)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[var(--color-accent)]" />
                <h3 className="font-display font-medium text-[var(--color-foreground)]">
                  Çalışma Saatleri
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[var(--color-foreground-secondary)]">
                  <span>Pazartesi</span>
                  <span className="text-[var(--color-accent)] font-medium">Kapalı</span>
                </div>
                <div className="flex justify-between text-[var(--color-foreground-secondary)]">
                  <span>Salı</span>
                  <span>09:00 – 00:00</span>
                </div>
                <div className="flex justify-between text-[var(--color-foreground-secondary)]">
                  <span>Çarşamba</span>
                  <span>09:00 – 00:00</span>
                </div>
                <div className="flex justify-between text-[var(--color-foreground-secondary)]">
                  <span>Perşembe</span>
                  <span>09:00 – 00:00</span>
                </div>
                <div className="flex justify-between text-[var(--color-foreground-secondary)]">
                  <span>Cuma</span>
                  <span>09:00 – 00:00</span>
                </div>
                <div className="flex justify-between text-[var(--color-foreground-secondary)]">
                  <span>Cumartesi</span>
                  <span>09:00 – 01:00</span>
                </div>
                <div className="flex justify-between text-[var(--color-foreground-secondary)]">
                  <span>Pazar</span>
                  <span>09:00 – 00:00</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="relative h-full min-h-[400px] rounded-sm overflow-hidden">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.674371426588!2d37.871429075907336!3d40.98861067135331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4063217c2c03e9eb%3A0xb6fa5e6c7c646365!2sAlaz!5e0!3m2!1str!2str!4v1773065276893!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
