import { auth, redirectToSignIn } from '@clerk/nextjs';

import prisma from '@/lib/prismadb';

import CompanionForm from './components/companion-form';

interface CompanionIdProps {
  params: {
    companionId: string;
  };
}
export default async function CompanionIdPage({ params }: CompanionIdProps) {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
      userId
    }
  });

  const categories = await prisma.category.findMany();

  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
    ></CompanionForm>
  );
}
