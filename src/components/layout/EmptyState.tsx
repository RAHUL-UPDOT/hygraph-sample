import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-xl w-full">
      <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-2 text-zinc-500">{description}</p>
    </div>
  );
}
