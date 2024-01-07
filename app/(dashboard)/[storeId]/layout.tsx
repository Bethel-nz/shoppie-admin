import prisma from '@/prisma/client';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function DashboardLaout({
	children,
	params,
}: {
	children: ReactNode;
	params: { storeId: string };
}) {
	const { userId } = auth();

	if (!userId) redirect('/sign-in');

	const store = await prisma.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});
	if (!store) redirect('/');

	return (
		<>
			<div>This will be a nav bar</div>
			{children}
		</>
	);
}
