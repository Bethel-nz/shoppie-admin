import prisma from '@/prisma/client';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

export default async function layout({ children }: { children: ReactNode }) {
	const { userId } = auth();
	if (!userId) redirect('/sign-in');

	const store = await prisma.store.findFirst({
		where: {
			userId,
		},
	});
	if (store) redirect(`/${store!.id}`);
}
