import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/prisma/client';
import logger from '@/lib/logger';

export async function GET(
	req: Request,
	{ params }: { params: { category_id: string } }
) {
	try {
		if (!params.category_id) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		const category = await prisma.category.findUnique({
			where: {
				id: params.category_id,
			},
			include: {
				billboard: true,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		logger('[CATEGORY_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { category_id: string; store_id: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.category_id) {
			return new NextResponse('Category id is required', { status: 400 });
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

		const category = await prisma.category.delete({
			where: {
				id: params.category_id,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		logger('[CATEGORY_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { category_id: string; store_id: string } }
) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { name, billboardId } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!billboardId) {
			return new NextResponse('Billboard ID is required', { status: 400 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!params.category_id) {
			return new NextResponse('Category id is required', { status: 400 });
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

		const category = await prisma.category.update({
			where: {
				id: params.category_id,
			},
			data: {
				name,
				billboardId,
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		logger('[CATEGORY_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
