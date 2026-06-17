import React from 'react';
import { getActivityBySlug } from '@/services/travel';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { DestinationGrid } from '@/components/sections/DestinationGrid';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);
  if (!activity) return { title: 'Not Found' };
  return {
    title: activity.seo?.metaTitle || `${activity.name} | WanderSphere`,
    description: activity.seo?.metaDescription || `Discover the best destinations for ${activity.name}`,
    openGraph: {
      images: activity.seo?.ogImage?.url ? [activity.seo.ogImage.url] : [],
    }
  };
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="w-full py-20 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center gap-6">
          {activity.icon?.url && (
            <div className="w-24 h-24 relative p-4 bg-white dark:bg-zinc-800 rounded-full shadow-sm">
              <Image
                src={activity.icon.url}
                alt={activity.name}
                fill
                className="object-contain p-4"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {activity.name}
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 w-full py-16 flex flex-col gap-16">
        {/* Content */}
        {activity.description?.raw && (
          <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none mx-auto w-full">
            <RichText content={activity.description.raw} />
          </div>
        )}

        <DestinationGrid 
          title={`Top Destinations for ${activity.name}`} 
          destinations={activity.destination || []} 
        />
      </div>
    </div>
  );
}
