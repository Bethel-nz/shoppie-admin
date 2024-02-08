import React, { FC } from 'react';
import prisma from '@/prisma/client';
import { DashboardPageProps } from '@/types';

const page: FC<DashboardPageProps> = async ({ params: { store_id } }) => {
	const store = await prisma.store.findFirst({
		where: {
			id: store_id,
		},
	});
	return <div>Active Store: {store?.name}</div>;
};

export default page;
