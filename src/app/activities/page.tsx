import React from 'react';
import { getAllActivities } from '@/services/travel';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmptyState } from '@/components/layout/EmptyState';

export const metadata = {
  title: 'All Activities | Wanderlust Travel',
  description: 'Find amazing things to do, from hiking to surfing, around the world.',
};

export default async function ActivitiesPage() {
  const activities = await getAllActivities();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 min-h-[70vh]">
      <PageHeader 
        title="Activities" 
        description="Discover incredible experiences tailored to your travel style." 
      />

      {activities.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
          {activities.map((act) => (
            <ActivityCard key={act.slug} activity={act} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No activities found" 
          description="Check back later for new experiences." 
        />
      )}
    </div>
  );
}
