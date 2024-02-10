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

		const { name, billboardId } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!billboardId) {
			return new NextResponse('Billboard ID is required', { status: 400 });
		}

		if (!params.store_id) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.store_id,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const category = await prisma.category.create({
			data: {
				name,
				billboardId,
				store_id: params.store_id,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		logger('[CATEGORIES_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { store_id: string } }
) {
	try {
		if (!params.store_id) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const categories = await prisma.category.findMany({
			where: {
				store_id: params.store_id,
			},
		});

		return NextResponse.json(categories);
	} catch (error) {
		logger('[CATEGORIES_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
