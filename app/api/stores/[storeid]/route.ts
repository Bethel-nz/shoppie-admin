import prisma from "@/prisma/client"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

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
		console.error(`[STORE_PATCH]:`, error)
		return new NextResponse('Internal Server Error',{status : 500})
	}
}