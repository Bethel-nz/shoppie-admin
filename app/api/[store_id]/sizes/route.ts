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

		const { name, value } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!value) {
			return new NextResponse('Value is required', { status: 400 });
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

		const size = await prisma.size.create({
			data: {
				name,
				value,
				store_id: params.store_id,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		logger('[SIZES_POST]', error);
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

		const sizes = await prisma.size.findMany({
			where: {
				store_id: params.store_id,
			},
		});

		return NextResponse.json(sizes);
	} catch (error) {
		logger('[SIZES_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
