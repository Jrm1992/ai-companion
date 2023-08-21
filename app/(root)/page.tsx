import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';

import prisma from '@/lib/prismadb';

import Companions from './companion/[companionId]/components/companions';

interface HomeProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const data = await prisma.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
}
