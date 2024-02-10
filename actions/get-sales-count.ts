import prisma from '@/prisma/client';

export const getSalesCount = async (store_id: string) => {
	const salesCount = await prisma.order.count({
		where: {
			store_id,
			isPaid: true,
		},
	});

	return salesCount;
};
