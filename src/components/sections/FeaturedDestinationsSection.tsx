import React from 'react';
import { FeaturedDestinationsSection as SectionType } from '@/services/travel';
import { buttonVariants } from '@/components/ui/button';
import { DestinationCard } from '@/components/cards/DestinationCard';
import Link from 'next/link';

export function FeaturedDestinationsSection({ data }: { data: SectionType }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{data.title}</h2>
          {data.description && (
            <p className="text-zinc-500 mt-2 text-lg max-w-2xl">{data.description}</p>
          )}
        </div>
        <Link href="/destinations" className={buttonVariants({ variant: "ghost", className: "hidden md:inline-flex" })}>
          View All Destinations →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.destination?.map((dest) => (
          <DestinationCard key={dest.slug} destination={dest} />
        ))}
      </div>
      <Link href="/destinations" className={buttonVariants({ variant: "outline", className: "w-full mt-6 md:hidden" })}>
        View All Destinations
      </Link>
    </section>
  );
}
