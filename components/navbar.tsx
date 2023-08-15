'use client';

import { Poppins } from 'next/font/google';
import Link from 'next/link';

import { UserButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

import MobileSidebar from './mobile-sidebar';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

const font = Poppins({ subsets: ['latin'], weight: '600' });

export default function Navbar() {
  return (
    <div className="fixed z-50 flex h-16 w-full items-center justify-between border-b border-primary/10 bg-secondary px-4 py-2">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              'hidden text-xl font-bold text-primary md:block md:text-3xl',
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant={'premium'} size="sm">
          Upgrade
          <Sparkles className="ml-2 h-4 w-4 fill-white text-white" />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
