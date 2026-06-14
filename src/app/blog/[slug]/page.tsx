import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug } from '@/services/hygraph';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const data = await getPostBySlug(slug);
  
  if (!data?.post) {
    notFound();
  }
  
  const { post } = data;
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="mb-12 overflow-hidden rounded-3xl bg-slate-800 border border-slate-700/50 shadow-2xl relative aspect-[21/9] w-full">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500 bg-slate-800">
            No Cover Image
          </div>
        )}
      </div>

      <header className="mb-12">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <time className="text-slate-400 font-medium">{formattedDate}</time>
          <span className="text-slate-600">•</span>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category.name}
                className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
          {post.title}
        </h1>
      </header>

      {post.content?.html && (
        <article 
          className="prose prose-lg md:prose-xl max-w-none dark:prose-invert prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content.html }} 
        />
      )}
    </div>
  );
}
