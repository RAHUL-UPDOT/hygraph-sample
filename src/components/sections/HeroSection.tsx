import React from 'react';
import { HeroSection as HeroSectionType } from '@/services/travel';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection({ data }: { data: HeroSectionType }) {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center">
      {data.backgroundImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.backgroundImage.url}
            alt={data.heading}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-zinc-900/60" />
        </div>
      )}
      <div className="relative z-10 max-w-4xl px-4 flex flex-col items-center gap-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          {data.heading}
        </h1>
        {data.subHeading && (
          <p className="text-lg md:text-2xl text-zinc-100 max-w-2xl">
            {data.subHeading}
          </p>
        )}
        {data.buttonText && data.buttonUrl && (
          <Link href={data.buttonUrl} className={buttonVariants({ size: "lg", className: "mt-6 text-lg h-12 px-8" })}>
            {data.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
