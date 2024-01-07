import logger from "@/lib/logger"
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import prisma from "@/prisma/client";
export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json()
		const { name } = body;

		if (!userId) return new NextResponse('Unathorized', { status: 401 })
		if (!name) return new NextResponse('Name is Required', { status: 400 })
		
		const store = await prisma.store.create({
			data: {
				name,userId
			}
		})
		return NextResponse.json(store)
	} catch (error) {
		logger('[STORES_POST]', error)
		return new NextResponse('Internal Server Error', {status: 500})
	}
}