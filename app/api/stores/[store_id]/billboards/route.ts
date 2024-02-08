import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/prisma/client';
import logger from '@/lib/logger';
 
export async function POST(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.store_id,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billboard = await prisma.billboard.create({
      data: {
        label,
        imageUrl,
        storeid: params.store_id,
      }
    });
  
    return NextResponse.json(billboard);
  } catch (error) {
    logger('[BILLBOARDS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { store_id: string } }
) {
  try {
    if (!params.store_id) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await prisma.billboard.findMany({
      where: {
        storeid: params.store_id
      }
    });
  
    return NextResponse.json(billboards);
  } catch (error) {
    logger('[BILLBOARDS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
