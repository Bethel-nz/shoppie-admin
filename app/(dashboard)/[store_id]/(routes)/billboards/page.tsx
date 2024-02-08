import React from 'react';
import { BillboardClient } from './components/client';
import prisma from '@/prisma/client';

async function page({
	params: { store_id },
}: {
	params: { store_id: string };
}) {
	const billboards = await prisma.billboard.findMany({
		where: {
			store_id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<BillboardClient data={billboards} />
			</div>
		</div>
	);
}

export default page;
