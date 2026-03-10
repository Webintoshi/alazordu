'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Images,
  Waves,
  Maximize,
  Users,
  BedDouble,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const rooms = [
  {
    id: 'superior',
    name: 'Superior Oda',
    subtitle: 'Deniz Manzaralı',
    images: [
      '/superior%20oda/070e225e.avif',
      '/superior%20oda/6298b51f.avif',
      '/superior%20oda/805e267e.avif',
      '/superior%20oda/cad9e12c.avif',
      '/superior%20oda/e8876fec.avif',
    ],
    features: ['Ayrı yemek alanı', 'Ayrı oturma alanı', 'Klima', 'Isıtma', 'Küçük mutfak', 'Tam boy buzdolabı/dondurucu', 'Akıllı TV', 'Anti alerjik yatak takımı'],
    details: [
      { icon: Waves, label: 'Deniz manzarası' },
      { icon: Maximize, label: '70 metre kare' },
      { icon: Users, label: '2 kişilik' },
      { icon: BedDouble, label: '1 büyük (Queen) Boy Yatak' },
    ],
  },
  {
    id: 'exclusive',
    name: 'Exclusive Oda',
    subtitle: 'Panoramik Manzara',
    images: [
      '/oda-görselleri/exclusive-1.jpg',
      '/oda-görselleri/exclusive-2.jpg',
      '/oda-görselleri/exclusive-3.jpg',
      '/oda-görselleri/exclusive-4.jpg',
      '/oda-görselleri/exclusive-5.jpg',
    ],
    features: ['Özel teras', 'Jakuzi', 'Klima', 'Isıtma', 'Tam donanımlı mutfak', 'Mini bar', 'Akıllı TV', 'Premium yatak takımı'],
    details: [
      { icon: Waves, label: 'Panoramik manzara' },
      { icon: Maximize, label: '110 metre kare' },
      { icon: Users, label: '2 kişilik' },
      { icon: BedDouble, label: '1 King Boy Yatak' },
    ],
  },
];

function RoomCard({ room, index }: { room: typeof rooms[0]; index: number }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="w-full"
    >
      <div className={cn(
        "bg-[var(--color-background)] rounded-2xl overflow-hidden",
        "border border-[var(--color-border)]",
        "shadow-xl"
      )}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-background-secondary)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={room.images[currentImage]}
              alt={`${room.name} - Görsel ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          <button
            onClick={prevImage}
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              "w-10 h-10 rounded-full bg-white/90 shadow-lg",
              "flex items-center justify-center",
              "text-[var(--color-foreground)]",
              "hover:bg-white transition-colors"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "w-10 h-10 rounded-full bg-white/90 shadow-lg",
              "flex items-center justify-center",
              "text-[var(--color-foreground)]",
              "hover:bg-white transition-colors"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className={cn(
            "absolute bottom-3 right-3",
            "flex items-center gap-2 px-3 py-1.5 rounded-full",
            "bg-black/60 text-white text-sm"
          )}>
            <Images className="w-4 h-4" />
            <span>{room.images.length}</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-[var(--color-foreground)] mb-1">
            {room.name}, {room.subtitle}
          </h2>

          <div className={cn(
            "mt-5 p-5 rounded-xl",
            "bg-[var(--color-background-secondary)]"
          )}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
              <span className="font-semibold text-[var(--color-foreground)]">Önemli Notlar</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {room.features.map((feature, i) => (
                <span
                  key={i}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg",
                    "bg-[var(--color-background)] text-[var(--color-foreground-secondary)]",
                    "border border-[var(--color-border)]"
                  )}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {room.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-3 text-[var(--color-foreground)]">
                <detail.icon className="w-5 h-5 text-[var(--color-accent)]" />
                <span>{detail.label}</span>
              </div>
            ))}
          </div>

          <button className={cn(
            "mt-6 flex items-center gap-2",
            "text-[var(--color-accent)] font-medium",
            "hover:gap-3 transition-all"
          )}>
            Daha çok detay
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HotelPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pt-20">
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
