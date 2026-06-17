import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const navLinks = [
    { href: "/destinations", label: "Destinations" },
    { href: "/countries", label: "Countries" },
    { href: "/activities", label: "Activities" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 max-w-7xl mx-auto items-center px-4 justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl tracking-tight ">Travel buddy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
          <nav className="flex items-center space-x-6 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:scale-105 transition-transform duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <Link href="tel:+18005550199" className={buttonVariants({ variant: "default" })}>
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="shrink-0" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-6">
              <SheetHeader className="px-0 pt-0">
                <SheetTitle className="text-left font-bold text-2xl tracking-tight">Travel buddy</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-6 flex-1">
                <nav className="flex flex-col gap-4 text-lg font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition-colors hover:text-foreground/80 block py-2 border-b border-border/40"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="tel:+18005550199" className={buttonVariants({ variant: "default", size: "lg", className: "w-full" })}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
