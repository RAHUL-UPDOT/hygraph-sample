import { request } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const fetchAPI = async <T>(query: string, variables = {}): Promise<T | null> => {
  try {
    if (!endpoint) {
      console.warn("NEXT_PUBLIC_HYGRAPH_ENDPOINT is not defined");
      return null;
    }
    const data = await request<T>(endpoint, query, variables);
    return data;
  } catch (error: unknown) {
    console.error("GraphQL Fetch Error:");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return null;
  }
};
