import React from 'react';
import { getAllCountries } from '@/services/travel';
import { CountryCard } from '@/components/cards/CountryCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmptyState } from '@/components/layout/EmptyState';
import { SearchBar } from '@/components/ui/SearchBar';

export const metadata = {
  title: 'All Countries | WanderSphere',
  description: 'Explore our complete list of beautiful countries to visit around the world.',
};

export default async function CountriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams;
  const countries = await getAllCountries(q);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <PageHeader 
        title="Countries" 
        description="Discover new cultures, breathtaking landscapes, and unforgettable experiences across the globe." 
      />

      <div className="flex justify-start mb-12">
        <SearchBar placeholder="Search countries..." />
      </div>

      {countries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {countries.map((country) => (
            <CountryCard key={country.slug} country={country} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No countries found" 
          description={q ? `We couldn't find any countries matching "${q}". Try another search term.` : "Check back later for new and exciting locations."}
        />
      )}
    </div>
  );
}
