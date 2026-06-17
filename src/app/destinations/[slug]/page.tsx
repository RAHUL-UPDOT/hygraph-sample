import React from 'react';
import { getDestinationBySlug } from '@/services/travel';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { MapPin, Sun, Compass } from 'lucide-react';
import { HeroOverlay } from '@/components/sections/HeroOverlay';
import { ImageGallery } from '@/components/sections/ImageGallery';
import { FaqAccordion } from '@/components/sections/FaqAccordion';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return { title: 'Not Found' };
  return {
    title: destination.seo?.metaTitle || `${destination.title} | WanderSphere`,
    description: destination.seo?.metaDescription || destination.shortDesc || `Explore ${destination.title}`,
    openGraph: {
      images: destination.seo?.ogImage?.url ? [destination.seo.ogImage.url] : [],
    }
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <HeroOverlay 
        title={destination.title} 
        imageUrl={destination.featuredImage?.url} 
        heightClass="h-[60vh] min-h-[400px]"
      />

      <div className="max-w-5xl mx-auto px-4 w-full flex flex-col gap-12 -mt-14 relative z-20 pb-16">
        {/* Floating Meta Bar */}
        <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 md:p-8 shadow-xl border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
          
          {/* Location */}
          {destination.country && (
            <div className="flex flex-col gap-2 pt-6 md:pt-0 first:pt-0">
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Country
              </span>
              <Link href={`/countries/${destination.country.slug}`} className="text-lg font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                {destination.country.name}
              </Link>
            </div>
          )}

          {/* Season */}
          {destination.bestSeason && (
            <div className="flex flex-col gap-2 pt-6 md:pt-0 md:pl-8">
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Sun className="w-4 h-4" /> Best Season
              </span>
              <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                {destination.bestSeason}
              </span>
            </div>
          )}

          {/* Activities */}
          {destination.activities && destination.activities.length > 0 && (
            <div className="flex flex-col gap-3 pt-6 md:pt-0 md:pl-8">
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4" /> Activities
              </span>
              <div className="flex flex-wrap gap-2">
                {destination.activities.map((act) => (
                  <Link key={act.slug} href={`/activities/${act.slug}`}>
                    <Badge variant="secondary" className="hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                      {act.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {destination.description?.raw && (
          <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
            <RichText content={destination.description.raw} />
          </div>
        )}
                <ImageGallery images={destination.gallery} />

        <FaqAccordion faqs={destination.faQs} />


      </div>
    </div>
  );
}
