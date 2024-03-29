import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/prisma/client';
import logger from '@/lib/logger';

export async function GET(
	req: Request,
	{ params }: { params: { color_id: string } }
) {
	try {
		if (!params.color_id) {
			return new NextResponse('Color id is required', { status: 400 });
		}

		const color = await prisma.color.findUnique({
			where: {
				id: params.color_id,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		logger('[COLOR_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { color_id: string; store_id: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.color_id) {
			return new NextResponse('Color id is required', { status: 400 });
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

		const color = await prisma.color.delete({
			where: {
				id: params.color_id,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		logger('[COLOR_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { color_id: string; store_id: string } }
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

		if (!params.color_id) {
			return new NextResponse('Color id is required', { status: 400 });
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

		const color = await prisma.color.update({
			where: {
				id: params.color_id,
			},
			data: {
				name,
				value,
			},
		});

		return NextResponse.json(color);
	} catch (error) {
		logger('[COLOR_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
