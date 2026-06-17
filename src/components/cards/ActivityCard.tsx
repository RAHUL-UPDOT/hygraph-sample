import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Activity } from '@/services/travel';

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link href={`/activities/${activity.slug}`} className="block h-full group">
      <Card className="flex flex-col items-center justify-center p-6 gap-4 hover:border-zinc-900 dark:hover:border-zinc-100 hover:shadow-lg hover:-translate-y-1 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-300 cursor-pointer text-center h-full">
        {activity.icon?.url ? (
          <div className="w-12 h-12 relative opacity-80 group-hover:opacity-100 transition-opacity">
            <Image 
              src={activity.icon.url} 
              alt={activity.name} 
              fill 
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-zinc-400">#</span>
          </div>
        )}
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{activity.name}</span>
      </Card>
    </Link>
  );
}
