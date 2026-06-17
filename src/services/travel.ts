import { fetchAPI } from '@/lib/graphql';

export interface ImageData {
  url: string;
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ImageData;
}

export interface Faq {
  question: string;
  answer: {
    raw: any;
  };
}

export interface Activity {
  name: string;
  slug: string;
  icon?: ImageData;
  description?: { raw: any };
  destination?: Destination[];
  seo?: SeoData;
}

export interface Country {
  name: string;
  slug: string;
  heroImage?: ImageData;
  description?: { raw: any };
  destination?: Destination[];
  seo?: SeoData;
  gallery?: ImageData[];
}

export interface Destination {
  title: string;
  slug: string;
  shortDesc?: string;
  featuredImage?: ImageData;
  description?: { raw: any };
  bestSeason?: string;
  country?: Country;
  activities?: Activity[];
  faQs?: Faq[];
  seo?: SeoData;
  gallery?: ImageData[];
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
            country {
              name
              slug
            }
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

// --- NEW QUERIES FOR DIRECTORY PAGES ---

const ALL_DESTINATIONS_QUERY = `
  query GetAllDestinations {
    destinations {
      title
      slug
      shortDesc
      featuredImage { url }
      country {
        name
        slug
      }
    }
  }
`;

const SEARCH_DESTINATIONS_QUERY = `
  query SearchDestinations($search: String!) {
    destinations(where: { title_contains: $search }) {
      title
      slug
      shortDesc
      featuredImage { url }
      country {
        name
        slug
      }
    }
  }
`;

export async function getAllDestinations(search?: string): Promise<Destination[]> {
  if (search && search.trim() !== '') {
    const data = await fetchAPI<{ destinations: Destination[] }>(SEARCH_DESTINATIONS_QUERY, { search });
    return data?.destinations || [];
  }
  const data = await fetchAPI<{ destinations: Destination[] }>(ALL_DESTINATIONS_QUERY);
  return data?.destinations || [];
}

const DESTINATION_BY_SLUG_QUERY = `
  query GetDestinationBySlug($slug: String!) {
    destination(where: { slug: $slug }) {
      title
      slug
      shortDesc
      featuredImage { url }
      description { raw }
      seo {
        metaTitle
        metaDescription
        ogImage { url }
      }
      bestSeason
      gallery { url }
      country {
        name
        slug
      }
      activities {
        name
        slug
      }
      faQs {
        question
        answer { raw }
      }
    }
  }
`;

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const data = await fetchAPI<{ destination: Destination | null }>(DESTINATION_BY_SLUG_QUERY, { slug });
  return data?.destination || null;
}

const ALL_COUNTRIES_QUERY = `
  query GetAllCountries {
    countries {
      name
      slug
      heroImage { url }
    }
  }
`;

const SEARCH_COUNTRIES_QUERY = `
  query SearchCountries($search: String!) {
    countries(where: { name_contains: $search }) {
      name
      slug
      heroImage { url }
    }
  }
`;

export async function getAllCountries(search?: string): Promise<Country[]> {
  if (search && search.trim() !== '') {
    const data = await fetchAPI<{ countries: Country[] }>(SEARCH_COUNTRIES_QUERY, { search });
    return data?.countries || [];
  }
  const data = await fetchAPI<{ countries: Country[] }>(ALL_COUNTRIES_QUERY);
  return data?.countries || [];
}

const COUNTRY_BY_SLUG_QUERY = `
  query GetCountryBySlug($slug: String!) {
    country(where: { slug: $slug }) {
      name
      slug
      heroImage { url }
      description { raw }
      seo {
        metaTitle
        metaDescription
        ogImage { url }
      }
      gallery { url }
      destination {
        title
        slug
        shortDesc
        featuredImage { url }
        country {
          name
        }
      }
    }
  }
`;

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const data = await fetchAPI<{ country: Country | null }>(COUNTRY_BY_SLUG_QUERY, { slug });
  return data?.country || null;
}

const ALL_ACTIVITIES_QUERY = `
  query GetAllActivities {
    activities {
      name
      slug
      icon { url }
    }
  }
`;

export async function getAllActivities(): Promise<Activity[]> {
  const data = await fetchAPI<{ activities: Activity[] }>(ALL_ACTIVITIES_QUERY);
  return data?.activities || [];
}

const ACTIVITY_BY_SLUG_QUERY = `
  query GetActivityBySlug($slug: String!) {
    activity(where: { slug: $slug }) {
      name
      slug
      icon { url }
      description { raw }
      seo {
        metaTitle
        metaDescription
        ogImage { url }
      }
      destination {
        title
        slug
        shortDesc
        featuredImage { url }
        country {
          name
        }
      }
    }
  }
`;

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const data = await fetchAPI<{ activity: Activity | null }>(ACTIVITY_BY_SLUG_QUERY, { slug });
  return data?.activity || null;
}
