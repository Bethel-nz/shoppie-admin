import React, { FC } from 'react';
import prisma from '@/prisma/client';
import { DashboardPageProps } from '@/types';

const page: FC<DashboardPageProps> = async ({ params: { storeid } }) => {
	const store = await prisma.store.findFirst({
		where: {
			id: storeid,
		},
	});
	return <div>Active Store: {store?.name}</div>;
};

export default page;
