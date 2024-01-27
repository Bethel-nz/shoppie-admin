import prisma from "@/prisma/client"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import logger from '@/lib/logger'

export async function PATCH(req: Request,{params:{storeid}}:{params:{storeid:string}}) {
	try {
		const { userId } = auth()
		const body = await req.json()
		const {name} = body
		if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
		if (!name) return new NextResponse('Store Name is required', { status: 400 })
		if (!storeid) return new NextResponse('Store id is required', { status: 400 })
		
		const store = await prisma.store.updateMany({
			where: {
				id: storeid,
				userId
			},
			data: {
				name
			}
		})
		return NextResponse.json(store)
	} catch (error) {
		logger(`[STORE_PATCH]:`, error)
		return new NextResponse('Internal Server Error',{status : 500})
	}
}

export async function DELETE(req: Request,{params:{storeid}}:{params:{storeid:string}}) {
	try {
		const { userId } = auth()
		
		if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
		if (!storeid) return new NextResponse('Store id is required', { status: 400 })
		
		const store = await prisma.store.deleteMany({
			where: {
				id: storeid,
				userId
			}
		})
		return NextResponse.json(store)
	} catch (error) {
		logger(`[STORE_DELETE]:`, error)
		return new NextResponse('Internal Server Error',{status : 500})
	}
}