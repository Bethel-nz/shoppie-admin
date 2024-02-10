import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/prisma/client';

import logger from '@/lib/logger';

export async function GET(
	req: Request,
	{ params }: { params: { product_id: string } }
) {
	try {
		if (!params.product_id) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		const product = await prisma.product.findUnique({
			where: {
				id: params.product_id,
			},
			include: {
				images: true,
				category: true,
				size: true,
				color: true,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		logger('[PRODUCT_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { product_id: string; storeId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.product_id) {
			return new NextResponse('Product id is required', { status: 400 });
		}

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		const product = await prisma.product.delete({
			where: {
				id: params.product_id,
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		logger('[PRODUCT_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { product_id: string; storeId: string } }
) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const {
			name,
			price,
			categoryId,
			images,
			colorId,
			sizeId,
			isFeatured,
			isArchived,
		} = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.product_id) {
			return new NextResponse('Product id is required', { status: 400 });
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

		const storeByUserId = await prisma.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

		await prisma.product.update({
			where: {
				id: params.product_id,
			},
			data: {
				name,
				price,
				categoryId,
				colorId,
				sizeId,
				images: {
					deleteMany: {},
				},
				isFeatured,
				isArchived,
			},
		});

		const product = await prisma.product.update({
			where: {
				id: params.product_id,
			},
			data: {
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		logger('[PRODUCT_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
