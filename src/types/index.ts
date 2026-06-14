export interface Category {
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  coverImage?: { url: string };
  categories: Category[];
  content?: { html: string };
}
