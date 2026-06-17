import React from 'react';
import { Section } from '@/services/travel';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedDestinationsSection } from '@/components/sections/FeaturedDestinationsSection';
import { FeaturedCountriesSection } from '@/components/sections/FeaturedCountriesSection';
import { ActivityShowcaseSection } from '@/components/sections/ActivityShowcaseSection';
import { CtaSection } from '@/components/sections/CtaSection';

const componentsMap: Record<string, React.ComponentType<{ data: any }>> = {
  HeroSection,
  FeaturedDestinationsSection,
  FeaturedCountriesSection,
  ActivityShowcaseSection,
  CtaSection,
};

export function SectionRenderer({ sections }: { sections: Section[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="flex flex-col gap-16 pb-16">
      {sections.map((section, index) => {
        const Component = componentsMap[section.__typename];
        
        if (!Component) {
          return null;
        }

        return <Component key={index} data={section} />;
      })}
    </div>
  );
}
