import { fetchAPI } from '@/lib/graphql';

export interface ImageData {
  url: string;
}

export interface Activity {
  name: string;
  slug: string;
  icon?: ImageData;
}

export interface Country {
  name: string;
  slug: string;
  heroImage?: ImageData;
}

export interface Destination {
  title: string;
  slug: string;
  shortDesc?: string;
  featuredImage?: ImageData;
}

export interface ActivityShowcaseSection {
  __typename: 'ActivityShowcaseSection';
  title: string;
  activity: Activity[];
}

export interface FeaturedCountriesSection {
  __typename: 'FeaturedCountriesSection';
  title: string;
  country: Country[];
}

export interface FeaturedDestinationsSection {
  __typename: 'FeaturedDestinationsSection';
  title: string;
  description?: string;
  destination: Destination[];
}

export interface CtaSection {
  __typename: 'CtaSection';
  heading: string;
  description?: string;
  buttonText: string;
  buttonUrl: string;
}

export interface HeroSection {
  __typename: 'HeroSection';
  heading: string;
  subHeading?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundImage?: ImageData;
}

export type Section = 
  | ActivityShowcaseSection 
  | FeaturedCountriesSection 
  | FeaturedDestinationsSection 
  | CtaSection 
  | HeroSection;

export interface PageData {
  page: {
    title: string;
    sections: Section[];
  } | null;
}

const PAGE_QUERY = `
  query GetHomePage {
    page(where: { slug: "home" }) {
      title
      sections {
        __typename
        ... on ActivityShowcaseSection {
          title
          activity {
            name
            slug
            icon { url }
          }
        }
        ... on FeaturedCountriesSection {
          title
          country {
            name
            slug
            heroImage { url }
          }
        }
        ... on FeaturedDestinationsSection {
          title
          description
          destination {
            title
            slug
            shortDesc
            featuredImage { url }
          }
        }
        ... on CtaSection {
          heading
          description
          buttonText
          buttonUrl
        }
        ... on HeroSection {
          heading
          subHeading
          buttonText
          buttonUrl
          backgroundImage { url }
        }
      }
    }
  }
`;

export async function getHomePageData(): Promise<PageData | null> {
  return fetchAPI<PageData>(PAGE_QUERY);
}
