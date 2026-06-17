import React from 'react';
import { FeaturedCountriesSection as SectionType } from '@/services/travel';
import { buttonVariants } from '@/components/ui/button';
import { CountryCard } from '@/components/cards/CountryCard';
import Link from 'next/link';

export function FeaturedCountriesSection({ data }: { data: SectionType }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{data.title}</h2>
        </div>
        <Link href="/countries" className={buttonVariants({ variant: "ghost", className: "hidden md:inline-flex" })}>
          View All Countries →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.country?.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>
      <Link href="/countries" className={buttonVariants({ variant: "outline", className: "w-full mt-6 md:hidden" })}>
        View All Countries
      </Link>
    </section>
  );
}
