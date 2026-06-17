import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-12 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">Wanderlust</h3>
          <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
            Discover the most beautiful destinations, unique activities, and incredible countries. Build your perfect travel itinerary today.
          </p>
        </div>
        <div className="space-y-4 md:text-right">
          <h4 className="text-sm font-semibold tracking-wide uppercase text-zinc-900 dark:text-white">Explore</h4>
          <ul className="space-y-2 text-sm text-zinc-500 flex flex-col md:items-end">
            <li>
              <Link href="/destinations" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Destinations</Link>
            </li>
            <li>
              <Link href="/countries" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Countries</Link>
            </li>
            <li>
              <Link href="/activities" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Activities</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} Wanderlust Travel. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Powered by Hygraph CMS & Next.js</p>
      </div>
    </footer>
  );
}
