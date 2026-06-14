import Link from 'next/link';
import { Post, Category } from '@/types';
import BlogCard from './BlogCard';

interface FilterableBlogListProps {
  posts: Post[];
  categories: Category[];
  activeCategorySlug?: string;
}

export default function FilterableBlogList({ posts, categories, activeCategorySlug }: FilterableBlogListProps) {
  const isAllActive = !activeCategorySlug || activeCategorySlug === 'all';

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <Link
          href="/"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isAllActive
              ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/?category=${category.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategorySlug === category.slug
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 border-dashed py-24 text-center">
          <p className="text-lg font-medium text-slate-300">No posts found.</p>
          <p className="text-sm text-slate-500 mt-1">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
}
