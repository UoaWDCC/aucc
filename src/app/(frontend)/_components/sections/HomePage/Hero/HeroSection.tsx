"use client";

import { BackgroundImage } from '../../../ui/BackgroundImage';
import { Overlay } from '../../../ui/Overlay';
import { HeroContent } from './HeroContent';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <BackgroundImage src="/hero_background_Image.jpg" alt="Kayaking in New Zealand" />
      <Overlay />
      <HeroContent />
    </section>
  );
}
