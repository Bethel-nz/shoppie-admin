import NavBar from '@/components/NavBar/NavBar';
import prisma from '@/prisma/client';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function DashboardLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: { store_id: string };
}) {
	const { userId } = auth();

	if (!userId) redirect('/sign-in');

	const store = await prisma.store.findFirst({
		where: {
			id: params.store_id,
			userId,
		},
	});
	if (!store) redirect('/');

	return (
		<>
			<div>
				<NavBar />
			</div>
			{children}
		</>
	);
}
