'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state with current URL search param if it exists
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('?');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-lg items-center space-x-2">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="w-full pl-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
        />
      </div>
      <Button type="submit" variant="default" className="shrink-0">
        Search
      </Button>
    </form>
  );
}
