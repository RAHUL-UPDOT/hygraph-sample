import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Country } from '@/services/travel';

export function CountryCard({ country }: { country: Country }) {
  return (
    <Card className="overflow-hidden group hover:ring-2 hover:ring-zinc-900 dark:hover:ring-zinc-100 transition-all cursor-pointer p-0">
      <Link href={`/countries/${country.slug}`} className="block h-full relative">
        {country.heroImage?.url ? (
          <div className="h-64 w-full relative">
            <Image
              src={country.heroImage.url}
              alt={country.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-64 w-full bg-zinc-200 dark:bg-zinc-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white">{country.name}</h3>
        </div>
      </Link>
    </Card>
  );
}
