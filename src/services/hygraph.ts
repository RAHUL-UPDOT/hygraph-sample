import { fetchAPI } from '@/lib/graphql';
import { Post, Category } from '@/types';

const POST_FRAGMENT = `
  fragment PostFields on Post {
    id
    title
    slug
    date
    coverImage {
      url
    }
    categories {
      name
      slug
    }
  }
`;

const HOME_QUERY_ALL = `
  ${POST_FRAGMENT}
  query GetHomeDataAll {
    posts(orderBy: date_DESC) {
      ...PostFields
    }
    categories {
      name
      slug
    }
  }
`;

const HOME_QUERY_FILTERED = `
  ${POST_FRAGMENT}
  query GetHomeDataFiltered($categorySlug: String!) {
    posts(
      orderBy: date_DESC,
      where: { categories_some: { slug: $categorySlug } }
    ) {
      ...PostFields
    }
    categories {
      name
      slug
    }
  }
`;

export interface HomeData {
  posts: Post[];
  categories: Category[];
}

export interface PostData {
  post: Post | null;
}

export async function getHomeData(categorySlug?: string): Promise<HomeData | null> {
  const isFiltered = categorySlug && categorySlug !== 'all';
  
  if (isFiltered) {
    return fetchAPI<HomeData>(HOME_QUERY_FILTERED, { categorySlug });
  }
  
  return fetchAPI<HomeData>(HOME_QUERY_ALL);
}

const GET_POST_BY_SLUG_QUERY = `
  ${POST_FRAGMENT}
  query GetPost($slug: String!) {
    post(where: { slug: $slug }) {
      ...PostFields
      content {
        html
      }
    }
  }
`;

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  return fetchAPI<PostData>(GET_POST_BY_SLUG_QUERY, { slug });
}
