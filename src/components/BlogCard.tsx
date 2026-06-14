import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';

export default function BlogCard({ post }: { post: Post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 shadow-md transition-all hover:shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden bg-slate-700">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">
            No Image
          </div>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <span
              key={category.slug}
              className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400"
            >
              {category.name}
            </span>
          ))}
        </div>
        
        <h3 className="mb-2 text-xl font-bold leading-tight text-slate-100 transition-colors group-hover:text-blue-400">
          {post.title}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center text-sm text-slate-400">
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
      </div>
    </Link>
  );
}
