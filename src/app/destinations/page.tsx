import React from 'react';
import { getAllDestinations } from '@/services/travel';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmptyState } from '@/components/layout/EmptyState';
import { SearchBar } from '@/components/ui/SearchBar';

export const metadata = {
  title: 'All Destinations | WanderSphere',
  description: 'Explore our complete directory of amazing travel destinations around the world.',
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams;
  const destinations = await getAllDestinations(q);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <PageHeader 
        title="All Destinations" 
        description="Browse our curated list of incredible locations and start planning your next unforgettable journey." 
      />

      <div className="flex justify-start mb-12">
        <SearchBar placeholder="Search destinations..." />
      </div>

      {destinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {destinations.map((dest) => (
            <DestinationCard key={dest.slug} destination={dest} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No destinations found" 
          description={q ? `We couldn't find any destinations matching "${q}". Try another search term.` : "Check back later for new and exciting locations."} 
        />
      )}
    </div>
  );
}
