'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Home, Plus, Settings } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: Home,
      href: '/',
      label: 'Home',
      pro: false
    },
    {
      icon: Plus,
      href: '/companion/new',
      label: 'Create',
      pro: true
    },
    {
      icon: Settings,
      href: '/settings',
      label: 'Settings',
      pro: false
    }
  ];

  const onNavigate = (href: string, pro: boolean) => {
    return router.push(href);
  };

  return (
    <div className="flex h-full flex-col space-y-4 bg-secondary text-primary">
      <div className="flex flex-1 justify-center p-3">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href, route.pro)}
              className={cn(
                'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary',
                pathname === route.href && 'bg-primary/10 text-primary'
              )}
            >
              <div className="flex flex-1 flex-col items-center gap-y-2">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
