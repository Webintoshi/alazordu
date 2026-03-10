'use client';

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { RestaurantMenu } from '@/components/sections/restaurant-menu';
import { InstagramStories } from '@/components/sections/instagram-stories';
import { Gallery } from '@/components/sections/gallery';
import { Testimonials } from '@/components/sections/testimonials';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
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
