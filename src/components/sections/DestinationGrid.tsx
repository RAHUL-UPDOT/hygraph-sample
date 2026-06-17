import React from 'react';
import { DestinationCard } from '@/components/cards/DestinationCard';
import { Destination } from '@/services/travel';

interface DestinationGridProps {
  title: string;
  destinations: Destination[];
}

export function DestinationGrid({ title, destinations }: DestinationGridProps) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50 border-b pb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <DestinationCard key={dest.slug} destination={dest} />
        ))}
      </div>
    </div>
  );
}
