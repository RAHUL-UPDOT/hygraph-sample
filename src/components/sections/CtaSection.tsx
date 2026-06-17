import React from 'react';
import { CtaSection as SectionType } from '@/services/travel';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function CtaSection({ data }: { data: SectionType }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4">
      <div className="bg-zinc-900 dark:bg-zinc-100 rounded-3xl p-8 md:p-16 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white dark:text-zinc-900">
          {data.heading}
        </h2>
        {data.description && (
          <p className="mt-4 text-lg md:text-xl text-zinc-400 dark:text-zinc-600 max-w-3xl">
            {data.description}
          </p>
        )}
        <div className="mt-8">
          <Link href={data.buttonUrl} className={buttonVariants({ size: "lg", className: "bg-white text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 font-semibold px-8 h-12" })}>
            {data.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
