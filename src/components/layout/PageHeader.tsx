import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
        {description}
      </p>
    </div>
  );
}
