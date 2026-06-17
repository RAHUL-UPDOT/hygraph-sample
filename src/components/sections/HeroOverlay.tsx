import React from 'react';
import Image from 'next/image';

interface HeroOverlayProps {
  title: string;
  imageUrl?: string;
  heightClass?: string;
}

export function HeroOverlay({ title, imageUrl, heightClass = "h-[50vh] min-h-[400px]" }: HeroOverlayProps) {
  return (
    <section className={`relative w-full ${heightClass} flex items-end pb-18 justify-center`}>
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
        </div>
      )}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
          {title}
        </h1>
      </div>
    </section>
  );
}
