import FilterableBlogList from '@/components/FilterableBlogList';
import { getHomeData } from '@/services/hygraph';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;

  const data = await getHomeData(categorySlug);

  return (
    <div className="flex flex-col gap-12">
      <section className="space-y-4 pt-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Latest Posts
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Discover our latest articles, insights, and updates from the blog.
        </p>
      </section>

      <FilterableBlogList 
        posts={data?.posts || []} 
        categories={data?.categories || []} 
        activeCategorySlug={categorySlug}
      />
    </div>
  );
}
