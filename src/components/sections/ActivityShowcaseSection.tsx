import React from 'react';
import { ActivityShowcaseSection as SectionType } from '@/services/travel';
import { ActivityCard } from '@/components/cards/ActivityCard';

export function ActivityShowcaseSection({ data }: { data: SectionType }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{data.title}</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.activity?.map((act) => (
          <ActivityCard key={act.slug} activity={act} />
        ))}
      </div>
    </section>
  );
}
