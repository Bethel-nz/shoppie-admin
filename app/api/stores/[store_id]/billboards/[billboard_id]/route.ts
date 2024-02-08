import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prisma from '@/prisma/client';
import logger from '@/lib/logger';

export async function GET(
	req: Request,
	{ params }: { params: { billboard_id: string } }
) {
	try {
		if (!params.billboard_id) {
			return new NextResponse('Billboard id is required', { status: 400 });
		}

		const billboard = await prisma.billboard.findUnique({
			where: {
				id: params.billboard_id,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		logger('[BILLBOARD_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { billboard_id: string; store_id: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.billboard_id) {
			return new NextResponse('Billboard id is required', { status: 400 });
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

		const billboard = await prisma.billboard.delete({
			where: {
				id: params.billboard_id,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		logger('[BILLBOARD_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { billboard_id: string; store_id: string } }
) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { label, imageUrl } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!label) {
			return new NextResponse('Label is required', { status: 400 });
		}

		if (!imageUrl) {
			return new NextResponse('Image URL is required', { status: 400 });
		}

		if (!params.billboard_id) {
			return new NextResponse('Billboard id is required', { status: 400 });
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

		const billboard = await prisma.billboard.update({
			where: {
				id: params.billboard_id,
			},
			data: {
				label,
				imageUrl,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		logger('[BILLBOARD_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
