'use client';

import { Poppins } from 'next/font/google';
import Link from 'next/link';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

import { cn } from '@/lib/utils';

import MobileSidebar from './mobile-sidebar';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

const font = Poppins({ subsets: ['latin'], weight: '600' });

export default function Navbar() {
  const { user } = useUser();
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
        <ModeToggle />
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button>
            <SignInButton>Sign in</SignInButton>
          </Button>
        )}
      </div>
    </div>
  );
}
