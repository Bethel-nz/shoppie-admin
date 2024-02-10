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

		const {
			name,
			price,
			categoryId,
			colorId,
			sizeId,
			images,
			isFeatured,
			isArchived,
		} = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 });
		}

		if (!price) {
			return new NextResponse('Price is required', { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		if (!colorId) {
			return new NextResponse('Color id is required', { status: 400 });
		}

		if (!sizeId) {
			return new NextResponse('Size id is required', { status: 400 });
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

		const product = await prisma.product.create({
			data: {
				name,
				price,
				isFeatured,
				isArchived,
				categoryId,
				colorId,
				sizeId,
				store_id: params.store_id,
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		logger('[PRODUCTS_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { store_id: string } }
) {
	try {
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get('category_id') || undefined;
		const colorId = searchParams.get('color_id') || undefined;
		const sizeId = searchParams.get('size_id') || undefined;
		const isFeatured = searchParams.get('isFeatured');

		if (!params.store_id) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const products = await prisma.product.findMany({
			where: {
				store_id: params.store_id,
				categoryId,
				colorId,
				sizeId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				color: true,
				size: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		logger('[PRODUCTS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
