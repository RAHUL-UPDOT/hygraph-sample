import React from 'react';
import { getCountryBySlug } from '@/services/travel';
import { notFound } from 'next/navigation';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { HeroOverlay } from '@/components/sections/HeroOverlay';
import { DestinationGrid } from '@/components/sections/DestinationGrid';
import { ImageGallery } from '@/components/sections/ImageGallery';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) return { title: 'Not Found' };
  return {
    title: country.seo?.metaTitle || `${country.name} | Wanderlust Travel`,
    description: country.seo?.metaDescription || `Explore the best destinations and activities in ${country.name}`,
    openGraph: {
      images: country.seo?.ogImage?.url ? [country.seo.ogImage.url] : [],
    }
  };
}

export default async function CountryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <HeroOverlay 
        title={country.name} 
        imageUrl={country.heroImage?.url} 
      />

      <div className="max-w-5xl mx-auto px-4 w-full py-12 flex flex-col gap-16">
        {/* Content */}
        {country.description?.raw && (
          <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
            <RichText content={country.description.raw} />
          </div>
        )}
        
        <ImageGallery images={country.gallery} />

        <DestinationGrid 
          title={`Destinations in ${country.name}`} 
          destinations={country.destination || []} 
        />
      </div>
    </div>
  );
}
