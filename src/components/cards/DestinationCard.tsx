import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Destination } from '@/services/travel';

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 p-0 ">
      {destination.featuredImage?.url ? (
        <div className="h-56 w-full relative">
          <Image
            src={destination.featuredImage.url}
            alt={destination.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-56 w-full bg-zinc-200 dark:bg-zinc-800" />
      )}
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">{destination.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {destination.shortDesc && (
          <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">{destination.shortDesc}</p>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/destinations/${destination.slug}`} className={buttonVariants({ variant: "default", className: "w-full", size:"lg" })}>
          Explore
        </Link>
      </CardFooter>
    </Card>
  );
}
