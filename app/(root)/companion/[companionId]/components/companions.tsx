import Image from 'next/image';
import Link from 'next/link';

import { Companion } from '@prisma/client';
import { MessageSquare } from 'lucide-react';

import { Card, CardFooter, CardHeader } from '@/components/ui/card';

interface CompanionProps {
  data: (Companion & { _count: { messages: number } })[] | null;
}
export default function Companions({ data }: CompanionProps) {
  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 pt-10">
        <div className="relative h-60 w-60">
          <Image fill className="grayscale" alt="Empty" src="/empty.png" />
        </div>
        <p className="text-sm text-muted-foreground">No companions found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data?.map((companion) => (
        <Card
          key={companion.id}
          className="rouded-xl cursor-pointer border-0 bg-primary/10 transition hover:opacity-75"
        >
          <Link
            href={`/chat/${companion.id}`}
            className="flex h-full flex-col justify-between"
          >
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative h-32 w-32">
                <Image
                  src={companion.src}
                  fill
                  className="rounded-xl object-cover"
                  alt={companion.name}
                />
              </div>
              <p className="font-bold">{companion.name}</p>
              <p className="text-xs">{companion.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p className="lowercase">@{companion.userName}</p>
              <div className="flex items-center">
                <MessageSquare />
                {companion._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
