import { NextResponse } from 'next/server';

import prisma from '@/prisma/client';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
	{ params }: { params: { size_id: string } }
) {
	try {
		if (!params.size_id) {
			return new NextResponse('Size id is required', { status: 400 });
		}

		const size = await prisma.size.findUnique({
			where: {
				id: params.size_id,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { size_id: string; store_id: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.size_id) {
			return new NextResponse('Size id is required', { status: 400 });
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

		const size = await prisma.size.delete({
			where: {
				id: params.size_id,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { size_id: string; store_id: string } }
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

		if (!params.size_id) {
			return new NextResponse('Size id is required', { status: 400 });
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

		const size = await prisma.size.update({
			where: {
				id: params.size_id,
			},
			data: {
				name,
				value,
			},
		});

		return NextResponse.json(size);
	} catch (error) {
		console.log('[SIZE_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
