import { getHomePageData } from '@/services/travel';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { notFound } from 'next/navigation';

export default async function Home() {
  const data = await getHomePageData();

  if (!data || !data.page) {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col gap-16 min-h-screen">
      <SectionRenderer sections={data.page.sections} />
    </div>
  );
}
