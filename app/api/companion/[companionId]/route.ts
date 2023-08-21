import { NextResponse } from 'next/server';

import { auth, currentUser } from '@clerk/nextjs';
import console from 'console';

import prisma from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const companion = await prisma.companion.update({
      where: {
        id: params.companionId,
        userId: user.id
      },
      data: {
        src,
        name,
        description,
        instructions,
        seed,
        categoryId,
        userId: user.id,
        userName: user.firstName
      }
    });

    return NextResponse.json(companion);
  } catch (e) {
    console.log('[COMPANION_PATCH]', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const companion = await prisma.companion.delete({
      where: {
        userId,
        id: params.companionId
      }
    });

    return NextResponse.json(companion);
  } catch (e) {
    console.log('[COMPANION_DELETE]', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
